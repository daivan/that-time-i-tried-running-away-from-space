let vendors = ['webkit', 'moz'];
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();
for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame =
        window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
}

let canvas = document.getElementById('canvas'),
    cw = canvas.width,
    ch = canvas.height,
    fps = 30,
    interval = 1000 / fps,
    lastTime = (new Date()).getTime(),
    currentTime = 0,
    delta = 0;

cx = canvas.getContext('2d');

let game = new Game();
let gameState = new GameState();
let textInterface = new TextInterface();
let background = new Background(cx);
let music = new Music(audioCtx)
let effects = new Effects(audioCtx)
let obstacleList = []

let ship = new Ship(cx);

let currentLevelTicker = 100;
let levelTicker = 100;
//let music = new Music();


let state = {
    pressedKeys: {
        space: false,
        left: false,
        right: false,
        up: false,
        down: false
    }
};

let keyMap = {
    'Enter': 'we tryin',
    'ArrowRight': 'right',
    'ArrowLeft': 'left',
    'ArrowUp': 'up',
    'ArrowDown': 'down',
    'Space': 'space'
};

function keydown(event) {
    let key = keyMap[event.code];
    state.pressedKeys[key] = true;
}

function keyup(event) {
    let key = keyMap[event.code];
    state.pressedKeys[key] = false;
}

function onClick(event) {
    game.makeMove(event);
}

window.addEventListener("keydown", keydown, false);
window.addEventListener("keyup", keyup, false);

// mouse click
window.addEventListener("click", onClick, false);



function gameLoop() {
    window.requestAnimationFrame(gameLoop);


    // Press Space in main menu
    if (state.pressedKeys.space && gameState.state === 'start_menu') {
        //music.play();
        effects.play();

        gameState.state = 'playing';
    }
    // Press Space if dead
    if (state.pressedKeys.space && gameState.state === 'dead') {

        game.resetGame()
        ship.resetGame()
        obstacleList = []
        gameState.state = 'playing';
    }

    // Press Space in main menu
    if (state.pressedKeys.up) {

        shipLocation = ship.getPosition()
        // if ship is in the top
        if (shipLocation[1] == 0) {
            isUpEmpty = false
        } else {

            shipLocation[1] -= 64
            isUpEmpty = true;
            obstacleList.map(obstacle => {
                obstacleLocation = obstacle.getLocation()
                if (obstacleLocation[0] == shipLocation[0] && obstacleLocation[1] == shipLocation[1]) {
                    isUpEmpty = false;
                }

            }

            );

            if (isUpEmpty) {
                ship.moveUp();
            } else {
                ship.vibrate();
            }
        }


    }

    // Press Space in main menu
    if (state.pressedKeys.down) {
        shipLocation = ship.getPosition()
        // if ship is in the bottom
        if (shipLocation[1] == 448) {
            isUpEmpty = false
        } else {
            shipLocation[1] += 64
            isUpEmpty = true;
            obstacleList.map(obstacle => {
                obstacleLocation = obstacle.getLocation()
                if (obstacleLocation[0] == shipLocation[0] && obstacleLocation[1] == shipLocation[1]) {
                    isUpEmpty = false;
                }

            }

            );

            if (isUpEmpty) {
                ship.moveDown();
            } else {
                ship.vibrate();
            }
        }

    }

    // Press Space in main menu
    if (state.pressedKeys.left) {
        shipLocation = ship.getPosition()
        // if ship is in the bottom
        if (shipLocation[0] == 0) {
            isUpEmpty = false
        } else {
            shipLocation[0] -= 64
            isUpEmpty = true;
            obstacleList.map(obstacle => {
                obstacleLocation = obstacle.getLocation()
                if (obstacleLocation[0] == shipLocation[0] && obstacleLocation[1] == shipLocation[1]) {
                    isUpEmpty = false;
                }

            }

            );

            if (isUpEmpty) {
                ship.moveLeft();
            } else {
                ship.vibrate();
            }
        }
    }

    // Press Space in main menu
    if (state.pressedKeys.right) {
        shipLocation = ship.getPosition()
        // if ship is in the bottom
        if (shipLocation[0] == 704) {
            isUpEmpty = false
        } else {
            shipLocation[0] += 64
            isUpEmpty = true;
            obstacleList.map(obstacle => {
                obstacleLocation = obstacle.getLocation()
                if (obstacleLocation[0] == shipLocation[0] && obstacleLocation[1] == shipLocation[1]) {
                    isUpEmpty = false;
                }

            }

            );

            if (isUpEmpty) {
                ship.moveRight();
            } else {
                ship.vibrate();
            }
        }
    }



    currentTime = (new Date()).getTime();
    delta = (currentTime - lastTime);

    if (delta > interval) {


        // clear everything on the screen
        cx.clearRect(0, 0, cw, ch);



        
        // RENDER THE BACKGROUND
        background.render();

        // Stage
        if (gameState.state === 'start_menu') {
            textInterface.renderStart();
        } else if (gameState.state === 'end') {
            textInterface.renderEnd();
        } else if (gameState.state === 'dead') {
            score = game.getScore();
            textInterface.renderDead(score);
        } else if (gameState.state === 'playing') {
            score = game.getScore();
            textInterface.renderInfoPanel(score);




            // PLAYING THE ACTUAL GAME
            ship.render();
            obstacleList.map(obstacle => obstacle.render())
            currentLevelTicker -= 1
            if (currentLevelTicker < 0) {
                obstacleList.map(obstacle => obstacle.moveBack())
                ship.moveBack()
                currentLevelTicker = levelTicker
                game.addScore(10)
                if (ship.isDead()) {
                    gameState.state = 'dead';
                }

                let obstacle = new Obstacle(cx);
                obstacle.x = 640
                obstacle.y = Math.floor(Math.random() * 8) * 64;
                obstacleList.push(obstacle)
            }

            lastTime = currentTime - (delta % interval);


        }
        // End RENDER THE TEXT DISPLAY



    }
}


// get images
Promise.all([
    loadImage("assets/images/collection.png"),
    loadImage("assets/images/spritesheet.png"),
])
    .then(() => {
        // draw images to canvas

        gameLoop();

    });


// function to retrieve an image
function loadImage(url) {
    return new Promise((fulfill) => {
        let imageObj = new Image();
        imageObj.onload = () => fulfill(imageObj);
        imageObj.src = url;
    });
}
