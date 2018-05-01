'use strict';


//Zuckerberg cyborg upgrades
const IMAGES = {	// wheat
	wheat: 'https://i.imgur.com/MENB59i.png',

	// sparse wheat
	sparse_wheat: 'https://i.imgur.com/MENB59i.png'
};

const GRID_ROWS = 1;
const GRID_COLS = 1;
const GRID_CELL_SIZE = 300;
const GRID_DRAG = false;
const GRID_EMPTY = [211, 221, 237];
const ZUCK_TEXT = ['There is only one way to build your social media empire these days. Sell strangers\' data! No holding back in this digital revolution. Click your way to fortune!', 'And so your journey begins... hahahaha!', ' Don\'t be afraid to become the ultimate Face-bot, Zuckerberg.', 'You: "How long will it take to become a borg?"', 'You are now the ultimate ZUCKERBORG. Bee bop be dop bop bee!' ];
const ZUCK_IMG = ['https://i.imgur.com/RBJ9sw7.jpg', 'https://i.imgur.com/2KZmAoG.jpg',
 'https://i.imgur.com/UHBwhKk.jpg', 'https://i.imgur.com/lraB72m.jpg', 'https://i.imgur.com/vb1Do7w.jpg'];
var ZUCK_STATE = 0;
var ZUCK_COST = 250;
var START = false;
const BACKGROUND_COLOR = [106, 152, 221]
var QUANT = 1;

const RESOURCES = {
	money: '💰',
	serverspace: '💽'
};

const STATE = {
	resources: {
		money: 100,
		serverspace: 10

	},
	cashPerCrop: 50,
	investment: 0,
	adjArr: ['Big', 'Expensive', 'Productive,', 'Big-ticket',
			 'Costly', 'Fertile', 'Fruitful', 'Rich', 'Monied', 'Silk-stocking',
			 'Luxurious', 'Lavish', 'Deluxe', 'Sumptuous', 'Fast', 'Splendid',
			 'Grandiose', 'Fancy', 'Futuristic', 'Imposing', 'Swanky', 'Ambitious',
			 'Enterprising', 'Power-hungry', 'Zealous', 'Formidable', 'Resourceful',
			 'Bold', 'Entreprenurial', 'Bright', 'Ingenious', 'Pioneering'],

	nounArr: ['Data', 'Systems', 'Statistics', 'Info', 'Bannon', 'Set', 'Matrices',
			  'Plato', 'Advertisements', 'Zuckerberg', 'Broadband', 'Evidence', 'Knowledge',
			  'Scoop', 'Figures', 'Enhancement Drugs', 'Reports', 'Analytics', 'Algorythm']

};


class Wheat extends Item {
	init() {
		this.quantity = QUANT;
		this.sick = false;
	}

	get cost() {
		return {
			money: 20,
			serverspace: 1
		}
	}

	get info() { 
		return `${this.quantity} of your accounts! `
	
	}

	get image() {
		if (this.quantity < 3) {
			return 'wheat'
		} else {
			return 'sparse_wheat'
		}
	}

	onClick() {
		this.quantity -= 1;
		STATE.resources.money += STATE.cashPerCrop;
		if (this.quantity <= 0) {
			this.destroy();
			showMessage('Account Farmed !');
		}
	}
}

var tractorBonus = new Bonus('Powerful Tractor', {money: 50},
	function () {
		STATE.cashPerCrop += 5;
		var bon = new Bonus('bon', {money: 4})
		menu.addButton(new Button())
	})

var investmentPortfolio = new Bonus('Investment Portfolio', {money: 100},
	function() {
		STATE.investment += 0.1;
	})

var zuckUpgrade = new Bonus('UPZUCK','UPGRADE ZUCKERBORG', {money: ZUCK_COST},
	function() {
		if(ZUCK_STATE <= 4){
			meter1.update (meter1.val + 25)
			ZUCK_STATE++;
			ZUCK_COST += 250;
				showModal(`ZUCKERBORG PHASE ${ZUCK_STATE}`, `${ZUCK_TEXT[ZUCK_STATE]}<img src = '${ZUCK_IMG[ZUCK_STATE]}'>`);

			
		}
	})

var accPkg = new Bonus('PACKAGE DEAL', 'Hack their friends, too!', {money: 1000},
	function() {
		QUANT = 5;
	} )

var menu = new Menu('Info Deals', [
	new Button('Buy Account', tryBuy(Wheat)),
	new Button('Upgrade Servers', tryBuy(tractorBonus)),
	new Button('Outsource Labor', tryBuy(investmentPortfolio)),
	new Button('Account Hervester Upgreade!', tryBuy(accPkg))
	])

var menu2 = new Menu('UpZucks', [
	new Button('Upgrade Zuckerberg', tryBuy(zuckUpgrade)),
	])

var meter1;

function init() {
	var wheat = new Wheat();
	GAME.grid.place(wheat, 0, 0);
	meter1 = new Meter('Progress', 0);
	showModal(`ZUCKERBORG PHASE 0 `, `There is only one way to build your social media empire these days. Sell strangers' data! No holding back in this digital revolution. Click your way to fortune!  <img src = '${ZUCK_IMG[0]}'>`);



//to update the value of the meter 


	defineHarvester('serverspace', function() {
		return 1 * STATE.resources.money;
	}, 2000);

	defineHarvester('money', function() {
		return round(STATE.resources.money *  STATE.investment)
	}, 2000);

	defineHarvester('money', function() {
		return -round(STATE.resources.money * .3)
	}, 10000);
}

function main() {

}
