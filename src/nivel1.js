

const TILE = 32;

// Mapa del nivel 1 en matiz que luego se traduce en los objetos del laberinto XD
const mapa = [
   
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 3, 2, 2, 1, 2, 2, 2, 4, 1],
    [1, 2, 1, 2, 1, 2, 1, 2, 1, 1],
    [1, 2, 1, 2, 2, 2, 1, 2, 2, 1],
    [1, 2, 1, 1, 1, 0, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 2, 1, 1, 1, 2, 1, 1],
    [1, 2, 2, 2, 2, 0, 2, 2, 2, 1],
    [1, 2, 2, 1, 2, 2, 1, 1, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];


export default class Nivel1 extends Phaser.Scene {
    constructor() {
      super({key: 'Nivel1'});
    } 

init(){

    this.score = 0; 
}

preload() {
    this.load.image('fondo', 'assets/background.jpg');
    this.load.image('pared', 'assets/Pared.png');
    this.load.image('enemigo', 'assets/enemigo.png');
    this.load.audio('nivel1','assets/nivel1.mp3');


    this.load.font({
    key: 'Fuente',
    url: '../assets/VCR_OSD_MONO_1.001.ttf',
    format: 'truetype'
});

}

create() {

      this.musica = this.sound.play('nivel1', {
            loop: true,
            volume: 0.1
        });

        
    
    //el fondito
        this.add.image(this.scale.width/2, this.scale.height/2, 'fondo').setDisplaySize(this.scale.width, this.scale.height);
// Calcula el tamaño del mapa y el offset para centrarlo porque si no queda feo en la esquina


let textoins = this.add.text(this.scale.width / 2, this.scale.height / 2 - 190, 'Puedes moverte con las flechas de tu teclado, no dejes que el enemigo te haga perder!', {
        fontSize: '22px',
        color: '#ffffff',
        fontFamily: 'Segoe UI',
        shadow: {
                 offsetX: 2,
                 offsetY: 2,
                 color: '#000000',
                 blur: 4,
                 stroke: false,
                 fill: true
    }
    }).setOrigin(0.5, 0.5);

    this.time.delayedCall(5000, ()=>{
        textoins.destroy();
    }, [], this);


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
        
        //enemigo
       this.enemigo = this.physics.add.sprite(posicionX + 130, posicionY, 'enemigo');
        this.physics.add.existing(this.enemigo);
        this.enemigo.body.setCircle(11);
        this.velocidadEnemigo = 90;
        this.objetivoEnemigo = null;

         this.physics.add.overlap(
            this.jugador, this.enemigo,
                   () =>{
                    this.sound.stopAll();
                   this.scene.start('GameOver', { score: this.score });
                   }
                
        );

        





        // Recoger bolitas y la puntuacion
        this.physics.add.overlap(
            this.jugador,
            this.bolitas,
            (jugador, bolita) => {
                bolita.destroy();
                this.score += 10;
             this.textoScore.setText('Score: ' + this.score);


                 if (this.score == 390) {
        this.scene.start('Win', { score: this.score, Escena: 'Nivel2' });
        this.sound.stopAll();
        
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
        this.sound.stopAll();
        
    }, [], this);






}

    tileDe(x, y) {
    return {
        col: Math.floor((x - this.offsetX) / TILE),
        fila: Math.floor((y - this.offsetY) / TILE)
    };
    }

    centroTile(col, fila) {
    return {
        x: this.offsetX + col * TILE + TILE / 2,
        y: this.offsetY + fila * TILE + TILE / 2
    };
    }


    BFS(origen, destino){
        if(origen.col == destino.col && origen.fila == destino.fila){
            return null;
        }

        //indica las direccion posibles, solo con 4
        const diresPosibles = [
            [1,0], //derecha
            [-1,0], //izquierda
            [0,1], //abajo
            [0,-1] //arriba
        ]

        const visitado = new Set([origen.fila+','+origen.col]);
        const cola = [{
            col: origen.col,
            fila: origen.fila,
            primero: null
        }];

        let seguridad = 0;

        while(cola.length > 0) {
             if (++seguridad > 1000) {
        console.error('BFS: demasiadas vueltas, revisa la lógica');
        return null;
    }
            const actuar = cola.shift();

            console.log('explorando', actuar.col, actuar.fila);

            for (const [cambiocolumn, cambiofila] of diresPosibles){
                const col = actuar.col + cambiocolumn;
                const fila = actuar.fila+ cambiofila;
                const clave = fila +','+ col;

                //si sale del mapa lo ignora
                if(fila < 0 || fila >= mapa.length || col<0 || col >= mapa[0].length){ 
                    continue;
                }

                if(mapa[fila][col]===1|| visitado.has(clave)){
                    continue;
                }
                visitado.add(clave);

                const primero = actuar.primero || {col, fila};

                if (col === destino.col && fila == destino.fila) {
                    return primero;
                }
                cola.push({col, fila, primero});
                


            }
        }

        console.log('BFS sin camino. Tiles visitados:', visitado.size, 'seguridad:', seguridad);
return null;

        

    }

    moverenemigo(){
        const cuerpo = this.enemigo.body;

        if(!this.objetivoEnemigo) {
            const tila = this.tileDe(this.enemigo.x, this.enemigo.y);
            this.objetivoEnemigo = this.centroTile(tila.col, tila.fila);
        }

        const distancial = Phaser.Math.Distance.Between(
            this.enemigo.x, this.enemigo.y,
            this.objetivoEnemigo.x, this.objetivoEnemigo.y
        );

        if (distancial < 4){
            cuerpo.reset(this.objetivoEnemigo.x, this.objetivoEnemigo.y);

            const origen = this.tileDe(this.enemigo.x, this.enemigo.y);
            const destino = this.tileDe(this.jugador.x, this.jugador.y);
            const paso = this.BFS(origen, destino);



            if (paso){
                this.objetivoEnemigo = this.centroTile(paso.col, paso.fila);
            }

        }

        this.physics.moveTo(
            this.enemigo,
            this.objetivoEnemigo.x,
            this.objetivoEnemigo.y,
            this.velocidadEnemigo
        );

        

    }
    


    








    update() {
        const velocidad = 150;

        this.jugador.body.setVelocity(0);

        if (this.teclas.left.isDown) { 
                this.jugador.body.setVelocityX(-velocidad);
        }
         if (this.teclas.right.isDown) {
            this.jugador.body.setVelocityX(velocidad);
        }
        if (this.teclas.up.isDown) {
                  this.jugador.body.setVelocityY(-velocidad);
        }
         if (this.teclas.down.isDown) {
                this.jugador.body.setVelocityY(velocidad);
        }


        const L = this.tileDe(this.jugador.x, this.jugador.y);
        const P = this.centroTile(L.col, L.fila);
        const horizontal = this.teclas.left.isDown || this.teclas.right.isDown;
        const vertical = this.teclas.up.isDown || this.teclas.down.isDown;

        if(horizontal && !vertical){
            this.jugador.body.setVelocityY(Phaser.Math.Clamp((P.y - this.jugador.y)*10, -velocidad, velocidad));
        } else if (vertical && !horizontal){
            this.jugador.body.setVelocityX(Phaser.Math.Clamp((P.x - this.jugador.x)*10, -velocidad, velocidad));
        }

        this.moverenemigo();

    

    

}


}


