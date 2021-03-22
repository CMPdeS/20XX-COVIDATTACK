var gameState = 
  {
    stages:[
      {
        stage: 1,
        time: 0,
        NPCs: {total: 0, initInfected: 0, maxInfected: 0, endInfected: 0},
        playerState: 0,
        items: {vaccines: 0, masks: 0, antispectics: 0, ambulances: 0}
      }
    ],
    player: {
      items: {vaccines: 0, masks: 0, antispectics: 0},
      state: 1,
      x: 0,
      y: 0
    },
    NPCs: {
      count: 0,
      x: [],
      y: [],
      speed: []
    },
    healthyNPCs: [],
    infectedNPCs: [],
    barrierCount: 0,
    healthyBarriers: [],
    infectedBarriers: [],
    currentStage: 1,
    nextAmbulance: 0,
    world: {x: 1600, y: 800}
  };

function preload(){
  //TODO carrega sprites iniciais
}


function setup() {
  //TODO setup inicial do jogo
  createCanvas(gameState.world.x, gameState.world.y);
  background(220);
}

function draw() {
  //TODO main thread que realiza o controle do jogo e desenha elementos
  checkGroups();
  checkThrowables();
  checkAmbulance();
  checkState();
}

/*
  método responsável por verificar todos os elementos de disparo
*/
function checkThrowables(){
  checkVaccineThrown();
  checkMaskThrown();
  checkAntisepticThrown();
  checkCoughing();
  checkSneezing();
}


function checkGroups(){
  //TODO código de controle dos grupos de NPCs, herói, barreiras
}

function checkVaccineThrown(){
  //TODO código de controle do disparo de vacinas
}


function checkMaskThrown(){
  //TODO código de controle do disparo de máscaras
}


function checkAntisepticThrown(){
  //TODO código de controle do disparo de alcool gel
}


function checkCoughing(){
  //TODO código de controle da tosse dos NPCs
}

function checkSneezing(){
  //TODO código de controle dos espirros dos NPCs
}

function checkAmbulance(){
  //TODO código de controle da passagem da ambulância
  
}

function checkState(){
  //TODO código de controle do estado geral do jogo: estágio, gameover, stats da jogada
}
