import { Circle } from './modules/circle.js';
import { Point } from './modules/point.js';

class App {
	constructor() {
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d');
		document.body.appendChild(this.canvas);

		this.totalCircle = 1;
		this.radius = 150;
		this.circles = [];
		for (let i = 0; i < this.totalCircle; i++) {
			const circle = new Circle(this.radius);
			this.circles.push(circle);
		}

		this.startPos = new Point();
		this.endPos = new Point();
		this.isDragging = false;

		this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

		window.addEventListener('resize', this.resize.bind(this), false);
		this.resize();

		requestAnimationFrame(this.animate.bind(this));

		document.addEventListener('pointerdown', this.onDown.bind(this), false);
		document.addEventListener('pointermove', this.onMove.bind(this), false);
		document.addEventListener('pointerup', this.onUp.bind(this), false);
	}

	resize() {
		this.stageWidth = document.body.clientWidth;
		this.stageHeight = document.body.clientHeight;

		this.canvas.width = this.stageWidth * this.pixelRatio;
		this.canvas.height = this.stageHeight * this.pixelRatio;
		this.ctx.scale(this.pixelRatio, this.pixelRatio);

		for (let i = 0; i < this.circles.length; i++) {
			const circle = this.circles[i];
			circle.resize(this.stageWidth, this.stageHeight);
		}
	}

	animate(t) {
		requestAnimationFrame(this.animate.bind(this));

		this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

		for (let i = 0; i < this.circles.length; i++) {
			const circle = this.circles[i];
			circle.animate(this.ctx);
		}

		if (this.isDragging) {
			this.ctx.fillStyle = `#ff89d8`;
			this.ctx.strokeStyle = `#ff89d8`;

			this.ctx.beginPath();
			this.ctx.arc(this.endPos.x, this.endPos.y, 8, 0, Math.PI * 2);
			this.ctx.fill();

			this.ctx.beginPath();
			this.ctx.arc(this.startPos.x, this.startPos.y, 8, 0, Math.PI * 2);
			this.ctx.fill();

			this.ctx.beginPath();
			this.ctx.moveTo(this.startPos.x, this.startPos.y);
			this.ctx.lineTo(this.endPos.x, this.endPos.y);
			this.ctx.stroke();
		}
	}

	split() {
		// get the center coord from line you dragged
		// from this.startPos to this.endPos
		// check if that point hits any circles
		const centerPos = Point.getCenterPos(
			this.startPos.x,
			this.startPos.y,
			this.endPos.x,
			this.endPos.y
		);

		for (let i = 0; i < this.circles.length; i++) {
			const circle = this.circles[i];
			if (centerPos.collide(circle)) {
				// if you drag through the circle
				// let it split and change color
				const index = this.circles.indexOf(circle);
				this.circles.splice(index, 1);

				// now add split circles with a half radius
				const newRadius = circle.radius / 2;
				const first = new Circle(
					newRadius,
					circle.x - newRadius,
					circle.y
				);
				const second = new Circle(
					newRadius,
					circle.x + newRadius,
					circle.y
				);
				this.circles.push(first, second);
				break;
			}
		}
	}

	onDown(e) {
		//get the first clicked position
		this.isDragging = true;
		this.startPos.x = e.clientX;
		this.startPos.y = e.clientY;
	}

	onMove(e) {
		this.endPos.x = e.clientX;
		this.endPos.y = e.clientY;
	}

	onUp(e) {
		this.isDragging = false;
		this.split();
	}
}

window.onload = () => {
	new App();
};
