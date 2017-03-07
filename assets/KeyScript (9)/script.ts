class KeyScriptBehavior extends Sup.Behavior {
  keyHeight: string = "c3"
  pressed: boolean = false
  prevpressed: boolean = false
  sound: Sup.Audio.SoundPlayer
  
  awake() {
    let keyName = "Sounds/Organ " + this.keyHeight;
    let sound = Sup.get(keyName, Sup.Sound);
    this.sound = new Sup.Audio.SoundPlayer(sound, 1, {loop: true});
  }
  
  public press() {
    this.pressed = true;
  }
  
  public release() {
    this.pressed = false;
  }
  
  public proceedSound() {
    if (this.prevpressed != this.pressed) {
      this.pressed ? this.sound.play() : this.sound.stop();
      this.prevpressed = this.pressed;
    }
  }
}
Sup.registerBehavior(KeyScriptBehavior);
