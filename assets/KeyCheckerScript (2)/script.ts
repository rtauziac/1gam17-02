class KeyCheckerScriptBehavior extends Sup.Behavior {
  public keyHalfWidth = 0.18
  
  fingers: Sup.Actor[] = new Array<Sup.Actor>()
  keys: Sup.Actor[] = new Array<Sup.Actor>()
  
  awake() {
    let weakthis = this;
    // Get all fingers
      // Left hand
    let lh = Sup.getActor("LeftHand")
    lh.getChild("Fingers").getChildren().forEach(function(fingerlh, indexlh, arrlh){
      weakthis.fingers.push(fingerlh);
    })
      // Right hand
    let rh = Sup.getActor("RightHand")
    rh.getChild("Fingers").getChildren().forEach(function(fingerrh, indexrh, arrrh){
      weakthis.fingers.push(fingerrh);
    })
    // Get all keys
    let k = Sup.getActor("Keyboard")
    k.getChildren().forEach(function(keyk, indexk, arrk){
      weakthis.keys.push(keyk);
    })
    Sup.log("There is " + this.fingers.length + " fingers.");
    Sup.log("There is " + this.keys.length + " keys.");
  }

  update() {
    let weakthis = this;
    let i = 0;
    this.keys.forEach(function(key, kindex, arr1) {
      key.setEulerX(0);
      let keyBehavior = key.getBehavior(KeyScriptBehavior);
      
      keyBehavior.release();
      weakthis.fingers.forEach(function(finger, findex, arr2) {
        let keypos = key.getPosition();
        let fingerpos = finger.getPosition();
        if (fingerpos.y < 0.02 && keypos.x + 0.18 > fingerpos.x && keypos.x - 0.18 < fingerpos.x) {
          key.setEulerX(0.1);
          keyBehavior.press();
        }
      })
      
      keyBehavior.proceedSound();
    })
  }
}
Sup.registerBehavior(KeyCheckerScriptBehavior);
