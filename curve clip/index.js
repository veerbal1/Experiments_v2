const BOX_WIDTH = innerWidth / 2;
const BOX_HEIGHT = innerHeight / 2;

window.onload = () => {
  element = document.querySelector('#box');
  element.style.width = `${BOX_WIDTH}px`;
  element.style.height = `${BOX_HEIGHT}px`;

  const topLeft = '0 0';
  const bottomLeft = '0 100%';
  const bottomRight = '100% 100%';
  const topRight = '100% 0';
  const others = '85% 12%, 60% 16%, 41% 16%, 30% 18%, 16% 13%';

  let x = 100;
  const constantVal = Math.PI / x;
  while (x !== -1) {
    const radian = Number((constantVal * x).toFixed(5));
    const y = Math.sin(radian);
    console.log(x, radian, y);
    x--;
  }
  element.style.clipPath = `polygon(${topLeft}, ${bottomLeft}, ${bottomRight}, ${topRight}, ${others})`;
  //   element.style.clipPath = `polygon(0 0, 0 100%, 100% 100%, 100% 0, 85% 12%, 60% 16%, 41% 16%, 30% 18%, 16% 13%)`;
};

const rdP = () => {
  return Math.floor(Math.random() * 100);
  return 0;
};
