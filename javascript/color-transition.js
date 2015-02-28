window.addEventListener('load', function () {
	var colorForm = document.getElementById('color');
	var red = document.getElementById('red');
	var green = document.getElementById('green');
	var blue = document.getElementById('blue');

	var getColorFromForm = function () {
		var currentColor = {
			red: red.value,
			green: green.value,
			blue: blue.value
		};
		return new Color(currentColor);
	};

	var updateBackground = function (color) {
		document.body.style.background = color;
	};

	var color = new getColorFromForm();
	updateBackground(color.toRgbaString());

	colorForm.addEventListener('submit', function (event) {
		event.preventDefault();
		var targetColor = getColorFromForm();
		color.fadeInto(targetColor, function (currentColor) {
			console.log(currentColor.toRgbaString());
			updateBackground(currentColor.toRgbaString());
		});
	});
});