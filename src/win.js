export default class Win extends Phaser.Scene {
    constructor() {
      super({key: 'Win'});
    } 



init(datos){

    //los datos que vamos a utilizar de las escenas anteriores 

    this.score = datos.score || 0;
    this.escena = datos.Escena || '';

}

preload() {
    // Carga de recursos
    this.load.image('fondo', 'assets/background.jpg');
    this.load.font({    
        key: 'Fuente',  
        url: '../assets/VCR_OSD_MONO_1.001.ttf',
        format: 'truetype'
    });





}

create() {

    //Texto de victoria y puntaje
    this.add.text(this.scale.width / 2, this.scale.height / 2.0 - 100, 'You Win!', {
        fontSize: '100px',
        color: '#00ff00',
        fontFamily: 'Fuente'
    }).setOrigin(0.5, 0.5);

    this.textoscore = this.add.text(this.scale.width / 2, this.scale.height / 2, 'Score:', {
        fontSize: '30px',
        color: '#ffffff',
        fontFamily: 'Fuente'
    }).setOrigin(0.5, 0.5);
    
    this.textoscore.setText('Score: ' + this.score);

    let boton = this.add.text(this.scale.width / 2, this.scale.height / 2 + 100, 'Ir a menu', {
        fontSize: '30px',
        color: '#ffffff',
        fontFamily: 'Fuente'
    }).setOrigin(0.5, 0.5).setInteractive();

    boton.on('pointerdown', () => {
        this.scene.start('menu');
    });

    let boton2 = this.add.text(this.scale.width / 2, this.scale.height / 2 + 150, 'Continuar al siguiente nivel', {
        fontSize: '30px',
        color: '#ffffff',
        fontFamily: 'Fuente'
    }).setOrigin(0.5, 0.5).setInteractive();

    boton2.on('pointerdown', () => {

        // Esto hace que si el jugador llega a 840 puntos se pase a la escena de victoria y la escena que acaba de pasar

        if (this.escena == 'XD') {
        boton2.setText('Has completado todos los niveles!');
        boton2.disableInteractive();
        } else {
        this.scene.start(this.escena, { score: this.score });
        }
    });

}

}