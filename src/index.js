const WIDTH = 500
const HEIGHT = 500
const CELL_SIZE = 25
const NUM_COLS = WIDTH / CELL_SIZE
const NUM_ROWS = WIDTH / CELL_SIZE
const BORDER_THICKNESS = 2

const canvas = document.getElementById("canvas")
canvas.width = WIDTH
canvas.height = HEIGHT
const context = canvas.getContext("2d")
const scoreText = document.getElementById("score")

let previousTime = 0;

const game = new Game()

function main(currentTime) {
    if (currentTime - previousTime > 100) {
        game.update()
        previousTime = currentTime
    }
    game.draw(context)

    scoreText.innerText = "Score: " + game.score
    window.requestAnimationFrame(main)
}

window.requestAnimationFrame(main)
