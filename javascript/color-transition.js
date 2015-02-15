window.addEventListener('load', function () {
  var updateBackground = function (color) {
    document.body.style.background = color;
  };

  var color = new Color();
  updateBackground(color.toRgbaString());

  var targetColor = {
    red: 39,
    green: 166,
    blue: 176
  };

  color.fadeInto(targetColor, function (currentColor) {
    updateBackground(currentColor.toRgbaString());
  });
});