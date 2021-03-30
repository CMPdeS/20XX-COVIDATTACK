// A simple Particle class
let Particle = function(position) {
  this.acceleration = createVector(0, 0.05);
  
  var x = random(2, 5);
  var y = random(2, -2);
  var dslx = 0;
  var dsly = 0;
  if(gameState.player.sprites){
    switch(gameState.player.sprites.getAnimationLabel()){
      case 'up':
      case 'throwUp':
        x = random(-1, 1);
        y = random(-2, -5);
        dsly = -15;
        break;
      case 'down':
      case 'throwDown':
        x = random(-1, 1);
        y = random(3, 1);
        dsly = 15;
        break;
      case 'left':
      case 'throwLeft':
        x = random(-2, -5);
        y = random(2, -2);
        dslx = -10;
        break;
      case 'right':
      case 'throwRight':
        x = random(2, 5);
        y = random(2, -2);
        dslx = 10;
        break;
      default:
        break;
    } 
  }
  this.velocity = createVector(x, y);
  //this.velocity = createVector(random(2, 5), random(2, -2));
  this.position = position.copy();
  if(gameState.player.sprites)
    this.position = createVector(gameState.player.sprites.position.x+dslx, gameState.player.sprites.position.y+dsly);
  switch(particleEmmiter.behavior){
    case ParticleBehavior.antiseptic:
      this.lifespan = 100;
      break;
    case ParticleBehavior.virus:
      this.lifespan = 40;
      break;
  }
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};

// Method to display
Particle.prototype.display = function() {
  stroke(random(1,256), random(1,256), random(1,256), this.lifespan);
  strokeWeight(2);
  fill(random(1,256), random(1,256), random(1,256), this.lifespan*4);
  var wdt = 10;
  var hgt = 5;
  if(gameState.player.sprites){
    switch(gameState.player.sprites.getAnimationLabel()){
      case 'up':
      case 'throwUp':
      case 'down':
      case 'throwDown':
        hgt = 10;
        wdt = 5;
        break;
      default:
        break;
    } 
  }
  ellipse(this.position.x, this.position.y, wdt, hgt);
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
  return this.lifespan < 0;
};

//running out
Particle.prototype.fade = function(){
  return this.lifespan -= 5;
};

let ParticleSystem = function(position) {
  this.origin = position.copy();
  if(gameState.player.sprites)
    this.origin = createVector(gameState.player.sprites.position.x, gameState.player.sprites.position.y);
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  for(i=0;i<2;i++)
    this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function() {
  for (let i = this.particles.length-1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};

ParticleSystem.prototype.fade = function() {
for (let i = this.particles.length-1; i >= 0; i--) {
    this.particles[i].fade();
  }
};

ParticleSystem.prototype.stop = function() {
  for (let i = this.particles.length-1; i >= 0; i--) {
    this.particles.splice(i, 1);
  }
};


const ParticleBehavior = Object.freeze({"antiseptic":1, "virus":2});
particleEmmiter = {
  sprayToggle: false,
  behavior: ParticleBehavior.antiseptic,
  particleTimer: 0,
  system: null
};