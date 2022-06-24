class Platform
{
    //a rectangular platform
    constructor(game,canvas,ctx,width,height)
     {
        //context and and engine reference
        this.cavnas = canvas;
        this.ctx = ctx;
        this.game = game;

        //object details
        this.width = 30;
        this.height = 30;

        //setting base values
        this.x_pos = 100;
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













}