function Point(x, y){
	this.X = x;
	this.Y = y;
}

function Gate(name, points){

	this.findBB = function()
	{
		var minX = + Infinity, maxX = - Infinity, minY = + Infinity, maxY = - Infinity;
	    for (var i = 0; i < this.Points.length; i++) {
	        minX = Math.min(minX, this.Points[i].X);
	        minY = Math.min(minY, this.Points[i].Y);
	        maxX = Math.max(maxX, this.Points[i].X);
	        maxY = Math.max(maxY, this.Points[i].Y);
	    }
	    var cenX = Math.round((minX + maxX)/2);
	    var cenY = Math.round((minY + maxY)/2);

	    return {minX: minX, maxX: maxX, minY: minY, maxY: maxY, cenX: cenX, cenY: cenY};
	};
	this.voltage = 0;
	this.resistance = 0;
	this.Name = name;
	this.Points = points.slice();
	this.BoundBox = this.findBB();
	this.Height = this.BoundBox.maxY - this.BoundBox.minY;
	this.Width = Math.round(this.Height * 9.0 / 4.0);
	this.Pin = new Array();

	var center = {X:this.BoundBox.cenX, Y:this.BoundBox.cenY};
	var offsetX = center.X - Math.round(this.Width/2.0);
	var offsetY = center.Y - Math.round(this.Height/2.0);
	switch(name)
	{
		case "RES":
			this.Pin = new Array(
				new Point(offsetX + 0.005 * this.Width, offsetY + 0.48 * this.Height),
				new Point(offsetX + 0.995 * this.Width, offsetY+ 0.47 * this.Height)
			)
			this.Input = 1;
			this.Output = 1;
			break;
		case "BAT":
			this.Pin = new Array(
				new Point(offsetX + 0.13 * this.Width, offsetY + 0.42 * this.Height),
				new Point(offsetX + 0.983 * this.Width, offsetY+ 0.42 * this.Height)
			)
			this.Input = 1;
			this.Output = 1;
			break;
		case "BULB":
			this.Pin = new Array(
				new Point(offsetX + 0.03 * this.Width, offsetY + 0.55 * this.Height),
				new Point(offsetX + 0.989 * this.Width, offsetY+ 0.53 * this.Height)
			)
			this.Input = 1;
			this.Output = 1;
			break;
		case "CAP":
			this.Pin = new Array(
				new Point(offsetX + 0.14 * this.Width, offsetY + 0.52 * this.Height),
				new Point(offsetX + 0.97 * this.Width, offsetY+ 0.51 * this.Height)
			)
			this.Input = 1;
			this.Output = 1;
			break;
		case "FUSE":
			this.Pin = new Array(
				new Point(offsetX + 0.0 * this.Width, offsetY + 0.59 * this.Height),
				new Point(offsetX + 0.992 * this.Width, offsetY+ 0.595 * this.Height)
			)
			this.Input = 1;
			this.Output = 1;
			break;
	}
}

function Wire(points, gates)
{
	var minDis_start = Infinity;
	var minDis_end = Infinity;
	this.isinput = false;
	this.isoutput = false;

	for (var i = 0; i < gates.length; i++) {
		var Dis_start;
		var Dis_end;
			Dis_start = Math.min(Math.pow(gates[i].Pin[0].X - points[0].X, 2) + Math.pow(gates[i].Pin[0].Y - points[0].Y, 2),
			Math.pow(gates[i].Pin[1].X - points[0].X, 2) + Math.pow(gates[i].Pin[1].Y - points[0].Y, 2));

			Dis_end = Math.min(Math.pow(gates[i].Pin[0].X - points[points.length - 1].X, 2) + Math.pow(gates[i].Pin[0].Y - points[points.length - 1].Y, 2),
			Math.pow(gates[i].Pin[1].X - points[points.length - 1].X, 2) + Math.pow(gates[i].Pin[1].Y - points[points.length - 1].Y, 2));
		if (Dis_start < minDis_start){
			this.startgate = i;
			minDis_start = Dis_start;
			this.isinput = false;
		}

		if (Dis_end < minDis_end){
			this.endgate = i;
			minDis_end = Dis_end;
			this.isoutput = false;
		}
	}
	if(minDis_start < gates[0].Height * 0.25 && minDis_end < gates[0].Height * 0.25){
		this.isWire = true;
	}
}

function IO(symbolName, symbolValue, wireIndex){
	this.symbolName = symbolName;
	this.symbolValue = symbolValue;
	this.wireIndex = wireIndex;
}
