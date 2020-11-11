/**
 * LinkedList that represents the chain of colors
 * in regards to what colors make up the base color
 */
export class ColorList {
	constructor(base = null) {
		this.base = base;
	}
}

export class ColorNode {
	constructor(value) {
		this.value = value;
		this.next = null; // this will be array of two color nodes
	}
}
