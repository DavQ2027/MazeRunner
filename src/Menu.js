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

    this.load.image('logo', '../public/assets/logo.png');
    this.load.image('jugar', '../public/assets/jugar.png');
    this.load.image('fondoini', '../public/assets/fondoinicio.jpg')

}

    create() {
        const { width, height } = this.scale;
        const mitad = width / 2;
 
        // el fondo cuadriculado
        const grid = this.add.graphics();
        grid.lineStyle(1, 0x38bdf8, 0.08);
        for (let x = 0; x <= width; x += 40) grid.lineBetween(x, 0, x, height);
        for (let y = 0; y <= height; y += 40) grid.lineBetween(0, y, width, y);
 
     // el efecto 2d
        const baseStyle = {
            fontFamily: 'Orbitron, sans-serif',
            fontStyle: '900',
            fontSize: '110px',
            align: 'center'
        };
 
        // Capas de sombras
        const shadows = [
            { off: 12, color: '#0f172a' },
            { off: 8, color: '#0369a1' },
            { off: 4, color: '#0284c7' }
        ];
 
        const makeTitle = (text, y, color) => {
            shadows.forEach(s => {
                this.add.text(mitad + s.off, y + s.off, text, { ...baseStyle, color: s.color }).setOrigin(0.5);
            });
            return this.add.text(mitad, y, text, { ...baseStyle, color }).setOrigin(0.5);
        };
 
        makeTitle('MAZE', 150, '#38bdf8');
        makeTitle('RUNNER', 270, '#fbbf24');
 
        this.createPlayButton(mitad, 500);
    }
 
    createPlayButton(x, y) {
        const ancho = 340, alto = 90;
 
        const shadow = this.add.rectangle(0, 8, ancho, alto, 0xca8a04);
        const bg = this.add.rectangle(0, 0, ancho, alto, 0xfacc15).setStrokeStyle(4, 0xffffff);
        const icon = this.add.text(-70, 0, '▶', {
            fontFamily: 'Orbitron, sans-serif', fontStyle: '900', fontSize: '34px', color: '#050b18'
        }).setOrigin(0.5);
        const label = this.add.text(20, 0, 'PLAY', {
            fontFamily: 'Orbitron, sans-serif', fontStyle: '900', fontSize: '38px', color: '#050b18'
        }).setOrigin(0.5);
 
        const button = this.add.container(x, y, [shadow, bg, icon, label]);
        button.setSize(ancho, alto + 8);
        button.setInteractive({ useHandCursor: true });
 
        button.on('pointerover', () => {
            bg.setFillStyle(0xfef08a);
            this.tweens.add({ targets: button, y: y - 3, scale: 1.03, duration: 120 });
        });
 
        button.on('pointerout', () => {
            bg.setFillStyle(0xfacc15);
            this.tweens.add({ targets: button, y: y, scale: 1, duration: 120 });
        });
 
        button.on('pointerdown', () => {
            this.tweens.add({ targets: button, y: y + 4, scale: 0.98, duration: 60 });
            shadow.y = 3;
        });
 
        button.on('pointerup', () => {
            this.cameras.main.fadeOut(250, 5, 11, 24);
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start('Nivel1');
            });
        });
    }
}
