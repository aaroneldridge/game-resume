class Engine {

    constructor (canvas,ctx)
    {
        this.ctx = ctx;
        this.canvas = canvas;
        this.player = new Player(canvas,ctx);

        this.entityList = [];
        this.entityList[0] = this.player;

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
 
};