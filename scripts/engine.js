class Engine {

    constructor (canvas,ctx)
    {

        this.ctx = ctx;
        this.canvas = canvas;
        this.player = new Player(canvas,ctx);

        this.entityList = [];
        this.entityList[0] = this.player;

        this.upkey = false;
        this.downkey = false;
        this.leftkey = false;
        this.rightkey = false;
        this.spacekey = false;

    };

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

        this.entityList.forEach(element => element.update());
        this.entityList.forEach(element => element.draw());

    };

    takeInput () 
    {
        this.ctx.canvas.addEventListener("keydown", function (e) {
			console.log(e);
			switch (e.code) {
				case "ArrowLeft":
					that.left = true;
					break;
				case "ArrowRight":
					that.right = true;
					break;
				case "ArrowUp":
					that.up = true;
					break;
				case "ArrowDown":
					that.down = true;
					break;
				case "Space":
					that.space = true;
					break;
				case "KeyZ":
					that.z = true;
					break;
				case "KeyX":
					that.x = true;
					break;
			}
		}, false);
		
		this.ctx.canvas.addEventListener("keyup", function (e) {
			switch (e.code) {
				case "ArrowLeft":
					that.left = false;
					break;
				case "ArrowRight":
					that.right = false;
					break;
				case "ArrowUp":
					that.up = false;
					break;
				case "ArrowDown":
					that.down = false;
					break;
				case "Space":
					that.space = false;
					break;
				case "KeyZ":
					that.z = false;
					break;
				case "KeyX":
					that.x = false;
					break;
			}
		}, false);
    };
    
    
};