export class Point {
	constructor(x, y) {
		this.x = x || 0;
		this.y = y || 0;
	}

	collide(circle) {
		const dist_points =
			(this.x - circle.x) * (this.x - circle.x) +
			(this.y - circle.y) * (this.y - circle.y);
		const radius = circle.radius * circle.radius;

		if (dist_points < radius) {
			return true;
		}
		return false;
	}

	static getCenterPos(x1, y1, x2, y2) {
		const lowerXValue = x1 > x2 ? x2 : x1;
		const lowerYValue = y1 > y2 ? y2 : y1;
		const x = lowerXValue + Math.abs((x1 - x2) / 2);
		const y = lowerYValue + Math.abs((y1 - y2) / 2);
		return new Point(x, y);
	}
}
