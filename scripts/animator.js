class Animator {
	constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration, reverse) {
		Object.assign(this, {spritesheet, xStart, yStart, width, height, frameCount, frameDuration, reverse});
	
		this.elapsedTime = 0;
		this.totalTime = frameCount * frameDuration;
	};
	
	drawFrame(ctx,frame, x, y, scale) {
	
		var width = 70;

        //draw the correct image of the sprite sheet at the x and y
		ctx.drawImage(this.spritesheet, 
			this.xStart+(frame*width),this.yStart,
			this.width, this.height,
			x, y,
			this.width * scale, this.height * scale);
	};
	
	currentFrame() {
		return Math.floor(this.elapsedTime / this.frameDuration);
	};
	
};