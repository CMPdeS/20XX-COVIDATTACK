function move(){
  moveNPCs();
  moveHero();
  moveItem();
  moveAmbulance();
}

function moveHero(){
  if (keyIsDown(LEFT_ARROW)){
    if(!thermoEmmiter.toggle)
       gameState.player.sprites.position.x-=5;
    gameState.player.sprites.changeAnimation('left');
  }

  if (keyIsDown(RIGHT_ARROW)){
    if(!thermoEmmiter.toggle)
      gameState.player.sprites.position.x+=5;
    gameState.player.sprites.changeAnimation('right');
  }

  if (keyIsDown(UP_ARROW)){
    if(!thermoEmmiter.toggle)
      gameState.player.sprites.position.y-=5;
    gameState.player.sprites.changeAnimation('up');
  }

  if (keyIsDown(DOWN_ARROW)){
    if(!thermoEmmiter.toggle)
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
    if(NPC.sprites.getAnimationLabel()==='death'){
      NPC.sprites.velocity.y = NPC.vely;
      NPC.sprites.velocity.x = NPC.velx;
      NPC.sprites.position.y = NPC.y;
      NPC.sprites.position.x = NPC.x;
      return;
    }
    if(NPC.sprites.velocity.x != 0) 
      NPC.velx = NPC.sprites.velocity.x;
    if(NPC.sprites.velocity.y != 0) 
      NPC.vely = NPC.sprites.velocity.y;
    
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
        case ItemDrop.antiseptic:
          gameState.itemDrop = createSprite(gameState.ambulance.position.x, gameState.ambulance.position.y, 13, 13);
          gameState.itemDrop.scale = 2;
          gameState.itemDrop.addAnimation('up',gameState.potionThrower.up);
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

