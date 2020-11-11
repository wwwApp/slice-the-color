export class Circle {
	constructor(radius, x, y) {
		this.radius = radius;
		this.x = x;
		this.y = y;
	}

	resize(stageWidth, stageHeight) {
		this.x = stageWidth / 2;
		this.y = stageHeight / 2;
	}

	animate(ctx) {
		ctx.beginPath();
		ctx.fillStyle = `#FD4F14`;
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		ctx.fill();
	}
}
