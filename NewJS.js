

var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'uniform mat4 u_ModelMatrix;\n' +
  'attribute vec4 a_Color;\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_Position = u_ModelMatrix * a_Position;\n' +
  '  v_Color = a_Color;\n' +
  '}\n';


var FSHADER_SOURCE =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif GL_ES\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_FragColor = v_Color;\n' +
  '}\n';


var ANGLE_STEP = 0.0;


function main() {
  
 
  var canvas = document.getElementById('webgl');

  
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  
  var n = initVertexBuffers(gl);
  if (n < 0) {
    console.log('Failed to set the positions of the vertices');
    return;
  }
  
  gl.clear(gl.COLOR_BUFFER_BIT);
  
  var u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  if (!u_ModelMatrix) { 
    console.log('Failed to get the storage location of u_ModelMatrix');
    alert("got here");
    return;
  }

  
  var modelMatrix = new Matrix4();

  var tick = function() {
    currentAngle = animate(Angle);  
    draw(gl, n, 0, 0, currentAngle, modelMatrix, u_ModelMatrix);  
    requestAnimationFrame(tick, canvas); 
  };

  function reset(){
  draw(gl, n, 0, 0, 0, modelMatrix, u_ModelMatrix);
}
tick(); 
}

function initVertexBuffers(gl) {
 var verticesColors = new Float32Array([
    // Vertex coordinates and color
     0.0,    0.9,   1.0,  0.0,  0.0, 
     0.05,  -0.05,  1.0,  1.0,  1.0, 
    -0.05,  -0.05,  1.0,  1.0,  1.0, 
  ]);
  var n = 3;

  // Create a buffer object
  var vertexColorBuffer = gl.createBuffer();  
  if (!vertexColorBuffer) {
    console.log('Failed to create the buffer object');
    return false;
  }

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);

  var FSIZE = verticesColors.BYTES_PER_ELEMENT;
  //Get the storage location of a_Position, assign and enable buffer
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return -1;
  }
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 5, 0);
  gl.enableVertexAttribArray(a_Position);  // Enable the assignment of the buffer object

  // Get the storage location of a_Position, assign buffer and enable
  var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
  if(a_Color < 0) {
    console.log('Failed to get the storage location of a_Color');
    return -1;
  }
  gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 5, FSIZE * 2);
  gl.enableVertexAttribArray(a_Color);  // Enable the assignment of the buffer object

  // Unbind the buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  return n;

}

function draw(gl, n, xCos, ySin, currentAngle, modelMatrix, u_ModelMatrix) {
  
   modelMatrix.setTranslate(xCos,ySin, 0);
   
   modelMatrix.rotate(currentAngle, 0, 0, 1);
   
var timer = 0.10;
   
  Angle-=rotateAngle;
      if(Angle===360) {
        Angle=Angle%360;
      } 

    timer += 0.01;    
 translator(Angle,0.1);
  
 //console.log(Angle);
  
  gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);

  
  gl.clearColor(0.0, 0.0, 0.0, 0.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  
  gl.drawArrays(gl.TRIANGLES, 0, n);
}

function translator(degrees, rate, up) {
  
      y= (Math.sin(Math.PI * (degrees/180))*rate);
      x= (Math.cos(Math.PI * (degrees/180))*rate);      
}



  var Angle=0.0;
  var rotateAngle= 0.0;
  var t=0.0;
  var y;
  var x;
  var timeVal= 0.00;
  var click=1;
  var increase = false;
  var timeBox = document.getElementById("timer");
  var myTimer;

var timeLast = Date.now();
function animate(angle) {
  var now = Date.now();
  var elapsed = now - timeLast;
  timeLast = now;
 
  var newAngle = angle + (ANGLE_STEP * elapsed) / 1000.0;
  return newAngle %= 360;
}

function myFunction() {
    myTimer= setInterval(function(){ 
        timeVal+=0.01;
        timeBox.innerHTML = timeVal.toFixed(2);
        }, 10);
      };

function myStopFunction() {
    clearTimeout(myTimer);
    console.log("this should be cleared");
    };

timeBox.innerHTML= 0.00;

function timer() {
  console.log("timer worked");
  click++;
  if(click%2==0){
    myFunction();
     
    console.log(timeVal);
  rotateAngle = 0.1; 
  } else {
  myStopFunction();
  timeVal=timeVal;
  rotateAngle=0.0;
  console.log(increase);
  }  
}

function reset() {
  location.reload();
};





