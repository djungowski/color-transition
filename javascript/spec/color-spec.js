describe('Color Specs', function () {
  beforeEach(function() {
      this.color = new Color();
  });

  describe('#toRgbaString', function () {
    it('returns black as rgba string', function () {
      expect(this.color.toRgbaString()).toBe('rgba(0, 0, 0, 1)');
    });
  });

  describe('#toJSON', function() {
      it('returns the json information', function() {
        var expectedColor = {
          red: 0,
          green: 0,
          blue: 0,
          alpha: 1
        };
        expect(this.color.toJSON()).toEqual(expectedColor);
      });
  });

  describe('#fadeInto', function () {
    it('fades to white in 10s', function() {
      var clock = jasmine.clock();
      clock.install();

      var targetColor = {
        red: 255,
        green: 255,
        blue: 255,
        alpha: 1
      };

      var halftimeColor = {
        red: 128,
        green: 128,
        blue: 128,
        alpha: 1
      };

      clock.tick(5 * 1000);
      var actualColor = this.color.toJSON();
      expect(actualColor.red).toBeCloseTo(halftimeColor.red);
      expect(actualColor.green).toBeCloseTo(halftimeColor.green);
      expect(actualColor.blue).toBeCloseTo(halftimeColor.blue);

      this.color.fadeInto(targetColor);
      clock.tick(5 * 1000);
      expect(this.color.toJSON()).toEqual(targetColor);
    });
  });
});