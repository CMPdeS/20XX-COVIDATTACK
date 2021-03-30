thermoEmmiter = {
  toggle: false,
  device: null
};

let ThermoDevice = function(position) {
  this.origin = position.copy();
  if(gameState.player.sprites)
    this.origin = createVector(gameState.player.sprites.position.x, gameState.player.sprites.position.y);
    this.points = []
}

let Point = function(position){
  this.position = position.copy();
}

ThermoDevice.prototype.activate = function(){
  let dslx = 0;
  let dsly = 0;
  let varx = 0;
  let vary = 0;
  if(gameState.player.sprites){
    switch(gameState.player.sprites.getAnimationLabel()){
      case 'up':
      case 'throwUp':
        dsly = -15;
        varx = 30;
        break;
      case 'down':
      case 'throwDown':
        dsly = 15;
        varx = 30;
        break;
      case 'left':
      case 'throwLeft':
        dslx = -15;
        vary = 30;
        break;
      case 'right':
      case 'throwRight':
        dslx = 15;
        vary = 30;
        break;
      default:
        break;
    } 
  }
  x = gameState.player.sprites.position.x +dslx;
  y = gameState.player.sprites.position.y +dsly;
  dslx*=10;
  dsly*=10;
  stroke(random(1,256), 0, random(1,256), random(1,150));
  strokeWeight(2);
  fill(random(1,256), 0, random(1,256), random(1,150));
  this.points = [];
  this.points.push(createVector(x, y));
  this.points.push(createVector(x+dslx+varx, y+dsly+vary));
  this.points.push(createVector(x+dslx-varx, y+dsly-vary));
  
  triangle(this.points[0].x, this.points[0].y, this.points[1].x, this.points[1].y, this.points[2].x, this.points[2].y);
}