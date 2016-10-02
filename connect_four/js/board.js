var Board = function(){

	var that = this;
	var container = document.getElementsByClassName('container')[0];
	var board = document.getElementsByClassName('board')[0];
	var boardCoordinate = board.getBoundingClientRect();
	var boardLeft = boardCoordinate.left;
	var columnSize = 7;
	var rowSize = 6;
	var winStrikes = 4;

	this.init = function() {

		this.map = [];
		this.player1 = new Player(1, 'player1');
		this.player2 = new Player(-1, 'player2');
		this.currentPlayer = this.player1;
		this.win = false;

		var i, j;

		for(i=0; i <=rowSize; i++){
			this.map[i] = [];
			for(j=0; j <=columnSize; j++){
				this.map[i][j] = 0;
			}
		}

		// clear the screen and redraw the board
		board.innerHTML = '';
		that.drawMap();
	};

	this.drawMap = function() {
		for(var i=0; i <=rowSize; i++) {
			var row = document.createElement('div');
			row.className = 'row';
			
			for(var j=0; j <=columnSize; j++) {
				var cell = document.createElement('span');
				cell.className = 'cell';
				if(that.map[i][j] !== 0) {
					var dot = document.createElement('span');
					if(that.map[i][j] === 1){
						dot.className = 'red';
					}else{
						dot.className = 'yellow';
					}
					cell.appendChild(dot);
				}
				row.appendChild(cell);
			}
			board.appendChild(row);
		}

	}

	this.checkWinner = function() {
		// horizontal win
		for(var r=rowSize; r >=0; r--){
			var strikeCount = 0;
			for(var j=0; j <=columnSize; j++){
				if(that.map[r][j] === that.currentPlayer.value){
					strikeCount += 1;
					if(strikeCount === winStrikes){
						// need to update!
						that.win = true;
						return that.win;
					}
				}else if(strikeCount !==0 && that.map[r][j] !== that.currentPlayer.value){
					strikeCount = 0;
				}
			}
		}

		// vertical win
		for(var c=0; c <= columnSize; c++){
			var strikeCount = 0;
			for(var r=rowSize; r >= 0; r--){
				if(that.map[r][c] === that.currentPlayer.value){
					strikeCount += 1;
					if(strikeCount === winStrikes){
						// need to update!
						that.win = true;
						return that.win;
					}
				}else if(strikeCount !==0 && that.map[r][c] !== that.currentPlayer.value){
					strikeCount = 0;
				}
			}
		}
		
		// diagonal win
		for(var r=rowSize; r>= 0; r--){
			var strikeCount = 0;
			for(var c=0; c <= columnSize; c++){
				if(that.map[r][c] === that.currentPlayer.value) {
					strikeCount += 1;

					// positive slope
					for(var s=1; s < winStrikes; s++){
						if(r-s >=0 && c+s <= columnSize){
							if(that.map[r-s][c+s] === that.currentPlayer.value) {
								strikeCount += 1;
							}
						}
						if(strikeCount === winStrikes){
							// need to update!
							that.win = true;
							return that.win;
						}
					}
					// reset strike count to 1.
					strikeCount = 1;

					// negative slope
					for(var s=1; s < winStrikes; s++){
						if(r-s >=0 && c-s >=0){
							if(that.map[r-s][c-s] === that.currentPlayer.value) {
								strikeCount += 1;
							}
						}
						if(strikeCount === winStrikes){
							// need to update!
							that.win = true;
							return that.win;
						}
					}

					// reset strike count to 0.
					strikeCount = 0;

				}else if(strikeCount !==0 && that.map[r][c] !== that.currentPlayer.value){
					strikeCount = 0;
				}
			}
		}
	}

	board.addEventListener('click', function(event){
		// check which column does the player click;
		// divided by 52, which is the cell's width;

		var clickColumnNumber = parseInt((event.clientX - boardLeft) / 52);

		for(var r=rowSize; r >=0; r--) {
			if(that.map[r][clickColumnNumber] === 0) {
				that.map[r][clickColumnNumber] = that.currentPlayer.value;
				// clear the screen and redraw the board
				board.innerHTML = '';
				that.drawMap();

				if(that.checkWinner()){
					setTimeout(function(){
						alert(that.currentPlayer.name + ' won!');
						that.init();
					}, 50);
					return;
				}

				// shift player once user click;
				if(that.currentPlayer.value === 1) {
					that.currentPlayer = that.player2;
				}else{
					that.currentPlayer = that.player1;
				}
				break;
			}
		}

	});

	this.init();
};