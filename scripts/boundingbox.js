class boundingbox {
//a bounding box for the hitbox of different entities

    constructor (x,y,width,height) 
    {
        Object.assign(this, { x, y, width, height });
        //x coordinate of bounding box
        this.x = x;
        //y coordinate of bounding box
        this.y = y;
        //width of bounding box
        this.width = width;
        //height(downwards) of bounding box
        this.height = height;
    }

    collide (other)
    {
        //detect if 2 hitboxes are colliding
        if (this.right > other.left && this.left < other.right && this.top < other.bottom && this.bottom > other.top)
        {
            return true; 
        } 
        return false;
    }

}