export default class Menu extends Phaser.Scene {
    constructor() {
      super({key: 'menu'});
    } 



init(){

    this.score = 0;

}

preload() {
    this.load.image('fondo', '../assets/background.jpg');
   

    for (let i = 1; i <= 3; i++) {}

    //barrita de carga
    let barradecarga = this.add.graphics();
    this.load.on('progress', (porcentaje) => {
        barradecarga.clear();
        barradecarga.fillStyle(0xffffff, 1); //color de la barra de carga   
        barradecarga.fillRect(0, this.sys.game.config.height / 2, this.sys.game.config.width * porcentaje, 50);
    });

    this.load.image('logo', '../assets/logo.png');
    this.load.image('jugar', '../assets/jugar.png');

}

create() {
    

    this.add.image(this.scale.width / 2, this.scale.height / 2.1 - 100, 'logo').setOrigin(0.5, 0.5).setScale(0.5);

    let botonempezar =  this.add.image(this.scale.width / 2, this.scale.height / 2 + 100, 'jugar').setOrigin(0.5, 0.5).setScale(0.5).setInteractive();

    botonempezar.on('pointerdown', () => {
        this.scene.start('Nivel1');
    });


}

}