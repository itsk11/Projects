class Game {
    constructor(){
        this.currentPlayer="X";
        this.board = new Array(9).fill(null);
        this.gameOver=false;
        this.gameBoardElement=document.querySelector(".board");
        this.messageElement=document.querySelector(".title p");
        this.restartbtn=document.querySelector(".restart");
        this.restartGame=this.resetGame.bind(this);
        this.init();
    }
    
    init(){
        this.gameBoardElement.innerHTML='';
        this.board.forEach((_,idx) => {
            const cell=document.createElement('div');
            cell.classList.add('tile');
            cell.addEventListener('click', ()=>{
                this.handleCellClick(idx);
            })
            this.gameBoardElement.appendChild(cell);
        })
        this.updateMsg("Let's play TIC TAC TOE!!");
        this.restartbtn.textContent = 'New Game';
        this.restartbtn.removeEventListener('click',this.restartGame);
        this.restartbtn.addEventListener('click',this.startNewGame.bind(this));
    }

    startNewGame(){
        this.restartGame();
        this.updateMsg(`Player ${this.currentPlayer}'s turn`)
        this.restartbtn.textContent = 'Restart Game';
        this.gameOver = false;
    }

    handleCellClick(idx){
        if(this.board[idx]!== null || this.checkWinner() || this.gameOver) return;
        this.board[idx] = this.currentPlayer;
        this.updateBoard();
        if(this.checkWinner()){
            this.updateMsg(`Player ${this.currentPlayer} wins!`);
            this.gameOver=true;
        }
        else if (this.board.every(cell=> cell !== null)) {
            this.updateMsg("It\'s a draw!'");
            this.gameOver = true;
        }
        else {
            this.switchPlayer();
            this.updateMsg(`Player ${this.currentPlayer}'s turn`)
        }
    }

    updateMsg(msg){
        this.messageElement.textContent =msg;
    }

    updateBoard(){
        this.gameBoardElement.querySelectorAll('.tile').forEach((cell,idx) => {
            cell.textContent = this.board[idx] || '';
        });
    }
    
    switchPlayer(){
        this.currentPlayer = this.currentPlayer === "X" ? "O" : "X"; 
    }

    checkWinner(){
        const wincombo = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ]
        
        let winFound = false;
        wincombo.forEach(combo => {
            const [a,b,c] = combo ;
            if(this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]){
                winFound = true;
            }
        })
        
        return winFound;
    }

    resetGame(){
        this.board.fill(null);
        this.currentPlayer='X';
        this.updateBoard();
        this.updateMsg("Let's play TIC TAC TOE");
    }
    
}

document.addEventListener('DOMContentLoaded',()=>
    new Game()
);