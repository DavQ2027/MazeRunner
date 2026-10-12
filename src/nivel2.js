
const TILE = 32;

// Mapa del nivel 1 en matiz que luego se traduce en los objetos del laberinto XD
const mapa = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,2,2,0,1,2,2,2,2,2,1,2,2,2,1],
    [1,2,1,0,1,2,1,1,1,2,1,2,1,2,1],
    [1,2,1,3,2,2,2,2,2,2,2,2,1,2,1],
    [1,2,1,1,1,2,1,0,1,2,1,1,1,2,1],
    [1,2,2,2,2,2,1,0,1,2,2,2,2,2,1],
    [1,1,1,2,1,2,1,0,1,2,1,2,1,1,1],
    [1,4,2,2,1,2,2,0,2,2,1,2,2,4,1],
    [1,1,1,2,1,2,1,1,1,2,1,2,1,1,1],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
    [1,2,1,1,1,2,1,0,1,2,1,1,1,2,1],
    [1,2,2,2,2,2,2,2,2,0,2,2,2,2,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

export default class Nivel2 extends Phaser.Scene {
    constructor() {
      super({key: 'Nivel2'});
    } 

init(){

    this.score = 0; 
}

preload() {
    this.load.image('fondo', 'assets/background.jpg');
    this.load.image('pared', 'assets/Pared.png');
    this.load.image('titulo', 'assets/titulo.png');

    this.load.font({
    key: 'Fuente',
    url: '../assets/VCR_OSD_MONO_1.001.ttf',
    format: 'truetype'
});

}

create() {
// Calcula el tamaño del mapa y el offset para centrarlo porque si no queda feo en la esquina
const anchoMapa = mapa[0].length * TILE;   
const altoMapa  = mapa.length * TILE;      
const margenSuperior = 60;                

this.offsetX = (this.scale.width - anchoMapa) / 2;
this.offsetY = margenSuperior + (this.scale.height - margenSuperior - altoMapa) / 2;

     const grafico = this.make.graphics({
            x: 0,
            y: 0,
            add: false
        });

        grafico.fillStyle(0xffe44d);
        grafico.fillCircle(4, 4, 4);
        grafico.generateTexture('bolita', 8, 8);
        grafico.destroy();

        // Grupos de objetos
        this.paredes = this.physics.add.staticGroup();
        this.bolitas = this.physics.add.staticGroup();

        let posicionX = this.offsetX + TILE * 1.5;
        let posicionY = this.offsetY + TILE * 1.5;

    // Crear el laberinto y las bolitas
    mapa.forEach((fila, y) => {
        fila.forEach((celda, x) => {
            const px = this.offsetX + x * TILE + TILE / 2;
            const py = this.offsetY + y * TILE + TILE / 2;

            //hacen que se creen el laberinto con la matiz esa de arriba
            if (celda === 1) {
                this.paredes.create(px, py, 'pared');
            }

            if (celda === 2) {
                this.bolitas.create(px, py, 'bolita');
            }
        });
    });




            this.jugador = this.add.circle(
            posicionX, posicionY, 11, 0x39ff00
        );

        // Jugador con física
        this.physics.add.existing(this.jugador);

        this.jugador.body.setCircle(11);
        this.jugador.body.setCollideWorldBounds(true);

        // Evitar que atraviese las paredes 67
        this.physics.add.collider(
            this.jugador,
            this.paredes
        );





        // Recoger bolitas y la puntuacion
        this.physics.add.overlap(
            this.jugador,
            this.bolitas,
            (jugador, bolita) => {
                bolita.destroy();
                this.score += 10;
             this.textoScore.setText('Score: ' + this.score);


                 if (this.score == 840) {
     this.scene.start('Win', { score: this.score, Escena: 'Nivel3' });
    }      



            }
        );

        // Controles
        this.teclas = this.input.keyboard.createCursorKeys();

        // Limites del mapa
  this.physics.world.setBounds(this.offsetX, this.offsetY, anchoMapa, altoMapa);


        this.physics.world.setBoundsCollision(
            true, true, true, true
        );

        

        //esto de aca crea el texto de la puntuacion y el tiempo 
        this.textoScore = this.add.text(this.offsetX, 15, 'Score: 0', {
         fontSize: '20px',
         fontFamily: 'Fuente',
        color: '#ffffff'
        });
        //cuantos segundos le vamos a poner al nivel porque si jaja
        this.tiempo = 100;
        this.textoTiempo = this.add.text(this.offsetX + anchoMapa, 15, 'Tiempo: 100', {
            fontSize: '20px',
            color: '#ffffff',
            fontFamily: 'Fuente'

    }).setOrigin(1, 0);
        // 1 segundo = 1000 milisegundos lo que hace que se repita cada segundo
        this.time.addEvent({
         delay: 1000,
         loop: true,
        callback: () => {
             this.tiempo--; //disminuye el tiempo en 1 cada segundo
                this.textoTiempo.setText('Tiempo: ' + this.tiempo);
                    
                
         }

         
});

    this.time.delayedCall(100000, () => {
        this.scene.start('GameOver', { score: this.score });
    }, [], this);




    


}
    








    update() {
        const velocidad = 150;

        this.jugador.body.setVelocity(0);

        if (this.teclas.left.isDown) { 
                this.jugador.body.setVelocityX(-velocidad);
        } else if (this.teclas.right.isDown) {
            this.jugador.body.setVelocityX(velocidad);
        }

        if (this.teclas.up.isDown) {
                  this.jugador.body.setVelocityY(-velocidad);
        } else if (this.teclas.down.isDown) {
                this.jugador.body.setVelocityY(velocidad);
        }

        this.jugador.body.velocity.normalize().scale(velocidad);
    }

    

}


//Basicamente todos los niveles son iguales, solo cambia el mapa y el nombre de la clase, asi que no voy a explicar todo lo que hace cada cosa porque es lo mismo que en nivel1.js