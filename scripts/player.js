
class Player {

    constructor(canvas,ctx)
     {
        this.cavnas = canvas;
        this.ctx = ctx;

        //setting base values
        this.x_pos = 100;
        this.y_pos = 100;
        this.x_vel = 0;
        this.y_vel = 0;
        this.x_accel = 0;
        this.y_accel = .2;
    };

    //updating the player for the next frame
    update ()
    {
        this.x_pos++;
    };

    //drawing the player using the given coordinates
    draw()
    {
        this.ctx.beginPath();
        this.ctx.arc(this.x_pos,this.y_pos,30,0,2*Math.PI);
        this.ctx.strokeStyle = "black";
        this.ctx.stroke();
    };
}

