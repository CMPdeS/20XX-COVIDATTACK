/*
  método responsável por verificar todos os elementos de disparo
*/
function checkThrowables(){
  checkVaccineThrown();
  checkMaskThrown();
  checkParticleSpray();
  checkThermometer();
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

function checkThermometer(){
  if(thermoEmmiter.toggle){
    thermoEmmiter.device.activate(); 
  } 
}

function checkParticleSpray(){
  if(particleEmmiter.sprayToggle){
    particleEmmiter.particleTimer++;
    switch(particleEmmiter.behavior){
      case ParticleBehavior.antiseptic:
        if(particleEmmiter.particleTimer/maxAntisepticSpray>1){
         if(particleEmmiter.particleTimer/maxAntisepticSpray<5)
          particleEmmiter.system.fade();
        else if(particleEmmiter.particleTimer/maxAntisepticSpray>5)
          particleEmmiter.system.stop();
        else 
          particleEmmiter.sprayToggle = false; 
        }
        break;
      case ParticleBehavior.virus:
        if(particleEmmiter.particleTimer > maxVirusSpray)
          //particleEmmiter.sprayToggle = false;
      break;
    }
    particleEmmiter.system.addParticle();
    particleEmmiter.system.run();
  }else{
    particleEmmiter.system.stop();
    particleEmmiter.particleTimer = 0;
  }
}
