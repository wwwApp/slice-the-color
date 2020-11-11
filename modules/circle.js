export class Circle {
	constructor(radius, x, y, speed, colorNode, bounceReverse) {
		this.radius = radius;
		this.x = x;
		this.y = y;
		this.vx = speed;
		this.vy = speed;
		this.speed = speed;
		this.colorNode = colorNode;

		this.bounceReverse = bounceReverse || false;
	}

	animate(ctx, stageWidth, stageHeight) {
		if (this.bounceReverse) {
			this.vx *= -1;
			this.bounceReverse = false;
		}

		this.x += this.vx;
		this.y += this.vy;

		// bounce window
		this.bounceWindow(stageWidth, stageHeight);

		// bounce circles

		ctx.beginPath();
		ctx.fillStyle = this.colorNode.value;
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		ctx.fill();
	}

	bounceWindow(stageWidth, stageHeight) {
		const minX = this.radius;
		const maxX = stageWidth - this.radius;
		const minY = this.radius;
		const maxY = stageHeight - this.radius;

		if (this.x <= minX || this.x >= maxX) {
			// when the ball hit either left or right of the window
			this.vx *= -1;
			this.x += this.vx;
		} else if (this.y <= minY || this.y >= maxY) {
			// when the ball hit either top or bottom of the window
			this.vy *= -1;
			this.y += this.vy;
		}
	}

	bounceCircle() {}
}
