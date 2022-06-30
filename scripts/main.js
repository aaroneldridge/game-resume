//getting the canvas element from intex.html
var canvas = document.querySelector('canvas');

//getting context of the canvas.
var ctx = canvas.getContext('2d');

//give context to the engine to start running
var engine = new Engine(canvas,ctx);

//begin animation
engine.init();

//engine.animate();

