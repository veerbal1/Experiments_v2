let parent;
let pWidth = 667;
let pHeight = 375;

let child;
let cWidth = 100;
let cHeight = 100;
let offSetX = 0;
let offSetY = 0;

// function getCroppedImageCoordinates(
//   parentWidth,
//   parentHeight,
//   childWidth,
//   childHeight
// ) {
//   let _parentWidth = parentWidth;
//   let _parentHeight = parentHeight;
//   let _childWidth = childWidth;
//   let _childHeight = childHeight;
//   // Calculate aspect ratio of parent
//   let parentAspectRatio = _parentWidth / _parentHeight;

//   if (_childHeight < _childWidth) {
//     // We consider childHeight
//     _childWidth = _childHeight * parentAspectRatio;
//     console.log('_childHeight < _childWidth');
//     if (_childWidth / _childHeight !== parentAspectRatio) {
//       console.log(new Error('Aspect ratio is not correct'));
//     }
//   }
//   //   if (_childWidth <= _childHeight) {
//   //     // We consider childWidth
//   //     _childHeight = _childWidth / parentAspectRatio;
//   //     console.log('_childWidth <= _childHeight');
//   //   }
//   //   if (_parentWidth <= _childWidth) {
//   //     //   Consider child height
//   //     _childWidth = _childHeight * parentAspectRatio;
//   //     console.log('_parentWidth <= _childWidth');
//   //   }
//   //   if (_parentHeight <= _childHeight) {
//   //     //   Consider child width
//   //     _childHeight = _childWidth / parentAspectRatio;
//   //     console.log('_parentHeight <= _childHeight');
//   //   }
//   //   if (_parentWidth <= _childWidth && _parentHeight <= _childHeight) {
//   //     _childWidth = _parentWidth;
//   //     _childHeight = _parentHeight;
//   //     console.log('_parentWidth <= _childWidth && _parentHeight <= _childHeight');
//   //   }
//   return {
//     cWidth: _childWidth,
//     cHeight: _childHeight,
//   };
// }

// function getCroppedImageCoor(_pwidth, _pheight, _cwidth, _cheight) {
//   let parentAspectRatio = _pwidth / _pheight;
//   let childAspectRatio = _cwidth / _cheight;
//   let childWidth = _cwidth;
//   let childHeight = _cheight;

//   // First case Aspect ratio same
//   if (parentAspectRatio === childAspectRatio) {
//     console.log('Aspect ratio same');
//     // Here are two situations
//     // 1. Child is smaller than parent
//     // let it be
//     // 2. Child is bigger than parent
//     if (childWidth > _pwidth && childHeight > _pheight) {
//       // let it be
//       childWidth = _pheight;
//       childHeight = _pheight;
//     }
//   }

//   // Second case Aspect ratio less than parent
//   if (parentAspectRatio > childAspectRatio) {
//     // Here are two situations
//     // 1. Child is smaller than parent
//     if (childWidth <= _pwidth && childHeight <= _pheight) {
//       //  Height is greater than width
//       childWidth = childWidth;
//       childHeight = childWidth / parentAspectRatio;
//     }
//     // 2. Child is bigger than parent
//     if (childWidth >= _pwidth && childHeight >= _pheight) {
//       //  Height is greater than width
//       childWidth = _pwidth;
//       childHeight = childWidth / parentAspectRatio;
//     }
//     // 3. Width is greater than parent and height is less than parent
//     if (childWidth >= _pwidth && childHeight <= _pheight) {
//       childHeight = childHeight;
//       childWidth = childHeight * parentAspectRatio;
//     }
//     // 4. Width is less than parent and height is greater than parent
//     if (childWidth <= _pwidth && childHeight >= _pheight) {
//       childWidth = childWidth;
//       childHeight = childWidth / parentAspectRatio;
//     }
//   }

//   // Third case Aspect ratio greater than parent
//   if (parentAspectRatio < childAspectRatio) {
//     // Here are two situations
//     // 1. Child is smaller than parent
//     if (childWidth <= _pwidth && childHeight <= _pheight) {
//       //  Height is greater than width
//       childWidth = childHeight * parentAspectRatio;
//       childHeight = childHeight;
//     }
//     // 2. Child is bigger than parent
//     if (childWidth >= _pwidth && childHeight >= _pheight) {
//       //  Height is greater than width
//       childWidth = _pwidth;
//       childHeight = childWidth / parentAspectRatio;
//     }
//     // 3. Width is greater than parent and height is less than parent
//     if (childWidth >= _pwidth && childHeight <= _pheight) {
//       childHeight = childHeight;
//       childWidth = childHeight * parentAspectRatio;
//     }
//     // 4. Width is less than parent and height is greater than parent
//     if (childWidth <= _pwidth && childHeight >= _pheight) {
//       childWidth = childWidth;
//       childHeight = childWidth / parentAspectRatio;
//     }
//   }

//   return {
//     cWidth: childWidth,
//     cHeight: childHeight,
//   };
// }

function getCropped(pWidth, pHeight, cWidth, cHeight) {
  let parentAspectRatio = pWidth / pHeight;
  let childAspectRatio = cWidth / cHeight;

  if (parentAspectRatio < childAspectRatio) {
    cWidth = cHeight * parentAspectRatio;
  }
  if (parentAspectRatio > childAspectRatio) {
    cHeight = cWidth / parentAspectRatio;
  }
  if (cWidth > pWidth) {
    cWidth = pWidth;
    offSetX = cWidth / 2 - pWidth / 2;
  }
  if (cHeight > pHeight) {
    cHeight = pHeight;
    offSetY = cHeight / 2 - pHeight / 2;
  }
  return {
    cWidth: cWidth,
    cHeight: cHeight,
    offSetX,
    offSetY,
  };
}


// In images sometimes we have to consider the aspect ratio.
// ASPECT RATIO < 1 (WIDTH < HEIGHT)
// ASPECT RATIO > 1 (WIDTH > HEIGHT)