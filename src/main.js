let vendors = ['webkit', 'moz'];

for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame =
        window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
}

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();
let music = new Music(audioCtx)

let canvas = document.getElementById('canvas'),
    cw = canvas.width,
    ch = canvas.height,
    fps = 30,
    interval = 1000 / fps,
    lastTime = (new Date()).getTime(),
    currentTime = 0,
    delta = 0;

cx = canvas.getContext('2d');

let map = new Map(cx);
let shop = new Shop(cx);
let game = new Game();
let story = new Story(cx);
//let gameState = new GameState();
let textInterface = new TextInterface(cx);
let background = new Background(cx);
let obstacleList = [];
let visualsList = [];

let ship = new Ship(cx);

let currentLevelTicker = 50;
let levelTicker = 50;


let state = {
    pressedKeys: {
        enter: false,
        space: false,
        left: false,
        right: false,
        up: false,
        down: false
    }
};

let keyMap = {
    'Enter': 'enter',
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


window.addEventListener("keydown", keydown, false);
window.addEventListener("keyup", keyup, false);

function gameLoop() {
    window.requestAnimationFrame(gameLoop);

    if (visualsList.length > 0) {
        visualsList.forEach(element => {
            if (element.time > 0) element.render();
            else arrayRemove(visualsList, element);
        })
    }


    // Press Space in main menu
    if (state.pressedKeys.space && game.state === 'start_menu') {

        music.play();

        game.state = 'map';
        state.pressedKeys.space = false;
    }
    if (state.pressedKeys.space && game.state === 'story' && game.currentLevel != 6) {

        game.state = 'playing';

        state.pressedKeys.space = false;
    }
    if (state.pressedKeys.space && shop.cursorLocation == 2 && game.state === 'shop') {
        game.state = 'story';
        state.pressedKeys.space = false;
    }
    // Buy health in store
    if (state.pressedKeys.space && shop.cursorLocation == 0 && game.state === 'shop') {
        if (game.getMineral() >= 100) {
            game.addHealth(25);
            game.mineral -= 100;
        }
        state.pressedKeys.space = false;
    }
    // Buy oxygen in store
    if (state.pressedKeys.space && shop.cursorLocation == 1 && game.state === 'shop') {
        if (game.getMineral() >= 100) {
            game.addOxygen(25);
            game.mineral -= 100;
        }
        state.pressedKeys.space = false;
    }
    if (state.pressedKeys.space && game.state === 'map') {
        
        game.setLevel(map.cursorLocation)
        ship.resetGame()
        obstacleList = []

        if (map.cursorLocation == 2) {
            game.state = 'shop'
        } else {
            game.state = 'story'
        }
        state.pressedKeys.space = false;


    }
    // Press Space if dead
    if (state.pressedKeys.space && game.state === 'dead') {

        game.resetGame()
        ship.resetGame()
        obstacleList = []
        game.state = 'start_menu';
        state.pressedKeys.space = false;
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
            currentObstacle = []
            obstacleList.map(obstacle => {
                obstacleLocation = obstacle.getLocation()
                if (obstacleLocation[0] == shipLocation[0] && obstacleLocation[1] == shipLocation[1]) {
                    isUpEmpty = false;
                    currentObstacle = obstacle;
                }
            }

            );

            if (isUpEmpty) {
                ship.moveUp();
            } else {
                ship.attack(currentObstacle);
                if (currentObstacle.dead === true) {
                    game.getObstacleReward(currentObstacle)
                    if (currentObstacle.lootType != "nothing") {
                        let text = `+${currentObstacle.lootAmount} ${currentObstacle.lootType}`;
                        visualsList.push(new FloatingText(cx, ship.getPosition(), text, currentObstacle.lootColor))
                    }
                    obstacleList = arrayRemove(obstacleList, currentObstacle);

                }
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
                    currentObstacle = obstacle;
                }

            }

            );

            if (isUpEmpty) {
                ship.moveDown();
            } else {
                ship.attack(currentObstacle);
                if (currentObstacle.dead === true) {
                    game.getObstacleReward(currentObstacle)
                    if (currentObstacle.lootType != "nothing") {
                        let text = `+${currentObstacle.lootAmount} ${currentObstacle.lootType}`;
                        visualsList.push(new FloatingText(cx, ship.getPosition(), text, currentObstacle.lootColor))
                    }
                    obstacleList = arrayRemove(obstacleList, currentObstacle);
                }
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
                    currentObstacle = obstacle;
                }

            }

            );

            if (isUpEmpty) {
                ship.moveLeft();
            } else {
                ship.attack(currentObstacle);
                if (currentObstacle.dead === true) {
                    game.getObstacleReward(currentObstacle)
                    if (currentObstacle.lootType != "nothing") {
                        let text = `+${currentObstacle.lootAmount} ${currentObstacle.lootType}`;
                        visualsList.push(new FloatingText(cx, ship.getPosition(), text, currentObstacle.lootColor))
                    }
                    obstacleList = arrayRemove(obstacleList, currentObstacle);
                }
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
                    currentObstacle = obstacle;
                }

            }

            );

            if (isUpEmpty) {
                ship.moveRight();
            } else {
                ship.attack(currentObstacle);
                if (currentObstacle.dead === true) {
                    game.getObstacleReward(currentObstacle)
                    if (currentObstacle.lootType != "nothing") {
                        let text = `+${currentObstacle.lootAmount} ${currentObstacle.lootType}`;
                        visualsList.push(new FloatingText(cx, ship.getPosition(), text, currentObstacle.lootColor))
                    }
                    obstacleList = arrayRemove(obstacleList, currentObstacle);
                }
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
        if (game.state === 'start_menu') {
            textInterface.renderStart();
        } else if (game.state === 'story') {
            story.render(game.currentLevel);
        } else if (game.state === 'shop') {
            shop.render(game);
        } else if (game.state === 'map') {
            map.render(game);
        } else if (game.state === 'end') {
            textInterface.renderEnd();
        } else if (game.state === 'dead') {
            score = 0;
            oxygenArray = game.getOxygenArray();
            textInterface.renderDead(game.currentLevel);
        } else if (game.state === 'playing') {

            healthArray = game.getHealthArray();
            oxygenArray = game.getOxygenArray();
            distanceArray = game.getDistanceArray();
            minerals = game.getMineral();
            textInterface.renderInfoPanel(healthArray, oxygenArray, distanceArray, minerals);




            // PLAYING THE ACTUAL GAME
            ship.render();
            obstacleList.map(obstacle => obstacle.render())
            currentLevelTicker -= 1
            if (currentLevelTicker < 0) {
                ship.moveBack(obstacleList)
                obstacleList.map(obstacle => obstacle.moveBack())
                currentLevelTicker = levelTicker
                game.addScore(10)
                game.removeOxygen(1)
                if (game.over() == true) {
                    game.state = 'dead';
                }
                if (ship.isDead()) {
                    game.state = 'dead';
                }
                game.addDistance(1);
                if (game.completeLevel()) {
                    if (game.currentLevel == 5) {
                        game.currentLevel += 1
                        game.state = 'story'
                    } else {
                        game.state = 'map';
                    }

                }

                let obstacle = new Obstacle(cx);
                obstacle.x = 704
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


function arrayRemove(arr, value) {

    return arr.filter(function (ele) {
        return ele != value;
    });
}