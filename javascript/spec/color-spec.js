describe('Color Specs', function () {
  var turqoise = {
    red: 39,
    green: 166,
    blue: 176
  };


  beforeEach(function() {
    this.color = new Color();
  });

  describe('Creation', function () {
    it('can be called with arguments', function() {
      this.color = new Color(turqoise);
      expect(this.color.toJSON()).toEqual(turqoise);
    });
  });

  describe('#toRgbaString', function () {
    it('returns black as rgba string', function () {
      expect(this.color.toRgbaString()).toBe('rgba(0, 0, 0, 1)');
    });

    it('returns turqoise as rgba string', function () {
      this.color = new Color(turqoise);
      expect(this.color.toRgbaString()).toBe('rgba(39, 166, 176, 1)');
    });
  });

  describe('#toJSON', function() {
      it('returns the json information', function() {
        var expectedColor = {
          red: 0,
          green: 0,
          blue: 0
        };
        expect(this.color.toJSON()).toEqual(expectedColor);
      });
  });

  describe('#fadeInto', function () {
    beforeEach(function() {
      jasmine.clock().install();

      this.targetColor = {
        red: 255,
        green: 255,
        blue: 255
      };
    });

    afterEach(function() {
      jasmine.clock().uninstall();
    });

    it('fades to white in 10s', function() {
      var halftimeColor = {
        red: 128,
        green: 128,
        blue: 128
      };

      this.color.fadeInto(this.targetColor);

      jasmine.clock().tick(5 * 1000);
      var actualColor = this.color.toJSON();
      expect(actualColor.red).toBeCloseTo(halftimeColor.red);
      expect(actualColor.green).toBeCloseTo(halftimeColor.green);
      expect(actualColor.blue).toBeCloseTo(halftimeColor.blue);

      jasmine.clock().tick(5 * 1000);
      expect(this.color.toJSON()).toEqual(this.targetColor);
    });

    it('calls the callback for every color increase', function () {
      var mock = {
        someCallback: function() {}
      };
      spyOn(mock, 'someCallback');

      this.color.fadeInto(this.targetColor, mock.someCallback);
      jasmine.clock().tick(10 * 1000);
      expect(this.color.toJSON()).toEqual(this.targetColor);
      expect(mock.someCallback.calls.count()).toEqual(255);
    });

    it('calls the callback with the current color', function() {
      var mock = {
        someCallback: function() {}
      };
      spyOn(mock, 'someCallback');

      this.color.fadeInto(this.targetColor, mock.someCallback);
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
        someCallback: function() {}
      };
      spyOn(mock, 'someCallback');

      spyOn(window, 'clearInterval').and.callThrough();

      this.color.fadeInto(this.targetColor, mock.someCallback);
      jasmine.clock().tick(15 * 1000);
      expect(this.color.toJSON()).toEqual(this.targetColor);
      expect(mock.someCallback.calls.count()).toEqual(255);
      expect(window.clearInterval).toHaveBeenCalled();
    });

    it('fades to turqoise', function () {
      this.color.fadeInto(turqoise);
      jasmine.clock().tick(10 * 1000);
      expect(this.color.toJSON()).toEqual(turqoise);
    });
  });
});