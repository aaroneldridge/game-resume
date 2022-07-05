class Player {

    constructor(game,canvas,ctx)
     {

        //context and and engine reference
        this.cavnas = canvas;
        this.ctx = ctx;
        this.game = game;

        //object details (radius)
        this.width = window.innerHeight*0.03070;
        this.height = 30;

        //setting base values
        this.x_pos = (window.innerWidth/2);
        this.y_pos = 1000;
        this.x_vel = 0;
        this.y_vel = 0;
        this.x_accel = 0;
        this.y_accel = window.innerHeight*0.0001023541;
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


    };

    //updating the player for the next frame
    update ()
    {

         //checking for collisions
         var that = this;
         this.game.entityList.forEach(element => {
             if(element.boundingBox && that.boundingBox.collide(element.boundingBox))
             {
                 //check if element is a platform
                 if(element instanceof Platform)
                 { 
                    var ontop = false;
                    var below = false;
                    
                    //top of platform interaction
                     if(that.lastBoundingBox.bottom <= element.boundingBox.top)
                     { 
                         that.grounded = true;
                         that.y_pos = element.boundingBox.top-that.width;
                         ontop = true;
                     } else {
                        that.grounded = false;
                     }

                      //hit head on bottom of platform
                      if(that.lastBoundingBox.top > element.boundingBox.bottom)
                      {
                          that.y_vel = 0;
                          that.y_pos = element.boundingBox.bottom+that.width;
                          below = true;
                      }

                      console.log(below);

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
                
                         if(that.boundingBox.left < element.boundingBox.right && that.boundingBox.bottom < element.boundingBox.top)
                         {
                         } else
                         {
                            that.x_pos = element.boundingBox.right+that.width;
                         }
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
             } else {
                
             }
 
         });


        //update bounding box again after handling collisions
        this.setBoundingBox();

        //move character left
        if(this.game.leftkey)
        {
            this.x_vel = -3;
        }

        //move character right
        if(this.game.rightkey)
        {
            this.x_vel = 3;
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
            this.y_accel = 0;
        } else {
            this.y_accel = window.innerHeight*0.0001023541*.5;
        }

      
        //update all position and velocity values
        this.x_pos += this.x_vel;
        this.y_pos += this.y_vel;
        this.x_vel += this.x_accel; 
        this.y_vel += this.y_accel;

        //constant floorheight to reference (50 accounts for start-bar)
        var floorheight = window.innerHeight-innerHeight*0.03070-window.innerHeight*0.051177;

        //keep character above ground
        if(this.y_pos > floorheight)
        {
            this.y_pos = floorheight;
            this.grounded = true;
        }

        //keep inside to the right
        if(this.x_pos < (this.width))
        {
            this.x_pos = this.width;
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
    
    

    };

    //drawing the player using the given coordinates
    draw()
    {
        this.ctx.strokeStyle = "blue";
        this.ctx.beginPath();
        this.ctx.arc(this.x_pos,this.y_pos,window.innerHeight*0.03070,0,2*Math.PI);
        this.ctx.stroke();
    };

    //set bounding boxes
    setBoundingBox()
    {
        this.lastBoundingBox = this.boundingBox;
        this.boundingBox = new BoundingBox(this.x_pos-innerHeight*0.03070,this.y_pos-innerHeight*0.03070,innerHeight*0.03070*2,innerHeight*0.03070*2);
        
        //draw debug bounding box
        if(false)
        {
            this.ctx.strokeStyle = "red";
            this.ctx.beginPath();
            this.ctx.rect(this.x_pos-this.width,this.y_pos-this.width,this.width*2,this.height*2);
            this.ctx.stroke();
        }
    };
}

