var hasCap,isDown, _points, singlePts, strokeId, _r, _r1, componentNum, wireNum, _check, wireToCheck, _g, _rc, timerForRecognize, circuitUnits, wires, input, output, R, V, I,numOfLightedBulb,bulbLimits; 

function load()
{
	R = 0;
	V = 0;
	numOfLightedBulb = 0;
	componentNum = 0;
	wireNum = 0;
	_points = new Array(); 
	singlePts = new Array(); 
	strokeId = 0;
	_check = 0;  
	wireToCheck = 0;
	circuitUnits = new Array();
	wires = new Array();
	input = new Array();
	output = new Array();
	bulbLimits = new Array();
	_r = new pDollar();
	_r1 = new pDollar();
	hasCap = false;
	_r1.addGates(
		new Array(
			//电源
			new PointCloud("BAT", new Array(
				new Point(499,291,1),new Point(499,327,1),new Point(499,356,1),new Point(499,380,1),
				new Point(530,230,2),new Point(530,260,2),new Point(530,290,2),new Point(530,320,2),new Point(530,350,2),new Point(530,380,2),new Point(530,410,2),new Point(530,440,2)
			)),
			// 电容
			new PointCloud("CAP", new Array(
				new Point(499,230,1),new Point(499,260,1),new Point(499,290,1),new Point(499,320,1),new Point(499,350,1),new Point(499,380,1),new Point(499,410,1),new Point(499,440,1),
				new Point(530,230,2),new Point(530,260,2),new Point(530,290,2),new Point(530,320,2),new Point(530,350,2),new Point(530,380,2),new Point(530,410,2),new Point(530,440,2)
			)),
			// 保险丝
			new PointCloud("FUSE", new Array(
				new Point(499,291,1),new Point(499,307,1),new Point(499,322,1),
				new Point(500,322,2),new Point(531,322,2),new Point(561,322,2),new Point(589,322,2),new Point(617,322,2),
				new Point(617,321,2),new Point(617,307,2),new Point(617,291,2),
				new Point(616,291,2),new Point(589,291,2),new Point(561,291,2),new Point(531,291,2),new Point(500,291,2),
				new Point(439,306,3),new Point(469,306,3),new Point(499,306,3),new Point(529,306,3),new Point(539,306,3),new Point(569,306,3),new Point(599,306,3),new Point(629,306,3),new Point(659,306,3)
			)),
			//电阻
			new PointCloud("RES", new Array(
				new Point(499,291,1),new Point(499,307,1),new Point(499,322,1),
				new Point(500,322,1),new Point(531,322,1),new Point(561,322,1),new Point(589,322,1),new Point(617,322,1),
				new Point(617,321,1),new Point(617,307,1),new Point(617,291,1),
				new Point(616,291,1),new Point(589,291,1),new Point(561,291,1),new Point(531,291,1),new Point(500,291,1)
			)),
			new PointCloud("RES", new Array(
				new Point(499,291,1),new Point(499,307,1),new Point(499,322,1),
				new Point(500,322,2),new Point(531,322,2),new Point(561,322,2),new Point(589,322,2),new Point(617,322,2),
				new Point(617,321,2),new Point(617,307,2),new Point(617,291,2),
				new Point(616,291,2),new Point(589,291,2),new Point(561,291,2),new Point(531,291,2),new Point(500,291,2)
			)),
			new PointCloud("RES", new Array(
				new Point(499,291,1),new Point(499,307,1),new Point(499,322,1),
				new Point(500,322,2),new Point(531,322,2),new Point(561,322,2),new Point(589,322,2),new Point(617,322,2),
				new Point(617,321,2),new Point(617,307,2),new Point(617,291,2),
				new Point(616,291,3),new Point(589,291,3),new Point(561,291,3),new Point(531,291,3),new Point(500,291,3)
			)),
			new PointCloud("RES", new Array(
				new Point(499,291,1),new Point(499,307,1),new Point(499,322,1),
				new Point(500,322,2),new Point(531,322,2),new Point(561,322,2),new Point(589,322,2),new Point(617,322,2),
				new Point(617,321,2),new Point(617,307,2),new Point(617,291,2),
				new Point(500,291,3),new Point(531,291,3),new Point(561,291,3),new Point(589,291,3),new Point(616,291,3)
			)),
			new PointCloud("RES", new Array(
				new Point(499,291,1),new Point(499,307,1),new Point(499,322,1),
				new Point(500,322,2),new Point(531,322,2),new Point(561,322,2),new Point(589,322,2),new Point(617,322,2),
				new Point(617,321,3),new Point(617,307,3),new Point(617,291,3),
				new Point(616,291,4),new Point(589,291,4),new Point(561,291,4),new Point(531,291,4),new Point(500,291,4)
			)),
			new PointCloud("RES", new Array(
				new Point(499,291,1),new Point(499,307,1),new Point(499,322,1),
				new Point(500,322,2),new Point(531,322,2),new Point(561,322,2),new Point(589,322,2),new Point(617,322,2),
				new Point(617,321,3),new Point(617,307,3),new Point(617,291,3),
				new Point(500,291,4),new Point(531,291,4),new Point(561,291,4),new Point(589,291,4),new Point(616,291,4)
			)),
			new PointCloud("BULB", new Array(
				new Point(490,290,1),new Point(500,316,1),new Point(510,324,1),new Point(520,328,1),new Point(530,330,1),
				new Point(540,328,1),new Point(550,324,1),new Point(560,316,1),new Point(570,290,1),new Point(560,264,1),
				new Point(550,256,1),new Point(540,252,1),new Point(530,250,1),
				new Point(520,252,1),new Point(510,256,1),new Point(500,264,1),new Point(490,290,1)
			)),
		)
	);
	var canvas = document.getElementById('myCanvas');
	_g = canvas.getContext('2d');
	_g.lineWidth = 3;
	_g.font = "16px Gentilis";
	_rc = getCanvasRect(canvas); 
	_g.fillStyle = "rgb(255,255,136)";
	_g.fillRect(0, 0, _rc.width, 20);
	isDown = false;
}

function getCanvasRect(canvas)
{
	var w = canvas.width;
	var h = canvas.height;

	var cx = canvas.offsetLeft;
	var cy = canvas.offsetTop;
	while (canvas.offsetParent != null)
	{
		canvas = canvas.offsetParent;
		cx += canvas.offsetLeft;
		cy += canvas.offsetTop;
	}
	return {x: cx, y: cy, width: w, height: h};
}

function getScrollY()
{
	var scrollY = 0;
	scrollY = window.scrollY;
	return scrollY;
}

function down(x, y, button)
{
	document.onselectstart = function() { return false; } 
	document.onmousedown = function() { return false; } 
	if (button <= 1)
	{

		x -= _rc.x;
		y -= _rc.y - getScrollY();

		isDown = true;
		if (strokeId == 0) 
		{
			_points.length = 0;
			_check = 0;
			wireToCheck = 0
		}
		_points[_points.length] = new Point(x, y, ++strokeId);

		var clr = "rgb(" + 255 + "," + 255 + "," + 255 + ")"; 
		_g.strokeStyle = clr;
		_g.fillStyle = clr;
		_g.lineWidth = 4;
		if (check_wire(x, y, circuitUnits))
		{
			wireToCheck = 1;
			drawText("Pin!");
			return;
		}

		drawText("Recording stroke #" + strokeId + "...");

		window.clearTimeout(timerForRecognize);
	}
	else if (button == 2)
	{
		drawText("Recognizing gesture...");
		window.clearTimeout(timerForRecognize);
	}
}

function move(x, y, button)
{
	if (isDown)
	{
		x -= _rc.x;
		y -= _rc.y - getScrollY();
		_points[_points.length] = new Point(x, y, strokeId); 
		singlePts[singlePts.length] = new Point(x, y, strokeId);
		drawConnectedPoint(_points.length - 2, _points.length - 1);
	}
}

function up(x, y, button)
{
	document.onselectstart = function() { return true; } 
	document.onmousedown = function() { return true; } 

	if (button <= 1)
	{
		if (isDown)
		{
			x -= _rc.x;
			y -= _rc.y - getScrollY();
			if ((wireToCheck) && check_wire(x,y,circuitUnits))
			{
				wireNum = wireNum + 1;
				singlePts.length = 0;
				strokeId = 0;
				drawText("is wire!");
				wires[wires.length] = new Wire(_points, circuitUnits);
				if(wires[wires.length - 1].isinput){
					str = "<div class='div" + symbolIn[symbolIn_Index] + "'>" + symbolIn[symbolIn_Index] + "<input type='text' class='form-control' id='" + symbolIn[symbolIn_Index] + "' ></input></div>";
					$('#forinput').append(str)
					drawsymbol(symbolIn[symbolIn_Index], circuitUnits[wires[wires.length - 1].startgate]);
					input[input.length] = new IO(symbolIn[symbolIn_Index++], true, wires.length - 1);
				}
				if(wires[wires.length - 1].isoutput){
					str2 = "<div class='div" + symbolOut[symbolOut_Index] + "'>" + symbolOut[symbolOut_Index] + "<input type='text' class='form-control' id='" + symbolOut[symbolOut_Index] + "' ></input></div>";
					$('#foroutput').append(str2)
					drawsymbol(symbolOut[symbolOut_Index], circuitUnits[wires[wires.length - 1].endgate]);
					output[output.length] = new IO(symbolOut[symbolOut_Index--], true, wires.length - 1);
				}
				isDown = false;
				return;
			}
			else if (wireToCheck)
			{
				singlePts.length = 0;
				strokeId = 0;
				drawText("is not wire!");
				isDown = false;
				return;
			}

			if (isline(singlePts)){
				_check = 1;
			}
			isDown = false;
			timerForRecognize = window.setTimeout(recognize, 3000, _points);
		}
	}
	else if (button == 2) 
	{
		recognize(_points);
	}
	singlePts.length = 0;
}

function recognize(strokePoints)
{
	clearStrokeOnCanvas(strokePoints);
	_r = _r1;
	if (strokePoints.length >= 10)
	{
		var result = _r.Recognize(strokePoints);
		if (result.Score <= -0.5)
		{
			drawText("Result: No Match");
		}
		else
		{
			drawText("Result: " + result.Name + " (" + round(result.Score,2) + ").");
			circuitUnits[circuitUnits.length] = new Gate(result.Name, strokePoints);
			drawGate(circuitUnits[circuitUnits.length-1]);
		}
	}
	else
	{
		drawText("Too little input made. Please try again.");
	}
	strokeId = 0; 
}

function drawGate(gate)
{
	var boundBox = gate.BoundBox;
	var height = boundBox.maxY - boundBox.minY;
	var width = Math.round(height * 9.0 / 4.0);
	var center = {X:boundBox.cenX, Y:boundBox.cenY};
	var image;
	switch(gate.Name)
	{
			case "RES":
				componentNum = componentNum + 1;
				var R_plus;
				image = document.getElementById("RESSVG");
				R_plus=prompt("Please input the Resistance"); 
				R = R + parseFloat(R_plus);
				var resistance = document.getElementById('R');
				resistance.value = R;
				break;
			case "BULB":
				image = document.getElementById("BULBSVG");
				componentNum = componentNum + 1;
				var R_plus;
				R_plus=prompt("Please input the Resistance"); 
				R = R + parseFloat(R_plus);
				var resistance = document.getElementById('R');
				resistance.value = R;
				var newLimit;
				newLimit=prompt("Please input the limit of I for shining bulb"); 
				bulbLimits[bulbLimits.length] = newLimit;
				break;
			case "CAP":
				image = document.getElementById("CAPSVG");
				componentNum = componentNum + 1;
				hasCap = true;
				break;
			case "BAT":
				componentNum = componentNum + 1;
				var V_plus;
				image = document.getElementById("BATSVG");
				V_plus=prompt("Please input the Voltage"); 
				V = V + parseFloat(V_plus);
				var voltage = document.getElementById('V');
				voltage.value = V;
				break;
			case "FUSE":
				componentNum = componentNum + 1;
				var R_plus;
				image = document.getElementById("FUSESVG");
				R_plus=prompt("Please input the Resistance"); 
				R = R + parseFloat(R_plus);
				var resistance = document.getElementById('R');
				resistance.value = R;
				break;
	}
	var offsetX = center.X - Math.round(width/2.0);
	var offsetY = center.Y - Math.round(height/2.0);
	_g.drawImage(image, offsetX, offsetY, width, height);
	for(var i = 0; i < gate.Pin.length; i++)
	{
			drawPin(gate.Pin[i].X, gate.Pin[i].Y, 0.05 * gate.Height);
	}

}

function drawPin(x, y, radius)
{
	_g.beginPath();
	_g.lineWidth = 2;
	_g.arc(x,y,radius,0,2 * Math.PI, false);
	_g.closePath()
	_g.stroke();
	_g.lineWidth = 6;
}

function drawConnectedPoint(from, to)
{
	_g.beginPath();
	_g.moveTo(_points[from].X, _points[from].Y);
	_g.lineTo(_points[to].X, _points[to].Y);
	_g.closePath();
	_g.stroke();
}

function drawText(str)
{
	_g.font = "15px Georgia"
	_g.fillStyle = "rgb(255,255,255)";
	_g.fillRect(0, 0, _rc.width, 20);
	_g.fillStyle = "rgb(0,0,0)";
	_g.fillText(str, 1, 14);
}

function drawsymbol(str, gate)
{
	_g.font = (gate.Height*0.5).toString()+"px Georgia";
	_g.fillStyle = "rgb(255,255,255)";
	_g.fillText(str, gate.BoundBox.cenX-gate.Height*0.15, gate.BoundBox.cenY+gate.Height*0.15);
}

function clearStrokeOnCanvas(points)
{
	var clr = "rgb(" + 0 + "," + 0 + "," + 255 + ")";
	_g.strokeStyle = clr;
	_g.fillStyle = clr;
	_g.lineWidth = 8;
	var strokeID = 0;
	for(var i = 0; i < points.length; i++)
	{
			if (points[i].ID != strokeID)
			{
					strokeID = points[i].ID;
					continue;
			}
			drawConnectedPoint(i, i-1);
	}
	clr = "rgb(" + 255 + "," + 255 + "," + 255 + ")";
	_g.strokeStyle = clr;
	_g.fillStyle = clr;
}

function clearAll()
{
	_points.length = 0;
	_check = 0;
	wireToCheck = 0;
	strokeId = 0;
	circuitUnits.length = 0;
	wires.length = 0;
	input.length = 0;
	output.length = 0;
	bulbLimits.length = 0;
	R = 0;
	V = 0;
	hasCap = false;
	wireNum = 0;
	componentNum = 0;
	numOfLightedBulb = 0;
	var resistance = document.getElementById('R');
	var voltage = document.getElementById('V');
	var ii = document.getElementById('I');
	var numOfBulb = document.getElementById('numOfLightedBulb');
	resistance.value = R;
	voltage.value = V;
	ii.value = 0;
	numOfBulb.value = 0;
	_g.clearRect(0, 0, _rc.width, _rc.height);
	drawText("Canvas cleared.");
	clr = "rgb(" + 255 + "," + 255 + "," + 255 + ")";
	_g.strokeStyle = clr;
	_g.fillStyle = clr;
	document.getElementById("feedback").innerText = '';
	symbolIn_Index = 0;
	symbolOut_Index = 25;
	
}

function Circuit(gateArray, wireArray, R, V,I)
{
  this._gateArray = gateArray;
  this.wires = wireArray;
  this.R = R;
  this.V = V;
  this.I = I;
  this.calcAll = function()
  {
    var result = parseFloat(V) / parseFloat(R);
    return result;
  }
}

function submit()
{
	if (wireNum != componentNum) {
		alert("The circuit is not connected");
		return;
	}
	if (hasCap) {
		alert("The circuit has capacitor which stops the current");
		return;
	}
	var I = document.getElementById('I').value;
	cir = Circuit(circuitUnits, wires, R, V, I);
	var outputresult = this.calcAll();
	numOfLightedBulb = 0;
	var actualLightedBulb = 0;
	for (var i = 0; i < bulbLimits.length; i++) {
		if (outputresult >= bulbLimits[i]) {
			actualLightedBulb = actualLightedBulb + 1;
		}
	}
	var numOfBulb = document.getElementById('numOfLightedBulb');
	var feedback = document.getElementById("feedback");
	
	if(outputresult == parseFloat(I) && numOfBulb.value == actualLightedBulb)
	{
		feedback.innerText = "You are correct!";
	} else {
		feedback.innerText = "You are incorrect!";
	}
	wireToCheck = 0;
}

function check_wire(x, y, gates)
{
	if (gates.length == 0 || gates.length == 1) return false;
	var minDis = Infinity;
	for (var i = 0; i < gates.length; i++) {
		var Dis;
			Dis = Math.min(Math.pow(gates[i].Pin[0].X - x, 2) + Math.pow(gates[i].Pin[0].Y - y, 2),
			Math.pow(gates[i].Pin[1].X - x, 2) + Math.pow(gates[i].Pin[1].Y - y, 2));
		if (Dis < minDis)
		{
			minDis = Dis;
		}
   }
	if(minDis < gates[0].Height * 0.25){
		return true;
	}
		return false;
}

function isline(points)
{
var path = 0;
    for (var i = 0; i < points.length-1; i++) {
        path += Math.sqrt(Math.pow(points[i].X - points[i+1].X, 2) + Math.pow(points[i].Y - points[i+1].Y, 2));
    }
    var line = Math.sqrt(Math.pow(points[0].X - points[points.length-1].X, 2) + Math.pow(points[0].Y - points[points.length-1].Y, 2));
    if (line > 0.96 * path){
    	return true;
    }
    else{
    	return false;
    }
}

function round(n, d) 
{
	d = Math.pow(10, d);
	return Math.round(n * d) / d
}
