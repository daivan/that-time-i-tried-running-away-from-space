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

let ship = new Ship(cx);
let goal = new Goal(cx);

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



function gameLoop() {
    window.requestAnimationFrame(gameLoop);

    // Press Space in main menu
    if(state.pressedKeys.up){
        ship.moveUp();
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


        ship.render();
        goal.render();
        

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