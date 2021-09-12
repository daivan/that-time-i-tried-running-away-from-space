class Music {
  constructor(ctx){
      this.ctx=ctx;
      this.notes = {
          "a": 440,
          "bs": 440 * Math.pow(2, 1 / 12),
          "b": 440 * Math.pow(2, 2 / 12),
          "c": 440 * Math.pow(2, 3 / 12),
          "cs": 440 * Math.pow(2, 4 / 12),
          "d": 440 * Math.pow(2, 5 / 12),
          "ds": 440 * Math.pow(2, 6 / 12),
          "e": 440 * Math.pow(2, 7 / 12),
          "f": 440 * Math.pow(2, 8 / 12),
          "fs": 440 * Math.pow(2, 9 / 12),
          "g": 440 * Math.pow(2, 10 / 12),
          "gs": 440 * Math.pow(2, 11 / 12)
        };
      this.isPlaying = false;
      this.tempo = 220.0;
      this.fourth = 60 / this.tempo;
      this.half = this.fourth * 2;
      this.whole = this.half * 2;
      this.eigth = this.fourth / 2;
      this.sixteenth = this.eigth / 2;
      this.lookahead = 25.0; // How frequently to call scheduling function (in milliseconds)
      this.scheduleAheadTime = 0.1; // How far ahead to schedule audio (sec)
      this.currentNote = 0;
      this.nextNoteTime = 0.0; // when the next note is due.
      this.instruments=[
        new Instrument("sine",0.2,0.2,0.2,0,10,-1,0.8),
        new Instrument("triangle",0.2,0.2,0.2,0,10,2,0.8),
        new Instrument("square",0.04,0.04,0.2,3.5,10,1,0.4),
      ];
      this.masterVolume= ctx.createGain();
      this.masterVolume.connect(ctx.destination);
      this.masterVolume.gain.value = 0.05;
      this.snareBuffer=this.snareDrumNoiceBuffer();
      this.songSection=0
      this.songSections= [
        "intro",
        "intro2",
        "verse",
        "verse",
        "verse",
        "verse",
        "bridge",
        "chorus",
        "verse",
        "verse"
      ]

      this.notesBassVerse = ["f","g","d","c"];
      this.notesBassBridge = "bs";
      this.notesBassChorus = ["f", "g","bs","c"];
      this.notesHigh = [
        ["g","a","c","e"],
        ["f","a","c","e"],
        ["d","f","a","e"],
        ["f","a","c","e"]
      ]
      this.drumControl=0;
      this.drumNotes = ["b","","s","","b","b","s",""];


      this.notesLeadVerse=[
        new Note("f",this.half), 
        "",
        "",
        "",
        new Note("d",this.fourth), 
        "",
        new Note("c",this.half+this.fourth),
        "",
        "", 
        "",
        "",
        "",
        new Note("d",this.fourth), 
        "",
        new Note("g",this.half+this.fourth),
        "",
        "", 
        "",
        "",
        "",
        new Note("d",this.fourth), 
        "",
        new Note("c",this.half+this.fourth),
        "",
        "", 
        "",
        "",
        "",
        new Note("d",this.fourth), 
        "",
        new Note("a",this.half+this.whole,2),
        "",
        "", 
        "",
        "",
        "",
        "", 
        "",
        "",
        "",
        "", 
        "",
        new Note("c",this.fourth,2),
        "",
        new Note("a",this.fourth,2),
        "",
        new Note("g",this.whole),
        "",
        "",
        "",
        "",
        "",
        "", 
        "",
        new Note("f",this.half+this.fourth),
        "",
        "", 
        "",
        "",
        "",
        new Note("e",this.half),
        "",
        "",
        "",
      ]

      this.notesLeadBridge = [
        new Note("d",this.fourth+this.eigth),
        "",
        "",
        new Note("a",this.fourth+this.eigth,2),
        "",
        "",
        new Note("f",this.fourth),
        "",
        new Note("d",this.fourth+this.eigth),
        "",
        "",
        new Note("a",this.fourth+this.eigth,2),
        "",
        "",
        new Note("f",this.fourth),
        "",
        new Note("d",this.fourth+this.eigth),
        "",
        "",
        new Note("a",this.fourth+this.eigth,2),
        "",
        "",
        new Note("f",this.fourth),
        "",
        new Note("d",this.fourth+this.eigth),
        "",
        "",
        new Note("a",this.fourth+this.eigth,2),
        "",
        "",
        new Note("f",this.fourth),
        ""
      ]

      this.notesLeadChorus = [
        new Note("d",this.fourth+this.eigth),
        "",
        "",
        new Note("a",this.fourth+this.eigth,2),
        "",
        "",
        new Note("f",this.fourth),
        "",
        new Note("d",this.fourth+this.eigth),
        "",
        "",
        new Note("a",this.fourth+this.eigth,2),
        "",
        "",
        new Note("f",this.fourth),
        "",
        new Note("f",this.fourth+this.eigth),
        "",
        "",
        new Note("c",this.fourth+this.eigth,2),
        "",
        "",
        new Note("a",this.fourth,2),
        "",
        new Note("f",this.fourth+this.eigth),
        "",
        "",
        new Note("c",this.fourth+this.eigth,2),
        "",
        "",
        new Note("a",this.fourth,2),
        "",
        new Note("f",this.fourth+this.eigth), //hälften
        "",
        "",
        new Note("c",this.fourth+this.eigth,2),
        "",
        "",
        new Note("a",this.fourth,2),
        "",
        new Note("f",this.fourth+this.eigth),
        "",
        "",
        new Note("c",this.fourth+this.eigth,2),
        "",
        "",
        new Note("a",this.fourth,2),
        "",
        new Note("bs",this.fourth+this.eigth,2),
        "",
        "",
        new Note("a",this.fourth+this.eigth,2),
        "",
        "",
        new Note("f",this.fourth),
        "",
        new Note("bs",this.fourth+this.eigth,2),
        "",
        "",
        new Note("a",this.fourth+this.eigth,2),
        "",
        "",
        new Note("f",this.fourth),
        ""
      ]

      
  }

  play() {
    this.isPlaying = true;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    console.log("play")
    this.scheduler();
  }

  nextNote() {

    if (this.currentNote % 2 == 0) this.drumControl++;
    if (this.drumControl >= this.drumNotes.length) this.drumControl=0;
    if (this.currentNote === this.notesLeadVerse.length - 1 || this.currentNote === 31 && this.songSections[this.songSection] == "bridge") {
      this.currentNote = 0;
      this.songSection++;
      if (this.songSection > this.songSections.length-1) this.songSection=0;
    } else {
      this.currentNote++;
    }
    this.nextNoteTime += this.eigth; 
  }


  stop() {
    this.isPlaying = false;
    this.currentNote = 0
    this.ctx.suspend()
    this.nextNoteTime = 0;
  }



  scheduler() {
    while (this.nextNoteTime < this.ctx.currentTime + this.scheduleAheadTime && this.isPlaying) {
      this.checkBassToPlay();
      this.checkHighToPlay();
      this.checkLeadToPlay();
      this.checkDrumToPlay();


      this.nextNote();
    }
    if (this.isPlaying) {
      let timerID = window.setTimeout(this.scheduler.bind(this), this.lookahead);
    }

  }

  checkBassToPlay(){
    if (this.currentNote % 2 == 0){
      if (this.songSections[this.songSection] == "verse" || this.songSections[this.songSection] == "intro" || this.songSections[this.songSection] == "intro2"){
        this.instruments[0].note = this.notesBassVerse[Math.floor(this.currentNote / 16)];
      } else if (this.songSections[this.songSection] == "chorus"){
        this.instruments[0].note = this.notesBassChorus[Math.floor(this.currentNote / 16)];
      } else {
        this.instruments[0].note = this.notesBassBridge;
      }
      this.playNote(this.instruments[0], this.nextNoteTime);
    }
  }

  checkHighToPlay(){
    this.instruments[1].note = this.notesHigh[Math.floor(this.currentNote / 16)][this.currentNote % 4];
    this.playNote(this.instruments[1], this.nextNoteTime);
  }

  checkLeadToPlay(){
    if (this.songSections[this.songSection] == "verse" && this.notesLeadVerse[this.currentNote] != ""){
      this.instruments[2].note = this.notesLeadVerse[this.currentNote].note;
      this.instruments[2].noteLength = this.notesLeadVerse[this.currentNote].length;
      this.instruments[2].octave = this.notesLeadVerse[this.currentNote].octave;
      this.playNote(this.instruments[2], this.nextNoteTime);
    } else if (this.songSections[this.songSection] == "bridge" && this.notesLeadBridge[this.currentNote] != ""){
      this.instruments[2].note = this.notesLeadBridge[this.currentNote].note;
      this.instruments[2].noteLength = this.notesLeadBridge[this.currentNote].length;
      this.instruments[2].octave = this.notesLeadBridge[this.currentNote].octave;
      this.playNote(this.instruments[2], this.nextNoteTime);
    } else if (this.songSections[this.songSection] == "chorus" && this.notesLeadChorus[this.currentNote] != ""){
      this.instruments[2].note = this.notesLeadChorus[this.currentNote].note;
      this.instruments[2].noteLength = this.notesLeadChorus[this.currentNote].length;
      this.instruments[2].octave = this.notesLeadChorus[this.currentNote].octave;
      this.playNote(this.instruments[2], this.nextNoteTime);
    } 
  }

  checkDrumToPlay(){
    if (this.songSections[this.songSection] != "intro"){
      if (this.currentNote % 2 == 0){
        if (this.drumNotes[this.drumControl] != ""){
          if (this.drumNotes[this.drumControl] == "b") {
            this.baseDrum(this.nextNoteTime);
          } else this.snareDrum(this.nextNoteTime);
        }
      }
    }
  }

  playNote(instrument, time) {

    if (instrument.note != "") {
      const volume=this.ctx.createGain();
      volume.gain.value=1;
      volume.connect(this.masterVolume);
      const sustainLevel = instrument.volume;
      const osc = this.ctx.createOscillator();
      const noteGain=this.ctx.createGain();
      noteGain.gain.setValueAtTime(0, 0);
      noteGain.gain.linearRampToValueAtTime(sustainLevel, this.ctx.currentTime + instrument.noteLength * instrument.attackTime);
      let startTime = this.ctx.currentTime + instrument.noteLength - instrument.noteLength * instrument.releaseTime;
      if (startTime > 0) noteGain.gain.setValueAtTime(sustainLevel, startTime);
      else noteGain.gain.setValueAtTime(sustainLevel, 0);
      noteGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + instrument.noteLength);

      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(instrument.vibratoAmount, 0);
      lfoGain.connect(osc.frequency)

      const lfo = this.ctx.createOscillator();
      lfo.frequency.setValueAtTime(instrument.vibratoSpeed, 0);
      lfo.start(0);
      lfo.stop(this.ctx.currentTime + instrument.noteLength);
      lfo.connect(lfoGain); 

      osc.type = instrument.wave;
      osc.frequency.setValueAtTime(this.notes[instrument.note] * 1 / Math.pow(2, (1 - instrument.octave)), 0);
      osc.start(time);
      osc.stop(time + instrument.noteLength);
      osc.connect(noteGain);

      noteGain.connect(volume);
    }
  }

  baseDrum(time) {
    const osc = this.ctx.createOscillator();
    osc.frequency.setValueAtTime(100,time);
    const gain = this.ctx.createGain();

    osc.connect(gain);
    gain.connect(this.masterVolume);
    gain.gain.setValueAtTime(2,time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);
    osc.start(time);
    osc.stop(time+0.15 );
  }

  snareDrumNoiceBuffer() {
    const bufferSize = this.ctx.sampleRate * 0.1;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    let data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  snareDrum(time){
    let noise = this.ctx.createBufferSource();
    noise.buffer = this.snareBuffer;
    let bandpass = this.ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.value = 1000;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(2,time);
    noise.connect(bandpass).connect(gain).connect(this.masterVolume);
    noise.start(time);
  }
  
}