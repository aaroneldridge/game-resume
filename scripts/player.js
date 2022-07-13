class Player {

    constructor(game,canvas,ctx)
     {

        //context and and engine reference
        this.cavnas = canvas;
        this.ctx = ctx;
        this.game = game;

        //object details (radius)
        this.width = window.innerWidth*0.0349;
        this.height = window.innerHeight*0.087;

        //setting base values
        this.x_pos = (window.innerWidth/2);
        this.y_pos = 800;
        this.x_vel = 0;
        this.y_vel = 0;
        this.x_accel = 0;
        this.y_accel = 2;
        this.grounded = false;

        //bounding box for hitbox
        this.boundingBox = null;
        this.lastBoundingBox = null;
        this.setBoundingBox();

        //check relationship with interactable objects
        this.insideInteractable = false;
        this.currentInteractable = null;
        this.canInteract = true;
        this.formOpen = false;

        //animator to draw character model
        this.spritesheet = new Image();
		this.spritesheet.src = "images/test_spritesheet.png";
        //spritesheet, xStart, yStart, width, height, frameCount, reverse

        //right facing
        this.animateright = new Animator(this.spritesheet,0,95,65,85,4,false);
        //left facing
        this.animateleft = new Animator(this.spritesheet,0,192,65,85,4,false);
        //left still
        this.animaterightstil = new Animator(this.spritesheet,0,95,65,85,4,false);
        //right still
        this.animateleftstill = new Animator(this.spritesheet,0,95,65,85,4,false);

        //which frame of drawing loop
        this.frameloop = 0;
        this.counter = 0;

        //walking direction
        this.walkingleft = false;
        this.walkingright = false;
        this.still = false;
        this.jumping = false;


    };

    //updating the player for the next frame
    update ()
    {

        //updating frame loop counter
        this.counter++;
        if(this.counter == 50)
        {
            this.frameloop++;
            this.counter = 0;
        }

        if(this.frameloop == 4)
        {
            this.frameloop = 0;
        }


         //checking for collisions
         var that = this;
         var wasgrounded = false;
         this.game.entityList.forEach(element => {
             if(element.boundingBox && that.boundingBox.collide(element.boundingBox))
             {
                console.log('collision');
                 //check if element is a platform
                 if(element instanceof Platform)
                 { 
                    var ontop = false;
                    var below = false;
                    
                    //top of platform interaction
                     if(that.lastBoundingBox.bottom <= element.boundingBox.top)
                     { 
                         that.grounded = true;
                         that.y_pos = element.boundingBox.top-that.height;
                         ontop = true;
                         this.y_vel = 0;
                         wasgrounded = true;
                     } 

                      //hit head on bottom of platform
                      if(that.lastBoundingBox.top > element.boundingBox.bottom)
                      {
                          that.y_vel = 0;
                          that.y_pos = element.boundingBox.bottom;
                          below = true;
                      }

                     //left side of platform interaction
                     if(that.boundingBox.left < element.boundingBox.left
                         && !ontop && !below)
                     {
                         that.x_pos = element.boundingBox.left-that.width;
                     }
 
                     //right side of platform interaction
                     if(that.boundingBox.right > element.boundingBox.right
                      && !ontop && !below)
                     {
                         that.x_pos = element.boundingBox.right;
                     }
                    
                 }
 
                 //check if element is ANY interactable
                 if (element instanceof Interactable)
                 {
                     this.insideInteractable = true;
                     this.currentInteractable = element;
                 } else {
                    this.insideInteractable = false;
                 }
             } else if (!wasgrounded) {
                that.grounded = false;
             }

             if(this.y_pos+this.height == this.game.floorlevel)
             {
                that.grounded = true;
             }
 
         });


        //update bounding box again after handling collisions
        this.setBoundingBox();

        //move character left
        if(this.game.leftkey)
        {
            this.x_vel = window.innerWidth*-0.001614;
        }

        //move character right
        if(this.game.rightkey)
        {
            this.x_vel = window.innerWidth*0.001614;
        }

        //jump function
        if(this.game.spacekey && this.grounded)
        {
            this.y_vel = -5;
            this.grounded = false;
        }

        //no input option, sit still
        if((!this.game.rightkey && !this.game.leftkey) ||
         (this.game.rightkey && this.game.leftkey))
        {
            this.x_vel = 0;
        }

        //stop accumulating negative velocity while on ground
        if(this.grounded)
        {
            this.y_vel = 0;
        } else {
            //create higher gravity when window is smaller
            this.y_accel = .045*(977/window.innerHeight);
        }

      
        //update all position and velocity values
        this.x_pos += this.x_vel;
        this.y_pos += this.y_vel;
        this.x_vel += this.x_accel; 
        this.y_vel += this.y_accel;

        //constant floorheight to reference (50 accounts for start-bar)
        var floorheight = this.game.floorlevel-this.height;
        

        //keep character above ground
        if(this.y_pos > floorheight)
        {
            this.y_pos = floorheight;
            this.grounded = true;
        }

        //keep inside to the right
        if(this.x_pos < 0)
        {
            this.x_pos = 0;
        }

        //keep inside to the left
        if(this.x_pos > window.innerWidth-this.width)
        {
            this.x_pos = window.innerWidth - this.width;
        }

        

        //interact with object
        if(this.game.upkey && this.insideInteractable)
        {
            console.log('interacting with interactable');
            document.getElementById(this.currentInteractable.modal_ID).style.display = "block";
            console.log(document.getElementById(this.currentInteractable.modal_ID))
            this.formOpen = true;
        }

        //close interacted object
        if(this.game.downkey && this.formOpen)
        {
            document.getElementById(this.currentInteractable.modal_ID).style.display = "none";
        }

        //update bounding box before collision
        this.setBoundingBox();
    
        //determine walking direction or jumping
        if(this.x_vel < 0)
        {
            this.walkingleft = true;
            this.walkingright = false;
            this.still = false;    
        } else
        if(this.x_vel > 0)
        {
            this.walkingleft = false;
            this.walkingright = true;
            this.still = false;
        } else
        if(this.x_vel == 0) {
            this.still = true;
        }

        if(this.y_vel != 0)
        {
            this.jumping = true;
        }

        
    

    };

    //drawing the player using the given coordinates
    draw()
    {


        if(this.still)
        {
            if(this.walkingright)
            {
                this.animateright.drawFrame(this.ctx,1,this.x_pos,this.y_pos,1);
            } else {
                this.animateleft.drawFrame(this.ctx,0,this.x_pos,this.y_pos,1);
            }
        } else
        if(this.walkingright)
        {
            this.animateright.drawFrame(this.ctx,this.frameloop,this.x_pos,this.y_pos,1);
        } else
        if(this.walkingleft)
        {
            this.animateleft.drawFrame(this.ctx,this.frameloop,this.x_pos,this.y_pos,1);
        }
        

    };

    //set bounding boxes
    setBoundingBox()
    {
        this.lastBoundingBox = this.boundingBox;
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
}

