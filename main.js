class snakeGame {

    constructor(){
        this.canvas = null;
        this.result = null;
        this.ctx = null;
        this.score = 0;
        this.record = 0;
        this.check = true;
        this.timeOut;
        this.init();
        this.loop();
    }
    
    init(){
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = 600;
        this.canvas.height = 600;

        // result show player's score
        this.result = document.createElement("div");
        this.result.classList.add("result");

        // max result show player's record
        this.maxResult = document.createElement('div');
        this.maxResult.classList.add("record");
        
        document.body.appendChild(this.canvas);
        document.body.appendChild(this.maxResult);
        document.body.appendChild(this.result);


        // create reset button
        this.btnReset = document.createElement("button");
        this.btnReset.classList.add('btnReset')
        this.btnReset.innerText = 'Play Again';
        this.btnReset.addEventListener('click', ()=>{
            this.btnReset.style.display = 'none';
            this.reset();
        })
        document.body.appendChild(this.btnReset);

        // create stop button
        this.stopBtn = document.createElement('button');
        this.stopBtn.classList.add('stopBtn')
        this.stopBtn.innerHTML = '<i class="fas fa-pause"></i>';
        this.stopBtn.addEventListener('click', ()=>{
            this.playBtn.style.display = 'block';
            this.newGameBtn.style.display = 'block';
            this.stop();
        })
        document.body.appendChild(this.stopBtn);

        // create play button
        this.playBtn = document.createElement('button');
        this.playBtn.classList.add('playBtn');
        this.playBtn.innerHTML = '<i class="fas fa-play"></i>';
        this.playBtn.addEventListener('click', ()=>{
            this.resume();
            this.playBtn.style.display = 'none';
            this.newGameBtn.style.display = 'none';
        })
        document.body.appendChild(this.playBtn);

        // create new game button
        this.newGameBtn = document.createElement('button');
        this.newGameBtn.classList.add('newGameBtn');
        this.newGameBtn.innerText = 'New Game';
        this.newGameBtn.addEventListener('click', ()=>{
            this.playBtn.style.display = 'none';
            this.newGameBtn.style.display = 'none';
            this.resume();
            this.record = 0;
            this.reset();
        })
        document.body.appendChild(this.newGameBtn);
    

        this.snake = new snake(this);
        this.food = new food(this);

    }

    resume() {
        this.timeOut = setTimeout(()=>this.loop(), 60)
    }
    
    stop() {
        clearInterval(this.timeOut)
    }

    loop(){
        this.update();
        this.draw();
        // this.timeOut = setTimeout(()=>this.loop(), 60)
        this.resume();
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
            this.food.draw();
        } else {
            this.btnReset.style.display= "block";
            this.snake.drawMessage();
            this.stop()         
        }
    }
}

let game = new snakeGame();