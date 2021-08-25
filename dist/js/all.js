class Background{constructor(s){this.context=s,this.spawnTime=30,this.starList=[]}render(){if(this.starList.map(s=>s.render()),this.spawnTime-=1,0==this.spawnTime){let s=new Star(this.context);this.starList.push(s),this.spawnTime=30}}}
class Effects{constructor(t){this.ctx=t,this.notes={a:440,bs:440*Math.pow(2,1/12),b:440*Math.pow(2,2/12),c:440*Math.pow(2,.25),cs:440*Math.pow(2,4/12),d:440*Math.pow(2,5/12),ds:440*Math.pow(2,.5),e:440*Math.pow(2,7/12),f:440*Math.pow(2,8/12),fs:440*Math.pow(2,.75),g:440*Math.pow(2,10/12),gs:440*Math.pow(2,11/12)},this.isPlaying=!1,this.tempo=100,this.fourth=60/this.tempo,this.half=2*this.fourth,this.whole=2*this.half,this.eigth=this.fourth/2,this.sixteenth=this.eigth/2,this.melody={note:"",length:this.eigth,gain:.1,octave:1,wave:"sine"},this.lookahead=25,this.scheduleAheadTime=.1,this.currentNote=0,this.nextNoteTime=0,this.notesToPlay=[["d","","","d"],["","","",""],["d","","","d"],["e","","",""],["","","","d"],["d","","",""]]}playMove(){}nextNote(){this.currentNote===this.notesToPlay.length-1?this.currentNote=0:this.currentNote++,this.nextNoteTime+=this.eigth}stopPlaying(){this.isPlaying=!1,this.currentNote=0,this.ctx.suspend(),this.nextNoteTime=this.eight}scheduler(){for(;this.nextNoteTime<this.ctx.currentTime+this.scheduleAheadTime&&this.isPlaying;){for(let t=0;t<4;t++)0==t&&(this.melody.note=this.notesToPlay[this.currentNote][t],this.melody.wave="sine",this.melody.octave=1,this.melody.length=this.notesToPlay[this.currentNote][t].length,this.playNote(this.melody,this.nextNoteTime)),1==t&&(this.melody.note=this.notesToPlay[this.currentNote][t],this.melody.wave="sine",this.melody.octave=2,this.melody.length=this.notesToPlay[this.currentNote][t].length,this.playNote(this.melody,this.nextNoteTime)),2==t&&(this.melody.note=this.notesToPlay[this.currentNote][t],this.melody.length=this.notesToPlay[this.currentNote][t].length,this.playNote(this.melody,this.nextNoteTime)),3==t&&(this.melody.note=this.notesToPlay[this.currentNote][t],this.melody.octave=-2,this.melody.wave="triangle",this.melody.length=this.notesToPlay[this.currentNote][t].length,this.playNote(this.melody,this.nextNoteTime));this.nextNote()}window.setTimeout(this.scheduler.bind(this),this.lookahead)}playNote(t,e){if(""!=t.note){let i=this.ctx.createOscillator(),s=this.ctx.createBiquadFilter();s.type="bandpass",s.frequency.value=200,i.type=t.wave,i.frequency.setValueAtTime(1*this.notes[t.note]/Math.pow(2,1-t.octave),this.ctx.currentTime);let h=this.ctx.createGain();h.gain.setValueAtTime(.5,this.ctx.currentTime),h.gain.setTargetAtTime(0,this.ctx.currentTime,.2),s.connect(h),h.connect(this.ctx.destination),i.connect(s),i.start(e),i.stop(e+t.length)}}}
class Game{constructor(){this.score=0}addScore(e){this.score+=e}getScore(){return this.score}resetGame(){this.score=0}makeMove(e){let t=e.pageX,a=e.pageY;"inGame"===gameState.state&&this.clickWithinArea(t,a)&&(gameState.movesLeft-=1,gameState.checkGameOver(),game.changeTile(t,a),game.changeNextTile())}changeNextTile(){this.nextTile=Math.floor(9*Math.random())+1}clickWithinArea(e,t){return e>72&&t>72&&e<456&&t<456}selectedTile(e,t){let a=(e-8)/64,r=(t-8)/64;return[Math.floor(r),Math.floor(a)]}changeTile(e,t){let a=this.selectedTile(e,t);gameState.map[a[0]][a[1]]=this.nextTile,gameState.checkLevelComplete()}update(){Background.renderGamePanels(),Background.render(),requests.map(e=>e.render()),goals.map(e=>e.render()),textInterface.renderInfoPanel()}}
class GameState{constructor(){this.state="start_menu",this.dead=!0,this.stage=0,this.movesLeft=0,this.map=[],this.objects=[]}addObject(e){this.objects.push(e)}checkGameOver(){this.movesLeft<1&&(this.state="dead")}checkLevelComplete(){let e=!0;requests.forEach(t=>{!1===t.isConnected(gameState.map)&&(e=!1)}),e&&this.loadNextLevel()}loadNextLevel(){level.setNextLevel(),2===level.currentLevel?gameState.state="end":gameState.initiateLevel(level.getCurrentLevel())}initiateLevel(e){this.movesLeft=e.movesLeft,this.dead=!1,this.map=[[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]],Background.setMap(this.map),this.spawnRequests(),this.spawnGoals()}spawnRequests(){requests=[],void 0!==level.getCurrentLevel().requests&&level.getCurrentLevel().requests.map(e=>{let t=new Request(cx);t.y=64*e.start[0],t.x=64*e.start[1],t.name=e.name,t.start=[e.start[0],e.start[1]],t.goal=[e.goal[0],e.goal[1]],requests.push(t)})}spawnGoals(){goals=[],void 0!==level.getCurrentLevel().goals&&level.getCurrentLevel().goals.map(e=>{let t=new Goal(cx);t.y=64*e.start[0],t.x=64*e.start[1],t.start=[e.start[0],e.start[1]],t.name=e.name,goals.push(t)})}printAllObjectLocations(){this.objects.map(function(e){console.log(e.getLocation())})}getObjectIn(e){let t=!1;return t=this.objects.map(t=>{if(t.getLocation()[0]==e[0]&&t.getLocation()[1]==e[1])return"bajs"})}isSpaceEmpty(e){let t=!0;return!((t=this.objects.filter(t=>t.getLocation()[0]==e[0]&&t.getLocation()[1]==e[1])).length>0)}}
class Music{constructor(t){this.ctx=t,this.notes={a:440,bs:440*Math.pow(2,1/12),b:440*Math.pow(2,2/12),c:440*Math.pow(2,.25),cs:440*Math.pow(2,4/12),d:440*Math.pow(2,5/12),ds:440*Math.pow(2,.5),e:440*Math.pow(2,7/12),f:440*Math.pow(2,8/12),fs:440*Math.pow(2,.75),g:440*Math.pow(2,10/12),gs:440*Math.pow(2,11/12)},this.isPlaying=!1,this.tempo=100,this.fourth=60/this.tempo,this.half=2*this.fourth,this.whole=2*this.half,this.eigth=this.fourth/2,this.sixteenth=this.eigth/2,this.melody={note:"",length:this.eigth,gain:.1,octave:1,wave:"sine"},this.lookahead=25,this.scheduleAheadTime=.1,this.currentNote=0,this.nextNoteTime=0,this.notesToPlay=[["d","","","d"],["","","",""],["d","","","d"],["e","","",""],["","","","d"],["a","","",""],["f","","","d"],["","","",""],["d","","","d"],["","","",""],["d","","","d"],["e","","",""],["","","","d"],["a","","",""],["f","","","d"],["","","",""],["d","","","c"],["","","",""],["d","","","c"],["e","","",""],["","","","c"],["a","","",""],["f","","","c"],["","","",""],["d","","","c"],["","","",""],["d","","","c"],["e","","",""],["","","","c"],["a","","",""],["f","","","c"],["","","",""],["d","","","bs"],["","","",""],["d","","","bs"],["","a","",""],["","","","bs"],["","a","",""],["f","","","bs"],["e","","",""],["d","","","bs"],["","","",""],["d","","","bs"],["","a","",""],["","","","bs"],["","a","",""],["f","","","bs"],["e","","",""],["d","","","a"],["","","",""],["d","","","a"],["g","","",""],["","","","a"],["g","","",""],["e","","","a"],["d","","",""],["d","","","c"],["","","",""],["d","","","c"],["g","","",""],["","","","c"],["g","","",""],["e","","","c"],["d","","",""]]}play(){this.isPlaying=!0,"suspended"===this.ctx.state&&this.ctx.resume(),this.scheduler()}playMove(){console.log("")}nextNote(){this.currentNote===this.notesToPlay.length-1?this.currentNote=0:this.currentNote++,this.nextNoteTime+=this.eigth}stopPlaying(){this.isPlaying=!1,this.currentNote=0,this.ctx.suspend(),this.nextNoteTime=this.eight}scheduler(){for(;this.nextNoteTime<this.ctx.currentTime+this.scheduleAheadTime&&this.isPlaying;){for(let t=0;t<4;t++)0==t&&(this.melody.note=this.notesToPlay[this.currentNote][t],this.melody.wave="sine",this.melody.octave=1,this.melody.length=this.notesToPlay[this.currentNote][t].length,this.playNote(this.melody,this.nextNoteTime)),1==t&&(this.melody.note=this.notesToPlay[this.currentNote][t],this.melody.wave="sine",this.melody.octave=2,this.melody.length=this.notesToPlay[this.currentNote][t].length,this.playNote(this.melody,this.nextNoteTime)),2==t&&(this.melody.note=this.notesToPlay[this.currentNote][t],this.melody.length=this.notesToPlay[this.currentNote][t].length,this.playNote(this.melody,this.nextNoteTime)),3==t&&(this.melody.note=this.notesToPlay[this.currentNote][t],this.melody.octave=-2,this.melody.wave="triangle",this.melody.length=this.notesToPlay[this.currentNote][t].length,this.playNote(this.melody,this.nextNoteTime));this.nextNote()}window.setTimeout(this.scheduler.bind(this),this.lookahead)}playNote(t,e){if(""!=t.note){let s=this.ctx.createOscillator(),i=this.ctx.createBiquadFilter();i.type="bandpass",i.frequency.value=200,s.type=t.wave,s.frequency.setValueAtTime(1*this.notes[t.note]/Math.pow(2,1-t.octave),this.ctx.currentTime);let h=this.ctx.createGain();h.gain.setValueAtTime(.5,this.ctx.currentTime),h.gain.setTargetAtTime(0,this.ctx.currentTime,.2),i.connect(h),h.connect(this.ctx.destination),s.connect(i),s.start(e),s.stop(e+t.length)}}}
class Obstacle{constructor(t){let e=new Image;e.src="assets/images/spritesheet.png",this.current_animation_frame=1,this.context=t,this.image=e,this.max_animation_frame=3,this.current_frame_rate=20,this.max_frame_rate=10,this.x=128,this.y=128,this.start=[0,0],this.xFrame=64,this.yFrame=192,this.name=""}render(){let t=this.getAnimationFrame(this.current_animation_frame);this.context.drawImage(this.image,t[0],t[1],64,64,this.x,this.y,64,64),this.current_frame_rate-=1,0==this.current_frame_rate&&(this.current_animation_frame+=1,this.current_animation_frame==this.max_animation_frame&&(this.current_animation_frame=0),this.current_frame_rate=this.max_frame_rate),this.movable||(this.current_movable_speed-=1,this.current_movable_speed<0&&(this.movable=!0,this.current_movable_speed=this.max_movable_speed))}getAnimationFrame(t){return 0==t?[0,64]:1==t?[64,64]:2==t?[128,64]:[0,64]}moveBack(){this.x-=64}getLocation(){return[this.x,this.y]}}
class Ship{constructor(t){let i=new Image;i.src="assets/images/spritesheet.png",this.context=t,this.image=i,this.position_x=64,this.position_y=64,this.current_animation_frame=1,this.max_animation_frame=3,this.current_frame_rate=20,this.max_frame_rate=10,this.movable=!0,this.current_movable_speed=5,this.max_movable_speed=5,this.dead=!1}resetGame(){this.position_x=64,this.position_y=64,this.dead=!1}isDead(){return this.dead}moveUp(){this.movable&&(this.position_y=this.position_y-64,this.movable=!1)}moveDown(){this.movable&&(this.position_y=this.position_y+64,this.movable=!1)}moveLeft(){this.movable&&(this.position_x=this.position_x-64,this.movable=!1)}moveRight(){this.movable&&(this.position_x=this.position_x+64,this.movable=!1)}render(){let t=this.getAnimationFrame(this.current_animation_frame);this.context.drawImage(this.image,t[0],t[1],64,64,this.position_x,this.position_y,64,64),this.current_frame_rate-=1,0==this.current_frame_rate&&(this.current_animation_frame+=1,this.current_animation_frame==this.max_animation_frame&&(this.current_animation_frame=0),this.current_frame_rate=this.max_frame_rate),this.movable||(this.current_movable_speed-=1,this.current_movable_speed<0&&(this.movable=!0,this.current_movable_speed=this.max_movable_speed))}getAnimationFrame(t){return 0==t?[0,0]:1==t?[64,0]:2==t?[128,0]:[0,0]}getPosition(){return[this.position_x,this.position_y]}moveBack(t){t.map(t=>{let i=t.getLocation();64==i[0]&&i[1]==this.position_y&&this.position_x<=0?this.dead=!0:i[1]==this.position_y&&this.position_x+64==i[0]&&(this.position_x=this.position_x-64)})}vibrate(){}}
class Star{constructor(t){this.uniqueNumber=Math.random(),this.context=t,this.x=800,this.y=500*Math.random(),this.radius=9*this.uniqueNumber+1,this.startAngle=0,this.endAngle=2*Math.PI,this.moveSpeed=this.uniqueNumber}render(){this.context.fill(),this.context.beginPath(),this.context.fillStyle="#ccc",this.context.shadowBlur=5,this.context.shadowColor="#ddd",this.context.arc(this.x,this.y,this.radius,this.startAngle,this.endAngle,!1),this.context.fill(),this.context.closePath(),this.context.shadowBlur=0,this.moveBack()}moveBack(){this.x-=this.moveSpeed}}
class TextInterface{constructor(){}renderStart(){cx.font="30px Arial",cx.fillStyle="#FFF",cx.fillText("That time I tried running away from space",20,270),cx.font="20px Arial",cx.fillText("",20,320),cx.fillText("",20,340),cx.fillText("",20,365),cx.fillText("Avoid the asteroids!",20,390),cx.fillText("Press <Space> to play",20,450),cx.font="12px Arial",cx.fillText("Created by: Daivan Trinh & Hakan Einarsson for js13kGames.com 2021",20,500)}renderEnd(){cx.font="50px Arial",cx.fillStyle="#FFF",cx.fillText("The End",20,270),cx.font="20px Arial",cx.fillText("Thank you for playing our game!",20,340),cx.fillText("We love what you are doing at js13kGames.",20,365),cx.fillText("Keep up the great work!",20,390),cx.font="12px Arial",cx.fillText("Created by: Daivan Trinh & Hakan Einarsson for js13kGames.com 2021",20,500)}renderDead(l){cx.fillStyle="rgba(225,225,225,0.8)",cx.fillRect(0,0,768,512);let e=l;cx.font="30px Arial",cx.fillStyle="#FF0000",cx.fillText("You died!",40,105),cx.font="18px Arial",cx.fillStyle="#000",cx.fillText("Your final score was:",40,145),cx.fillText(e,40,180),cx.fillText("Press <space> to play again",40,230)}renderInfoPanel(l){let e="Score: "+l;cx.font="12px Arial",cx.fillStyle="#FFF",cx.fillText(e,8,18)}}
let vendors=["webkit","moz"];for(let e=0;e<vendors.length&&!window.requestAnimationFrame;++e)window.requestAnimationFrame=window[vendors[e]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[vendors[e]+"CancelAnimationFrame"]||window[vendors[e]+"CancelRequestAnimationFrame"];const AudioContext=window.AudioContext||window.webkitAudioContext,audioCtx=new AudioContext;let music=new Music(audioCtx),effects=new Effects(audioCtx),canvas=document.getElementById("canvas"),cw=canvas.width,ch=canvas.height,fps=30,interval=1e3/fps,lastTime=(new Date).getTime(),currentTime=0,delta=0;cx=canvas.getContext("2d");let game=new Game,gameState=new GameState,textInterface=new TextInterface,background=new Background(cx),obstacleList=[],ship=new Ship(cx),currentLevelTicker=100,levelTicker=100,state={pressedKeys:{space:!1,left:!1,right:!1,up:!1,down:!1}},keyMap={Enter:"we tryin",ArrowRight:"right",ArrowLeft:"left",ArrowUp:"up",ArrowDown:"down",Space:"space"};function keydown(e){let t=keyMap[e.code];state.pressedKeys[t]=!0}function keyup(e){let t=keyMap[e.code];state.pressedKeys[t]=!1}function onClick(e){game.makeMove(e)}function gameLoop(){if(window.requestAnimationFrame(gameLoop),state.pressedKeys.space&&"start_menu"===gameState.state&&(effects.playMove(),gameState.state="playing"),state.pressedKeys.space&&"dead"===gameState.state&&(game.resetGame(),ship.resetGame(),obstacleList=[],gameState.state="playing"),state.pressedKeys.up&&(effects.playMove(),shipLocation=ship.getPosition(),0==shipLocation[1]?isUpEmpty=!1:(shipLocation[1]-=64,isUpEmpty=!0,obstacleList.map(e=>{obstacleLocation=e.getLocation(),obstacleLocation[0]==shipLocation[0]&&obstacleLocation[1]==shipLocation[1]&&(isUpEmpty=!1)}),isUpEmpty?ship.moveUp():ship.vibrate())),state.pressedKeys.down&&(shipLocation=ship.getPosition(),448==shipLocation[1]?isUpEmpty=!1:(shipLocation[1]+=64,isUpEmpty=!0,obstacleList.map(e=>{obstacleLocation=e.getLocation(),obstacleLocation[0]==shipLocation[0]&&obstacleLocation[1]==shipLocation[1]&&(isUpEmpty=!1)}),isUpEmpty?ship.moveDown():ship.vibrate())),state.pressedKeys.left&&(shipLocation=ship.getPosition(),0==shipLocation[0]?isUpEmpty=!1:(shipLocation[0]-=64,isUpEmpty=!0,obstacleList.map(e=>{obstacleLocation=e.getLocation(),obstacleLocation[0]==shipLocation[0]&&obstacleLocation[1]==shipLocation[1]&&(isUpEmpty=!1)}),isUpEmpty?ship.moveLeft():ship.vibrate())),state.pressedKeys.right&&(shipLocation=ship.getPosition(),704==shipLocation[0]?isUpEmpty=!1:(shipLocation[0]+=64,isUpEmpty=!0,obstacleList.map(e=>{obstacleLocation=e.getLocation(),obstacleLocation[0]==shipLocation[0]&&obstacleLocation[1]==shipLocation[1]&&(isUpEmpty=!1)}),isUpEmpty?ship.moveRight():ship.vibrate())),currentTime=(new Date).getTime(),(delta=currentTime-lastTime)>interval)if(cx.clearRect(0,0,cw,ch),background.render(),"start_menu"===gameState.state)textInterface.renderStart();else if("end"===gameState.state)textInterface.renderEnd();else if("dead"===gameState.state)score=game.getScore(),textInterface.renderDead(score);else if("playing"===gameState.state){if(score=game.getScore(),textInterface.renderInfoPanel(score),ship.render(),obstacleList.map(e=>e.render()),(currentLevelTicker-=1)<0){ship.moveBack(obstacleList),obstacleList.map(e=>e.moveBack()),currentLevelTicker=levelTicker,game.addScore(10),ship.isDead()&&(gameState.state="dead");let e=new Obstacle(cx);e.x=704,e.y=64*Math.floor(8*Math.random()),obstacleList.push(e)}lastTime=currentTime-delta%interval}}function loadImage(e){return new Promise(t=>{let a=new Image;a.onload=(()=>t(a)),a.src=e})}window.addEventListener("keydown",keydown,!1),window.addEventListener("keyup",keyup,!1),window.addEventListener("click",onClick,!1),Promise.all([loadImage("assets/images/spritesheet.png")]).then(()=>{gameLoop()});