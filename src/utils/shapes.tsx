class Shape {
    protected x: number;
    protected y: number;
    protected color: string;

    constructor() {
        this.x = 0;
        this.y = 0;
        this.color = '#FFFFFF';
    }

    public render(context: CanvasRenderingContext2D) { }

    public setPosition(x: number, y: number) {
        this.x = x;
        this.y = y;
        return this;
    }

    public setColor(color: string) {
        this.color = color;
        return this;
    }
}

class Rectangle extends Shape {
    private width: number;
    private height: number;

    constructor(width: number, height: number) {
        super();

        this.width = width;
        this.height = height;
    }

    public render(context: CanvasRenderingContext2D) {
        super.render(context);
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fillStyle = this.color;
        context.fill();
    }
}

class ShapeRenderer {
    private shapes: Shape[] = [];

    public addShape(shape: Shape) {
        this.shapes.push(shape);
    }

    public distributeShapesRandomly(width: number, height: number) {
        this.shapes.forEach(shape => {
            const x = Math.random() * width;
            const y = Math.random() * height;
            shape.setPosition(x, y);
        });
    }

    public render(context: CanvasRenderingContext2D) {
        this.shapes.forEach(shape => shape.render(context));
    }
}

export { Shape, Rectangle, ShapeRenderer };