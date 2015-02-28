window.addEventListener('load', function () {
	var colorForm = document.getElementById('color');
	var red = document.getElementById('red');
	var green = document.getElementById('green');
	var blue = document.getElementById('blue');
	var duration = document.getElementById('duration');

	var getTargetColor = function () {
		var currentColor = {
			red: red.value,
			green: green.value,
			blue: blue.value
		};
		return new Color(currentColor);
	};

	var getDuration = function () {
		return parseInt(duration.value) * 1000;
	};

	var updateBackground = function (color) {
		document.body.style.background = color;
	};

	var color = new getTargetColor();
	updateBackground(color.toRgbaString());

	colorForm.addEventListener('submit', function (event) {
		event.preventDefault();
		var targetColor = getTargetColor();
		var targetDuration = getDuration();
		color.fadeInto(targetColor, targetDuration, function (currentColor) {
			updateBackground(currentColor.toRgbaString());
		});
	});
});