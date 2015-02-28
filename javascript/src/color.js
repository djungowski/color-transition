var Color = function (color) {
	if (color == undefined) {
		this._color = {
			red: 0,
			green: 0,
			blue: 0
		}
	} else {
		this._color = {
			red: parseInt(color.red),
			green: parseInt(color.green),
			blue: parseInt(color.blue)
		};
	}
};

Color.prototype._alpha = 1;

Color.prototype.toRgbaString = function () {
	return 'rgba(' + this._color.red + ', ' + this._color.green + ', ' + this._color.blue + ', ' + this._alpha + ')';
};

Color.prototype.toJSON = function () {
	return this._color;
};

Color.prototype._calculateColorDistance = function (targetColor) {
	return {
		red: targetColor.red - this._color.red,
		green: targetColor.green - this._color.green,
		blue: targetColor.blue - this._color.blue
	};
};

Color.prototype._getTransitionIntervalSizeForChannel = function (channelName, distance, duration) {
	var colorDistance = Math.abs(distance[channelName]);
	if (colorDistance == 0) {
		return 0;
	}
	return Math.floor(duration / colorDistance);
};

Color.prototype._getTransitionIntervalSize = function (distance, duration) {
	return {
		red: this._getTransitionIntervalSizeForChannel('red', distance, duration),
		green: this._getTransitionIntervalSizeForChannel('green', distance, duration),
		blue: this._getTransitionIntervalSizeForChannel('blue', distance, duration)
	};
};

Color.prototype.fadeInto = function (targetColor, duration, stepCallback) {
	targetColor = targetColor.toJSON();

	if (duration == null || duration == undefined) {
		duration = 2 * 1000; // 10s
	}

	this.startColorInterval('red', targetColor, duration, stepCallback);
	this.startColorInterval('green', targetColor, duration, stepCallback);
	this.startColorInterval('blue', targetColor, duration, stepCallback);
};

Color.prototype.startColorInterval = function (channelName, targetColor, duration, stepCallback) {
	var me = this;
	var intervalId;
	var distance = this._calculateColorDistance(targetColor);
	var intervalSize = this._getTransitionIntervalSize(distance, duration);

	var updateChannel = function (channelName) {
		var channel = me._color[channelName];
		var summand = (distance[channelName] < 0) ? -1 : 1;

		if (channel != targetColor[channelName]) {
			me._color[channelName] += summand;
		} else {
			window.clearInterval(intervalId);
		}
	};

	var intervalUpdate = function () {
		updateChannel(channelName);

		if (stepCallback != undefined) {
			var currentColor = new Color(me._color);
			stepCallback(currentColor);
		}
	};

	intervalId = window.setInterval(intervalUpdate, intervalSize[channelName]);
};