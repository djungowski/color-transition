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
  var me = this;
  var intervalId;

  var distance = this._calculateColorDistance(targetColor);
  var intervalSize = this._getTransitionIntervalSize(distance);

  var remainingChannels = {
    red: true,
    green: true,
    blue: true
  };

  var updateChannel = function (color) {
    if (me._color[color] != targetColor[color]) {
      me._color[color] += 1;
    } else {
      delete remainingChannels[color];
    }
  };

  var intervalUpdate = function () {
    updateChannel('red');
    updateChannel('green');
    updateChannel('blue');

    var remainingChannelsLength = Object.keys(remainingChannels).length;
    if (remainingChannelsLength == 0) {
      window.clearInterval(intervalId);
    } else if (stepCallback != undefined) {
      var currentColor = new Color(me._color);
      stepCallback(currentColor);
    }
  };

  intervalId = window.setInterval(intervalUpdate, intervalSize);
};