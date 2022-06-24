class BoundingBox{
//a bounding box for the collision box of different entities
    constructor (x_pos,y_pos,width,height) 
    {
        Object.assign(this,{x_pos,y_pos,width,height});

        //x coordinate of bounding box
        this.left = x_pos;
        //y coordinate of bounding box
        this.top = y_pos;
        //width of bounding box
        this.right = this.left+width;
        //height(downwards) of bounding box
        this.bottom = this.top+height;

    };

    collide (other)
    {
        //detect if 2 hitboxes are colliding
        if ((this.right > other.left) && (this.left < other.right) && (this.top < other.bottom) && (this.bottom > other.top))
        {
            return true; 
        } 
        return false;
    };

};