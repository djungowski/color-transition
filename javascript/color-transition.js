window.addEventListener('load', function () {
  var updateColor = function (color) {
    document.body.style.background = color;
  };

  var color = new Color();
  updateColor(color.toRgbaString());

  var targetColor = {
    red: 39,
    green: 166,
    blue: 176
  };

  color.fadeInto(targetColor, function () {
    console.log(color.toRgbaString());
    updateColor(color.toRgbaString());
  });
});