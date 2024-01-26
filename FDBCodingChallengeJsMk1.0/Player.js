
class Player {
    static MovementDirection = {
        Up: 0,
        Down: 1,
        Left: 2,
        Right: 3,
    };
    constructor(startingX, startingY, startingLives, boardWidth, boardHeight) {
        this.x = startingX;
        this.y = startingY;
        this.lives = startingLives;
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
    }

    move(movementDirection) {
        switch (movementDirection) {
            case Player.MovementDirection.Up:
                {
                    if (this.y < this.boardHeight - 1)
                        this.y += 1;
                    break;
                }
            case Player.MovementDirection.Down:
                {
                    if (this.y > 0)
                        this.y -= 1;
                    break;
                }
            case Player.MovementDirection.Left:
                {
                    if (this.x > 0)
                        this.x -= 1;
                    break;
                }
            case Player.MovementDirection.Right:
                {
                    if (this.x < this.boardWidth - 1)
                        this.x += 1;
                    break;
                }
        }
    }

    deductLife() {
        this.lives -= 1;
    }

    addLife() {
        this.lives += 1;
    }

    isDead() {
        return this.lives == 0;
    }
}

module.exports = Player;