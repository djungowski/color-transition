window.addEventListener('load', function () {
	var updateBackground = function (color) {
		document.body.style.background = color;
	};

	var turqoise = {
		red: 39,
		green: 166,
		blue: 176
	};

	var red = {
		red: 255,
		green: 0,
		blue: 0
	};

	var color = new Color(turqoise);
	var targetColor = red;

	updateBackground(color.toRgbaString());

	color.fadeInto(targetColor, function (currentColor) {
		console.log(currentColor.toRgbaString());
		updateBackground(currentColor.toRgbaString());
	});
});