var iconsArray = document.getElementsByClassName('icon');
var imagesArray = document.getElementsByClassName('image');
iconsArray = Array.prototype.slice.call(iconsArray); //collection into array
imagesArray = Array.prototype.slice.call(imagesArray);
addFlexOrder(setRandomOrder(iconsArray));
addFlexOrder(setRandomOrder(imagesArray));

//choose a icon of animal
for (var i = 0; i < iconsArray.length; i++) {
	iconsArray[i].onclick = function(){
		if(this.classList.length > 2) {
			var alredySelected = true;
		}
		else {
			var alredySelected = false;
		}
		var selectedIcon = document.getElementsByClassName('icon selected');
		selectedIcon = Array.prototype.slice.call(selectedIcon); //collection into array
		for (var j = 0; j < selectedIcon.length; j++) {
			selectedIcon[j].classList.remove('selected');
		}
		if (alredySelected == false) {
			this.classList.add('selected');
		}
    	checkSelecting();
	};
}

//choose a image of animal
for (var i = 0; i < imagesArray.length; i++) {
	imagesArray[i].onclick = function(){
		if(this.classList.length > 2) {
			var alredySelected = true;
		}
		else {
			var alredySelected = false;
		}
		var selectedImage = document.getElementsByClassName('image selected');
		selectedImage = Array.prototype.slice.call(selectedImage); //collection into array
		for (var j = 0; j < selectedImage.length; j++) {
			selectedImage[j].classList.remove('selected');
		}		
    	if (alredySelected == false) {
			this.classList.add('selected');
		}   
    	checkSelecting(); 	
	};
}


//random shuffle of array elements
function setRandomOrder(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}

//add to flex-elements the css style 'order' 
function addFlexOrder(array) {
	for (var i = 0; i < array.length; i++) {
		array[i].style.order = i;
	}
}

//check if comparee is needed
function checkSelecting() {
	if ( (document.getElementsByClassName('icon selected').length > 0) && (document.getElementsByClassName('image selected').length > 0) ) {
		setTimeout(compareAnimals(), 1000);
	}
}


//block the click and compare animals
function compareAnimals() {
	document.getElementById('icons').classList.add('unclickable');
	document.getElementById('images').classList.add('unclickable');

	var selectedIcon = document.getElementsByClassName('icon selected');
	selectedIcon = Array.prototype.slice.call(selectedIcon); //collection into array
	var selectedImage = document.getElementsByClassName('image selected');
	selectedImage = Array.prototype.slice.call(selectedImage); //collection into array
	if (selectedIcon[0].classList.item(0) == selectedImage[0].classList.item(0) ) {
		selectedIcon[0].classList.remove('selected');
		//selectedIcon[0].classList.remove('icon');
		selectedIcon[0].classList.add('guessed');	
		selectedImage[0].classList.remove('selected');
		selectedImage[0].classList.remove('image');
		selectedImage[0].classList.add('guessed');
		attemptMessage('Yes!');		
	}
	else {
		attemptMessage('No!');
	}
	document.getElementById('icons').classList.remove('unclickable');
	document.getElementById('images').classList.remove('unclickable');
}

function attemptMessage(text) {
	document.getElementById("messages").innerHTML = '<p>' + text + '</p>';
	document.getElementById('messages').classList.add('showMessage');
	setTimeout(function() {
		document.getElementById('messages').classList.remove('showMessage');
		document.getElementById("messages").innerHTML = '';
		if (document.getElementsByClassName('guessed').length == 64) {
			setTimeout(startAgain(), 4000);
		}
	}, 2000);

}

function startAgain() {
		document.getElementById('messages').classList.add('showMessage');
		document.getElementById("messages").classList.add('showLastMessage');
		document.getElementById("messages").innerHTML = '<p>All are guessed!</p> <button id="clickForReload">Play again?</button>';
		document.getElementById("clickForReload").onclick = function() {
			location.reload();
		}
}