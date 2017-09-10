/*
-- Tic Tac Toe -- Techdegree -- TeamTreeHoue --
 -- Project 4 -- requirements --

Meets Expectations (ME)

Start Screen
REQ1.1 (ME) Start screen appears when page loads
REQ1.2 (ME) lay Game button loads the Tic Tac Toe board and start the game

Game Board
REQ2.1 (ME) Game alternates between O and X
REQ2.2 (ME) Active player identified on the page (The O or X is highlighted, depending on whose turn it is)
REQ2.3 (ME) Empty squares are highlighted with player's symbol when moused over
REQ2.4 (ME) Cannot click on already occupied squares
REQ2.5 (ME) Occupied squares are identified with an X or O

Game Finish
REQ3.1 (ME) Games ends if player has 3 symbols in a row, or the board is full
REQ3.2 (ME) Finish screen appears announcing winner (or tie)
REQ3.3 (ME) New game button starts a new game on an empty board

Uses modular pattern
REQ4.1 (ME) Uses the module pattern or a self-invoking function literal
REQ4.2 (ME) Program is stored in, at most, one global variable

Exceeds Expectations (EE)

Start Screen
REQ.5.1 (EE) Player is prompted to enter their name

Game Board
REQ.6.1 Player's name appears on the board screen
REQ.6.2 Player vs. computer. One side of the game is programmatically controlled

Game Finish
REQ.7.1 Player's name appears if they win
 */


/***** REQ4.1 (ME) Uses the module pattern or a self-invoking function literal *****/
(function(){

     /************************** Snippets for the HTML **************************/

    const startHTML = '<div class="screen screen-start" id="start"><header><h1>Tic Tac Toe</h1><div id="gamerNameBox"><br><label><input type="checkbox" name="playMachine" id="computerActive">Play against the machine</label><br><label><input type="text" id="gamerOneName" placeholder="Enter your name"></input></label><br><br></div><a href="#" class="button">Start game</a></header></div>';
    const boardHTML = '<div class="board" id="board"><header><h1>Tic Tac Toe</h1><ul><li class="players" id="player1"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-200.000000, -60.000000)" fill="#000000"><g transform="translate(200.000000, 60.000000)"><path d="M21 36.6L21 36.6C29.6 36.6 36.6 29.6 36.6 21 36.6 12.4 29.6 5.4 21 5.4 12.4 5.4 5.4 12.4 5.4 21 5.4 29.6 12.4 36.6 21 36.6L21 36.6ZM21 42L21 42C9.4 42 0 32.6 0 21 0 9.4 9.4 0 21 0 32.6 0 42 9.4 42 21 42 32.6 32.6 42 21 42L21 42Z"/></g></g></g></svg></li><li class="players" id="player2"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="43" viewBox="0 0 42 43" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-718.000000, -60.000000)" fill="#000000"><g transform="translate(739.500000, 81.500000) rotate(-45.000000) translate(-739.500000, -81.500000) translate(712.000000, 54.000000)"><path d="M30 30.1L30 52.5C30 53.6 29.1 54.5 28 54.5L25.5 54.5C24.4 54.5 23.5 53.6 23.5 52.5L23.5 30.1 2 30.1C0.9 30.1 0 29.2 0 28.1L0 25.6C0 24.5 0.9 23.6 2 23.6L23.5 23.6 23.5 2.1C23.5 1 24.4 0.1 25.5 0.1L28 0.1C29.1 0.1 30 1 30 2.1L30 23.6 52.4 23.6C53.5 23.6 54.4 24.5 54.4 25.6L54.4 28.1C54.4 29.2 53.5 30.1 52.4 30.1L30 30.1Z"/></g></g></g></svg></li></ul></header><ul class="boxes"><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li><li class="box"></li></ul></div>';
    let winHTML= '';
    // winHTML is declared later because it needs a class adapted to the winner. So it will launh when it knows the winner

    /************************** Elements from HTML **************************/
    const boardDiv = document.getElementById('board');
    const boardHTML_Replay = boardHTML;

    /************************** Global variables **************************/
    let playerNumber1 = ''; //No catch the class player1 because we load boardHTML later.
    let playerNumber2 = '';
    let startPlayer = 'o';
    let currentPlayer = 'o';
    let countClick = 0;
    let countGames = 0;
    let classWinner = '';
    let boxesBoard = ''; //it will use with boardHTML and winHTML

    let computerActive = '';

     /************************** DOMContentLoaded **************************/
    /** All the code is under DOMContentLoaded. It only launchs after the
        page is loaded **/
    /*****   REQ1.1 (ME) Start screen appears when page loads *****/
    document.addEventListener('DOMContentLoaded', () => {

        function startFirstScreen() {
            loadHTML(startHTML);
            loadStartButton();
        }

        //this function loads the snippets after the users press the buttons
        function loadHTML(snippet) {
            let htmlString = document.createElement('div');
            htmlString.setAttribute('id', 'wrapper'); //for cleaning later
            let htmlStringID = document.getElementById('wrapper'); //for cleaning later

            if (snippet == startHTML){
                htmlString.innerHTML = startHTML;
                document.body.removeChild(boardDiv);
                document.body.appendChild(htmlString);
                configureBoard(startHTML);
            } else if (snippet == boardHTML) {
                htmlString.innerHTML = boardHTML;
                document.body.removeChild(htmlStringID);
                document.body.appendChild(htmlString);
                configureBoard(boardHTML);
            } else if (snippet == winHTML) {
                htmlString.innerHTML = winHTML;
                document.body.removeChild(htmlStringID);
                document.body.appendChild(htmlString);
            } else if (snippet == boardHTML_Replay) {
                htmlString.innerHTML = boardHTML;
                document.body.removeChild(htmlStringID);
                document.body.appendChild(htmlString);
            }
        }

        //The aplication configures HTML elements or variables that depend on the screen loaded
        function configureBoard(typeBoard) {
            /***** REQ.5.1 (EE) Player is prompted to enter their name *****/
            if (typeBoard == startHTML) {
                let computerActiveCheck = document.getElementById('computerActive');
                let gamerOneName = document.getElementById('gamerOneName');
                gamerOneName.style.display= 'none';
                //The application show the input for the player name if the user check to play against computer
                computerActiveCheck.addEventListener('click', () => {
                    computerActive = computerActiveCheck.checked;
                    if (computerActive) { //the previous state
                        gamerOneName.style.display= '';
                        gamerOneName.style.margin = '10px';
                        gamerOneName.style.padding = '10px';
                        gamerOneName.style.color= '#54D17A';
                    } else {
                        gamerOneName.style.display= 'none';
                    }
                });

            } else if (typeBoard == boardHTML) {
                playerNumber1 = document.getElementById('player1');
                playerNumber2 = document.getElementById('player2');
                boxesBoard = document.getElementsByClassName('boxes')[0];
                classWinner = ''; //reset for the reply game
            }
        }

        /***** REQ1.2 (ME) lay Game button loads the Tic Tac Toe board and start the game *****/
        function loadStartButton() {
            let buttonStart = document.getElementsByClassName('button')[0];

            buttonStart.addEventListener('click', () => {
                gamerOneName = document.getElementById('gamerOneName').value;
                computerActive = document.getElementById('computerActive').checked;
                startBoardScreen(boardHTML);
            });
        }

        /** the user gets to play screen and the aplication load all the listeners with the values of current users and the state of the game.
        It's called by start and start again button **/
        function startBoardScreen(typeBoard) {
            loadHTML(typeBoard);
            loadActionBoard();
            if(computerActive == true) {
                loadUsersData(); //the application only loads the users name when they selected to play against the machine
            }
            loadClickBoard();
        }

        /* After every "click" movement -unless the match was ended- The aplicacion:
         - Changes the player turn and applies styles for active players -2.1-
         - Changes de values for the hover (x or o on the squares) -2.2-
         - Active the computer turn if it was selected
         - We need to follow the sequence in order to apply the changes correctly  */
        function loadActionBoard(){
            if (countClick != 0) { //We don't want this change the first time, with startBoardScreen().
                changePlayerTurn();
            }
            highlightPlayers();
            loadHoverBoard();
            if(computerActive == true && currentPlayer == 'x') { //the machine always plays in the 'x' turn
                computerTurn();
            }
        }

        /***** REQ2.1 (ME) Game alternates between O and X *****/
        function changePlayerTurn() {
            if (currentPlayer == 'o') {
                currentPlayer = 'x';
            } else if (currentPlayer == 'x') {
                currentPlayer = 'o';
            }
        }

        /***** REQ2.2 (ME) Active player identified on the page (The O or X is highlighted, depending on whose turn it is) *****/
        function highlightPlayers() {
            if (currentPlayer == 'o') {
                playerNumber1.setAttribute('class', 'players active');
                playerNumber2.setAttribute('class', 'players'); //alternate the values
            } else {
                playerNumber2.setAttribute('class', 'players active');
                playerNumber1.setAttribute('class', 'players'); //alternate the values
            }
        }

        /*****
        REQ2.3 (ME) Empty squares are highlighted with player's symbol when moused over
        REQ2.4 (ME) Cannot click on already occupied squares *****/
        /* The aplication refresh the values for the hover every time the user turn changes.
            With the hover the aplication changes the class of the square in order to show a big 'x' or a big 'o' */
        function loadHoverBoard() {
            let imgHTML = '';
            if (currentPlayer == 'o') { //The aplication uses the variable currentPlayer to apply the img to the class
                imgHTML = 'img/o.svg';
            } else if (currentPlayer == 'x') {
                imgHTML = 'img/x.svg';
            }

            boxesBoard.addEventListener('mouseover', (e)=>{
                //first control the square doesn't have a mark
                let classTarget = e.target.getAttribute('class');
                if (classTarget != "box box-filled-1" && classTarget != "box box-filled-2") {
                    //second, show the mark when hover
                    e.target.style.backgroundImage = 'url(' + imgHTML + ')';
                }
            });

            //third cleaning the hover mark from the square
            boxesBoard.addEventListener('mouseout', (e)=>{
                e.target.style.backgroundImage = '';
            });
        }

        /*****
        REQ2.4 (ME) Cannot click on already occupied squares
        REQ2.5 (ME) Occupied squares are identified with an X or O
        *****/
        function loadClickBoard() {
            boxesBoard.addEventListener('click', (e)=>{
                countClick += 1;
                let classHTML = '';
                if (currentPlayer == 'o') {
                    classHTML = 'box box-filled-1'; //mark for O
                } else if (currentPlayer == 'x') {
                    classHTML = 'box box-filled-2'; //mark for X
                }
                //first control the square doesn't have a mark
                let classTarget = e.target.getAttribute('class');
                if (classTarget != "box box-filled-1" && classTarget != "box box-filled-2") {
                    //second, show the mark when click
                    e.target.setAttribute('class', classHTML);
                    //third, change the player
                    checkFinish();
                } else {
                    //If the user click a full square, the game doesn't change the turn
                     e.preventDefault();
                }

            });
        }

        /***** Game Finish *****/
        /***** REQ3.1 (ME) Games ends if player has 3 symbols in a row, or the board is full *****/
        /*** The application controls this with 3 function:
            - checkFinish
                - threeInARow
                    - finishGame
                - isCompleteBox
                    - finishGame
            if not finish, the aplication refresh the listeners with loadActionBoard()
        ***/
        function checkFinish() {
            let squareBox = [];
            for(let i = 0; i <boxesBoard.children.length; i+=1) {
                if (boxesBoard.children[i].getAttribute('class') == "box") {
                    squareBox[i] = '-';
                } else if (boxesBoard.children[i].getAttribute('class') == "box box-filled-1") {
                    squareBox[i] = 'o';
                } else if (boxesBoard.children[i].getAttribute('class') == "box box-filled-2") {
                    squareBox[i] = 'x';
                }
            }
            /*check the values:
            squareBox is
                0-1-2
                3-4-5
                6-7-8
            So,
            First rows:
                0-1-2
                3-4-5
                6-7-8
            Second, columns:
                0-3-6
                1-4-7
                2-5-8
            Third, diagonal
                0-4-8
                2-4-6
            */
            if ( threeInARow(squareBox, 0, 1, 2) ) {
                finishGame();
            } else if ( threeInARow(squareBox, 3, 4, 5) ) {
                finishGame();
            } else if ( threeInARow(squareBox, 6, 7, 8) ) {
                finishGame();
            } else if ( threeInARow(squareBox, 0, 3, 6) ) {
                finishGame();
            } else if ( threeInARow(squareBox, 1, 4, 7) ) {
                finishGame();
            } else if ( threeInARow(squareBox, 2, 5, 8) ) {
                finishGame();
            } else if ( threeInARow(squareBox, 0, 4, 8) ) {
                finishGame();
            } else if ( threeInARow(squareBox, 2, 4, 6) ) {
                finishGame();
            } else if ( isCompleteBox(squareBox) ) {
                classWinner = 'screen-win-tie';
                finishGame();
            } else {
                loadActionBoard();
            }
        }

        /*** check if there are three equal values in a row, and that these values are 'x' or 'o', no empty '-' ***/
        function threeInARow(sq, pos1, pos2, pos3) {
            //checking if there are 3 'x' or 'o', and no three '-'';
            if (sq[pos1] === sq[pos2] && sq[pos1] === sq[pos3] && sq[pos1] !== '-') {
                // console.log('threeInARow ' + sq + '  ' + sq[pos1] + ' ' + sq[pos2] + ' ' + sq[pos3]);
                return true;
            } else {
                return false;
            }
        }

        /*** Check if all squares are full ***/
        function isCompleteBox(sq) {
            for (let i = 0; i<sq.length; i+=1) {
                if (sq[i] === '-') {
                    return false;
                }
            }
            return true; //if all square has values 'x' or 'o'
        }

        /***** REQ3.2 (ME) Finish screen appears announcing winner (or tie) *****/
        function finishGame() {
            //the final message, if it's a tie, we change later
            let message = "winner";
            //we control who is the winner and that it's not a tie
            if (currentPlayer == 'o' && (classWinner != 'screen-win-tie')) {
                classWinner = 'screen-win-one';
                /***** REQ.7.1 Player's name appears if they win *****/
                if (computerActive) {
                    message = document.getElementById('divGamerOneName').innerHTML + ' ' + "winner";
                }
            } else if (currentPlayer == 'x' && (classWinner != 'screen-win-tie')) {
                classWinner = 'screen-win-two';
                /***** REQ.7.1 Player's name appears if they win *****/
                if (computerActive) {
                    message = document.getElementById('divGamerComp').innerHTML + ' ' + "winner";
                }
            } else {
                //if it's a tie, we change de message
                message = "It's a Tie!";
            }
            //the snippet with the finish screen
            winHTML = '<div class="screen screen-win ' + classWinner + '" id="finish"><header><h1>Tic Tac Toe</h1><p class="message">' + message + '</p><a href="#" class="button">New game</a></header></div>';

            countGames += 1;
            countClick = 0; //reset the values
            loadHTML(winHTML);
            loadStartAgainButton();
        }

        /***** REQ3.3 (ME) New game button starts a new game on an empty board *****/
        function loadStartAgainButton() {
            let startAgainButton = document.getElementsByClassName('button')[0];
            startAgainButton.addEventListener('click', () => {
                startAlternativePlayers();
                startBoardScreen(boardHTML_Replay);  //the aplication load the snippet boardHTML again
            });
        }

        /*** The aplication change the start player, more fun ***/
        function startAlternativePlayers() {
                if (startPlayer == 'x') {
                    startPlayer = 'o';
                    currentPlayer = 'o';
                } else if (startPlayer == 'o') {
                    startPlayer = 'x';
                    currentPlayer = 'x';
                }
        }

        /***** REQ.6.1 Player's name appears on the board screen *****/
        function loadUsersData() {
            //first the html for the names
            let divGamerOneName = document.createElement('div');
            divGamerOneName.setAttribute('id', 'divGamerOneName');
            divGamerOneName.innerHTML = gamerOneName;
            let divGamerCompName = document.createElement('div');
            divGamerCompName.setAttribute('id', 'divGamerComp');
            divGamerCompName.innerHTML = 'Machine<br>';
            //second, append the names
            let svgtag1 = document.getElementById('player1').getElementsByTagName('svg')[0];
            let svgtag2 = document.getElementById('player2').getElementsByTagName('svg')[0];
            document.getElementById('player1').insertBefore(divGamerOneName, svgtag1);
            document.getElementById('player2').insertBefore(divGamerCompName, svgtag2);
        }


        /***** REQ.6.2 Player vs. computer. One side of the game is programmatically controlled *****/
        function computerTurn() {
            //the aplication simulate the movement with sqaureBox
            let squareBox = [];
            for(let i = 0; i <boxesBoard.children.length; i+=1) {
                if (boxesBoard.children[i].getAttribute('class') == "box") {
                    squareBox[i] = '-';
                } else if (boxesBoard.children[i].getAttribute('class') == "box box-filled-1") {
                    squareBox[i] = 'o';
                } else if (boxesBoard.children[i].getAttribute('class') == "box box-filled-2") {
                    squareBox[i] = 'x';
                }
            }
            //With 'x' the aplication looking for a winner movement for computer checking all possible three in a row
            //With 'o' the aplication looking for a possible winner movement of the user to block it.
            let countControl = 2; //we need 2 loops, one for 'x' and one for 'o'
            let countComputerMove = 0; //if 'x' or 'o' don't match any winner o losser movement, with use this variable
            let xORy = 'x';
            while (countControl > 0) {
                if (countControl == 1) { //the first loop x0Ry = 'x' and the sencond = 'o'
                    xORy = 'o';
                }
                for (let i=0; i<squareBox.length; i+=1) {
                    if(squareBox[i] == '-' && countComputerMove<1) { // only one move and only over a empty space
                        squareBox[i] = xORy;
                        if ( threeInARow(squareBox, 0, 1, 2) ) {
                            countComputerMove += 1;
                            computerMove(i);
                        } else if ( threeInARow(squareBox, 3, 4, 5) ) {
                            countComputerMove += 1;
                            computerMove(i);
                        } else if ( threeInARow(squareBox, 6, 7, 8) ) {
                            countComputerMove += 1;
                            computerMove(i);
                        } else if ( threeInARow(squareBox, 0, 3, 6) ) {
                            countComputerMove += 1;
                            computerMove(i);
                        } else if ( threeInARow(squareBox, 1, 4, 7) ) {
                            countComputerMove += 1;
                            computerMove(i);
                        } else if ( threeInARow(squareBox, 2, 5, 8) ) {
                            countComputerMove += 1;
                            computerMove(i);
                        } else if ( threeInARow(squareBox, 0, 4, 8) ) {
                            countComputerMove += 1;
                            computerMove(i);
                        } else if ( threeInARow(squareBox, 2, 4, 6) ) {
                            countComputerMove += 1;
                            computerMove(i);
                        } else if ( isCompleteBox(squareBox) ) {
                            countComputerMove += 1;
                            computerMove(i);// last movement, someone has to do
                        } else {
                            squareBox[i] = '-'; //recover the empty space for the simulation
                        }
                    } //end of if
                } //end of for
                countControl -= 1;
            }//end of while
            //if any movement is winner or block the winner, then, the machine moves to the next available square
            if (countComputerMove == 0) {
                let classHTML = 'box box-filled-2'; //mark for X
                let count=0;
                //Check the first free square
                for(let i = 0; i <boxesBoard.children.length; i+=1) {
                    if (boxesBoard.children[i].getAttribute('class') == "box" && count == 0) {
                        boxesBoard.children[i].setAttribute('class', classHTML);
                        count +=1;
                    }//end if
                }//end for
                countClick += 1;
                checkFinish();
            }//end if
        }

        function computerMove(position) {
            //computer is 'x'
            let classHTML = 'box box-filled-2'; //mark for X
            boxesBoard.children[position].setAttribute('class', classHTML);
            countClick += 1;
            checkFinish();
        }


        startFirstScreen();

    }); // End DOMContentLoaded

}()); //module pattern
