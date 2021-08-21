import Phaser from 'phaser'

import Preloader from './scenes/Preloader'
import StartingHouse from './scenes/StartingHouse'
import Forest from './scenes/Forest' 


const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y:0 },
			debug: true
		},

	},
	scene: [Preloader, Forest, StartingHouse]
}

export default new Phaser.Game(config)
