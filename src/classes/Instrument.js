class Instrument {
    constructor(wave,attackTime,releaseTime,noteLength,vibratoAmount,vibratoSpeed,octave,volume,note=0){
        this.wave=wave;
        this.attackTime=attackTime;
        this.releaseTime=releaseTime;
        this.noteLength=noteLength;
        this.vibratoAmount=vibratoAmount;
        this.vibratoSpeed=vibratoSpeed;
        this.octave=octave;
        this.volume=volume;
        this.note=note;
    }


}