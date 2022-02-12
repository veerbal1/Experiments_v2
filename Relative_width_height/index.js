let parent;
let parentWidth = 720;
let parentHeight = 1080;

let child;
let childWidth = 300;
let childHeight = 100;

let canvasMain;

// window.onload = () => {
//   parent = document.getElementById('parent');
//   child = document.getElementById('child');

//   parent.style.height = parentHeight + 'px';
//   parent.style.width = parentWidth + 'px';

//   child.style.height = childHeight + 'px';
//   child.style.width = childWidth + 'px';

//   //   Get new Coord.
//   let newCoord = getCroppedImageCoordinates(
//     parentWidth,
//     parentHeight,
//     childWidth,
//     childHeight
//   );

//   console.log(newCoord);
//   child.style.height = newCoord.cHeight + 'px';
//   child.style.width = newCoord.cWidth + 'px';
// };

const getCroppedImageCoordinates = (
  parentWidth,
  parentHeight,
  childWidth,
  childHeight
) => {
  let _parentWidth = parentWidth;
  let _parentHeight = parentHeight;
  let _childWidth = childWidth;
  let _childHeight = childHeight;
  // Calculate aspect ratio of parent
  let parentAspectRatio = _parentWidth / _parentHeight;

  if (_childHeight < _childWidth) {
    // We consider childHeight
    _childWidth = _childHeight * parentAspectRatio;
    console.log(_childWidth);
  }
  if (_childWidth < _childHeight) {
    // We consider childWidth
    _childHeight = _childWidth / parentAspectRatio;
    console.log(_childHeight);
  }
  if (_parentWidth < _childWidth) {
    // We consider childWidth
    _childHeight = _childWidth / parentAspectRatio;
    console.log(_childHeight);
  }
  return {
    cWidth: parseFloat(_childWidth.toFixed(2)),
    cHeight: parseFloat(_childHeight.toFixed(2)),
  };
};

module.exports = getCroppedImageCoordinates;
