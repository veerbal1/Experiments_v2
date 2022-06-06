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
//   let others = '85% 12%, 60% 16%, 41% 16%, 30% 18%, 16% 13%';
    let others = '0 0';

  let x = 100;
  const constantVal = Math.PI / x;
  while (x !== -1) {
    const radian = Number((constantVal * x).toFixed(5));
    const y = Math.sin(radian) * 0.5;

    console.log(x, radian, Number((100 - y * 100).toFixed(6)));
    others += `,${x}% ${Number((y * 100).toFixed(6))}% `;

    x--;
  }
  // console.log(others);
//   element.style.clipPath = `polygon(${topLeft}, ${bottomLeft}, ${bottomRight}, ${topRight}, ${others})`;
  console.log(
    `polygon(${topLeft}, ${bottomLeft}, ${bottomRight}, ${topRight} ${others})`
  );
  // element.style.clipPath = `polygon(0 0, 0 100%, 100% 100%, 100% 0, 85% 12%, 60% 16%, 41% 16%, 30% 18%, 16% 13%)`;
};

const rdP = () => {
  return Math.floor(Math.random() * 100);
  return 0;
};
