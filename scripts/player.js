//getting the canvas element from intex.html
var canvas = document.querySelector('canvas');

//getting context of the canvas.
var ctx = canvas.getContext('2d');

//get keypress info, add listeners to the page to look for presses
document.addEventListener('keydown', keyPressed);
document.addEventListener('keyup', keyReleased);

//keypress variables
var upkey = false;
var downkey = false;
var leftkey = false;
var rightkey = false;
var spacekey = false;

//detects if user is on ground
var grounded = false;

function keyPressed (evt)
{
    console.log(evt.keyCode + 'pressed');
    console.log(grounded);
    switch (evt.keyCode) {
        //up key
        case 38:
            upkey = true;
            break;
        //right key
        case 39: 
            rightkey = true;
            break;
        //left key
        case 37: 
            leftkey = true;
            break;
        //space bar
        case 32:
            spacekey = true;
            break;
    }

}

function keyReleased (evt)
{
    console.log(evt.keyCode + 'released');
    switch (evt.keyCode) {
        //up key
        case 38:
            upkey = false;
            break;
        //right key
        case 39: 
            rightkey = false;
            break;
        //left key
        case 37: 
            leftkey = false;
            break;
        //space bar
        case 32:
            spacekey = false;
            break;
    }

}

//setting base values
var x_pos = 100;
var y_pos = 100;
var x_vel = 0;
var y_vel = 0;
var x_accel = 0;
var y_accel = .2;

animate();

//creating recursive animation loop function
function animate()
{
    var groundlevel = window.innerHeight-30;
    requestAnimationFrame(animate);
    //clears previous drawing for next frame
    ctx.clearRect(0,0,innerWidth,innerHeight);

    //dont let user move beyond right bound
    if(x_pos > window.innerWidth-30)
    {
       x_pos = window.innerWidth-30;
    }

    //dont let user move beyond left bound
    if(x_pos < 30)
    {
       x_pos = 30;
    }

    //dont let ball fall on ground
    if(y_pos > groundlevel)
    {
        console.log('groundlevel');
        y_pos = groundlevel;
        grounded = true;
    } 

    //if ball is above ground level, it is not grounded
    if(y_pos < groundlevel)
    {
        grounded = false;
    }

    //handle key inputs
    if(leftkey) {
        x_vel = -5;
    }

    if(rightkey)
    {
        x_vel = 5;
    }

    if(leftkey && rightkey)
    {
        x_vel = 0;
    }

    if(spacekey && grounded)
    {
        y_vel = -10;
    }

    if(!leftkey && !rightkey)
    {
        x_vel = 0;
    }

    //draw new position
    draw(x_pos,y_pos);

    //modify position for next frame
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

