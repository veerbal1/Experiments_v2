// Draw a Triangle

window.onload = () => {
  //   Step 1: Prepare the canvas and get the context
  let canvas = document.getElementById('canvas');
  let gl = canvas.getContext('webgl2');

  //   Step 2: Define the geometry and store it in a buffer object
  var vertices = [-0.5, 0.5, -0.5, -0.5, 0.0, -0.5,];
  //   Create a buffer object
  let vertexBuffer = gl.createBuffer();
  //   Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  //   Pass the vertex data to the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  //   Unbind the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  //   Step 3: Create and compile shader programs
  //   Vertex shader source code
  let vertCode = `
      attribute vec2 coordinates;
      void main(void) {
          gl_Position = vec4(coordinates, 0.0, 1.0);
          // gl_PointSize = 10.0;
          }`;
  // Create a vertex shader object
  let vertShader = gl.createShader(gl.VERTEX_SHADER);
  // Attach vertex shader source code
  gl.shaderSource(vertShader, vertCode);
  // Compile the vertex shader
  gl.compileShader(vertShader);

  //   Fragment shader source code
  let fragCode = `
          void main(void) {
              gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
          }`;
  // Create fragment shader object
  let fragShader = gl.createShader(gl.FRAGMENT_SHADER);
  // Attach fragment shader source code
  gl.shaderSource(fragShader, fragCode);
  // Compile the fragment shader
  gl.compileShader(fragShader);
  //   Create a shader program object to store combined shader program
  let shaderProgram = gl.createProgram();
  //   Attach a vertex shader
  gl.attachShader(shaderProgram, vertShader);
  //   Attach a fragment shader
  gl.attachShader(shaderProgram, fragShader);
  //   Link both programs
  gl.linkProgram(shaderProgram);
  // Use the combined shader program object
  gl.useProgram(shaderProgram);

  //   Step 4: Associate the shader programs to buffer objects
  //   Bind vertex buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  //   Get the attribute location
  let coord = gl.getAttribLocation(shaderProgram, 'coordinates');
  //   Point an attribute to the currently bound VBO
  gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);
  //   Enable the attribute
  gl.enableVertexAttribArray(coord);

  //   Step 5: Draw the geometry
  //   Clear the canvas
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
  //   Draw the geometry
  // setInterval(() => {
  //   gl.clearColor(Math.random(), Math.random(), Math.random(), 1.0);
  //   gl.clear(gl.COLOR_BUFFER_BIT);
  //   gl.drawArrays(gl.POINTS, 0, Math.floor(Math.random() * 6));
  // }, 1000);
  //   gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT,0);

  //   Step 6: Update the application state
  //   Nothing to do here
};
