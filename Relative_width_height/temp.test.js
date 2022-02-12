const getCroppedImageCoordinates = require('./index.js');

describe('Get cropped image coordinates', () => {
  it('Parent Width-height 300-300 -> 200-100', () => {
    expect(getCroppedImageCoordinates(300, 300, 200, 100)).toEqual({
      cWidth: 100,
      cHeight: 100,
    });
  });
  it('Parent Width-height 300-300 -> 200-200', () => {
    expect(getCroppedImageCoordinates(300, 300, 200, 200)).toEqual({
      cWidth: 200,
      cHeight: 200,
    });
  });
  it('Parent Width-height 720-1080 -> 300-100', () => {
    expect(getCroppedImageCoordinates(720, 1080, 300, 100)).toEqual({
      cWidth: 66.67,
      cHeight: 100.00,
    });
  });
  it('Parent Width-height 720-1080 -> 200-400', () => {
    expect(getCroppedImageCoordinates(720, 1080, 200, 400)).toEqual({
      cWidth: 200.00,
      cHeight: 300.00,
    });
  });
  it('Parent Width-height 720-1080 -> 720-1080', () => {
    expect(getCroppedImageCoordinates(720, 1080, 720, 1080)).toEqual({
      cWidth: 720.00,
      cHeight: 1080.00,
    });
  });

  it('Parent Width-height 400-400 -> 300-100', () => {
    expect(getCroppedImageCoordinates(400, 400, 300, 100)).toEqual({
      cWidth: 100.00,
      cHeight: 100.00,
    });
  });

  it('Parent Width-height 400-400 -> 800-300', () => {
    expect(getCroppedImageCoordinates(400, 400, 800, 300)).toEqual({
      cWidth: 300.00,
      cHeight: 300.00,
    });
  });
  it('Parent Width-height 400-400 -> 800-800', () => {
    expect(getCroppedImageCoordinates(400, 400, 800, 800)).toEqual({
      cWidth: 400.00,
      cHeight: 400.00,
    });
  });
});
