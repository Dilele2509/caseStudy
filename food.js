class food{
    constructor(snakeGame){
        this.snakeGame = snakeGame;
        this.x = 0;
        this.y = 0;
        this.grid = 20;
        this.update();
    }

    update(){
        this.x = (Math.floor(Math.random()*(29-0))+0)*this.grid;
        this.y = (Math.floor(Math.random()*(29-0))+0)*this.grid;
    }

    draw(){
        this.snakeGame.ctx.fillStyle = 'red';
        this.snakeGame.ctx.fillRect(this.x, this.y, this.grid, this.grid);
    }

}