function spriteDouble(){
  gameState.gameOverSprite.scale*=2;
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
    },
    {
      death: loadAnimation(loadSpriteSheet('assets/NPCs/death/death.png', 32, 32, 8))
    }
    ];
  gameState.NPCWalker[7].death.looping = false;
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
  gameState.HUDImage = loadImage('assets/HUD/HUD.png');
}

