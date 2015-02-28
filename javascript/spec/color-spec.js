describe('Color Specs', function () {
	var colorTurqoise = {
		toJSON: function() {
			return {
				red: 39,
				green: 166,
				blue: 176
			}
		}
	};

	beforeEach(function () {
		this.color = new Color();
	});

	describe('Creation', function () {
		it('can be called with arguments', function () {
			this.color = new Color(colorTurqoise.toJSON());
			expect(this.color.toJSON()).toEqual(colorTurqoise.toJSON());
		});

		it('can be called with string arguments', function () {
			this.color = new Color({
				red: "39",
				green: "166",
				blue: "176"
			});
			expect(this.color.toJSON()).toEqual(colorTurqoise.toJSON());
		});
	});

	describe('#toRgbaString', function () {
		it('returns black as rgba string', function () {
			expect(this.color.toRgbaString()).toBe('rgba(0, 0, 0, 1)');
		});

		it('returns turqoise as rgba string', function () {
			this.color = new Color(colorTurqoise.toJSON());
			expect(this.color.toRgbaString()).toBe('rgba(39, 166, 176, 1)');
		});
	});

	describe('#toJSON', function () {
		it('returns the json information', function () {
			var expectedColor = {
				red: 0,
				green: 0,
				blue: 0
			};
			expect(this.color.toJSON()).toEqual(expectedColor);
		});
	});

	describe('#fadeInto', function () {
		beforeEach(function () {
			jasmine.clock().install();

			this.targetColor = {
				toJSON: function() {
					return {
						red: 255,
						green: 255,
						blue: 255
					}
				}
			};
		});

		afterEach(function () {
			jasmine.clock().uninstall();
		});

		it('fades to white in 2s', function () {
			// very ungenau
			var halftimeColor = {
				red: 142,
				green: 142,
				blue: 142
			};

			this.color.fadeInto(this.targetColor);

			jasmine.clock().tick(1000);
			var actualColor = this.color.toJSON();
			expect(actualColor.red).toBe(halftimeColor.red);
			expect(actualColor.green).toBe(halftimeColor.green);
			expect(actualColor.blue).toBe(halftimeColor.blue);

			jasmine.clock().tick(1000);
			expect(this.color.toJSON()).toEqual(this.targetColor.toJSON());
		});

		it ('fades to white in 1s', function () {
			this.color.fadeInto(this.targetColor, 1);
			jasmine.clock().tick(1000);
			expect(this.color.toJSON()).toEqual(this.targetColor.toJSON());
		});

		it('calls the callback for every color increase', function () {
			var mock = {
				someCallback: function () {
				}
			};
			spyOn(mock, 'someCallback');

			this.color.fadeInto(this.targetColor, null, mock.someCallback);
			jasmine.clock().tick(10 * 1000);
			expect(this.color.toJSON()).toEqual(this.targetColor.toJSON());
			expect(mock.someCallback.calls.count()).toEqual(768);
		});

		it('calls the callback with the current color', function () {
			var mock = {
				someCallback: function () {
				}
			};
			spyOn(mock, 'someCallback');

			this.color.fadeInto(this.targetColor, null, mock.someCallback);
			jasmine.clock().tick(39);

			var expectedParam = new Color({
				red: 1,
				green: 1,
				blue: 1
			});
			expect(mock.someCallback).toHaveBeenCalledWith(expectedParam);
		});

		it('stops the interval', function () {
			var mock = {
				someCallback: function () {
				}
			};
			spyOn(mock, 'someCallback');

			spyOn(window, 'clearInterval').and.callThrough();

			this.color.fadeInto(this.targetColor, null, mock.someCallback);
			jasmine.clock().tick(15 * 1000);
			expect(this.color.toJSON()).toEqual(this.targetColor.toJSON());
			expect(mock.someCallback.calls.count()).toEqual(768);
			expect(window.clearInterval).toHaveBeenCalled();
		});

		it('fades to turqoise', function () {
			this.color.fadeInto(colorTurqoise);
			jasmine.clock().tick(10 * 1000);
			expect(this.color.toJSON()).toEqual(colorTurqoise.toJSON());
		});

		it('fades from red to turqoise', function () {
			this.color = new Color({
				red: 255,
				green: 0,
				blue: 0
			});
			this.color.fadeInto(colorTurqoise);
			jasmine.clock().tick(10 * 1000);
			expect(this.color.toJSON()).toEqual(colorTurqoise.toJSON());
		});

		it('fades to turqoise instantly', function () {
			var color = new Color();
			color.fadeInto(colorTurqoise, 0);
			expect(color.toJSON()).toEqual(colorTurqoise.toJSON());
		});
	});

	describe('#updateChannel()', function () {
		it('updates channel red', function () {
			var targetColor = {
				red: 255,
				green: 0,
				blue: 0
			};
			var color = new Color();
			color.updateChannel('red', 255);
			expect(color.toJSON()).toEqual(targetColor);
		});

		it('updates channel green', function () {
			var targetColor = {
				red: 0,
				green: 255,
				blue: 0
			};
			var color = new Color();
			color.updateChannel('green', 255);
			expect(color.toJSON()).toEqual(targetColor);
		});

		it('updates channel blue', function () {
			var targetColor = {
				red: 0,
				green: 0,
				blue: 255
			};
			var color = new Color();
			color.updateChannel('blue', 255);
			expect(color.toJSON()).toEqual(targetColor);
		});
	});
});