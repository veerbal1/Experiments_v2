// Apply Scaling
window.onload = () => {
  var canvas = document.getElementById('canvas');
  var gl = canvas.getContext('webgl2');

  // Defining and storing geometry
  var vertices = [-1, -1, -1, 1, -1, -1, 1, 1, -1];
  var colors = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  var indices = [0, 1, 2];

  //Create and store data into vertex buffer
  var vertex_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  //Create and store data into color buffer
  var color_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  //Create and store data into index buffer
  var index_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(indices),
    gl.STATIC_DRAW
  );

  // Shaders
  // vertex shader source code
  var vertCode = `
    attribute vec3 position;
    uniform mat4 Pmatrix;
    uniform mat4 Vmatrix;
    uniform mat4 Mmatrix;
    attribute vec3 color;
    varying vec3 vColor;

    void main(){
      gl_Position = Pmatrix*Vmatrix*Mmatrix*vec4(position, 1.0);
      vColor = color;
    }
    `;

  var fragCode = `
precision mediump float;
varying vec3 vColor;
void main(void) {
  gl_FragColor = vec4(vColor, 1.0);
}
`;

  var vertShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertShader, vertCode);
  gl.compileShader(vertShader);
  if (!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS)) {
    console.log(
      'ERROR compiling vertex shader!',
      gl.getShaderInfoLog(vertShader)
    );
    return;
  }
  var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragShader, fragCode);
  gl.compileShader(fragShader);
  if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {
    console.log(
      'ERROR compiling fragment shader!',
      gl.getShaderInfoLog(fragShader)
    );
    return;
  }

  var shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertShader);
  gl.attachShader(shaderProgram, fragShader);
  gl.linkProgram(shaderProgram);
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.log('ERROR linking program!', gl.getProgramInfoLog(shaderProgram));
    return;
  }

  // Initialize shader variables
  var Pmatrix = gl.getUniformLocation(shaderProgram, 'Pmatrix');
  var Vmatrix = gl.getUniformLocation(shaderProgram, 'Vmatrix');
  var Mmatrix = gl.getUniformLocation(shaderProgram, 'Mmatrix');
  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

  var position = gl.getAttribLocation(shaderProgram, 'position');
  gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 0, 0); //position
  gl.enableVertexAttribArray(position);
  gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);

  var color = gl.getAttribLocation(shaderProgram, 'color');
  gl.vertexAttribPointer(color, 3, gl.FLOAT, false, 0, 0); //color
  gl.enableVertexAttribArray(color);

  gl.useProgram(shaderProgram);

  // Matrix
  function getProjection(angle, a, zMin, zMax) {
    var ang = Math.tan((angle * 0.5 * Math.PI) / 180); //angle*.5
    return [
      0.5 / ang,
      0,
      0,
      0,
      0,
      (0.5 * a) / ang,
      0,
      0,
      0,
      0,
      -(zMax + zMin) / (zMax - zMin),
      -1,
      0,
      0,
      -(2 * zMax * zMin) / (zMax - zMin),
      0,
    ];
  }

  var projectionMatrix = getProjection(
    40,
    canvas.width / canvas.height,
    1,
    100
  );
  var movMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

  var viewMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  //translating z
  viewMatrix[14] = viewMatrix[14] - 6;

  /*=======================rotation========================*/
  function rotateZ(m, angle) {
    var c = Math.cos(angle);
    var s = Math.sin(angle);
    var mv0 = m[0],
      mv4 = m[4],
      mv8 = m[8];

    m[0] = c * m[0] - s * m[1];
    m[4] = c * m[4] - s * m[5];
    m[8] = c * m[8] - s * m[9];
    m[1] = c * m[1] + s * mv0;
    m[5] = c * m[5] + s * mv4;
    m[9] = c * m[9] + s * mv8;
  }

  //  Drawing
  var timeOld = 0;
  function draw(time) {
    var dt = time - timeOld;
    rotateZ(movMatrix, dt * 0.002);
    timeOld = time;

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clearColor(0.1, .83, 0.5, 1);
    gl.clearDepth(1.0);
    gl.viewport(0.0, 0.0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.uniformMatrix4fv(Pmatrix, false, projectionMatrix);
    gl.uniformMatrix4fv(Vmatrix, false, viewMatrix);
    gl.uniformMatrix4fv(Mmatrix, false, movMatrix);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
    window.requestAnimationFrame(draw);
  }
  draw(0)
};
