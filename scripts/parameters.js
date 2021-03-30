/* Hello and welcome to 20XX - COVID Attack!! - A 'serious' educational game that deals with a really serious problem - COVID epidemics. This is our way of trying, through an entertainment piece, to show how random and quickly the virus can spread. We tried to keep the wierdness to a minimum, but some of it is necessary for entertainment sake. And who knows, somebody may actually learn something about the virus through this game. That would be the best!

We had fun doing this and learning p5js as we went along. Didn't get to do all we wanted to, but I guess we got close enough.

Special thanks goes to professor Rummenigge Rudson Dantas (rudson@ect.ufrn.br) for doing such a great job on such a short time teaching us Game Devolpment as part of PPGTI's PPGTI1002 discipline (our masters program at IMD/UFRN).

Thanks teach!

A game by Cezar Miranda (cezarmiranda@gmail.com) and Rivaldo Fernandes (rivaldofernandes@gmail.com)
*/
//init params - change at your own risk/peril!
var xT = 350; //not sure if it's deprecated or not.
var yT = 800; //not sure if it's deprecated or not.
var infectionChance; //not sure if it's deprecated or not.
var defaultRadius = 20; //not sure if it's deprecated or not.
var infectedSprite = 0; //not sure if it's deprecated or not.
var maxVelocity = 10; //still in use, just not sure where.
var infectedPercentage = 0.05; //starting as low as 5%. Goes up as you advance.
var minAmbulanceTime = 300; //how little it could be until that next ambulance drop.
var maxAmbulanceTime = 500; //how long it could take to the next ambulance drop.
var maxAntisepticSpray = 30; //dat antiseptic spray!
var maxVirusSpray = 10; //dat virus spray! Never got the time to make it.
var barrierCount = 24; //deprecated. Now beeing kept in stage params in gameState.js
var randomSprite; //this is probably deprecated as well ^_^;
var ambulanceCollide = true; //indicates if ambulances collide by default. Deprecated, it's beeing controlled through stage params in gameState.js
var godMode = false; //you're all powerful. Nothing can stop you, supplies are infinite too!