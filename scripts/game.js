function preload(){
  //TODO carrega sprites iniciais
  loadSprites();
}

function setup() {
  //TODO setup inicial do jogo
  //partcile setup
  particleEmmiter.system = new ParticleSystem(createVector(width/2, height/2));
  thermoEmmiter.device = new ThermoDevice(createVector(width/2, height/2));
  createCanvas(gameState.world.width, gameState.world.height);
}

function draw() {
  //TODO main thread que realiza o controle do jogo e desenha elementos
  checkState();
  drawSprites();
  if(gameState.currentStage >0 && gameState.currentStage < 99) 
    time();
}