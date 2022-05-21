/* eslint-disable comma-dangle */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable prefer-const */
/* eslint-disable new-cap */
/* eslint-disable indent */
import './style.scss';
import { ACESFilmicToneMapping } from 'three';
import { Mesh } from 'three';
import { PMREMGenerator } from 'three';
import { MeshStandardMaterial } from 'three';
import { sRGBEncoding } from 'three';
import { WebGLRenderer } from 'three';
import { PerspectiveCamera, Color, Scene } from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RingBufferGeometry } from 'three';
import { RingGeometry } from 'three';
import { DoubleSide } from 'three';
import { CylinderBufferGeometry } from 'three';
import { Group } from 'three';
import { Vector2 } from 'three';
import { BoxBufferGeometry } from 'three';
import { Clock } from 'three';

window.onload = () => {
  const scene = new Scene();
  scene.background = new Color(0xffffff);

  const camera = new PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 15);

  const renderer = new WebGLRenderer({
    antialias: true,
  });
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
  renderer.outputEncoding = sRGBEncoding;
  renderer.shadowMap.enabled = true;
  renderer.setSize(innerWidth, innerHeight);
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.target.set(0, 0, 0);

  const pmrem = new PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();

  const mousePos = new Vector2(0, 0);

  addEventListener('mousemove', (e) => {
    const x = e.clientX - innerWidth * 0.5;
    const y = e.clientY - innerHeight * 0.5;

    mousePos.x = x * 0.001;
    mousePos.y = y * 0.001;
  });

  (async () => {
    const envHDRTexture = await new RGBELoader().loadAsync(
      require('./assets/cannon_1k_blurred.pic')
    );
    const envRT = pmrem.fromEquirectangular(envHDRTexture);

    const ring1 = CustomRing(envRT, 0.5, 0xffffff);
    ring1.scale.set(0.75, 0.75);

    const ring2 = CustomRing(envRT, 0.35, new Color(0.25, 0.22, 0.215));
    ring2.scale.set(1.05, 1.05);

    const ring3 = CustomRing(envRT, 0.15, new Color(0.7, 0.7, 0.7));
    ring3.scale.set(1.3, 1.3);

    const hourLine = CustomLine(0.4, 0.15, 0.07, envRT, 'white', 3, 0);
    const minuteLine = CustomLine(
      0.7,
      0.13,
      0.07,
      envRT,
      new Color(0x0a0a0a),
      2,
      -0.1
    );
    const secondLine = CustomLine(
      0.85,
      0.055,
      0.07,
      envRT,
      new Color(0x000000),
      1,
      0.1
    );

    scene.add(ring1, ring2, ring3, hourLine, minuteLine, secondLine);

    const clock = new Clock();
    renderer.setAnimationLoop(() => {
      const elapsedTime = clock.getElapsedTime();
      //   ring1.rotation.x = ring1.rotation.x * 0.95 + mousePos.y * 1.2 * 0.05;
      //   ring1.rotation.y = ring1.rotation.y * 0.95 + mousePos.x * 1.2 * 0.05;

      //   ring2.rotation.x = ring2.rotation.x * 0.95 + mousePos.y * 0.375 * 0.05;
      //   ring2.rotation.y = ring2.rotation.y * 0.95 + mousePos.x * 0.375 * 0.05;
      ring2.rotation.x = Math.PI * elapsedTime * 0.5;
      ring2.rotation.y = Math.PI * elapsedTime * 0.5;

      //   ring3.rotation.x = ring3.rotation.x * 0.95 - mousePos.y * 0.275 * 0.05;
      //   ring3.rotation.y = ring3.rotation.y * 0.95 - mousePos.x * 0.275 * 0.05;
      ring3.rotation.x = -Math.PI * elapsedTime * 0.3;
      ring3.rotation.y = -Math.PI * elapsedTime * 0.3;
      const date = new Date();
      const hour = date.getHours();

      const hourAngle = (hour / 12) * Math.PI * 2;
      hourLine.rotation.z = -hourAngle;
      hourLine.position.set(Math.sin(hourAngle), Math.cos(hourAngle), 0);

      const minuteAngle = (date.getMinutes() / 60) * Math.PI * 2;
      minuteLine.rotation.z = -minuteAngle;
      minuteLine.position.set(Math.sin(minuteAngle), Math.cos(minuteAngle), 0);

      const secondAngle = (date.getSeconds() / 60) * Math.PI * 2;
      secondLine.rotation.z = -secondAngle;
      secondLine.position.set(Math.sin(secondAngle), Math.cos(secondAngle), 0);

      controls.update();
      renderer.render(scene, camera);
    });
  })();
};

function CustomRing(envRT, thickness, color) {
  let ringFront = new Mesh(
    new RingGeometry(2, 2 + thickness, 70),
    new MeshStandardMaterial({
      color: color,
      envMap: envRT.texture,
      metalness: 1,
      roughness: 0,
      side: DoubleSide,
      envMapIntensity: 1,
    })
  );
  ringFront.position.set(0, 0, 0.25 * 0.5);

  let ringBack = new Mesh(
    new RingBufferGeometry(2, 2 + thickness, 70),
    new MeshStandardMaterial({
      color: color,
      envMap: envRT.texture,
      metalness: 1,
      roughness: 0,
      side: DoubleSide,
      envMapIntensity: 1,
    })
  );
  ringBack.position.set(0, 0, -0.25 * 0.5);

  let outerCylinder = new Mesh(
    new CylinderBufferGeometry(2 + thickness, 2 + thickness, 0.25, 70, 1, true),
    new MeshStandardMaterial({
      color: color,
      envMap: envRT.texture,
      metalness: 1,
      roughness: 0,
      side: DoubleSide,
      envMapIntensity: 1,
    })
  );

  outerCylinder.rotation.x = Math.PI / 2;

  let innerCylinder = new Mesh(
    new CylinderBufferGeometry(2, 2, 0.25, 70, 1, true),
    new MeshStandardMaterial({
      color: color,
      envMap: envRT.texture,
      metalness: 1,
      roughness: 0,
      side: DoubleSide,
      envMapIntensity: 1,
    })
  );
  //   innerCylinder.castShadow = true;
  innerCylinder.rotation.x = Math.PI / 2;

  const group = new Group();
  group.add(ringFront, ringBack, outerCylinder, innerCylinder);
  return group;
}

function CustomLine(
  height,
  width,
  depth,
  envRT,
  color,
  envMapIntensity,
  zIndex
) {
  const box = new Mesh(
    new BoxBufferGeometry(width, height, depth),
    new MeshStandardMaterial({
      color,
      envMap: envRT.texture,
      metalness: 1,
      roughness: 0,
      side: DoubleSide,
      envMapIntensity,
    })
  );
  box.position.set(0, 0, 0 + zIndex);

  const topCap = new Mesh(
    new CylinderBufferGeometry(width * 0.5, width * 0.5, depth, 10),
    new MeshStandardMaterial({
      color,
      envMap: envRT.texture,
      metalness: 1,
      roughness: 0,
      side: DoubleSide,
      envMapIntensity,
    })
  );
  topCap.rotation.x = Math.PI * 0.5;
  topCap.position.set(0, height * 0.5, 0 + zIndex);

  const bottomCap = new Mesh(
    new CylinderBufferGeometry(width * 0.5, width * 0.5, depth, 10),
    new MeshStandardMaterial({
      color,
      envMap: envRT.texture,
      metalness: 1,
      roughness: 0,
      side: DoubleSide,
      envMapIntensity,
    })
  );
  bottomCap.rotation.x = Math.PI * 0.5;
  bottomCap.position.set(0, -height * 0.5, 0 + zIndex);

  const group = new Group();
  group.add(box, topCap, bottomCap);

  return group;
}
