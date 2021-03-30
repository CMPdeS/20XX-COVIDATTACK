function checkCollisions(){
  //TODO código de controle dos grupos de NPCs, herói, barreiras
  gameState.player.sprites.collide(gameState.infectedNPCs, gameOverCollision);
  gameState.player.sprites.collide(gameState.infectedBarriers, gameOverCollision);
  gameState.player.sprites.collide(gameState.healthyNPCs);
  gameState.player.sprites.collide(gameState.immunizedNPCs);
  gameState.player.sprites.collide(gameState.graveyard);
  
  gameState.infectedNPCs.collide(gameState.healthyNPCs, infect);
  gameState.infectedNPCs.collide(gameState.infectedNPCs);
  gameState.infectedNPCs.collide(gameState.immunizedNPCs);
  gameState.infectedNPCs.collide(gameState.graveyard);
  gameState.healthyNPCs.collide(gameState.healthyNPCs);
  gameState.healthyNPCs.collide(gameState.infectedNPCs, infect);
  gameState.healthyNPCs.collide(gameState.immunizedNPCs);
  gameState.healthyNPCs.collide(gameState.graveyard);
  gameState.immunizedNPCs.collide(gameState.immunizedNPCs);
  gameState.immunizedNPCs.collide(gameState.graveyard);
  
  gameState.healthyBarriers.collide(gameState.infectedNPCs, infectBarrier);
  gameState.healthyBarriers.collide(gameState.healthyNPCs);
  gameState.healthyBarriers.collide(gameState.immunizedNPCs);
  gameState.healthyBarriers.collide(gameState.graveyard);
  gameState.healthyBarriers.collide(gameState.player.sprites);
  gameState.healthyBarriers.collide(gameState.healthyBarriers);
  gameState.infectedBarriers.collide(gameState.infectedNPCs);
  gameState.infectedBarriers.collide(gameState.healthyNPCs, infectNPC);
  gameState.infectedBarriers.collide(gameState.immunizedNPCs);
  gameState.infectedBarriers.collide(gameState.graveyard);
  gameState.infectedBarriers.collide(gameState.healthyBarriers);
  if(gameState.ambulance != null && gameState.ambulanceCollide){
    gameState.ambulance.collide(gameState.player.sprites);
    gameState.ambulance.collide(gameState.infectedNPCs);
    gameState.ambulance.collide(gameState.immunizedNPCs);
    gameState.ambulance.collide(gameState.healthyNPCs);
    gameState.ambulance.collide(gameState.healthyBarriers);
    gameState.ambulance.collide(gameState.infectedBarriers);
    gameState.ambulance.collide(gameState.graveyard);
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
  
  if(particleEmmiter.sprayToggle)
    collideParticles();
  
    if(thermoEmmiter.toggle)
    checkTemperature();
}
