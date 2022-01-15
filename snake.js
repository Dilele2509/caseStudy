class snake {
    constructor(snakeGame){
        this.snakeGame = snakeGame;
        this.x = 0;
        this.y = 0;
        this.grid = 20;
        this.dx = this.grid;
        this.dy = 0;
        this.color = 'green';
        this.cell = [];
        this.maxCell = 2;
    }

    update(){

        // move snake if it alive
        if(!this.endGame() && this.snakeGame.check === true){
            this.x += this.dx;
            this.y +=this.dy;
        }

        // return to the original position when going to the end of the canvas
        if(this.x >= this.snakeGame.canvas.width){
            this.x = 0;
        } else if(this.y >= this.snakeGame.canvas.height){
            this.y = 0;
        } else if(this.x < 0){
            this.x = this.snakeGame.canvas.width;
        } else if(this.y < 0){
            this.y = this.snakeGame.canvas.height;
        }

        // get coordinates of snake body
        this.cell.unshift({x: this.x, y: this.y});
        if(this.cell.length > this.maxCell){
            this.cell.pop();
        }
        
        this.moveSnake();
    }

    draw(){
        // draw snake
        for(let i = 0; i < this.cell.length; i++){
            this.snakeGame.ctx.fillStyle = this.color;
            this.snakeGame.ctx.fillRect(this.cell[i].x,this.cell[i].y,this.grid,this.grid);
        }
    }
    
    drawMessage() {  
        // Show message when losing
        if(this.endGame()){
            this.snakeGame.ctx.fillStyle ='yellow';
            this.snakeGame.ctx.font = '40px Arial';
            this.snakeGame.ctx.fillText('You Lose!!!', 200, 300);
        }
    }

    moveSnake(){

        document.addEventListener('keydown', (e) => {
			if(e.which == 37 && this.dx == 0){
				this.dx = -this.grid;
				this.dy = 0;
			}

			else if(e.which == 38 && this.dy == 0){
				this.dx = 0;
				this.dy = -this.grid;
			}

			else if(e.which == 39 && this.dx == 0){
				this.dx = this.grid;
				this.dy = 0;
			}

			else if(e.which == 40 && this.dy == 0){
				this.dx = 0;
				this.dy = this.grid;
			}
		});
    }

    eat(x, y){

        // increase the snake's length and score when eating food
        if(this.x == x && this.y == y){
            this.maxCell ++;
            this.snakeGame.score+=10;
            if(this.snakeGame.record <= this.snakeGame.score){
                this.snakeGame.record = this.snakeGame.score;
            }
            return true;
        }
        return false;
    }

    endGame(){

        // When the snake bites itself, it's over
        for(let i = 1; i < this.cell.length; i++){
            if(this.x === this.cell[i].x && this.y === this.cell[i].y){
                return true;
            }
        }
        return false;
    }
}