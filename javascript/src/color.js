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

Color.prototype._getTransitionIntervalSize = function (distance) {
	var fadeTime = 2 * 1000; // 10s

	return {
		red: Math.floor(fadeTime / Math.abs(distance.red)),
		green: Math.floor(fadeTime / Math.abs(distance.green)),
		blue: Math.floor(fadeTime / Math.abs(distance.blue))
	};
};

Color.prototype.fadeInto = function (targetColor, stepCallback) {
	targetColor = targetColor.toJSON();

	this.startColorInterval('red', targetColor, stepCallback);
	this.startColorInterval('green', targetColor, stepCallback);
	this.startColorInterval('blue', targetColor, stepCallback);
};

Color.prototype.startColorInterval = function (channelName, targetColor, stepCallback) {
	var me = this;
	var intervalId;
	var distance = this._calculateColorDistance(targetColor);
	var intervalSize = this._getTransitionIntervalSize(distance);

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