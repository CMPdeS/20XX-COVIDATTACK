//init params
var xT = 350;
var yT = 800;
var infectionChance;
var defaultRadius = 20;
var infectedSprite = 0;
var maxVelocity = 10;
var infectedPercentage = 0.05;
var minAmbulanceTime = 300;
var maxAmbulanceTime = 500;
var barrierCount = 24;
var randomSprite;
var ambulanceCollide = false;
const ItemDrop = Object.freeze({"vaccine":1, "mask":2, "antiseptic":3, "thermo":4});
const GameOverReason = Object.freeze({"infectedNPC":1, "infectedBarrier":2, "allInfected":3});

var gameState = 
  {
    stages:[
      {
        stage: 0
      },
      {
        stage: 1,
        time: 0,
        barrierCount:0,
        ambulanceCollide: false,
        NPCs: {total: 0, initInfected: 0, maxInfected: 0, endInfected: 0},
        playerState: 0,
        items: {vaccines: 0, masks: 0, antispectics: 0, ambulances: 0}
      },
      {
        stage: 2,
        time: 0,
        barrierCount:10,
        ambulanceCollide: false,
        NPCs: {total: 0, initInfected: 0, maxInfected: 0, endInfected: 0},
        playerState: 0,
        items: {vaccines: 0, masks: 0, antispectics: 0, ambulances: 0}
      },
      {
        stage: 3,
        time: 0,
        barrierCount:20,
        ambulanceCollide: false,
        NPCs: {total: 0, initInfected: 0, maxInfected: 0, endInfected: 0},
        playerState: 0,
        items: {vaccines: 0, masks: 0, antispectics: 0, ambulances: 0}
      },
      {
        stage: 4,
        time: 0,
        barrierCount:25,
        ambulanceCollide: true,
        NPCs: {total: 0, initInfected: 0, maxInfected: 0, endInfected: 0},
        playerState: 0,
        items: {vaccines: 0, masks: 0, antispectics: 0, ambulances: 0}
      },
      {
        stage: 5,
        time: 0,
        barrierCount:35,
        ambulanceCollide: true,
        NPCs: {total: 0, initInfected: 0, maxInfected: 0, endInfected: 0},
        playerState: 0,
        items: {vaccines: 0, masks: 0, antispectics: 0, ambulances: 0}
      }
    ],
    player: {
      items: {vaccines: 0, masks: 0, antispectics: 0},
      state: 1
    },
    NPCsCount: 20,
    infectedPercentage: 0,
    infectedCount: -1,
    NPCs: [],
    healthyNPCs: null,
    infectedNPCs: null,
    immunizedNPCs: null,
    barrierCount: 0,
    barriers: [],
    healthyBarriers: null,
    infectedBarriers: null,
    currentStage: 0,
    stageChange: false,
    nextAmbulance: 0,
    ambulanceTime: 0,
    stageTime: 0,
    gameOverReason: 0,
    gameOverSprite: null,
    world: {width: 1600, height: 800}
  };

function preload(){
  //TODO carrega sprites iniciais
  loadSprites();
}

function loadSprites(){
  gameState.NPCWalker = 
    [{
      up: loadAnimation(loadSpriteSheet('assets/NPCs/VIRUS/virus_up.png', 39, 38, 3)), 
      down: loadAnimation(loadSpriteSheet('assets/NPCs/VIRUS/virus_down.png', 39, 38, 3)),
      left: loadAnimation(loadSpriteSheet('assets/NPCs/VIRUS/virus_left.png', 39, 40, 3)),
      right: loadAnimation(loadSpriteSheet('assets/NPCs/VIRUS/virus_right.png', 39, 40, 3)),
      upMask: loadAnimation(loadSpriteSheet('assets/NPCs/VIRUS/virus_up.png', 39, 38, 3)), 
      downMask: loadAnimation(loadSpriteSheet('assets/NPCs/VIRUS/virus_down_mask.png', 39, 38, 3)),
      leftMask: loadAnimation(loadSpriteSheet('assets/NPCs/VIRUS/virus_left_mask.png', 39, 40, 3)),
      rightMask: loadAnimation(loadSpriteSheet('assets/NPCs/VIRUS/virus_right_mask.png', 39, 40, 3))
     },
     {
      up: loadAnimation(loadSpriteSheet('assets/NPCs/NPC01/NPC_1_up.png', 39, 38, 3)), 
      down: loadAnimation(loadSpriteSheet('assets/NPCs/NPC01/NPC_1_down.png', 39, 38, 3)),
      left: loadAnimation(loadSpriteSheet('assets/NPCs/NPC01/NPC_1_left.png', 39, 40, 3)),
      right: loadAnimation(loadSpriteSheet('assets/NPCs/NPC01/NPC_1_right.png', 39, 40, 3)),
      upMask: loadAnimation(loadSpriteSheet('assets/NPCs/NPC01/NPC_1_up.png', 39, 38, 3)), 
      downMask: loadAnimation(loadSpriteSheet('assets/NPCs/NPC01/NPC_1_down_mask.png', 39, 38, 3)),
      leftMask: loadAnimation(loadSpriteSheet('assets/NPCs/NPC01/NPC_1_left_mask.png', 39, 40, 3)),
      rightMask: loadAnimation(loadSpriteSheet('assets/NPCs/NPC01/NPC_1_right_mask.png', 39, 40, 3))
    },
    {
      up: loadAnimation(loadSpriteSheet('assets/NPCs/NPC02/NPC_2_up.png', 39, 38, 3)), 
      down: loadAnimation(loadSpriteSheet('assets/NPCs/NPC02/NPC_2_down.png', 39, 38, 3)),
      left: loadAnimation(loadSpriteSheet('assets/NPCs/NPC02/NPC_2_left.png', 39, 40, 3)),
      right: loadAnimation(loadSpriteSheet('assets/NPCs/NPC02/NPC_2_right.png', 39, 40, 3)),
      upMask: loadAnimation(loadSpriteSheet('assets/NPCs/NPC02/NPC_2_up.png', 39, 38, 3)), 
      downMask: loadAnimation(loadSpriteSheet('assets/NPCs/NPC02/NPC_2_down_mask.png', 39, 38, 3)),
      leftMask: loadAnimation(loadSpriteSheet('assets/NPCs/NPC02/NPC_2_left_mask.png', 39, 40, 3)),
      rightMask: loadAnimation(loadSpriteSheet('assets/NPCs/NPC02/NPC_2_right_mask.png', 39, 40, 3))
    },
    {
      up: loadAnimation(loadSpriteSheet('assets/NPCs/NPC03/NPC_3_up.png', 39, 38, 3)), 
      down: loadAnimation(loadSpriteSheet('assets/NPCs/NPC03/NPC_3_down.png', 39, 38, 3)),
      left: loadAnimation(loadSpriteSheet('assets/NPCs/NPC03/NPC_3_left.png', 39, 40, 3)),
      right: loadAnimation(loadSpriteSheet('assets/NPCs/NPC03/NPC_3_right.png', 39, 40, 3)),
      upMask: loadAnimation(loadSpriteSheet('assets/NPCs/NPC03/NPC_3_up.png', 39, 38, 3)), 
      downMask: loadAnimation(loadSpriteSheet('assets/NPCs/NPC03/NPC_3_down_mask.png', 39, 38, 3)),
      leftMask: loadAnimation(loadSpriteSheet('assets/NPCs/NPC03/NPC_3_left_mask.png', 39, 40, 3)),
      rightMask: loadAnimation(loadSpriteSheet('assets/NPCs/NPC03/NPC_3_right_mask.png', 39, 40, 3))
    },
    {
      up: loadAnimation(loadSpriteSheet('assets/NPCs/NPC04/NPC_4_up.png', 39, 38, 3)), 
      down: loadAnimation(loadSpriteSheet('assets/NPCs/NPC04/NPC_4_down.png', 39, 38, 3)),
      left: loadAnimation(loadSpriteSheet('assets/NPCs/NPC04/NPC_4_left.png', 39, 40, 3)),
      right: loadAnimation(loadSpriteSheet('assets/NPCs/NPC04/NPC_4_right.png', 39, 40, 3)),
      upMask: loadAnimation(loadSpriteSheet('assets/NPCs/NPC04/NPC_4_up.png', 39, 38, 3)), 
      downMask: loadAnimation(loadSpriteSheet('assets/NPCs/NPC04/NPC_4_down_mask.png', 39, 38, 3)),
      leftMask: loadAnimation(loadSpriteSheet('assets/NPCs/NPC04/NPC_4_left_mask.png', 39, 40, 3)),
      rightMask: loadAnimation(loadSpriteSheet('assets/NPCs/NPC04/NPC_4_right_mask.png', 39, 40, 3))
    },
    {
      up: loadAnimation(loadSpriteSheet('assets/NPCs/NPC05/NPC_5_up.png', 39, 38, 3)), 
      down: loadAnimation(loadSpriteSheet('assets/NPCs/NPC05/NPC_5_down.png', 39, 38, 3)),
      left: loadAnimation(loadSpriteSheet('assets/NPCs/NPC05/NPC_5_left.png', 39, 40, 3)),
      right: loadAnimation(loadSpriteSheet('assets/NPCs/NPC05/NPC_5_right.png', 39, 40, 3)),
      upMask: loadAnimation(loadSpriteSheet('assets/NPCs/NPC05/NPC_5_up.png', 39, 38, 3)), 
      downMask: loadAnimation(loadSpriteSheet('assets/NPCs/NPC05/NPC_5_down_mask.png', 39, 38, 3)),
      leftMask: loadAnimation(loadSpriteSheet('assets/NPCs/NPC05/NPC_5_left_mask.png', 39, 40, 3)),
      rightMask: loadAnimation(loadSpriteSheet('assets/NPCs/NPC05/NPC_5_right_mask.png', 39, 40, 3))
    },
    {
      up: loadAnimation(loadSpriteSheet('assets/NPCs/NPC06/NPC_6_up.png', 39, 38, 3)), 
      down: loadAnimation(loadSpriteSheet('assets/NPCs/NPC06/NPC_6_down.png', 39, 38, 3)),
      left: loadAnimation(loadSpriteSheet('assets/NPCs/NPC06/NPC_6_left.png', 39, 40, 3)),
      right: loadAnimation(loadSpriteSheet('assets/NPCs/NPC06/NPC_6_right.png', 39, 40, 3)),
      upMask: loadAnimation(loadSpriteSheet('assets/NPCs/NPC06/NPC_6_up.png', 39, 38, 3)), 
      downMask: loadAnimation(loadSpriteSheet('assets/NPCs/NPC06/NPC_6_down_mask.png', 39, 38, 3)),
      leftMask: loadAnimation(loadSpriteSheet('assets/NPCs/NPC06/NPC_6_left_mask.png', 39, 40, 3)),
      rightMask: loadAnimation(loadSpriteSheet('assets/NPCs/NPC06/NPC_6_right_mask.png', 39, 40, 3))
    }
    ];
  gameState.heroWalker=
    {
      up: loadAnimation(loadSpriteSheet('assets/hero/hero_up.png', 16, 18, 4)), 
      down: loadAnimation(loadSpriteSheet('assets/hero/hero_down.png', 16, 18, 4)),
      left: loadAnimation(loadSpriteSheet('assets/hero/hero_left.png', 16, 18, 4)),
      right: loadAnimation(loadSpriteSheet('assets/hero/hero_right.png', 16, 18, 4)),
      throwUp: loadAnimation(loadSpriteSheet('assets/hero/hero_throw_up.png', 16, 18, 2)), 
      throwDown: loadAnimation(loadSpriteSheet('assets/hero/hero_throw_down.png', 16, 18, 2)),
      throwLeft: loadAnimation(loadSpriteSheet('assets/hero/hero_throw_left.png', 16, 18, 2)),
      throwRight: loadAnimation(loadSpriteSheet('assets/hero/hero_throw_right.png', 16, 18, 2))
    };
  
  gameState.ambulanceWalker = loadAnimation('assets/ambulance/ambulance01.png','assets/ambulance/ambulance02.png','assets/ambulance/ambulance03.png');
  
  gameState.vaccineThrower=
    {
      up: loadImage('assets/items/vaccine/vaccine_up.png'), 
      down: loadImage('assets/items/vaccine/vaccine_down.png'),
      left: loadImage('assets/items/vaccine/vaccine_left.png'),
      right: loadImage('assets/items/vaccine/vaccine_right.png')
    };
  gameState.potionThrower=
    {
      up: loadImage('assets/items/potion/potion_up.png'), 
      down: loadImage('assets/items/potion/potion_down.png'),
      left: loadImage('assets/items/potion/potion_left.png'),
      right: loadImage('assets/items/potion/potion_right.png')
    };
  gameState.background = loadImage('assets/tiles/background_stage_01.png');
  gameState.barrierImages = {
     vertical: [
                 loadImage('assets/barriers/vertical/barrier_v_long_1.png'),
                 loadImage('assets/barriers/vertical/barrier_v_long_2.png'),
                 loadImage('assets/barriers/vertical/barrier_v_long_3.png'),
                 loadImage('assets/barriers/vertical/barrier_v_long_4.png')
                ],
     horizontal:[
                 loadImage('assets/barriers/horizontal/barrier_h_long_1.png'),
                 loadImage('assets/barriers/horizontal/barrier_h_long_2.png'),
                 loadImage('assets/barriers/horizontal/barrier_h_long_3.png'),
                 loadImage('assets/barriers/horizontal/barrier_h_long_4.png')
                ],
     short: [
               loadImage('assets/barriers/short/barrier_short_1.png'),
               loadImage('assets/barriers/short/barrier_short_2.png'),
               loadImage('assets/barriers/short/barrier_short_3.png'),
               loadImage('assets/barriers/short/barrier_short_4.png')
            ]
  };
  
  gameState.maskThrower=
    {
      up: loadAnimation(loadSpriteSheet('assets/items/mask/spider_up.png', 11, 10, 6)), 
      down: loadAnimation(loadSpriteSheet('assets/items/mask/spider_down.png', 13, 15,4)),
      left: loadAnimation(loadSpriteSheet('assets/items/mask/spider_left.png', 13, 9, 4)),
      right: loadAnimation(loadSpriteSheet('assets/items/mask/spider_right.png', 13, 9, 4)),
    };
  gameState.transitions = [
    loadImage('assets/transitions/gameover.png'),
    loadImage('assets/transitions/transition01.png'),
    loadImage('assets/transitions/transition02.png'),
    loadImage('assets/transitions/transition03.png'),
    loadImage('assets/transitions/transition04.png'),
    loadImage('assets/transitions/transition05.png'),
    loadImage('assets/transitions/transition06.png'),
    loadImage('assets/transitions/endgame.png')
  ];
}


function setup() {
  //TODO setup inicial do jogo
  createCanvas(gameState.world.width, gameState.world.height);
}

function draw() {
  //TODO main thread que realiza o controle do jogo e desenha elementos
  checkState();
  drawSprites();
}

function move(){
  moveNPCs();
  moveHero();
  moveItem();
  moveAmbulance();
  time();
}

function checks(){
  checkCollisions();
  checkThrowables();
  checkAmbulance(); 
}

function time(){
  gameState.stageTime += 1; gameState.ambulanceTime +=1;
  fill("white");
  textSize(12);
  text('Vaccines: '+gameState.player.items.vaccines,40,height-120);
  text('Masks: '+gameState.player.items.masks,120,height-120);
  text('Antiseptics: '+gameState.player.items.antiseptics,190,height-120);
  text('stageTime: '+gameState.stageTime,40,height-100);
  text('ambulanceTime: '+gameState.ambulanceTime,40,height-80);
  text('nextAmbulance: '+gameState.nextAmbulance, 190, height-80);
  text('current stage: '+gameState.currentStage, 40, height-60);
  if(gameState.infectedNPCs)
    text('Infected Count: '+gameState.infectedNPCs.length +" / "+gameState.infectedCount,190,height-60);
  randomSprite = int(random(1, 5));
  /*fill("black");
  textSize(30);
  text("reset Items"+randomSprite,width/2, height/2);*/
}

function checkAmbulance(){
  if(gameState.nextAmbulance < gameState.ambulanceTime){
    gameState.ambulanceTime = 0;
    gameState.nextAmbulance = int(random(minAmbulanceTime, maxAmbulanceTime));
    gameState.ambulance = createSprite(width,random(40, height-40));
    gameState.ambulance.addAnimation('ambulance',gameState.ambulanceWalker);
    gameState.ambulance.velocity.x = -maxVelocity;
    drop = int(random(1,4));
    /*fill("black");
    textSize(30);
    text("drop" + drop,width/2, height/2);*/
    switch(drop){
      case ItemDrop.vaccine:
        numDrop = int(random(1,3));
        gameState.ambulanceDrop = {item: ItemDrop.vaccine, num:numDrop};
        break;
        case ItemDrop.mask:
        numDrop = int(random(1,6));
        gameState.ambulanceDrop = {item: ItemDrop.mask, num:numDrop};
        break;
      case ItemDrop.antiseptic:
        numDrop = int(random(1,11));
        gameState.ambulanceDrop = {item: ItemDrop.vaccine, num:numDrop};
        break;
      default:
        numDrop = int(random(1,6));
        gameState.ambulanceDrop = {item: ItemDrop.mask, num:numDrop};
        break;
    }
  }
}

function moveAmbulance(){
  if(gameState.ambulance != null){
    /*
    fill("black");
    textSize(30);
    text("ambulancia na tela",width/2, height/2);
    */
    item = {x:0, y:0, velx:0, vely:0};
    item.x = gameState.ambulance.position.x;
    item.y = gameState.ambulance.position.y;
    item.velx = gameState.ambulance.velocity.x;
    item.vely = gameState.ambulance.velocity.y;
  
    item.x += item.velx*0.1;
    item.y += item.vely*0.1;
        
    if(item.x<width/2 && gameState.itemDrop == null){
      
      switch(gameState.ambulanceDrop.item){
        case ItemDrop.vaccine:
          gameState.itemDrop = createSprite(gameState.ambulance.position.x, gameState.ambulance.position.y, 40, 40);
          gameState.itemDrop.addImage(gameState.vaccineThrower.up);
          break;
        case ItemDrop.mask:
          gameState.itemDrop = createSprite(gameState.ambulance.position.x, gameState.ambulance.position.y, 13, 13);
          gameState.itemDrop.scale = 2;
          gameState.itemDrop.addAnimation('up',gameState.maskThrower.up);
          break;
        default:
          break;
      }
    }

    if ((item.x - defaultRadius) < 0){
      gameState.ambulance.remove();
      gameState.ambulance = null; 
    }
    
    if(gameState.ambulance != null){
      gameState.ambulance.position.x = item.x;
      gameState.ambulance.position.y = item.y;
      gameState.ambulance.velocity.x = item.velx;
      gameState.ambulance.velocity.y = item.vely;
    }    
  }
}

function getAmbulanceItem(item, player){
   switch(gameState.ambulanceDrop.item){
        case ItemDrop.vaccine:
          gameState.player.items.vaccines += int(gameState.ambulanceDrop.num);
          if(gameState.player.items.vaccines>2)
            gameState.player.items.vaccines = 2;
          break;
        case ItemDrop.mask:
          gameState.player.items.masks += int(gameState.ambulanceDrop.num);
          if(gameState.player.items.masks>5)
            gameState.player.items.masks = 5;
          break;
        default:
          break;
      }
  gameState.itemDrop.remove();
  gameState.itemDrop = null;
}


function createHero(){
  gameState.player.sprites = createSprite(width/2,height/2);
  gameState.player.sprites.scale = 2;
  gameState.player.sprites.addAnimation('up',gameState.heroWalker.up);
  gameState.player.sprites.addAnimation('down',gameState.heroWalker.down);
  gameState.player.sprites.addAnimation('right',gameState.heroWalker.right);
  gameState.player.sprites.addAnimation('left',gameState.heroWalker.left);
  gameState.player.sprites.addAnimation('throwUp',gameState.heroWalker.throwUp);
  gameState.player.sprites.addAnimation('throwDown',gameState.heroWalker.throwDown);
  gameState.player.sprites.addAnimation('throwRight',gameState.heroWalker.throwRight);
  gameState.player.sprites.addAnimation('throwLeft',gameState.heroWalker.throwLeft);
  gameState.player.sprites.changeAnimation('down');
}

function moveHero(){
  if (keyIsDown(LEFT_ARROW)){
    gameState.player.sprites.position.x-=5;
    gameState.player.sprites.changeAnimation('left');
  }

  if (keyIsDown(RIGHT_ARROW)){
    gameState.player.sprites.position.x+=5;
    gameState.player.sprites.changeAnimation('right');
  }

  if (keyIsDown(UP_ARROW)){
    gameState.player.sprites.position.y-=5;
    gameState.player.sprites.changeAnimation('up');
  }

  if (keyIsDown(DOWN_ARROW)){
    gameState.player.sprites.position.y+=5;
    gameState.player.sprites.changeAnimation('down');
  }
  
  if ((gameState.player.sprites.position.x + defaultRadius) > width) {
      gameState.player.sprites.position.x -= defaultRadius;
    }

    if ((gameState.player.sprites.position.x - defaultRadius) < 0)
      gameState.player.sprites.position.x += defaultRadius;

    if ((gameState.player.sprites.position.y + defaultRadius) > height)
      gameState.player.sprites.position.y -= defaultRadius;

    if ((gameState.player.sprites.position.y - defaultRadius) < 0)
      gameState.player.sprites.position.y += defaultRadius;
}

function keyPressed(){
  switch(keyCode){
    case LEFT_ARROW:
      gameState.player.sprites.animation.play();
      break;
    case RIGHT_ARROW:
      gameState.player.sprites.animation.play();
      break;
    case UP_ARROW:
      gameState.player.sprites.animation.play();
      break;
    case DOWN_ARROW:
      gameState.player.sprites.animation.play();
      break;
      default:
      break;
  }
}

function keyReleased(){
  switch(keyCode){
    case LEFT_ARROW:
      gameState.player.sprites.animation.stop();
      break;
    case RIGHT_ARROW:
      gameState.player.sprites.animation.stop();
      break;
    case UP_ARROW:
      gameState.player.sprites.animation.stop();
      break;
    case DOWN_ARROW:
      gameState.player.sprites.animation.stop();
      break;
      default:
      break;
  }
}

function keyTyped() {
  //if(gameState.itemThrown != null)
  //  return false;
  itemThrown = null;
  switch(key){
    case 'a':
      if(gameState.player.items.antiseptics>0){
        gameState.player.items.antisepctics--;
        gameState.stages[gameState.currentStage].items.antisepctics += 1;
        gameState.itemThrown = createSprite(gameState.player.sprites.position.x, gameState.player.sprites.position.y, 16, 16);
        gameState.itemThrown.scale = 2;
        itemThrown = ItemDrop.antiseptic;
      }
      break;
    case 'm':
      if(gameState.player.items.masks>0){
        gameState.player.items.masks--;
        gameState.stages[gameState.currentStage].items.masks += 1;
        gameState.itemThrown = createSprite(gameState.player.sprites.position.x, gameState.player.sprites.position.y, 13, 10);
        gameState.itemThrown.scale = 2;
        itemThrown = ItemDrop.mask;
      }
      break;
    case 't':
      break;
    case 'v':
      if(gameState.player.items.vaccines>0){
        gameState.player.items.vaccines--;
        gameState.stages[gameState.currentStage].items.vaccines += 1;
        gameState.itemThrown = createSprite(gameState.player.sprites.position.x, gameState.player.sprites.position.y, 40, 40);
        itemThrown = ItemDrop.vaccine;
      }
      break;
    default:
      break;
  }
  if(gameState.itemThrown != null){
     switch(gameState.player.sprites.getAnimationLabel()){
      case 'up':
         gameState.player.sprites.changeAnimation('throwUp');
         switch(itemThrown){
           case ItemDrop.vaccine:
             gameState.itemThrown.addImage(gameState.vaccineThrower.up);
             break;
           case ItemDrop.mask:
             gameState.itemThrown.addAnimation('up', gameState.maskThrower.up);
             break;
           case ItemDrop.antiseptic:
             gameState.itemThrown.addImage(gameState.potionThrower.up);
             break;
         }
         gameState.itemThrown.velocity.y = -maxVelocity;
         break;
      case 'down':
         gameState.player.sprites.changeAnimation('throwDown');
         switch(itemThrown){
           case ItemDrop.vaccine:
             gameState.itemThrown.addImage(gameState.vaccineThrower.down);
             break;
            case ItemDrop.mask:
             gameState.itemThrown.addAnimation('down', gameState.maskThrower.down);
             break;
            case ItemDrop.antiseptic:
             gameState.itemThrown.addImage(gameState.potionThrower.down);
             break;
         }
         gameState.itemThrown.velocity.y = maxVelocity;
         break;
      case 'left':
         gameState.player.sprites.changeAnimation('throwLeft');
         switch(itemThrown){
           case ItemDrop.vaccine:
             gameState.itemThrown.addImage(gameState.vaccineThrower.left);
             break;
            case ItemDrop.mask:
             gameState.itemThrown.addAnimation('left', gameState.maskThrower.left);
             break;
            case ItemDrop.antiseptic:
             gameState.itemThrown.addImage(gameState.potionThrower.left);
             break;
         }
         gameState.itemThrown.velocity.x = -maxVelocity;
         break;
      case 'right':
         gameState.player.sprites.changeAnimation('throwRight');
         switch(itemThrown){
           case ItemDrop.vaccine:
             gameState.itemThrown.addImage(gameState.vaccineThrower.right);
             break;
            case ItemDrop.mask:
             gameState.itemThrown.addAnimation('right', gameState.maskThrower.right);
             break;
            case ItemDrop.antiseptic:
             gameState.itemThrown.addImage(gameState.potionThrower.right);
             break;
         }
         gameState.itemThrown.velocity.x = maxVelocity;
         break;
      case 'throwUp':
         gameState.player.sprites.changeAnimation('throwUp');
         switch(itemThrown){
           case ItemDrop.vaccine:
             gameState.itemThrown.addImage(gameState.vaccineThrower.up);
             break;
            case ItemDrop.mask:
             gameState.itemThrown.addAnimation('up', gameState.maskThrower.up);
             break;
            case ItemDrop.antiseptic:
             gameState.itemThrown.addImage(gameState.potionThrower.up);
             break;
         }
         gameState.itemThrown.velocity.y = -maxVelocity;
         break;
      case 'throwDown':
         gameState.player.sprites.changeAnimation('throwDown');
         switch(itemThrown){
           case ItemDrop.vaccine:
             gameState.itemThrown.addImage(gameState.vaccineThrower.down);
             break;
            case ItemDrop.mask:
             gameState.itemThrown.addAnimation('down', gameState.maskThrower.down);
             break;
            case ItemDrop.antiseptic:
             gameState.itemThrown.addImage(gameState.potionThrower.down);
             break;
         }
         gameState.itemThrown.velocity.y = maxVelocity;
         break;
      case 'throwLeft':
         gameState.player.sprites.changeAnimation('throwLeft');
         switch(itemThrown){
           case ItemDrop.vaccine:
             gameState.itemThrown.addImage(gameState.vaccineThrower.left);
             break;
            case ItemDrop.mask: 
             gameState.itemThrown.addAnimation('left', gameState.maskThrower.left);
             break;
            case ItemDrop.antiseptic:
             gameState.itemThrown.addImage(gameState.potionThrower.left);
             break;
         }
         gameState.itemThrown.velocity.x = -maxVelocity;
         break;
      case 'throwRight':
         gameState.player.sprites.changeAnimation('throwRight');
         switch(itemThrown){
           case ItemDrop.vaccine:
             gameState.itemThrown.addImage(gameState.vaccineThrower.right);
             break;
            case ItemDrop.mask:
             gameState.itemThrown.addAnimation('right', gameState.maskThrower.right);
             break;
            case ItemDrop.antiseptic:
             gameState.itemThrown.addImage(gameState.potionThrower.right);
             break;
         }
         gameState.itemThrown.velocity.x = maxVelocity;
         break;
      default:
         break;
    } 
    gameState.itemThrown.itemDrop = itemThrown;
  }
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


function checkCollisions(){
  //TODO código de controle dos grupos de NPCs, herói, barreiras
  gameState.player.sprites.collide(gameState.infectedNPCs, gameOverCollision);
  gameState.player.sprites.collide(gameState.infectedBarriers, gameOverCollision);
  gameState.player.sprites.collide(gameState.healthyNPCs);
  gameState.infectedNPCs.collide(gameState.healthyNPCs, infect);
  gameState.infectedNPCs.collide(gameState.infectedNPCs);
  gameState.healthyNPCs.collide(gameState.healthyNPCs);
  gameState.healthyNPCs.collide(gameState.infectedNPCs, infect);
  gameState.healthyNPCs.collide(gameState.immunizedNPCs);
  gameState.immunizedNPCs.collide(gameState.immunizedNPCs);
  gameState.infectedNPCs.collide(gameState.immunizedNPCs);
  gameState.player.sprites.collide(gameState.immunizedNPCs);
  gameState.healthyBarriers.collide(gameState.infectedNPCs, infectBarrier);
  gameState.healthyBarriers.collide(gameState.healthyNPCs);
  gameState.healthyBarriers.collide(gameState.immunizedNPCs);
  gameState.healthyBarriers.collide(gameState.player.sprites);
  gameState.healthyBarriers.collide(gameState.healthyBarriers);
  gameState.infectedBarriers.collide(gameState.infectedNPCs);
  gameState.infectedBarriers.collide(gameState.healthyNPCs, infectNPC);
  gameState.infectedBarriers.collide(gameState.immunizedNPCs);
  gameState.infectedBarriers.collide(gameState.healthyBarriers);
  if(gameState.ambulance != null && gameState.ambulanceCollide){
    gameState.ambulance.collide(gameState.player.sprites);
    gameState.ambulance.collide(gameState.infectedNPCs);
    gameState.ambulance.collide(gameState.immunizedNPCs);
    gameState.ambulance.collide(gameState.healthyNPCs);
    gameState.ambulance.collide(gameState.healthyBarriers);
    gameState.ambulance.collide(gameState.infectedBarriers);
  }
    
  

  if(gameState.itemThrown != null && gameState.itemThrown.itemDrop === ItemDrop.vaccine){
    gameState.itemThrown.collide(gameState.infectedNPCs, immunize);
    gameState.itemThrown.collide(gameState.healthyNPCs, immunize);
  }
  if(gameState.itemThrown != null && gameState.itemThrown.itemDrop === ItemDrop.mask){
    gameState.itemThrown.collide(gameState.infectedNPCs, mascarade);
    gameState.itemThrown.collide(gameState.healthyNPCs, mascarade);
    gameState.itemThrown.collide(gameState.immunizedNPCs, mascarade);
  }
  if(gameState.itemThrown != null && gameState.itemThrown.itemDrop === ItemDrop.antiseptic){
    gameState.itemThrown.collide(gameState.infectedBarriers, cleanBarrier);
  }
  if(gameState.itemDrop != null){
     gameState.itemDrop.collide(gameState.player.sprites, getAmbulanceItem);
  }
}

function cleanBarrier(antiseptic, barrier){
  gameState.infectedBarriers.remove(barrier);
  gameState.healthyBarriers.add(barrier);
  antiseptic.remove();
}

function gameOverCollision(player, infected){
  reason = null;
  clear();
  gameState.currentStage = -1;
  if(gameState.infectedNPCs.contains(infected))
    reason = GameOverReason.infectedNPC;
  if(gameState.infectedBarriers.contains(infected))
    reason = GameOverReason.infectedBarrier;
  gameState.gameOverReason = reason;
  gameState.gameOverSprite = infected;
  setTimeout(spriteDouble, 1000);
  setTimeout(spriteDouble, 1000);
  setTimeout(spriteDouble, 1000);
  gameOver();
}

function spriteDouble(){
  gameState.gameOverSprite.scale*=2;
}

function infect(NPCa, NPCb){
  maskAnim = ['upMask', 'downMask', 'rightMask', 'leftMask'];
  infectionChance = int(random(95, 100));
  if(maskAnim.includes(NPCa.getAnimationLabel()) || maskAnim.includes(NPCb.getAnimationLabel()))
    return;
  gameState.infectedCount++;
  createInfectedSprite(NPCa);
  createInfectedSprite(NPCb);
  gameState.infectedNPCs.add(NPCa);
  gameState.infectedNPCs.add(NPCb);
  gameState.healthyNPCs.remove(NPCa);
  gameState.healthyNPCs.remove(NPCb);
}

function infectBarrier(barrier, NPC){
  gameState.infectedBarriers.add(barrier);
  gameState.healthyBarriers.remove(barrier);
  
}

function infectNPC(barrier, NPC){
  createInfectedSprite(NPC);
  gameState.infectedNPCs.add(NPC);
  gameState.healthyNPCs.remove(NPC);
}



function immunize(vaccine, NPC){
  if(gameState.infectedNPCs.contains(NPC))
    createHealthySprite(NPC);
  gameState.immunizedNPCs.add(NPC);
  if(gameState.infectedNPCs.contains(NPC))
     gameState.infectedCount--;
  gameState.infectedNPCs.remove(NPC);
  gameState.healthyNPCs.remove(NPC);
  gameState.immunizedNPCs.add(vaccine);
  vaccine.remove();
}

function mascarade(mask, NPC){
  maskAnim = ['upMask', 'downMask', 'rightMask', 'leftMask'];
  if(maskAnim.includes(NPC.getAnimationLabel()))
    return;
  switch(NPC.getAnimationLabel()){
    case 'up':
      NPC.changeAnimation('upMask');
      break;
    case 'down':
      NPC.changeAnimation('downMask');
      break;
    case 'left':
      NPC.changeAnimation('leftMask');
      break;
    case 'right':
      NPC.changeAnimation('rightMask');
      break;
  }
  mask.remove();
}

function checkVaccineThrown(){
  //TODO código de controle do disparo de vacinas
  if(gameState.immunizedNPCs.contains(gameState.itemThrown)){
    gameState.immunizedNPCs.remove(gameState.itemThrown);
    gameState.itemThrown = null;
  }
}


function checkMaskThrown(){
  //TODO código de controle do disparo de máscaras
}


function checkAntisepticThrown(){
  /*
  if(gameState.itemThrown != null && gameState.itemThrown.itemDrop === ItemDrop.antisepctic){
    switch(gameState.player.sprites.getAnimationLabel){
      case 'up':
        vely = -1;
        velx = int(random(0, 2));
        break;
      case 'down':
        vely = 1;
        velx = int(random(0, 2));
        break;
      case 'left':
        vely = int(random(0, 2));
        velx = -1;
        break;
      case 'right':
        vely = int(random(0, 2));
        velx = 1;
        break;
    }
    for(i=0;i<10;i++){
      particle = createSprite(gameState.player.sprites.x, gameState.player.sprites.y, 1, 1);
      particle.velocity.y = vely;
      particle.velocity.x = velx;
      particle.life = 1;
    }
  }
  */
}


function checkCoughing(){
  //TODO código de controle da tosse dos NPCs
}

function checkSneezing(){
  //TODO código de controle dos espirros dos NPCs
}


function checkState(){
  checkStateChange();
  switch(gameState.currentStage){
    case 0:
      intro();
      break;
    case -1:
      gameOver();
      break;
    case 99:
      stageComplete();
      break;
    default:
      background(gameState.background);
      move();
      checks();
      //sprite = createSprite(width/2, height/2);
      //sprite.addAnimation('test',gameState.maskThrower.down);
      //sprite.scale = 2;
      break;
  }
}

function shouldStart(){
  if (keyIsDown(ENTER)){
    switch(gameState.currentStage){
      case 0:
        gameState.currentStage = 1;
        gameState.stageChange = true;
        break;
      case -1:
        gameState.currentStage = 1;
        gameState.stageChange = true;
        break;
      case 99:
        if(gameState.lastStage === 5)
          gameState.currentStage = 0;
        else
          gameState.currentStage = gameState.lastStage+1;
        gameState.stageChange = true;
        break;
      default:
        break;
    }
  }
}

function intro(){
  shouldStart();
  gameState.stageTime +=1;
  background(gameState.transitions[1], "white");
  moveText("yellow","black",50,8,"20XX - COVID ATTACK!",0.5, 1000,250, CENTER);
  moveText("yellow","black",20,4,"\n\n\nO ano é 20XX. Estamos enfrentando a ##ésima Onda do VOCID XX, \n“A DOENÇA DO MILÊNIO”. Mantenha-se saudável e trate as pessoas numa luta ferrenha contra a expansão do vírus!",0.2,1000,250, CENTER);
  moveText("yellow","black",20,4,"\n\n\n\n\n\nO jogo é executado em 5 rodadas de dificuldade crescente.\n\nA cada rodada, o jogador será inserido num cenário com elementos randomizados, junto com um conjunto de NPCs (Non-Playable Characters) que, randomicamente, poderão estar ou não infectados com o vírus. Os NPCs se deslocam de forma aleatória pelo \ncenário. Seu objetivo, a cada rodada, é vacinar todos os NPCs contaminados.",0.2,1000,350, CENTER);
  moveText("yellow","black",20,4,"\n\n\n\n\n\n\n\n\n\n\n\n\n\nO jogo se passa na prestigiada República social capitalista do Zabril, onde você é José Covidson Gomes - um homem com uma missão.\nCansado de sentir-se impotente contra a pandem(on)ia (mas acima de tudo, cansado\n das piadinhas com seu nome) Covidson se vale do seu cargo de agente de saúde do \ngoverno do estado do Grande Rio do Norte, e decide sair pelas ruas da capital, \nPáscoa, limpando as ruas, enfrentando a padem(on)ia nos seus próprios termos! \n\nÉ homem contra vírus numa batalha pela sobrevivência do mais forte!",0.2,1000,800, CENTER);
  moveText((gameState.stageTime%10>5)?"yellow":"white","black",25,4,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nPRESS ENTER para INICIAR",0.2,1000,800, CENTER);
  moveText("white","black",20,4,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nControles: \nUse as setas (←↑→↓) para controlar o Covidson\n(V) para Lançar a Vacina-ninja (uma dose cura ou imuniza).\n(M) para Lançar a Máscara-aranha (basta acertar um NPC para que grude sobre a boca e nariz)\n(A) para auquingéu, líquido misterioso que limpa superfícies contaminadas.\n(Não use nas pessoas!)",0.2,1000,800, LEFT);
}

function moveText(textColor,outlineColor,size,weight,message,speed,width,height,align){
  fill(textColor);
  stroke(outlineColor);
  textFont('Lucida Console');
  strokeWeight(weight);
  textSize(size);
  textAlign(align);
  text(message,xT, yT, width, height);
  if(yT>size){
    yT-=speed;
  }
}

function clearAll(){
  gameState.NPCs.forEach(NPC => {
    NPC.sprites.remove();
  });
  gameState.NPCs = [];
  gameState.barriers.forEach(barrier => {
    barrier.remove();
  });
  gameState.barriers = [];
  if(gameState.player.sprites)
    gameState.player.sprites.remove();
  if(gameState.ambulance)
    gameState.ambulance.remove();
  if(gameState.itemDrop){
    gameState.itemDrop.remove();
  }
  gameState.itemDro = null; 
  if(gameState.itemThrown)
    gameState.itemThrown.remove();
  if(gameState.infectedNPCs)
    gameState.infectedNPCs.clear();
  if(gameState.healthyNPCs)
    gameState.healthyNPCs.clear();
  if(gameState.immunizedNPCs)
    gameState.immunizedNPCs.clear();
  if(gameState.infectedBarriers)
    gameState.infectedBarriers.clear();
  if(gameState.healthyBarriers)
    gameState.healthyBarriers.clear();
  
}

function gameOver(){
  shouldStart();
  clearAll();
  gameState.stageTime +=1;
  background(gameState.transitions[0], 200);
  moveText("yellow","black",50,8,"Ah, não! :-(",0.5, 1000,250, CENTER);
  switch(gameState.gameOverReason){
    case GameOverReason.infectedNPC:
      moveText("yellow","black",30,8,"\n\n\n\nCovidson foi infectado por uma PESSOA contaminada!",0.5, 1200,350, LEFT);
      break;
      case GameOverReason.infectedBarrier:
      moveText("yellow","black",30,8,"\n\n\n\nCovidson foi infectado por uma BARREIRA contaminada!",0.5, 1000,250, CENTER);
      break;
      default:
      moveText("yellow","black",40,8,"\n\n\n\nAlgo deu errado com o jogo!",0.5, 1000,250, CENTER);
      break;
  }
   moveText((gameState.stageTime%10>5)?"yellow":"white","black",25,4,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nPRESS ENTER para REINICIAR!",0.2,1000,800, CENTER);
  moveText("yellow","black",25,4,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n(Força Covidson, contamos com você!)",0.2,1000,800, CENTER);
}

function stageComplete(){
  shouldStart();
  clearAll();
  gameState.stageTime +=1;
  gameState.infectedCount = -1;
  if(gameState.lastStage<5){
    background(gameState.transitions[int(gameState.lastStage)+1], "white");
  moveText("yellow","black",50,8,"Missão Cumprida!\nEstágio "+gameState.lastStage+" finalizado!",0.5, 1000,250, CENTER);
   moveText((gameState.stageTime%10>5)?"yellow":"white","black",25,4,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nPRESS ENTER para AVANÇAR PARA O ESTÁGIO "+(gameState.lastStage+1)+"!",0.2,1000,800, CENTER);
  moveText("yellow","black",25,4,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n(Força Covidson, contamos com você!)",0.2,1000,800, CENTER); 
  }else{
    background(gameState.transitions[7], "white");
  moveText("yellow","black",50,8,"UAU! Você conseguiu!\nEstágio "+gameState.lastStage+" finalizado!\Parabéns, este é o final do jogo!!",0.5, 1000,250, CENTER);
   moveText((gameState.stageTime%10>5)?"yellow":"white","black",25,4,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nPRESS ENTER para Jogar novamente!",0.2,1000,800, CENTER);
  moveText("yellow","black",25,4,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n(Força Covidson, contamos com você!)",0.2,1000,800, CENTER);
  }
  
}

function checkStateChange(){
  if(gameState.infectedCount === 0){
    if(gameState.currentStage != 99){
      gameState.lastStage = gameState.currentStage;
      gameState.currentStage = 99;
      //stageComplete();
      //return;      
    }
  }
    
  if(gameState.stageChange){
    gameState.stageChange = false;
    //TODO código de controle do estado geral do jogo: estágio, gameover, stats da jogada
    background(gameState.background);
    increaseNPCs();
    increaseInfected();
    
    resetItems();
      fill(222);
  textFont('Lucida Console');
  textSize(30);
  textAlign(CENTER);
  text(gameState.currentStage,xT, yT);

    gameState.AmbulanceCollide = gameState.stages[gameState.currentStage].ambulanceCollide;
    createHero();
    createNPCs();
    createBarriers();
  }
}
  
function increaseNPCs(){
  NPCsCount = 20;
  gameState.NPCsCount = NPCsCount;
  //incremento de 10% de inimigos por estágio
  NPCsCount += NPCsCount*gameState.currentStage/10;
  gameState.NPCsCount = NPCsCount;
}
  
function increaseInfected(){
    gameState.infectedPercentage = infectedPercentage;
    //incremento de 5% de inimigos por estágio
    infectedPercentage += infectedPercentage*gameState.currentStage/20;
    gameState.infectedPercentage = infectedPercentage;
}
  
function resetItems(){
  /*fill("black");
  textSize(30);
  text("reset Items",width/2, height/2);*/
  gameState.player.items.vaccines = 2;
  gameState.player.items.masks = 5;
  gameState.player.items.antiseptics = 10;
  gameState.nextAmbulance = int(random(minAmbulanceTime, maxAmbulanceTime));
  gameState.ambulanceTime = 0;
  gameState.totalTime = 0;
}

function createNPCs(){
  gameState.healthyNPCs = Group();
  gameState.infectedNPCs = Group();
  gameState.immunizedNPCs = Group();
    
  infectedCount = int(gameState.NPCsCount*gameState.infectedPercentage);
  gameState.infectedCount = infectedCount;
  for(i = 0; i<gameState.NPCsCount; i++){
    gameState.NPCs.push(createNPC());
    if(i<infectedCount)
      gameState.infectedNPCs.add(gameState.NPCs[i].sprites);
    else
      gameState.healthyNPCs.add(gameState.NPCs[i].sprites);
  }
}

function createNPC(){
  x = int(random((defaultRadius * 2), width - (defaultRadius * 2)));
  y = int(random((defaultRadius * 2), height - (defaultRadius * 2)));
  return{
    mask: false,
    x: x,
    y: y,
    velx: random(1, maxVelocity),
    vely: random(1, maxVelocity),
    sprites: createNPCSprite(x, y)
  };
}

function createNPCSprite(x, y){
  sprite = createSprite(x,y);
  sprite = createHealthySprite(sprite);
  return sprite;
}

function createHealthySprite(sprite){
  randomSprite = int(random(1, 7));
  sprite.addAnimation('up',gameState.NPCWalker[randomSprite].up);
  sprite.addAnimation('down',gameState.NPCWalker[randomSprite].down);
  sprite.addAnimation('right',gameState.NPCWalker[randomSprite].right);
  sprite.addAnimation('left',gameState.NPCWalker[randomSprite].left);
  sprite.addAnimation('upMask',gameState.NPCWalker[randomSprite].upMask);
  sprite.addAnimation('downMask',gameState.NPCWalker[randomSprite].downMask);
  sprite.addAnimation('rightMask',gameState.NPCWalker[randomSprite].rightMask);
  sprite.addAnimation('leftMask',gameState.NPCWalker[randomSprite].leftMask);
  return sprite;
}

function createBarriers(){
  gameState.healthyBarriers = Group();
  gameState.infectedBarriers = Group();
    
  gameState.barrierCount = gameState.stages[gameState.currentStage].barrierCount;
  
  for(i = 0; i<gameState.barrierCount; i++){
    var x = int(random((defaultRadius * 2), width - (defaultRadius * 2)));
    var y = int(random((defaultRadius * 2), height - (defaultRadius * 2)));
    var sprite;
    randomSprite = int(random(1, 5));
    switch(int(random(1, 4))){
      case 1:
        sprite = createSprite(x,y, 16, 47);
        sprite.addImage(gameState.barrierImages.vertical[randomSprite-1]);
        break;
      case 2:
        spriteWidth = randomSprite%2>0?64:47;
        sprite = createSprite(x,y, spriteWidth, 16);
        sprite.addImage(gameState.barrierImages.horizontal[randomSprite-1]);
        break;
      case 3:
        sprite = createSprite(x,y, 16, 16);
        sprite.addImage(gameState.barrierImages.short[randomSprite-1]);
        break;
      default:
        break;
    }
    sprite.scale = 3;
    sprite.mass = 10;
    sprite.restitution = -10;
    //sprite.immovable = true;
    gameState.barriers.push(sprite);
    gameState.healthyBarriers.add(sprite);
  }
}

/*function createBarriers(){
  return{
    sprites: createBarrierSprite(x, y)
  };
}

function createBarrierSprite(x, y){
  return sprite;
}*/

function createInfectedSprite(sprite){
  sprite.addAnimation('up',gameState.NPCWalker[infectedSprite].up);
  sprite.addAnimation('down',gameState.NPCWalker[infectedSprite].down);
  sprite.addAnimation('right',gameState.NPCWalker[infectedSprite].right);
  sprite.addAnimation('left',gameState.NPCWalker[infectedSprite].left);
  sprite.addAnimation('upMask',gameState.NPCWalker[infectedSprite].upMask);
  sprite.addAnimation('downMask',gameState.NPCWalker[infectedSprite].downMask);
  sprite.addAnimation('rightMask',gameState.NPCWalker[infectedSprite].rightMask);
  sprite.addAnimation('leftMask',gameState.NPCWalker[infectedSprite].leftMask);
  return sprite;
}

function moveItem(){
  if(gameState.itemThrown != null){
    /*fill("black");
    textSize(30);
    text("item na tela",width/2, height/2);*/
    item = {x:0, y:0, velx:0, vely:0};
    item.x = gameState.itemThrown.position.x;
    item.y = gameState.itemThrown.position.y;
    item.velx = gameState.itemThrown.velocity.x;
    item.vely = gameState.itemThrown.velocity.y;
  
    item.x += item.velx*0.1;
    item.y += item.vely*0.1;

    if ((item.x + defaultRadius) > width) {
      gameState.itemThrown.remove();
      gameState.itemThrown = null;
    }

    if ((item.x - defaultRadius) < 0){
      gameState.itemThrown.remove();
      gameState.itemThrown = null; 
    }

    if ((item.y + defaultRadius) > height){
      gameState.itemThrown.remove();
      gameState.itemThrown = null;
    }

    if ((item.y - defaultRadius) < 0){
      gameState.itemThrown.remove();
      gameState.itemThrown = null; 
    }
    
    if(gameState.itemThrown != null){
      gameState.itemThrown.position.x = item.x;
      gameState.itemThrown.position.y = item.y;
      gameState.itemThrown.velocity.x = item.velx;
      gameState.itemThrown.velocity.y = item.vely;
    }    
  }
}

function moveNPCs(){
  gameState.NPCs.forEach(NPC => {
    NPC.x += NPC.velx*0.1;
    NPC.y += NPC.vely*0.1;

    if ((NPC.x + defaultRadius) > width) {
      NPC.velx *= -1;
    }

    if ((NPC.x - defaultRadius) < 0)
      NPC.velx *= -1;

    if ((NPC.y + defaultRadius) > height)
      NPC.vely *= -1;

    if ((NPC.y - defaultRadius) < 0)
      NPC.vely *= -1;
    
    NPC.sprites.velocity.y = NPC.vely;
    NPC.sprites.velocity.x = NPC.velx;
    NPC.sprites.position.y = NPC.y;
    NPC.sprites.position.x = NPC.x;
    NPC.isVertical = abs(NPC.vely)>abs(NPC.velx);
    maskAnim = ['upMask', 'downMask', 'rightMask', 'leftMask'];
    if(maskAnim.includes(NPC.sprites.getAnimationLabel()))
      NPC.mask = true;
    if(NPC.isVertical){
      if(NPC.vely>0)
        NPC.mask?NPC.sprites.changeAnimation('downMask'):NPC.sprites.changeAnimation('down');
      else
        NPC.mask?NPC.sprites.changeAnimation('upMask'):NPC.sprites.changeAnimation('up');
    }else{
      if(NPC.velx>0)
        NPC.mask?NPC.sprites.changeAnimation('rightMask'):NPC.sprites.changeAnimation('right');
      else
        NPC.mask?NPC.sprites.changeAnimation('leftMask'):NPC.sprites.changeAnimation('left');
    }
  });
}
  