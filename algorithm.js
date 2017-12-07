function Resample(points, n)
{
    var I = getLen(points) / (n - 1); 
    var D = 0.0;
    var newpoints = new Array(points[0]);
    for (var i = 1; i < points.length; i++)
    {
        if (points[i].ID == points[i - 1].ID)
        {
            var d = getDis(points[i - 1], points[i]);
            if ((D + d) >= I)
            {
                var qx = points[i - 1].X + ((I - D) / d) * (points[i].X - points[i - 1].X);
                var qy = points[i - 1].Y + ((I - D) / d) * (points[i].Y - points[i - 1].Y);
                var q = new Point(qx, qy, points[i].ID);
                newpoints[newpoints.length] = q; 
                points.splice(i, 0, q); 
                D = 0.0;
            } 
            else
            {
                D += d;
            }
        }
    }
    if (newpoints.length == n - 1)
    {
        newpoints[newpoints.length] = new Point(points[points.length - 1].X, points[points.length - 1].Y, points[points.length - 1].ID);
    }
    return newpoints;
}

function Scale(points)
{
    var minX = + Infinity, maxX = - Infinity, minY = + Infinity, maxY = - Infinity;
    for (var i = 0; i < points.length; i++) 
    {
        minX = Math.min(minX, points[i].X);
        minY = Math.min(minY, points[i].Y);
        maxX = Math.max(maxX, points[i].X);
        maxY = Math.max(maxY, points[i].Y);
    }
    var size = Math.max(maxX - minX, maxY - minY);
    var sizeX = maxX - minX;
    var sizeY = maxY - minY;
    var newpoints = new Array();
    for (var i = 0; i < points.length; i++) 
    {
        var qx = (points[i].X - minX) / sizeX;
        var qy = (points[i].Y - minY) / sizeY;
        newpoints[newpoints.length] = new Point(qx, qy, points[i].ID);
    }
    return newpoints;
}

function getCenter(points)
{
    var x = 0.0, y = 0.0;
    for (var i = 0; i < points.length; i++) 
    {
        x += points[i].X;
        y += points[i].Y;
    }
    x /= points.length;
    y /= points.length;
    return new Point(x, y, 0);
}

function trans(points, pt) 
{
    var c = getCenter(points);
    var newpoints = new Array();
    for (var i = 0; i < points.length; i++) 
    {
        var qx = points[i].X + pt.X - c.X;
        var qy = points[i].Y + pt.Y - c.Y;
        newpoints[newpoints.length] = new Point(qx, qy, points[i].ID);
    }
    return newpoints;
}

function matching(points, P)
{
    var e = 0.50;
    var step = Math.floor(Math.pow(points.length, 1 - e));
    var min = + Infinity;
    for (var i = 0; i < points.length; i += step)
    {
        var d1 = cloudDis(points, P.Points, i);
        var d2 = cloudDis(P.Points, points, i);
        min = Math.min(min, Math.min(d1, d2)); 
    }
    return min;
}

function pDollar() 
{
    this.PointClouds = new Array();
    this.addGates = function(pointclouds)
    {
        this.PointClouds = pointclouds;
    };
    this.Recognize = function(points)
    {
        points = Resample(points, 64);
        points = Scale(points);
        points = trans(points, root);
        var b = + Infinity;
        var u = - 1;
        for (var i = 0; i < this.PointClouds.length; i++) 
        {
            var d = matching(points, this.PointClouds[i]);
            if (d < b) 
            {
                b = d; 
                u = i; 
            }
        }
        return (u == - 1) ? new Result("No match.", -Infinity) : new Result(this.PointClouds[u].Name, (b - 2.0) / - 2.0);
    };
}

function getDis(p1, p2) 
{
    var dx = p2.X - p1.X;
    var dy = p2.Y - p1.Y;
    return Math.sqrt(dx * dx + dy * dy);
}

function cloudDis(pts1, pts2, start)
{
    var matched = new Array(pts1.length); 
    for (var k = 0; k < pts1.length; k++)
    {
        matched[k] = false;
    }
    var sum = 0;
    var i = start;
    do
    {
        var index = - 1;
        var min = + Infinity;
        for (var j = 0; j < matched.length; j++)
        {
            if (!matched[j]) 
            {
                var d = getDis(pts1[i], pts2[j]);
                if (d < min) 
                {
                    min = d;
                    index = j;
                }
            }
        }
        matched[index] = true;
        var weight = 1 - ((i - start + pts1.length) % pts1.length) / pts1.length;
        sum += weight * min;
        i = (i + 1) % pts1.length;
    }
    while (i != start);
    return sum;
}

function getLen(points) 
{
    var d = 0.0;
    for (var i = 1; i < points.length; i++)
    {
        if (points[i].ID == points[i - 1].ID)
        {
            d += getDis(points[i - 1], points[i]);
        }
    }
    return d;
}

var root = new Point(0, 0, 0);

function Point(x, y, id) 
{
    this.X = x;
    this.Y = y;
    this.ID = id;
}

function PointCloud(name, points) 
{
    this.Name = name;
    this.Points = Resample(points, 64);
    this.Points = Scale(this.Points);
    this.Points = trans(this.Points, root);
}

function Result(name, score) 
{
    this.Name = name;
    this.Score = score;
}

