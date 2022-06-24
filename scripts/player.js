
class Player {

    constructor(game,canvas,ctx)
     {

        //context and and engine reference
        this.cavnas = canvas;
        this.ctx = ctx;
        this.game = game;

        //object details
        this.width = 30;
        this.height = 30;

        //setting base values
        this.x_pos = (window.innerWidth/2);
        this.y_pos = 100;
        this.x_vel = 0;
        this.y_vel = 0;
        this.x_accel = 0;
        this.y_accel = .2;
        this.grounded = false;

        //bounding box for hitbox
        this.boundingBox = null;
        this.lastBoundingBox = null;
        this.setBoundingBox();
    };

    //updating the player for the next frame
    update ()
    {
        //move character left
        if(this.game.leftkey)
        {
            this.x_vel = -5;
        }
        //move character right
        if(this.game.rightkey)
        {
            this.x_vel = 5;
        }
        //jump function
        if(this.game.spacekey && this.grounded)
        {
            this.y_vel = -10;
            this.grounded = false;
        }
        //no input option, sit still
        if((!this.game.rightkey && !this.game.leftkey) || (this.game.rightkey && this.game.leftkey))
        {
            this.x_vel = 0;
        }
        //update all position and velocity values
        this.x_pos += this.x_vel;
        this.y_pos += this.y_vel;
        this.x_vel += this.x_accel; 
        this.y_vel += this.y_accel;
        //keep character above ground

        if(this.y_pos > window.innerHeight-this.height)
        {
            this.y_pos = window.innerHeight-this.height;
            this.grounded = true;
        }
        //keep inside to the right
        if(this.x_pos < (this.width))
        {
            this.x_pos = this.width;
        }
        //keep inside to the left
        if(this.x_pos > window.innerWidth-this.boundingBox.width)
        {
            this.x_pos = window.innerWidth - this.boundingBox.width;
        }

        this.setBoundingBox();

    };

    //drawing the player using the given coordinates
    draw()
    {
        this.ctx.beginPath();
        this.ctx.arc(this.x_pos,this.y_pos,this.width,0,2*Math.PI);
        this.ctx.strokeStyle = "black";
        this.ctx.stroke();
    };

    //set bounding boxes
    setBoundingBox()
    {
        this.lastBoundingBox = this.boundingBox;
        this.boundingBox = new BoundingBox(this.x_pos,this.y_pos,this.width,this.height);
    };
}

