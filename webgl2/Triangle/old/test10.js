// Draw cube
window.onload = () => {
  var canvas = document.getElementById('canvas');
  var gl = canvas.getContext('webgl2');

  var vertices = [
    -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1, -1, -1, 1, 1, -1, 1, 1, 1, 1,
    -1, 1, 1, -1, -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, 1, -1, -1, 1, 1, -1,
    1, 1, 1, 1, -1, 1, -1, -1, -1, -1, -1, 1, 1, -1, 1, 1, -1, -1, -1, 1, -1,
    -1, 1, 1, 1, 1, 1, 1, 1, -1,
  ];

  var colors = [
    5, 3, 7, 5, 3, 7, 5, 3, 7, 5, 3, 7, 1, 1, 3, 1, 1, 3, 1, 1, 3, 1, 1, 3, 0,
    0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1,
    0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
  ];

  var indices = [
    0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14,
    15, 16, 17, 18, 16, 18, 19, 20, 21, 22, 20, 22, 23,
  ];

  // Create and store data into vertex buffer
  var vertex_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  // Create and store data into color buffer
  var color_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  // Create and store data into index buffer
  var index_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(indices),
    gl.STATIC_DRAW
  );

  var vertCode =
    'attribute vec3 position;' +
    'uniform mat4 Pmatrix;' +
    'uniform mat4 Vmatrix;' +
    'uniform mat4 Mmatrix;' +
    'attribute vec3 color;' + //the color of the point
    'varying vec3 vColor;' +
    'void main(void) { ' + //pre-built function
    // 'gl_Position = Pmatrix*Vmatrix*Mmatrix*vec4(position, 1.);' +
    'gl_Position = vec4(position, 1.);' +
    'vColor = color;' +
    '}';

  var fragCode =
    'precision mediump float;' +
    'varying vec3 vColor;' +
    'void main(void) {' +
    'gl_FragColor = vec4(vColor, 1.);' +
    '}';

  var vertShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertShader, vertCode);
  gl.compileShader(vertShader);

  var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragShader, fragCode);
  gl.compileShader(fragShader);

  var shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertShader);
  gl.attachShader(shaderProgram, fragShader);
  gl.linkProgram(shaderProgram);

  var Pmatrix = gl.getUniformLocation(shaderProgram, 'Pmatrix');
  var Vmatrix = gl.getUniformLocation(shaderProgram, 'Vmatrix');
  var Mmatrix = gl.getUniformLocation(shaderProgram, 'Mmatrix');

  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
  var position = gl.getAttribLocation(shaderProgram, 'position');
  gl.vertexAttribPointer(position, 3, gl.FLOAT, false, 0, 0);

  // Position
  gl.enableVertexAttribArray(position);
  gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
  var color = gl.getAttribLocation(shaderProgram, 'color');
  gl.vertexAttribPointer(color, 3, gl.FLOAT, false, 0, 0);

  // Color
  gl.enableVertexAttribArray(color);
  gl.useProgram(shaderProgram);

  function get_projection(angle, a, zMin, zMax) {
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
      (-2 * zMax * zMin) / (zMax - zMin),
      0,
    ];
  }

  var proj_matrix = get_projection(40, canvas.width / canvas.height, 1, 100);

  var mov_matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  var view_matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  gl.clearColor(0.5, 0.5, 0.5, 0.9);
  gl.clearDepth(1.0);

  gl.viewport(0.0, 0.0, canvas.width, canvas.height);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
  gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
};
