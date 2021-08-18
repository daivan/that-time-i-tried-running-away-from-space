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

let obstacleList = []
let obstacle = new Obstacle(cx);
obstacle.x = 200
let obstacle2 = new Obstacle(cx);
obstacleList.push(obstacle)
obstacleList.push(obstacle2)

gameState.addObject(obstacle)
gameState.addObject(obstacle2)

let spawner = new Spawner(cx);

let ship = new Ship(cx);
let goal = new Goal(cx);
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
    state.pressedKeys[key] = false
}

function onClick(event) {
    game.makeMove(event);
}

window.addEventListener("keydown", keydown, false);
window.addEventListener("keyup", keyup, false);

// mouse click
window.addEventListener("click", onClick, false);


gameState.state = 'playing';

function gameLoop() {
    window.requestAnimationFrame(gameLoop);

    // Press Space in main menu
    if(state.pressedKeys.up){
        shipLocation = ship.getPosition()
        shipLocation[0]-=64
        isEmpty = gameState.isSpaceEmpty(shipLocation)
        console.log(isEmpty);
        if(isEmpty){
            ship.moveUp();
        }else{
            ship.vibrate();
        }
        
    }

   // Press Space in main menu
   if(state.pressedKeys.down){
    ship.moveDown();
}

   // Press Space in main menu
   if(state.pressedKeys.left){
    ship.moveLeft();
}

   // Press Space in main menu
   if(state.pressedKeys.right){
    ship.moveRight();
}



    currentTime = (new Date()).getTime();
    delta = (currentTime - lastTime);

    if (delta > interval) {


        // clear everything on the screen
        cx.clearRect(0, 0, cw, ch);

        // RENDER THE TEXT DISPLAY
        
        
        // Stage
        if(gameState.state==='start_menu'){
            textInterface.renderStart();
        }else if(gameState.state==='end'){
            textInterface.renderEnd();
        }else if(gameState.state==='dead'){
            textInterface.renderDead();
        }else if(gameState.state==='playing'){
            score = game.getScore();    
            textInterface.renderInfoPanel(score);

        }
        // End RENDER THE TEXT DISPLAY


        ship.render();
        goal.render();
        obstacleList.map(obstacle => obstacle.render())
        //obstacle.render();
        //obstacle2.render();
        currentLevelTicker-=1
        if(currentLevelTicker < 0){
            obstacleList.map(obstacle => obstacle.moveBack())
            ship.moveBack()
            goal.moveBack()
            currentLevelTicker=levelTicker
            game.addScore(10)
            if(ship.isDead()){
                gameState.state = 'dead';
            }

            let obstacle = new Obstacle(cx);
            obstacle.x = 720
            obstacle.y = Math.floor(Math.random() * 5)*64;
            obstacleList.push(obstacle)
        }

        lastTime = currentTime - (delta % interval);
    }
}


// get images
Promise.all([
    loadImage("assets/images/intro_background.png"),
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