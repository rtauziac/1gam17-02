class HandScriptBehavior extends Sup.Behavior {
  static width = 1.3
  static keyboardHeight = 0
  static maxHeight = 1.8
  static keyboardWidth = 6.7
  
  public acceleration = 0.001;
  public leftButton = "B"
  public rightButton = "N"
  
  velocity = new Sup.Math.Vector2(0, 0)
  
  awake() {
    
  }

  update() {
    if (Sup.Input.isKeyDown(this.rightButton)) {
      this.velocity = this.velocity.add(this.acceleration*0.5, -this.acceleration*0.7);
    }
    else if (Sup.Input.isKeyDown(this.leftButton)) {
      this.velocity = this.velocity.add(-this.acceleration*0.7, -this.acceleration*0.7);
    }
    else {
      this.velocity = this.velocity.add(0, this.acceleration);
      if (Math.abs(this.velocity.x) <= this.acceleration) {
        this.velocity.x = 0;
      }
      else if (this.velocity.x < 0) {
        this.velocity.x += this.acceleration;
      }
      else  {
        this.velocity.x -= this.acceleration;
      }
    }
    
    this.actor.setY(this.actor.getY() + this.velocity.y);
    this.actor.setX(this.actor.getX() + this.velocity.x);
    
    if (this.actor.getY() > HandScriptBehavior.maxHeight) {
      this.velocity.y = 0;
      this.actor.setY(HandScriptBehavior.maxHeight);
    }
    else if (this.actor.getY() < HandScriptBehavior.keyboardHeight) {
      this.velocity.y = 0;
      this.actor.setY(HandScriptBehavior.keyboardHeight);
    }
    
    if (this.actor.getX() < -HandScriptBehavior.keyboardWidth/2 + HandScriptBehavior.width/2) {
      this.velocity.x = 0;
      this.actor.setX(-HandScriptBehavior.keyboardWidth/2 + HandScriptBehavior.width/2);
    }
    else if (this.actor.getX() > HandScriptBehavior.keyboardWidth/2 - HandScriptBehavior.width/2) {
      this.velocity.x = 0;
      this.actor.setX(HandScriptBehavior.keyboardWidth/2 - HandScriptBehavior.width/2);
    }
    
    this.actor.setEulerX(Math.max(0, (-this.actor.getY() + 0.2) * 1.1))
  }
}
Sup.registerBehavior(HandScriptBehavior);
