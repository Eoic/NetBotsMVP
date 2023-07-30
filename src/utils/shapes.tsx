class Shape {
    protected _x: number;
    protected _y: number;
    protected _width: number;
    protected _height: number;
    protected _color: string;

    get x() { return this._x; }
    get y() { return this._y; }
    get width() { return this._width }
    get height() { return this._height; }
    get color() { return this._color; }

    constructor(width: number, height: number) {
        this._x = 0;
        this._y = 0;
        this._width = width;
        this._height = height;
        this._color = '#FFFFFF';
    }

    public setPosition(x: number, y: number) {
        this._x = x;
        this._y = y;
        return this;
    }

    public setColor(color: string) {
        this._color = color;
        return this;
    }

    public render(context: CanvasRenderingContext2D) {}
}

class Rectangle extends Shape {
    public render(context: CanvasRenderingContext2D) {
        context.beginPath();

        context.rect(
            context.canvas.width * this.x - this.width / 2,
            context.canvas.height * this.y - this.height / 2,
            this.width,
            this.height,
        );

        context.fillStyle = this.color;
        context.fill();
    }
}

class Circle extends Shape {
    private _radius: number;

    get radius() { return this._radius; }

    constructor(radius: number) {
        super(radius * 2, radius * 2);
        this._radius = radius;
    }

    public render(context: CanvasRenderingContext2D) {
        context.beginPath();
        const centerX = context.canvas.width * this.x;
        const centerY = context.canvas.height * this.y;            
        context.arc(centerX, centerY, this.radius, 0, 2 * Math.PI);
        context.fillStyle = this.color;
        context.fill();
    }
}

class Triangle extends Shape {
    public render(context: CanvasRenderingContext2D) {
        const halfWidth = this.width / 2;
        const halfHeight = this.height / 2;

        context.beginPath();
        context.moveTo(context.canvas.width * this.x - halfWidth, context.canvas.height * this.y - halfHeight);
        context.lineTo(context.canvas.width * this.x + halfWidth, context.canvas.height * this.y - halfHeight);
        context.lineTo(context.canvas.width * this.x + halfWidth, context.canvas.height * this.y + halfHeight);
        context.lineTo(context.canvas.width * this.x - halfWidth, context.canvas.height * this.y - halfHeight);
        context.fillStyle = this.color;
        context.fill();
    }
}

class ShapeRenderer {
    private shapes: Shape[] = [];

    public addShape(shape: Shape) {
        this.shapes.push(shape);
        return this;
    }

    public distributeShapesRandomly(width: number, height: number) {
        this.shapes.forEach(shape => {
            const x = Math.random() * width;
            const y = Math.random() * height;
            shape.setPosition(x, y);
        });
    }

    public generateShapesRandomly() {
        // TODO: Read config parameter and generate shapes.
        // ...
    }

    public render(context: CanvasRenderingContext2D) {
        this.shapes.forEach(shape => shape.render(context));
    }
}

export { Shape, Rectangle, Circle, Triangle, ShapeRenderer };
