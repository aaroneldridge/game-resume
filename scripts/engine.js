class Engine {

    constructor (canvas,ctx)
    {

		//canvas and context
		this.ctx = ctx;
        this.canvas = canvas;

		this.width = window.innerWidth;
		this.height = window.innerHeight;

		//on top of start bar
		this.floorlevel = this.height-this.height*0.0399;
		this.taskbarheight = this.height*0.0399;
		this.iconheight = this.height*0.10235;
		this.iconwidth = this.width*0.0538;
		this.floorlevel_box = this.height-this.taskbarheight-this.iconheight;
  
		console.log('Width: ', window.innerWidth);
		console.log('Height: ', window.innerHeight);

		//list of all entities in the game
        this.entityList = [];
        this.player = new Player(this,canvas,ctx);
		//										                x_pos				y_pos							width		      height
		this.entityList.push(new Platform(		this,canvas,ctx,0,					this.floorlevel_box,	this.iconwidth,this.iconheight));
		this.entityList.push(new Platform(		this,canvas,ctx,this.width*0.1076,	this.height-this.height*0.3070,	this.width*0.0538,this.height*0.10235));
		this.entityList.push(new Platform(		this,canvas,ctx,0,					this.height-this.height*0.5629,	this.width*0.0538,this.height*0.10235));
		this.entityList.push(new Platform(		this,canvas,ctx,this.width*0.1076,	this.height-this.height*0.7676,	this.width*0.0538,this.height*0.10235));
		this.entityList.push(new Platform(		this,canvas,ctx,this.width-this.width*0.0538,	this.floorlevel_box-this.iconheight,	this.width*0.0538,this.height*0.10235));
		this.entityList.push(new Platform(		this,canvas,ctx,this.width-(3*this.width*0.0538),	this.height-(3*this.height*0.1535),	this.width*0.0538,this.height*0.10235));
		this.entityList.push(new Platform(		this,canvas,ctx,this.width-this.width*0.0538,	this.height-(4*this.height*0.1535)-this.height*0.10235,	this.width*0.0538,this.height*0.10235));
		this.entityList.push(new Platform(		this,canvas,ctx,this.width-(5*this.width*0.0538),	this.height-(5*this.height*0.1535)-this.height*0.10235,	this.width*0.0538,this.height*0.10235));
		this.entityList.push(new Platform(		this,canvas,ctx,this.width-(3*this.width*0.0538),	this.height-(5*this.height*0.1535)-this.height*0.10235,	this.width*0.0538,this.height*0.10235));
		this.entityList.push(new Platform(		this,canvas,ctx,this.width-(9*this.width*0.0538),	this.height-(4*this.height*0.1535)-this.height*0.10235,	this.width*0.0538,this.height*0.10235));

		this.entityList.push(new Interactable(	this,canvas,ctx,this.width-(3*this.width*0.0538),	this.height-(3*this.height*0.1535)-this.height*0.10235,	this.width*0.0538,this.height*0.10235,"modal_school_projects"));
		this.entityList.push(new Interactable(	this,canvas,ctx,this.width*0.1076,	this.height-this.height*0.8700,	this.width*0.0538,this.height*0.10235,"modal_personal_sites"));
		this.entityList.push(new Interactable(	this,canvas,ctx,this.width-(9*this.width*0.0538),	this.height-(4*this.height*0.1535)-(2*this.height*0.10235),	this.width*0.0538,this.height*0.10235,"modal_personal_projects"));






		//boolean values for input keys
        this.upkey = false;
        this.downkey = false;
        this.leftkey = false;
        this.rightkey = false;
        this.spacekey = false;

		//loading Images
		this.backgroundImage = new Image();
		this.backgroundImage.src = "./images/bliss_pixel2.png";
		this.backgroundImage.onload = function () {}

		this.taskbarImage = new Image();
		this.taskbarImage.src = "./images/taskbar.png";
		this.taskbarImage.onload = function () {}

		//loading icons
		this.edgeIcon = new Image();
		this.edgeIcon.src = "./images/Icons/edge_icon.png";
		this.edgeIcon.onload = function () {}

		this.folderIcon = new Image();
		this.folderIcon.src = "./images/Icons/folder_one.png";
		this.folderIcon.onload = function () {}

		this.folderIcon_two = new Image();
		this.folderIcon_two.src = "./images/Icons/folder_two.png";
		this.folderIcon_two.onload = function () {}

		this.folderIcon_three = new Image();
		this.folderIcon_three.src = "./images/Icons/folder_three.png";
		this.folderIcon_three.onload = function () {}

		this.mediaIcon = new Image();
		this.mediaIcon.src = "./images/Icons/media_icon.png";
		this.mediaIcon.onload = function () {}

		this.mediaIcon = new Image();
		this.mediaIcon.src = "./images/Icons/media_icon.png";
		this.mediaIcon.onload = function () {}

		this.noteIcon = new Image();
		this.noteIcon.src = "./images/Icons/note_icon.png";
		this.noteIcon.onload = function () {}

		this.paintIcon = new Image();
		this.paintIcon.src = "./images/Icons/paint_Icon.png";
		this.paintIcon.onload = function () {}

		this.recyclingIcon = new Image();
		this.recyclingIcon.src = "./images/Icons/recycling_bin.png";
		this.recyclingIcon.onload = function () {}

		this.VSIcon = new Image();
		this.VSIcon.src = "./images/Icons/VS_icon.png";
		this.VSIcon.onload = function () {}

		




    };

	init()
	{
		this.takeInput();
		var that = this;
		setInterval(function() {
			that.loop();
		},1);
	};

	//static images to draw for every frame
	drawBackground()
	{
		//windows hill background
		this.ctx.drawImage(this.backgroundImage,0,0,window.innerWidth,window.innerHeight);
		//windows taskbar background
		this.ctx.drawImage(this.taskbarImage,0,this.height-this.height*0.03991,window.innerWidth,this.taskbarheight);

		//icons go below vvv
		this.ctx.drawImage(this.noteIcon,0,this.floorlevel_box,this.iconwidth,this.iconheight);


		this.ctx.drawImage(this.VSIcon,this.width*0.1076,	this.height-this.height*0.3070,	this.width*0.0538,this.height*0.10235);
		this.ctx.drawImage(this.recyclingIcon,0,this.height-this.height*0.5629,	this.width*0.0538,this.height*0.10235);
		this.ctx.drawImage(this.folderIcon,this.width*0.1076,	this.height-this.height*0.7676,	this.width*0.0538,this.height*0.10235);
		this.ctx.drawImage(this.noteIcon,this.width-this.width*0.0538,	this.floorlevel_box-this.iconheight,	this.width*0.0538,this.height*0.10235);
		this.ctx.drawImage(this.folderIcon_two,this.width-(3*this.width*0.0538),	this.height-(3*this.height*0.1535),	this.width*0.0538,this.height*0.10235);
		this.ctx.drawImage(this.mediaIcon,this.width-this.width*0.0538,	this.height-(4*this.height*0.1535)-this.height*0.10235,	this.width*0.0538,this.height*0.10235);
		this.ctx.drawImage(this.noteIcon,this.width-(5*this.width*0.0538),	this.height-(5*this.height*0.1535)-this.height*0.10235,	this.width*0.0538,this.height*0.10235);
		this.ctx.drawImage(this.paintIcon,this.width-(3*this.width*0.0538),	this.height-(5*this.height*0.1535)-this.height*0.10235,	this.width*0.0538,this.height*0.10235);
		this.ctx.drawImage(this.folderIcon_three,this.width-(9*this.width*0.0538),	this.height-(4*this.height*0.1535)-this.height*0.10235,	this.width*0.0538,this.height*0.10235);

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