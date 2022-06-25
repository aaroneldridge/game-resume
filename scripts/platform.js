class Platform
{
    //a rectangular platform
    constructor(game,canvas,ctx,x,y,width,height)
    {
        //context and and engine reference
        this.cavnas = canvas;
        this.ctx = ctx;
        this.game = game;

        //object details
        this.width = width;
        this.height = height;
        this.x_pos = x;
        this.y_pos = y;
        

        //bounding box for hitbox
        this.boundingBox = null;
        this.lastBoundingBox = null;
        this.setBoundingBox();

    };

    update()
    {
    this.setBoundingBox();
    };

    setBoundingBox()
    {
        this.lastBoundingBox = this.boundingBox;
        //console.log(this.x_pos);
        this.boundingBox = new BoundingBox(this.x_pos,this.y_pos,this.width,this.height);

        //draw debug bounding box
        if(true)
        {
            this.ctx.strokeStyle = "red";
            this.ctx.beginPath();
            this.ctx.rect(this.x_pos,this.y_pos,this.width,this.height);
            this.ctx.stroke();
        }
    };

    
    draw()
    {
        this.ctx.strokeStyle = "black";
        this.ctx.beginPath();
        this.ctx.rect(this.x_pos,this.y_pos,this.width,this.height);
        this.ctx.fill();
        this.ctx.stroke();
    };











}