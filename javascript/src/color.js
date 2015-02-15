var Color = function () {
};

Color.prototype._color = {
  red: 0,
  green: 0,
  blue: 0,
  alpha: 1
};

Color.prototype.toRgbaString = function () {
  return 'rgba('+ this._color.red +', '+ this._color.red +', '+ this._color.red +', '+ this._color.alpha + ')';
};

Color.prototype.toJSON = function () {
  return this._color;
};