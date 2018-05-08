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
var ZUCK_COST = 100;
var START = false;
const BACKGROUND_COLOR = [106, 152, 221]
var UP_COST = 1000;

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
	adjArr: ['Big', 'Expensive', 'Productive', 'Big-ticket',
			 'Costly', 'Fertile', 'Fruitful', 'Rich', 'Monied', 'Silk-stocking',
			 'Luxurious', 'Lavish', 'Deluxe', 'Sumptuous', 'Fast', 'Splendid',
			 'Grandiose', 'Fancy', 'Futuristic', 'Imposing', 'Swanky', 'Ambitious',
			 'Enterprising', 'Power-hungry', 'Zealous', 'Formidable', 'Resourceful',
			 'Bold', 'Entreprenurial', 'Bright', 'Ingenious', 'Pioneering'],

	nounArr: ['Data', 'Systems', 'Statistics', 'Info', 'Bannon', 'Set', 'Matrices',
			  'Plato', 'Advertisements', 'Zuckerberg', 'Broadband', 'Evidence', 'Knowledge',
			  'Scoop', 'Figures', 'Enhancement Drugs', 'Reports', 'Analytics', 'Algorythm']

};

class Account_Cell extends Cell{
	constructor() {
		super();
	}

	get image(){
		return('wheat');
	}

	canPlace(item){
		return false;
	}

	onClick(){
		STATE.resources.money += STATE.cashPerCrop * (ZUCK_STATE + 1);
	}
}


var investmentPortfolio = new Bonus(newBonus(), {money: UP_COST},
	function() {
		UP_COST *= 2
		 STATE.cashPerCrop *= 1.5
	})

var zuckUpgrade = new Bonus('UPZUCK','UPGRADE ZUCKERBORG', {money: ZUCK_COST},
	function() {
		if(ZUCK_STATE < 4){
			meter1.update (meter1.val + 25)
			ZUCK_STATE++;
				showModal(`ZUCKERBORG PHASE ${ZUCK_STATE}`, `${ZUCK_TEXT[ZUCK_STATE]}<img src = '${ZUCK_IMG[ZUCK_STATE]}'>`);

			
			ZUCK_COST *=2;
			this.cost.money = ZUCK_COST;
		}
	})

var accPkg = new Bonus('PACKAGE DEAL', 'Hack their friends, too!', {money: 1000},
	function() {
		cashPerCrop *= 2;
	} )

var menu = new Menu('Info Deals', [
	new BuyButton(investmentPortfolio.name, (investmentPortfolio), function(){
		var bongo = new Bonus(newBonus(), {money: UP_COST}, function(){
		UP_COST *= 2
		 STATE.cashPerCrop *= 1.5
		}) 
		menu.addButton(new BuyButton(bongo.name, bongo))
	}),
	])
	var menu2 = new Menu('UpZucks', [
	new Button('Upgrade Zuckerberg', tryBuy(zuckUpgrade)),
	])

var meter1;

function newBonus() {
	var adj = randomChoice(STATE.adjArr)
	var noun = randomChoice(STATE.nounArr)

	return (`${adj} ${noun}`)
}

function init() {

	meter1 = new Meter('Progress', 0);


	showModal(`ZUCKERBORG PHASE 0 `, `There is only one way to build your social media empire these days. Sell strangers'
	 data! No holding back in this digital revolution. Click your way to fortune!  <img src = '${ZUCK_IMG[0]}'>`);


	showModal('ZUCKERBORG: THE GAME, <br> CAMBRIDGE ANA(CLICK)TICA', '', [new Button ('START',
		function(){
		showModal(`ZUCKERBORG PHASE 0 `, `There is only one way to build your social media empire these days. Sell strangers' data! No holding back in this digital revolution. Click your way to fortune!  <img src = '${ZUCK_IMG[0]}'>`);
		})]);		
	

	let accCell = new Account_Cell();
	GAME.grid.setCellAt(accCell, 0, 0)

	defineHarvester('serverspace', function() {
		return 1 * STATE.resources.money;
	}, 2000);

	defineHarvester('money', function() {
		return round(STATE.resources.money *  STATE.investment)
	}, 2000);
}

function main() {

}
