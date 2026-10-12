//configuracion del juego XD

//importacion de las escenas del juego
import Menu from './Menu.js';
import Nivel1 from './nivel1.js';
import Nivel2 from './nivel2.js';
import Nivel3 from './nivel3.js';
import GameOver from './gameover.js';
import Win from './win.js';

const config = {
      scale: {
        mode: Phaser.Scale.RESIZE, 
        parent: 'container', 
        width: '100%',
        height: '100%'
    },

    //escenas del juego
    scene:[Menu, Nivel1, Nivel2, Nivel3, GameOver, Win],
    //fisicas
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
        }
    }
}

var game = new Phaser.Game(config);
 


