let vendors = ['webkit', 'moz'];

for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame =
        window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
}

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext({latencyHint: 'playback', sampleRate: 44100});
let music = new Music(audioCtx);

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
let textInterface = new TextInterface(cx);
let background = new Background(cx);
let obstacleList = [];
let fireballList = [];
let visualsList = [];

let ship = new Ship(cx);

let currentLevelTicker = 40;
let levelTicker = 40;


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

        game.state = 'shop';
        state.pressedKeys.space = false;
    }
    if (state.pressedKeys.space && game.state === 'story' && game.currentLevel != 6) {

        game.state = 'playing';

        state.pressedKeys.space = false;
    }
    if (state.pressedKeys.space && shop.cursorLocation == 5 && game.state === 'shop') {
        game.state = 'map';
        state.pressedKeys.space = false;
    }
    // Buy extend health in store
    if (state.pressedKeys.space && shop.cursorLocation == 0 && game.state === 'shop') {
        if (game.getMineral() >= 100) {
            game.addMaxHealth(25);
            game.mineral -= 100;
        }
        state.pressedKeys.space = false;
    }
    // Buy extend oxygen in store
    if (state.pressedKeys.space && shop.cursorLocation == 1 && game.state === 'shop') {
        if (game.getMineral() >= 100) {
            game.addMaxOxygen(25);
            game.mineral -= 100;
        }
        state.pressedKeys.space = false;
    }
    // Buy extend health in store
    if (state.pressedKeys.space && shop.cursorLocation == 2 && game.state === 'shop') {
        if (game.getMineral() >= 20) {
            game.addHealth(10);
            game.mineral -= 20;
        }
        state.pressedKeys.space = false;
    }
    // Buy extend oxygen in store
    if (state.pressedKeys.space && shop.cursorLocation == 3 && game.state === 'shop') {
        if (game.getMineral() >= 20) {
            game.addOxygen(10);
            game.mineral -= 20;
        }
        state.pressedKeys.space = false;
    }    
    // Buy attack in store
    if (state.pressedKeys.space && shop.cursorLocation == 4 && game.state === 'shop') {
        if (game.getMineral() >= 100) {
            ship.addAttackPower(2);
            game.mineral -= 100;
        }
        state.pressedKeys.space = false;
    }    
    if (state.pressedKeys.space && game.state === 'map') {
        
        game.setLevel(map.cursorLocation)
        ship.resetGame()
        obstacleList = []
        fireballList = []


        game.state = 'story'
        
        state.pressedKeys.space = false;


    }
    // Press Space if dead
    if (state.pressedKeys.space && game.state === 'dead') {

        game.resetGame()
        ship.resetGame()
        obstacleList = []
        fireballList = []
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
                        music.pickup();
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
                        music.pickup();
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
                        music.pickup();
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
                        music.pickup();
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
            shop.render(game, ship);
        } else if (game.state === 'map') {
            map.render(game);
        } else if (game.state === 'end') {
            textInterface.renderEnd();
        } else if (game.state === 'dead') {
            score = 0;
            oxygenArray = game.getOxygenArray();
            textInterface.renderDead(game.currentLevel);
            music.stop();
        } else if (game.state === 'playing') {

            // PLAYING THE ACTUAL GAME
            ship.render();
            obstacleList.map(obstacle => obstacle.render())
            fireballList.map(fireball => {
                fireball.render()
                let collision = checkCollision(fireball, ship);
                if(collision){
                    fireballList = arrayRemove(fireballList, fireball);
                    game.addHealth(-15)
                }

            })
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
                        game.state = 'shop';
                    }

                }
                
                var possibleObstacles = [0,1,2,3,4,5,6,7];
                var gen_nums = [];
                difficulty = game.getDifficulty()
                for (let i = 0; i < difficulty; i++) {
                    let position = getObstaclePosition(possibleObstacles, gen_nums)
                    let obstacle = new Obstacle(cx);
                    obstacle.x = 704
                    obstacle.y = position * 64;
                    obstacleList.push(obstacle)
                  }
           
                  let fireball = new Fireball(cx);
                  fireballList.push(fireball)
            }

            healthArray = game.getHealthArray();
            oxygenArray = game.getOxygenArray();
            distanceArray = game.getDistanceArray();
            minerals = game.getMineral();
            textInterface.renderInfoPanel(healthArray, oxygenArray, distanceArray, minerals, ship.damage);

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


function in_array(array, el) {
   for(var i = 0 ; i < array.length; i++) 
       if(array[i] == el) return true;
   return false;
}

function getObstaclePosition(array, gen_nums) {
    var rand = array[Math.floor(Math.random()*array.length)];
    if(!in_array(gen_nums, rand)) {
       gen_nums.push(rand); 
       return rand;
    }
    return getObstaclePosition(array, gen_nums);
}

function checkCollision(fireball, ship){
    fireball.width = 34
    fireball.height = 64
    ship.width =  64
    ship.height = 64

    if (fireball.x < ship.position_x + ship.width &&
        fireball.x + fireball.width > ship.position_x &&
        fireball.y < ship.position_y + ship.height &&
        fireball.y + fireball.height > ship.position_y) {
         // collision detected!
         return true
     }
}