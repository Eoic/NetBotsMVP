class Shape {
    protected _x: number;
    protected _y: number;
    protected _width: number;
    protected _height: number;
    protected _rotation: number;
    protected _color: string;

    get x() { return this._x; }
    get y() { return this._y; }
    get width() { return this._width }
    get height() { return this._height; }
    get rotation() { return this._rotation; }
    get color() { return this._color; }

    constructor(width: number, height: number) {
        this._x = 0;
        this._y = 0;
        this._width = width;
        this._height = height;
        this._rotation = 0;
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

    public setRotation(rotationDeg: number) {
        this._rotation = rotationDeg * Math.PI / 180;
        return this;
    }

    public render(context: CanvasRenderingContext2D) {}
}

class Rectangle extends Shape {
    public render(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.globalAlpha = 0.5;
        context.roundRect(
            context.canvas.width * this.x - this.width / 2,
            context.canvas.height * this.y - this.height / 2,
            this.width,
            this.height,
            20,
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
        context.globalAlpha = 0.5;
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
        context.globalAlpha = 0.5;
        context.moveTo(context.canvas.width * this.x - halfWidth, context.canvas.height * this.y - halfHeight);
        context.lineTo(context.canvas.width * this.x + halfWidth, context.canvas.height * this.y - halfHeight);
        context.lineTo(context.canvas.width * this.x + halfWidth, context.canvas.height * this.y + halfHeight);
        context.lineTo(context.canvas.width * this.x - halfWidth, context.canvas.height * this.y - halfHeight);
        context.fillStyle = this.color;
        context.fill();
    }
}

type ShapeConfig =  {
    count: number;
    size: { min: number; max: number; };
    colors: string[];
};

class ShapeRenderer {
    private shapes: Shape[] = [];

    public addShape(shape: Shape) {
        this.shapes.push(shape);
        return this;
    }

    public distributeShapesRandomly() {
        this.shapes.forEach(shape => shape.setPosition(Math.random(), Math.random()));
    }

    public generateShapesRandomly(config: { [key: string]: ShapeConfig}) {
        for (const [shapeName, shapeConfig] of Object.entries(config)) {
            for (let i = 0; i < shapeConfig.count; i++) {
                this.addShape(this.createShapeFromConfig(shapeName, shapeConfig));
            }
        }
        
        this.distributeShapesRandomly();
        return this;
    }

    public createShapeFromConfig(name: string, config: ShapeConfig): Shape {
        const size = Math.random() * (config.size.max - config.size.min) + config.size.min;
        
        switch (name) {
            case Rectangle.name:
                return new Rectangle(size, size).setColor(config.colors[Math.floor(Math.random() * config.colors.length)])
            case Circle.name:
                return new Circle(size).setColor(config.colors[Math.floor(Math.random() * config.colors.length)])
            case Triangle.name:
                return new Triangle(size, size).setColor(config.colors[Math.floor(Math.random() * config.colors.length)])
            default:
                throw new Error(`Shape ${name} is not supported.`);
        }
    }

    public render(context: CanvasRenderingContext2D) {
        this.shapes.forEach(shape => shape.render(context));
    }
}

export { Shape, Rectangle, Circle, Triangle, ShapeRenderer };
