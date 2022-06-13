//getting the canvas element from intex.html
var canvas = document.querySelector('canvas');

//setting the width and height equal to the size of the window.
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

//getting context of the canvas.
var ctx = canvas.getContext('2d');

animate();
var x_pos = 100;
var y_pos = 100;
var x_vel = 7;
var y_vel = 0;
var x_accel = 0;
var y_accel = .5;

//creating recursive animation loop function
function animate()
{
    requestAnimationFrame(animate);
    //clears previous drawing for next frame
    ctx.clearRect(0,0,innerWidth,innerHeight);

    //draws next frame
    if(x_pos > window.innerWidth || x_pos < 0)
    {
       x_vel = -x_vel;
    }

    if(y_pos > window.innerHeight)
    {
        y_vel = -y_vel;
    }
    
    draw(x_pos,y_pos);
    x_pos+=x_vel;
    y_pos+=y_vel;
    y_vel+=y_accel;
    x_vel+=x_accel;
    
  
}

//drawing a circle at given coordinates
function draw(x,y)
{
    ctx.beginPath();
    ctx.arc(x,y,30,0,2*Math.PI);
    ctx.strokeStyle = "red";
    ctx.stroke();
}