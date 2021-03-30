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
        case ItemDrop.antiseptic:
          gameState.player.items.antiseptics += int(gameState.ambulanceDrop.num);
          if(gameState.player.items.antiseptics>10)
            gameState.player.items.antiseptics = 10;
          break;
        default:
          break;
      }
  gameState.itemDrop.remove();
  gameState.itemDrop = null;
}

function cleanBarrier(antiseptic, barrier){
  gameState.infectedBarriers.remove(barrier);
  gameState.healthyBarriers.add(barrier);
  antiseptic.remove();
}

function gameOverCollision(player, infected){
  if(godMode)
    return;
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
  gameState.infectedCount++;
  if(gameState.stages[gameState.currentStage].NPCs.maxInfected < gameState.infectedCount)
    gameState.stages[gameState.currentStage].NPCs.maxInfected = gameState.infectedCount;
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
  gameState.stages[gameState.currentStage].NPCs.immunized++;
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

function collideParticles(){
  switch(particleEmmiter.behavior){
    case ParticleBehavior.antiseptic:
      for(i = 0; i<gameState.healthyNPCs.length; i++){
        collideParticle(gameState.healthyNPCs.get(i));
        if(gameState.healthyNPCs.get(i).getAnimationLabel()==='death')
          gameState.healthyNPCs.remove(gameState.healthyNPCs.get(i));
      }
      for(i = 0; i<gameState.immunizedNPCs.length; i++){
        collideParticle(gameState.immunizedNPCs.get(i));
        if(gameState.immunizedNPCs.get(i).getAnimationLabel()==='death')
          gameState.immunizedNPCs.remove(gameState.immunizedNPCs.get(i));
      }
      for(i = 0; i<gameState.infectedNPCs.length; i++)
        collideParticle(gameState.infectedNPCs.get(i));
      for(i = 0; i<gameState.infectedBarriers.length; i++)
        collideParticle(gameState.infectedBarriers.get(i));
    break;
  }
}

function collideParticle(obj){
  for (let i = particleEmmiter.system.particles.length-1; i >= 0; i--) {
    p = particleEmmiter.system.particles[i];
    collision = collideRectCircle(obj.position.x, obj.position.y, obj.width, obj.height, p.position.x, p.position.y, 5);
    if(collision){
        if(gameState.healthyNPCs.contains(obj) || gameState.immunizedNPCs.contains(obj)){
          obj.addAnimation('death', gameState.NPCWalker[7].death);
          obj.changeAnimation('death');
          obj.immovable = true;
          gameState.graveyard.add(obj);
          gameState.stages[gameState.currentStage].NPCs.deaths++;
        }
        if(gameState.infectedNPCs.contains(obj)){
          obj.velocity.x*=1.1;
          obj.velocity.y*=1.1;
        }
        if(gameState.infectedBarriers.contains(obj)){
          gameState.infectedBarriers.remove(obj);
          gameState.healthyBarriers.add(obj);           
        }
    }
  }
}

function checkTemperature(){
  for(i = 0; i<gameState.infectedNPCs.length; i++){
    if(collideRays(gameState.infectedNPCs[i])){
      createInfectedSprite(gameState.infectedNPCs[i]);
    } 
  }    
}
function collideRays(sprite){
  
  v1 = createVector(0,0);
  v1.add(thermoEmmiter.device.points[0]);
  v2 = createVector(0,0);
  v2.add(thermoEmmiter.device.points[1]);
  v3 = createVector(0,0);
  v3.add(thermoEmmiter.device.points[2]);
  p = createVector(sprite.position.x, sprite.position.y);
  return collidePointTriangleVector(p, v1, v2, v3); 
  
}

