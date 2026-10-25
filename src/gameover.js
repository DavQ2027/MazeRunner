export default class GameOver extends Phaser.Scene {
    constructor() {
      super({key: 'GameOver'});
    } 



init(datos){

    //arranca desde el puntaje donde perdio el jugador

    this.score = datos.score || 0;


}

preload() {
   
        this.load.font({
    key: 'Fuente',
    url: '../assets/VCR_OSD_MONO_1.001.ttf',
    format: 'truetype'
});

this.load.audio('gameover', 'assets/gameover.mp3')

}

create() { 
    const { width, height } = this.scale; 
    const grid = this.add.graphics();
        grid.lineStyle(1, 0x38bdf8, 0.08);
        for (let x = 0; x <= width; x += 40) grid.lineBetween(x, 0, x, height);
        for (let y = 0; y <= height; y += 40) grid.lineBetween(0, y, width, y);

    this.add.text(this.scale.width / 2, this.scale.height / 2.1 - 100, 'Game Over', {
        fontSize: '100px',
        color: '#ff0000',
        fontFamily: 'Fuente'
    }).setOrigin(0.5, 0.5);

    this.textoscore = this.add.text(this.scale.width / 2, this.scale.height / 2, 'Score:', {
        fontSize: '30px',
        color: '#ffffff',
        fontFamily: 'Fuente'
    }).setOrigin(0.5, 0.5);

    this.textoscore.setText('Score: ' + this.score);

    let boton = this.add.text(this.scale.width / 2, this.scale.height / 2 + 100, 'Click para reiniciar', {
        fontSize: '30px',
        color: '#ffffff',
        fontFamily: 'Fuente'
    }).setOrigin(0.5, 0.5).setInteractive();

    boton.on('pointerdown', () => {
        this.scene.start('menu');
    });

    this.sound.play('gameover',{
        loop:false,
        volume: 0.9
    }

    )






}
}
