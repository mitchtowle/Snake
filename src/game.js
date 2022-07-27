class Game {
    constructor() {
        this.running = false
        this.score = 0
        this.snake = null
        this.food = null
        this.gameOver = false

        window.addEventListener("keydown", (event) => {
            if (event.key == "ArrowUp") {
                this.snake.setDirectionUp()
            }
            else if (event.key == "ArrowDown") {
                this.snake.setDirectionDown()
            }
            else if (event.key == "ArrowLeft") {
                this.snake.setDirectionLeft()
            }
            else if (event.key == "ArrowRight") {
                this.snake.setDirectionRight()
            }
            else if (event.key == "Enter" && !this.running) {
                this.start()
            }
            else if (event.key == "Escape") {
                this.running = !this.running
            }
        });
    }

    start() {
        this.running = true
        this.score = 0
        this.snake = new Snake()
        this.food = this.spawnFood();
        this.gameOver = false
    }

    spawnFood() {
        let position = null
        let invalid = true

        while (invalid) {
            invalid = false
            position = new Vector2(Math.floor(Math.random() * (NUM_COLS)),
                Math.floor(Math.random() * (NUM_ROWS)))

            if (this.snake.collides(position)) {
                invalid = true
            }
        }

        return position
    }

    update() {
        if(!this.running) {
            return
        }

        if (this.snake.willEatFood(this.food)) {
            this.snake.eatFood(this.food)
            this.food = this.spawnFood()
            this.score++
            console.log(this.score)
        }
        else {
            this.snake.update()
            if(this.snake.selfCollides()) {
                this.running = false
                this.gameOver = true
            }
        }
    }


    drawFood(context) {
        context.fillStyle = "#FFFFFF";
        context.fillRect(this.food.x * CELL_SIZE, this.food.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        context.fillStyle = "#FF0000";
        context.fillRect(this.food.x * CELL_SIZE + BORDER_THICKNESS, this.food.y * CELL_SIZE + BORDER_THICKNESS, CELL_SIZE - (BORDER_THICKNESS * 2), CELL_SIZE - (BORDER_THICKNESS * 2));
    }

    draw(context) {
        context.clearRect(0, 0, WIDTH, HEIGHT);
        context.fillStyle = "#000000";
        context.fillRect(0, 0, WIDTH, HEIGHT);

        if(this.gameOver) {
            console.log("drawing game over text")
            context.fillStyle = "#FFFFFF"
            context.font = "48px consolas"
            let textMeasure = context.measureText("GAME OVER")
            context.fillText("GAME OVER", WIDTH/2 - textMeasure.width / 2, HEIGHT/2, WIDTH)
        }

        if(this.snake != null) {
            this.snake.draw(context);
        }

        if(this.food != null) {
            this.drawFood(context);
        }
    }
}
