class Engine {

    constructor (canvas,ctx)
    {

        this.ctx = ctx;
        this.canvas = canvas;;

        this.entityList = [];
        this.player = new Player(this,canvas,ctx);
		this.entityList[0] = new Platform(this,canvas,ctx,50,1000,40,40);

        this.upkey = false;
        this.downkey = false;
        this.leftkey = false;
        this.rightkey = false;
        this.spacekey = false;

    };

	init()
	{
		this.takeInput();
	}

    animate ()
    {
        //starting frame loop
        const gameLoop = () => 
        {
            this.loop();
            requestAnimationFrame(gameLoop,canvas);
            //clears previous drawing for next frame
        };
        gameLoop();
    };

    loop ()
    {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

		//update and draw all entities
        this.entityList.forEach(element => element.update());
        this.entityList.forEach(element => element.draw());

		//update and draw player
		this.player.update();
		this.player.draw();
		
    };

    takeInput () 
    {
		var that = this;
		document.addEventListener("keydown", function (e) {
			switch (e.code) {
				case "ArrowLeft":
					that.leftkey = true;
					break;
				case "ArrowRight":
					that.rightkey = true;
					break;
				case "ArrowUp":
					that.upkey = true;
					break;
				case "ArrowDown":
					that.downkey = true;
					break;
				case "Space":
					that.spacekey = true;
					break;
			}
		}, false);
		
		document.addEventListener("keyup", function (e) {
			switch (e.code) {
				case "ArrowLeft":
					that.leftkey = false;
					break;
				case "ArrowRight":
					that.rightkey = false;
					break;
				case "ArrowUp":
					that.upkey = false;
					break;
				case "ArrowDown":
					that.downkey = false;
					break;
				case "Space":
					that.spacekey = false;
					break;
			}
		}, false);
	 };
    
};