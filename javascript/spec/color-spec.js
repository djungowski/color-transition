describe('Color Specs', function () {
  describe('#toRgbaString', function () {
    it('returns black as rgba string', function () {
      var color = new Color();
      expect(color.toRgbaString()).toBe('rgba(0, 0, 0, 1)');
    });
  });
});