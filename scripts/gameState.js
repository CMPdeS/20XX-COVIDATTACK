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
        NPCs: {total: 0, initInfected: 0, maxInfected: 0, deaths: 0, immunized: 0},
        playerState: 0,
        items: {vaccines: 0, masks: 0, antiseptics: 0, ambulances: 0}
      },
      {
        stage: 2,
        time: 0,
        barrierCount:10,
        ambulanceCollide: false,
        NPCs: {total: 0, initInfected: 0, maxInfected: 0, deaths: 0, immunized: 0},
        playerState: 0,
        items: {vaccines: 0, masks: 0, antiseptics: 0, ambulances: 0}
      },
      {
        stage: 3,
        time: 0,
        barrierCount:20,
        ambulanceCollide: false,
        NPCs: {total: 0, initInfected: 0, maxInfected: 0, deaths: 0, immunized: 0},
        playerState: 0,
        items: {vaccines: 0, masks: 0, antiseptics: 0, ambulances: 0}
      },
      {
        stage: 4,
        time: 0,
        barrierCount:25,
        ambulanceCollide: true,
        NPCs: {total: 0, initInfected: 0, maxInfected: 0, deaths: 0, immunized: 0},
        playerState: 0,
        items: {vaccines: 0, masks: 0, antiseptics: 0, ambulances: 0}
      },
      {
        stage: 5,
        time: 0,
        barrierCount:35,
        ambulanceCollide: true,
        NPCs: {total: 0, initInfected: 0, maxInfected: 0, deaths: 0, immunized: 0},
        playerState: 0,
        items: {vaccines: 0, masks: 0, antiseptics: 0, ambulances: 0}
      }
    ],
    player: {
      items: {vaccines: 0, masks: 0, antisepctics: 0},
      state: 1
    },
    NPCsCount: 20,
    infectedPercentage: 0,
    infectedCount: -1,
    NPCs: [],
    healthyNPCs: null,
    infectedNPCs: null,
    immunizedNPCs: null,
    graveyard: null,
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
