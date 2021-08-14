class Music {



  constructor(ctx) {
    this.ctx = ctx;
    this.notes= {
      "a":440,
      "bs":440*Math.pow(2,1/12),
      "b":440*Math.pow(2,2/12),
      "c":440*Math.pow(2,3/12),
      "cs":440*Math.pow(2,4/12),
      "d":440*Math.pow(2,5/12),
      "ds":440*Math.pow(2,6/12),
      "e":440*Math.pow(2,7/12),
      "f":440*Math.pow(2,8/12),
      "fs":440*Math.pow(2,9/12),
      "g":440*Math.pow(2,10/12),
      "gs":440*Math.pow(2,11/12)
     }
    this.isPlaying=false;
    this.tempo = 100.0;
    this.fourth = 60/this.tempo;
    this.half = this.fourth*2;
    this.whole = this.half*2;
    this.eigth = this.fourth/2;
    this.sixteenth = this.eigth/2;
    this.melody = {'note':"",'length':this.eigth,'gain':0.1,'octave':1,'wave':'sine'};
    this.lookahead = 25.0; // How frequently to call scheduling function (in milliseconds)
    this.scheduleAheadTime = 0.1; // How far ahead to schedule audio (sec)
    this.currentNote = 0;
    this.nextNoteTime = 0.0; // when the next note is due.
    /*this.bassNotes=[["d","","d","","d","","d",""],["c","","c","","c","","c",""
  ]]*/
    this.notesToPlay=[
      ["d","","","d"], //[kanal1,kanal2,kanal3,kanal4]
      ["","","",""],
      ["d","","","d"],
      ["e","","",""],
      ["","","","d"],
      ["a","","",""],
      ["f","","","d"],
      ["","","",""],
      ["d","","","d"], //[kanal1,kanal2,kanal3,kanal4]
      ["","","",""],
      ["d","","","d"],
      ["e","","",""],
      ["","","","d"],
      ["a","","",""],
      ["f","","","d"],
      ["","","",""],
      ["d","","","c"], //[kanal1,kanal2,kanal3,kanal4]
      ["","","",""],
      ["d","","","c"],
      ["e","","",""],
      ["","","","c"],
      ["a","","",""],
      ["f","","","c"],
      ["","","",""],
      ["d","","","c"], //[kanal1,kanal2,kanal3,kanal4]
      ["","","",""],
      ["d","","","c"],
      ["e","","",""],
      ["","","","c"],
      ["a","","",""],
      ["f","","","c"],
      ["","","",""],
      ["d","","","bs"], //[kanal1,kanal2,kanal3,kanal4]
      ["","","",""],
      ["d","","","bs"],
      ["","a","",""],
      ["","","","bs"],
      ["","a","",""],
      ["f","","","bs"],
      ["e","","",""],
      ["d","","","bs"], //[kanal1,kanal2,kanal3,kanal4]
      ["","","",""],
      ["d","","","bs"],
      ["","a","",""],
      ["","","","bs"],
      ["","a","",""],
      ["f","","","bs"],
      ["e","","",""],
      ["d","","","a"], //[kanal1,kanal2,kanal3,kanal4]
      ["","","",""],
      ["d","","","a"],
      ["g","","",""],
      ["","","","a"],
      ["g","","",""],
      ["e","","","a"],
      ["d","","",""],
      ["d","","","c"], //[kanal1,kanal2,kanal3,kanal4]
      ["","","",""],
      ["d","","","c"],
      ["g","","",""],
      ["","","","c"],
      ["g","","",""],
      ["e","","","c"],
      ["d","","",""]
      ];
  }
 
  play(){
    this.isPlaying=true;
    if (this.ctx.state === 'suspended') {
        this.ctx.resume();
    }
    this.scheduler();
  }

  playMove(){
    console.log("");
  }

  nextNote() {
    // Advance the beat number, wrap to zero
    if (this.currentNote === this.notesToPlay.length-1) {
        this.currentNote = 0;
    }else {
        this.currentNote++;
    }
    this.nextNoteTime += this.eigth; // Add beat length to last beat time
}

stopPlaying(){
    this.isPlaying=false;
    this.currentNote=0
    this.ctx.suspend()
    this.nextNoteTime=this.eight;
}



scheduler() {
    // while there are notes that will need to play before the next interval, schedule them and advance the pointer.
    while (this.nextNoteTime < this.ctx.currentTime + this.scheduleAheadTime && this.isPlaying) { 
        for (let i=0;i<4;i++){
          if (i==0){
            this.melody.note=this.notesToPlay[this.currentNote][i];
            this.melody.wave="sine";
            this.melody.octave=1;
            this.melody.length=this.notesToPlay[this.currentNote][i].length;
            this.playNote(this.melody,this.nextNoteTime);
          }
          
          if (i==1){
            this.melody.note=this.notesToPlay[this.currentNote][i];
            this.melody.wave="sine";
            this.melody.octave=2;
            this.melody.length=this.notesToPlay[this.currentNote][i].length;
            this.playNote(this.melody,this.nextNoteTime);
          }
          
          if (i==2){
            this.melody.note=this.notesToPlay[this.currentNote][i];
            this.melody.length=this.notesToPlay[this.currentNote][i].length;
            this.playNote(this.melody,this.nextNoteTime);
          }
          
          if (i==3){
            this.melody.note=this.notesToPlay[this.currentNote][i];
            this.melody.octave=-2;
            this.melody.wave="triangle";
            this.melody.length=this.notesToPlay[this.currentNote][i].length;
            this.playNote(this.melody,this.nextNoteTime);
          }
            
        }
        
        this.nextNote();
    }
    let timerID = window.setTimeout(this.scheduler.bind(this), this.lookahead);
    
}

playNote(instrument,time) {

    if (instrument.note != ""){
        let osc = this.ctx.createOscillator();
        let filter = this.ctx.createBiquadFilter();
        filter.type="bandpass";
        filter.frequency.value=200;
        osc.type=instrument.wave;
        osc.frequency.setValueAtTime(this.notes[instrument.note]*1/Math.pow(2,(1-instrument.octave)),this.ctx.currentTime);
        let amp = this.ctx.createGain();
        amp.gain.setValueAtTime(0.5, this.ctx.currentTime);
        amp.gain.setTargetAtTime(0,this.ctx.currentTime,0.2);
        filter.connect(amp);
        amp.connect(this.ctx.destination)
        osc.connect(filter);
        osc.start(time);
        osc.stop(time + instrument.length);
    }
}
}