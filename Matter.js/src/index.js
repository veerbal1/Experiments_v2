import './style.scss';
import Matter from 'matter-js';
import svgImage from './asset/svg.svg';

var Engine = Matter.Engine;
var Render = Matter.Render;
var Runner = Matter.Runner;
var Composite = Matter.Composite;
var Bodies = Matter.Bodies;
var Common = Matter.Common;

Common.setDecomp(require('poly-decomp'));

// elements
let leftButton;
let rightButton;

window.onload = () => {
  leftButton = document.getElementById('left');
  rightButton = document.getElementById('right');
  // Create an engine
  var engine = Engine.create({});

  // Create an renderer
  var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: window.innerWidth,
      height: window.innerHeight,
      wireframes: false,
      background: 'teal',
      backgroundScale: 1.2,
      // Cover the entire screen
    },
  });

  //   Create two boxes and a ground
  var boxA = Bodies.rectangle(200, 200, 80, 80);

  var ground = Bodies.rectangle(
    window.innerWidth / 2,
    window.innerHeight - 40,
    window.innerWidth,
    40,
    {
      isStatic: true,
    }
  );

  //   Composite all of the bodies to the world
  Composite.add(engine.world, [boxA, ground]);

  //   Run the renderer
  Render.run(render);

  //   Create runner
  var runner = Runner.create();
  eventListeners(boxA);
  //   Run the engine
  Runner.run(runner, engine);
};

const eventListeners = (boxA) => {
  // On key pressed
  onTouch(leftButton, () => {
    Matter.Body.setPosition(boxA, {
      x: boxA.position.x - 10,
      y: boxA.position.y,
    });
  });

  onTouch(rightButton, () => {
    Matter.Body.setPosition(boxA, {
      x: boxA.position.x + 10,
      y: boxA.position.y,
    });
  });
};

const onTouch = (element, callback) => {
  let interval;
  // Keep running on touch start and stop on touch end
  element.addEventListener('touchstart', () => {
    interval = setInterval(() => {
      callback();
    }, 16);
  });

  // on touch end
  element.addEventListener('touchend', () => {
    clearInterval(interval);
  });
};
