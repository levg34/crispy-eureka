var X_MAX = $(window).width()
var Y_MAX = $(window).height()
var pl = []
var timeInterval = 10

function loadImage() {
	Y_MAX -= $('#img').height()
	X_MAX -= $('#img').width()
}

loadImage()

function randBetween(a,b) {
	return Math.floor(Math.random()*(b+1))+a
}

function createPoint() {
	return {x:randBetween(0,X_MAX),y:randBetween(0,Y_MAX)}
}

function pointsList(nbPts) {
	var list = []
	for (var i=0;i<nbPts;++i) {
		list.push(createPoint())
	}
	return list
}

function displayThing(point) {
	$('#img').css('top', point.y)
	$('#img').css('left', point.x)
	//console.log(point)
}

function lineBetween(p1,p2) {
	var a = 0
	var b = 0
	
	var x1 = p1.x
	var y1 = p1.y
	var x2 = p2.x
	var y2 = p2.y
	
	a = (y1-y2)/(x1-x2)
	b = (x1*y2-x2*y1)/(x1-x2)
	
	return function(x) {
		return a * x + b
	}
}

var trace = []

function animateLine(p1,p2) {
	var f = lineBetween(p1,p2)
	trace = []

	if (p1.x<p2.x) {
		for (var x=p1.x;x<p2.x;x++) {
			trace.push({x:x,y:f(x)})
		}
	} else {
		for (var x=p1.x;x>p2.x;x--) {
			trace.push({x:x,y:f(x)})
		}
	}

	interval = setInterval(displayNext,timeInterval)
}

function displayNext() {
	var point = trace.shift()
	if (point&&point.x&&point.y) {
		displayThing(point)
	} else if (trace.length==0) {
		clearInterval(interval)
		p1 = p2
		p2 = pl.shift()
		if (p2&&p2.x&&p2.y) {
			animateLine(p1,p2)
		}
	}
}

pl = pointsList(15)
pl.push({x:X_MAX,y:Y_MAX})

var p1 = {x:0,y:0}
var p2 = pl.shift()

animateLine(p1,p2)

var interval = setInterval(displayNext,timeInterval)
