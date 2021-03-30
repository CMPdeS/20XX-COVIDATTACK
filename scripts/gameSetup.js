function createHUD(){
  gameState.HUD = createSprite(180, 690, 340, 206);
  gameState.HUD.addImage('HUD', gameState.HUDImage);
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

function createNPCs(){
  gameState.healthyNPCs = Group();
  gameState.infectedNPCs = Group();
  gameState.immunizedNPCs = Group();
  gameState.graveyard = Group();
    
  infectedCount = int(gameState.NPCsCount*gameState.infectedPercentage);
  if(gameState.currentStage > 0 && gameState.currentStage < 6) {
    gameState.stages[gameState.currentStage].NPCs.initInfected = infectedCount;
    gameState.stages[gameState.currentStage].NPCs.maxInfected = infectedCount; 
  }
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

function increaseNPCs(){
  NPCsCount = 20;
  gameState.NPCsCount = NPCsCount;
  //incremento de 10% de inimigos por estágio
  NPCsCount += NPCsCount*gameState.currentStage/10;
  gameState.NPCsCount = NPCsCount;
  if(gameState.currentStage > 0 && gameState.currentStage < 6) 
    gameState.stages[gameState.currentStage].NPCs.total = NPCsCount;
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
  gameState.itemDrop = null; 
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
  if(gameState.graveyard)
    gameState.graveyard.clear();
  if(gameState.HUD)
    gameState.HUD.remove();
}

