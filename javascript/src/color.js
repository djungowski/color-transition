var Color = function (color) {
  if (color == undefined) {
    this._color = {
      red: 0,
      green: 0,
      blue: 0
    }
  } else {
    this._color = {
      red: color.red,
      green: color.green,
      blue: color.blue
    };
  }
};

Color.prototype._alpha = 1;

Color.prototype.toRgbaString = function () {
  return 'rgba('+ this._color.red +', '+ this._color.green +', '+ this._color.blue +', '+ this._alpha + ')';
};

Color.prototype.toJSON = function () {
  return this._color;
};

Color.prototype._calculateColorDistance = function (targetColor) {
  return {
    red: Math.abs(targetColor.red - this._color.red),
    green: Math.abs(targetColor.green - this._color.green),
    blue: Math.abs(targetColor.blue - this._color.blue)
  };
};

Color.prototype._getTransitionIntervalSize = function (distance) {
  var fadeTime = 10 * 1000; // 10s

  var stepsizeColors = {
    red: Math.floor(fadeTime / distance.red),
    green: Math.floor(fadeTime / distance.green),
    blue: Math.floor(fadeTime / distance.blue)
  };

  var intervalSize = null;

  for(var i in stepsizeColors) {
    if(!stepsizeColors.hasOwnProperty(i)) continue;

    var stepsizeColor = stepsizeColors[i];
    if (stepsizeColor < intervalSize || intervalSize == null) {
      intervalSize = stepsizeColor;
    }
  }

  return intervalSize;
};

Color.prototype.fadeInto = function (targetColor, stepCallback) {
  var intervalId;

  var distance = this._calculateColorDistance(targetColor);
  var intervalSize = this._getTransitionIntervalSize(distance);

  var remainingColors = {
    red: true,
    green: true,
    blue: true
  };

  var me = this;
  intervalId = window.setInterval(function () {
    if (me._color.red != targetColor.red) {
      me._color.red += 1;
    } else {
      delete remainingColors.red;
    }

    if (me._color.green != targetColor.green) {
      me._color.green += 1;
    } else {
      delete remainingColors.green;
    }

    if (me._color.blue != targetColor.blue) {
      me._color.blue += 1;
    } else {
      delete remainingColors.blue;
    }

    if (Object.keys(remainingColors).length == 0) {
      window.clearInterval(intervalId);
    } else if (stepCallback != undefined) {
      var currentColor = new Color(me._color);
      stepCallback(currentColor);
    }
  }, intervalSize);
};