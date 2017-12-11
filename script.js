var windowWidth = $(window).width()
var windowHeight = $(window).height()
var imageWidth = $('#img').width()
var imageHeight = $('#img').height()

var xMin = 0
var yMin = 0
var xMax = windowWidth - imageWidth
var yMax = windowHeight - imageHeight

function displayThing(point) {
	$('#img').css('top', point.y)
	$('#img').css('left', point.x)
}

var catm = (p0, p1, m0, m1) => (t) => {
	return {
		x: (2*t*t*t-3*t*t+1)*p0.x + (t*t*t-2*t*t+t)*m0.x + (-2*t*t*t+3*t*t)*p1.x + (t*t*t-t*t)*m1.x,
		y: (2*t*t*t-3*t*t+1)*p0.y + (t*t*t-2*t*t+t)*m0.y + (-2*t*t*t+3*t*t)*p1.y + (t*t*t-t*t)*m1.y
	}
}
var cerp = (a, b, c, d) => {
	var m0 = !!a ? {x: c.x-a.x, y: c.y-a.y} : {x: c.x-b.x, y: c.y-b.y}
	var m1 = !!d ? {x: d.x-b.x, y: d.y-b.y} : {x: c.x-b.x, y: c.y-b.y} 
	return catm(b, c, m0, m1)
}
var rand = (min, max) => () => {return Math.floor(Math.random() * (max + 1)) + min}
var randX = rand(xMin, xMax)
var randY = rand(yMin, yMax)

var t = 0
var i = 0
var iMax = 15
var pA = {x: randX(), y: randY()}
var pB = {x: randX(), y: randY()}
var pC = {x: randX(), y: randY()}
var pD = {x: randX(), y: randY()}
animate = () => {
	t += 1
	t %= 100
	
	if (t === 0) {
		++i
		pA = {x: pB.x, y: pB.y}
		pB = {x: pC.x, y: pC.y}
		pC = {x: i >= iMax ? xMax : pD.x, y: i >= iMax ? yMax : pD.y}
		pD = {x: i >= iMax-1 ? xMax : randX(), y: i >= iMax-1 ? yMax : randY()}
    }

    if (i <= iMax) {
		displayThing(cerp(pA, pB, pC, pD)(t/100))
		requestAnimationFrame(animate)    	
    }
}
requestAnimationFrame(animate)
