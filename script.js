const gameBoard = (() => {
    
    let board = [
        [],
        [],
        []
        ];
        
    for (let row of board) {
        for (let i = 1; i <= 3; i++) {
            row.push('_');
        }
    }
        
    const getBoard = () => board;
    
    const addMarker = (player, column, row) => {
        getBoard()[row-1][column-1] = player.marker;
    }
    
    const printBoard = () => {
        for (let row of board) {
            console.log(row);
        }
    }
    
    return {getBoard, addMarker ,printBoard};
})();

(function gameController() {
    
    const players = [
        {
            name: "player one",
            marker: "X"
        },
        
        {
            name: "player two",
            marker: "O"
        }
        ];
        
    let activePlayer = players[0];
    
    const switchPlayer = () => activePlayer = (activePlayer == players[0]) ? players[1] : players[0];
    
    const getActivePlayer = () => activePlayer;
    
    const round = () => {
        gameBoard.printBoard();
        console.log("\n--------------------------\n");
        console.log(`It's ${activePlayer.name}'s turn`);
    }
    
    const getWinner = (board) => {
        for (let i = 0; i < board.length; i++) {
            let setArr = [...new Set(board[i])]
            if (setArr.length === 1 && setArr[0] !== '_') {
                return "win";
            }
        }

        if (board[0][0] == board[1][1] == board[2][2]) {
            return "win";
        }
    }
    
    (() => {
        //implement game loop.
        console.log(`${getActivePlayer().name} starts!`);
        let r = 9;
        
        for (let i = r; i >= 0; i--) {
            let row = prompt("Row: ");
            let col = prompt("Column: ")
            
            gameBoard.addMarker(getActivePlayer(), col, row);
            
            const winner = getWinner(gameBoard.getBoard());
            if (winner === "win") {
                //check if the player won (change condition) and break.
                gameBoard.printBoard();
                console.log("winner winner chicken dinner");
                break;
            }
            
            switchPlayer();
            round();
        }
    })();
})();