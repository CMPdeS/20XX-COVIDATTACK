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
        if(godMode === false && particleEmmiter.sprayToggle === false){
          gameState.player.items.antiseptics--;
          gameState.stages[gameState.currentStage].items.antisepctics += 1;
          particleEmmiter.behavior = ParticleBehavior.antiseptic;
        }
        particleEmmiter.sprayToggle = !particleEmmiter.sprayToggle;
        //gameState.itemThrown = createSprite(gameState.player.sprites.position.x, gameState.player.sprites.position.y, 16, 16);
        //gameState.itemThrown.scale = 2;
        //itemThrown = ItemDrop.antiseptic;
      }else
        if(particleEmmiter.sprayToggle)
           particleEmmiter.sprayToggle = !particleEmmiter.sprayToggle;
      break;
    case 'm':
      if(gameState.player.items.masks>0){
        if(godMode === false)
          gameState.player.items.masks--;
        gameState.stages[gameState.currentStage].items.masks += 1;
        gameState.itemThrown = createSprite(gameState.player.sprites.position.x, gameState.player.sprites.position.y, 13, 10);
        gameState.itemThrown.scale = 2;
        itemThrown = ItemDrop.mask;
      }
      break;
    case 't':
      thermoEmmiter.toggle = !thermoEmmiter.toggle;
      break;
    case 'v':
      if(gameState.player.items.vaccines>0){
        if(godMode === false)
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