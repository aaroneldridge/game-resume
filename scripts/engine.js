class Engine {

    constructor (canvas,ctx)
    {

		//canvas and context
		this.ctx = ctx;
        this.canvas = canvas;

		//list of all entities in the game
        this.entityList = [];
        this.player = new Player(this,canvas,ctx);
		this.entityList[0] = new Platform(this,canvas,ctx,0,window.innerHeight-250,100,200);
		this.entityList[1] = new Interactable(this,canvas,ctx,0,window.innerHeight-400,100,150,"personalSites");

		//boolean values for input keys
        this.upkey = false;
        this.downkey = false;
        this.leftkey = false;
        this.rightkey = false;
        this.spacekey = false;

		//loading Images
		this.backgroundImage = new Image();
		this.backgroundImage.src = "images/bliss_pixel2.png";
		this.backgroundImage.onload = function () {}
		this.taskbarImage = new Image();
		this.taskbarImage.src = "images/windows_taskbar.jpg"
		this.taskbarImage.onload = function () {}


    };

	init()
	{
		this.takeInput();
		this.loop();
	};

	//static images to draw for every frame
	drawBackground()
	{
		//windows hill background
		this.ctx.drawImage(this.backgroundImage,0,0,window.innerWidth,window.innerHeight);
		//windows taskbar background
		this.ctx.drawImage(this.taskbarImage,0,window.innerHeight-50,window.innerWidth,50);

		//icons go below vvv
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

		this.drawBackground();

		//update and draw all entities
        this.entityList.forEach(element => element.update());
        this.entityList.forEach(element => element.draw());

		//update and draw player
		this.player.update();
		this.player.draw();
	

    };

    takeInput () 
    {
		
		//check input for each key
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
		
		//check release for each key
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