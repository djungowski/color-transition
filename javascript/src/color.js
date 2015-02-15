var Color = function () {
};

Color.prototype._color = {
  red: 0,
  green: 0,
  blue: 0
};

Color.prototype._alpha = 1;

Color.prototype.toRgbaString = function () {
  return 'rgba('+ this._color.red +', '+ this._color.red +', '+ this._color.red +', '+ this._alpha + ')';
};

Color.prototype.toJSON = function () {
  return this._color;
};

Color.prototype.fadeInto = function (targetColor) {
  var fadeTime = 10 * 1000; // 10s

  var distance = {
    red: Math.abs(targetColor.red - this._color.red),
    green: Math.abs(targetColor.green - this._color.green),
    blue: Math.abs(targetColor.blue - this._color.blue)
  };

  // 255 in 10,000ms

  var stepsize = {
    red: Math.floor(fadeTime / distance.red),
    green: Math.floor(fadeTime / distance.green),
    blue: Math.floor(fadeTime / distance.blue)
  };

  console.log(stepsize);

  this._color = targetColor;
};