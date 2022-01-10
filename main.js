class snakeGame {

    constructor(){
        this.canvas = null;
        this.result = null;
        this.ctx = null;
        this.score = 0;
        this.record = 0;
        this.check = true;
        this.init();
        this.loop();
    }
    
    init(){
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = 600;
        this.canvas.height = 600;

        this.result = document.createElement("div");
        this.result.classList.add("result");

        this.maxResult = document.createElement('div');
        this.maxResult.classList.add("record");

        // this.startBtn = document.createElement('button');
        // this.startBtn.innerText = 'START';
        // this.stopBtn = document.createElement('button');
        // this.stopBtn.innerText = 'STOP';


        document.body.appendChild(this.canvas);
        document.body.appendChild(this.maxResult);
        document.body.appendChild(this.result);
        // document.body.appendChild(this.startBtn);
        // document.body.appendChild(this.stopBtn);

        this.snake = new snake(this);
        this.food = new food(this);

    }

    loop(){
        this.update();
        this.draw();
        setTimeout(()=>this.loop(), 60)
    }

    update(){
        this.snake.update();
        if(this.snake.eat(this.food.x, this.food.y)){
            this.food.update();
        }

        document.querySelector(".record").innerHTML = `YOUR RECORD: ${this.record}`;
        document.querySelector(".result").innerHTML = `SCORE: ${this.score}`;
    }

    reset(){
        this.score = 0;
        this.snake = new snake(this);
    }
    
    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if(!this.snake.endGame()){
            this.snake.draw();
        } else {
            // this.snake.drawMessage();
            setTimeout(this.reset(), 5000)
        }
        this.food.draw();
    }

}

let game = new snakeGame();