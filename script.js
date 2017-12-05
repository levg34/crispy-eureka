var X_MAX = $(window).width()
var Y_MAX = $(window).height()
var pl = []

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

function displayNext() {
	var point = pl.pop()
	if (point&&point.x&&point.y) {
		displayThing(point)
	} else if (pl.length==0) {
		//$('#img').hide()
		displayThing({x:X_MAX,y:Y_MAX})
		clearInterval(interval)
	}
}

pl = pointsList(15)

var interval = setInterval(displayNext,1500)

/*pointsList(15).forEach(function(point) {
	setTimeout(function() {
		displayThing(point)
	}, 1500)
})*/
