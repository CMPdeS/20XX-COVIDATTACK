function intro(){
  shouldStart();
  clearAll();
  gameState.stageTime +=1;
  background(gameState.transitions[1], "white");
  moveText("yellow","black",50,8,"20XX - COVID ATTACK!",0.5, 1000,250, CENTER);
  moveText("yellow","black",20,4,"\n\n\nO ano é 20XX. Estamos enfrentando a ##ésima Onda do VOCID XX, \n“A DOENÇA DO MILÊNIO”. Mantenha-se saudável e trate as pessoas numa luta ferrenha contra a expansão do vírus!",0.2,1000,250, CENTER);
  moveText("yellow","black",20,4,"\n\n\n\n\n\nO jogo é executado em 5 rodadas de dificuldade crescente.\n\nA cada rodada, o jogador será inserido num cenário com elementos randomizados, junto com um conjunto de NPCs (Non-Playable Characters) que, randomicamente, poderão estar ou não infectados com o vírus. Os NPCs se deslocam de forma aleatória pelo \ncenário. Seu objetivo, a cada rodada, é vacinar todos os NPCs contaminados.",0.2,1000,350, CENTER);
  moveText("yellow","black",20,4,"\n\n\n\n\n\n\n\n\n\n\n\n\nO jogo se passa na prestigiada República social capitalista do Zabril, onde você é José Covidson Gomes - um homem com uma missão.\nCansado de sentir-se impotente contra a pandem(on)ia (mas acima de tudo, cansado\n das piadinhas com seu nome) Covidson se vale do seu cargo de agente de saúde do \ngoverno do estado do Grande Rio do Norte, e decide sair pelas ruas da capital, \nPáscoa, limpando as ruas, enfrentando a padem(on)ia nos seus próprios termos! \n\nÉ homem contra vírus numa batalha pela sobrevivência do mais forte!",0.2,1000,800, CENTER);
  moveText((gameState.stageTime%10>5)?"yellow":"white","black",25,4,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nPRESS ENTER para INICIAR",0.2,1000,800, CENTER);
  moveText("white","black",20,4,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nControles: \nUse as setas (←↑→↓) para controlar o Covidson\n(V) para Lançar a Vacina-ninja (uma dose cura ou imuniza).\n(M) para Lançar a Máscara-aranha (corre até o NPC e gruda sobre a boca e nariz).\n(A) para auquingéu, líquido misterioso que limpa superfícies contaminadas.\n(Não use nas pessoas!!)\n(T) para Termômetro de Raios-X (revela quem está doente).",0.2,1000,800, LEFT);
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
    moveText("yellow","black",45,8,"Missão Cumprida! - Fim do Estágio "+gameState.lastStage,0.5, 1000,250, CENTER);
    moveText("white","black",15,4,"\n\n\n\nItens Consumidos:\nVacinas-ninja: " +
             gameState.stages[gameState.lastStage].items.vaccines +
             " - Máscaras-aranha: " +
             gameState.stages[gameState.lastStage].items.masks +
             "\nAlquingel: " +
             gameState.stages[gameState.lastStage].items.antiseptics +
             " - Ambulâncias: " + 
             gameState.stages[gameState.lastStage].items.ambulances +
             "\n\nEstado da população:\nTotal: " +
             gameState.stages[gameState.lastStage].NPCs.total,0.5, 1000,250, CENTER);
    moveText("orange","black",15,4,"\n\n\n\n\n\n\n\n\n\nInfectados (inicial): " +
             gameState.stages[gameState.lastStage].NPCs.initInfected +
             " / (Máximo): " +
             gameState.stages[gameState.lastStage].NPCs.maxInfected,0.5, 1000,250, CENTER);
    moveText("blue","black",15,4,"\n\n\n\n\n\n\n\n\n\n\nImunizados: "+gameState.stages[gameState.lastStage].NPCs.immunized,0.5, 1000,250, CENTER);
    moveText("red","black",15,4,"\n\n\n\n\n\n\n\n\n\n\n\nMortes: "+gameState.stages[gameState.lastStage].NPCs.deaths,0.5, 1000,250, CENTER);
    moveText((gameState.stageTime%10>5)?"yellow":"white","black",25,4,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nPRESS ENTER para AVANÇAR PARA O ESTÁGIO "+(gameState.lastStage+1)+"!",0.2,1000,800, CENTER);
  moveText("yellow","black",25,4,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n(Força Covidson, contamos com você!)",0.2,1000,800, CENTER); 
  }else{
    background(gameState.transitions[7], "white");
  moveText("yellow","black",50,8,"UAU! Você conseguiu!\nEstágio "+gameState.lastStage+" finalizado!\nParabéns, este é o final do jogo!",0.5, 1000,250, CENTER);
   moveText((gameState.stageTime%10>5)?"yellow":"white","black",25,4,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nPRESS ENTER para Jogar novamente!",0.2,1000,800, CENTER);
  moveText("yellow","black",25,4,"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n(Força Covidson, contamos com você!)",0.2,1000,800, CENTER);
  }
  
}
