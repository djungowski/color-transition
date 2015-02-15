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
        jasmine.clock().install();
    });
  });
});