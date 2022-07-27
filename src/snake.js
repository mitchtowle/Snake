class Snake {
    constructor() {
        this.segments = [
            new Vector2(Math.floor(Math.random() * (NUM_COLS)),
                Math.floor(Math.random() * (NUM_ROWS)))
        ];

        this.direction = new Vector2(0, 0);
    }

    getHead() {
        return this.segments[0];
    }

    setDirectionUp() {
        this.direction = new Vector2(0, -1);
    }

    setDirectionDown() {
        this.direction = new Vector2(0, 1);
    }

    setDirectionLeft() {
        this.direction = new Vector2(-1, 0);
    }

    setDirectionRight() {
        this.direction = new Vector2(1, 0);
    }

    selfCollides() {
        let head = this.getHead()
        for(let i = 1; i < this.segments.length; i++) {
            let current = this.segments[i]
            if(current.x === head.x && current.y === head.y) {
                return true
            }
        }

        return false
    }

    collides(vector) {
        for(let i = 0; i < this.segments.length; i++) {
            let current = this.segments[i]
            if(current.x === vector.x && current.y === vector.y) {
                console.error("food spawn collision")
                return true
            }
        }

        console.log("food spawn okay")
        return false
    }

    update() {
        for (let i = this.segments.length - 1; i >= 0; i--) {
            let currentSegment = this.segments[i];
            if (i == 0) {
                currentSegment.x = currentSegment.x + this.direction.x;
                currentSegment.y = currentSegment.y + this.direction.y;
            }
            else {
                currentSegment.x = this.segments[i - 1].x;
                currentSegment.y = this.segments[i - 1].y;
            }
        }
    }


    willEatFood(food) {
        let head = this.getHead();
        return ((head.x + this.direction.x == food.x) && (head.y + this.direction.y == food.y));
    }


    eatFood(food) {
        this.segments.unshift(new Vector2(food.x, food.y));
    }

    draw() {
        for (let i = 0; i < this.segments.length; i++) {
            let currentSegment = this.segments[i];
            context.fillStyle = "#FFFFFF";
            context.fillRect(currentSegment.x * CELL_SIZE, currentSegment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            context.fillStyle = "#00FF00";
            context.fillRect(currentSegment.x * CELL_SIZE + BORDER_THICKNESS, currentSegment.y * CELL_SIZE + BORDER_THICKNESS, CELL_SIZE - (BORDER_THICKNESS * 2), CELL_SIZE - (BORDER_THICKNESS * 2));
        }
    }
}
