// Apply Translation

window.onload = () => {
  var canvas = document.getElementById('canvas');
  gl = canvas.getContext('webgl2');

  var vertices = [-0.5, 0.5, 0.0, -0.5, -0.5, 0.0, 0.5, -0.5, 0.0];

  // Create vertex buffer object
  var vertex_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  // Pass the buffer data
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  // Vertex shader code
  var vertCode = `
  attribute vec4 coordinates;
  uniform vec4 translation;
  void main(){
    gl_Position = coordinates + translation;
  }
  `;

  // Create vertex shader object
  var vertShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertShader, vertCode);
  gl.compileShader(vertShader);
  // check for error
  if (!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS)) {
    console.log(
      'ERROR compiling vertex shader!',
      gl.getShaderInfoLog(vertShader)
    );
    return;
  }

  var fragCode = `
  void main(void){
    gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
  }`;

  // Create fragment shader object
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

  // Create shader program object
  var shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertShader);
  gl.attachShader(shaderProgram, fragShader);
  gl.linkProgram(shaderProgram);
  // Check for error
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.log('ERROR linking program!', gl.getProgramInfoLog(shaderProgram));
    return;
  }

  gl.useProgram(shaderProgram);

  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
  var coord = gl.getAttribLocation(shaderProgram, 'coordinates');
  gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(coord);

  // Uniform variables
  var TX = 0.5;
  var TY = 0.5;
  var TZ = 0.0;
  var translation = gl.getUniformLocation(shaderProgram, 'translation');
  gl.uniform4f(translation, TX, TY, TZ, 0.0);

  gl.clearColor(0.5, 0.5, 0.5, 0.9);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
};
