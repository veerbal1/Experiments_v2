import './style.scss';
const generateRandomNumber = (value: number) => {
  const randomValue: number = Math.random() * value;
  const doubleOfRandom = randomValue * 2;
  return { randomValue, doubleOfRandom, bool: 2 === 2 };
};

console.log('Random number till 10', JSON.stringify(generateRandomNumber(10)));
