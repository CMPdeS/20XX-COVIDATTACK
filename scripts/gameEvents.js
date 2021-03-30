function checks(){
  checkCollisions();
  checkThrowables();
  checkAmbulance(); 
}

function checkAmbulance(){
  if(gameState.nextAmbulance < gameState.ambulanceTime){
    gameState.ambulanceTime = 0;
    gameState.nextAmbulance = int(random(minAmbulanceTime, maxAmbulanceTime));
    gameState.ambulance = createSprite(width,random(40, height-40));
    gameState.ambulance.addAnimation('ambulance',gameState.ambulanceWalker);
    gameState.ambulance.velocity.x = -maxVelocity;
    gameState.stages[gameState.currentStage].items.ambulances++;
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
        gameState.ambulanceDrop = {item: ItemDrop.antiseptic, num:numDrop};
        break;
      default:
        numDrop = int(random(1,6));
        gameState.ambulanceDrop = {item: ItemDrop.mask, num:numDrop};
        break;
    }
  }
}


function time(){
  gameState.stageTime += 1; gameState.ambulanceTime +=1;
  fill("white");
  textSize(14);
  text(gameState.player.items.vaccines + ' / 2',60,height-150);
  text(gameState.player.items.masks + ' / 5',140,height-150);
  text(gameState.player.items.antiseptics + ' / 10',243,height-150);
  text(gameState.stageTime,60,height-90);
  text(gameState.ambulanceTime + ' -> ' + gameState.nextAmbulance,90,height-30);
  text('0'+gameState.currentStage, 65, height-15);
  if(gameState.infectedNPCs){
    if(gameState.infectedCount>10){
      fill("red");
      textSize(22);
    } else if(gameState.infectedCount>5){
      fill("orange");
      textSize(20);
    } else {
      fill("white");
      textSize(14);
    }
    text(gameState.infectedNPCs.length +" / "+gameState.infectedCount,140,height-55);
  }
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

    gameState.ambulanceCollide = gameState.stages[gameState.currentStage].ambulanceCollide;
    createHero();
    createNPCs();
    createBarriers();
    createHUD();
  }
}
