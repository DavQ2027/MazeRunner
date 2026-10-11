const config = {
    width: 800,
    height: 600,
    type: Phaser.AUTO,
    parent: 'container',
    scene: {
        preload: preload,
        create: create,
        update: update
    }

    
}

var game = new Phaser.Game(config);

function preload() {
    this.load.image('jugador', 'assets/jugador.png');
}

function create() {
    this.input.keyboard.on('keydown', function (event) {
        if (event.key === 'ArrowUp') {
            console.log('Arriba');
        } else if (event.key === 'ArrowDown') {
            console.log('Abajo');
        } else if (event.key === 'ArrowLeft') {
            console.log('Izquierda');
        } else if (event.key === 'ArrowRight') {
            console.log('Derecha');
        }
    });
}

function update() {
  
}   


