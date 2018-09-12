var mammals = ['bear', 'boar', 'camel', 'cat', 'cow', 'deer', 'dog', 'donkey',
			   'elephant', 'elk', 'fox', 'giraffe', 'goat', 'hamster', 'hedgehog', 'hippo',
			   'horse', 'hyena', 'kangaroo', 'lion', 'monkey', 'mouse', 'panda', 'porcupine',
			   'rabbit', 'racoon', 'rhinoceros', 'sheep', 'squirrel', 'tiger', 'wolf', 'zebra'];
var iconsArray = document.querySelectorAll('.icon');
var imagesArray = document.querySelectorAll('.image');

mammals.sort(compareRandom);

//IMPORTANT! Check before, that mammals.length == iconsArray.length
for (let i = 0; i < iconsArray.length; i++) {
	iconsArray[i].classList.add(mammals[i]);
	iconsArray[i].addEventListener('click', function(){
		toggleClass(iconsArray[i], 'icon');
	});		
}


mammals.sort(compareRandom);
//IMPORTANT! Check before, that mammals.length == imagesArray.length
for (let i = 0; i < imagesArray.length; i++) {
	imagesArray[i].classList.add(mammals[i]);
	imagesArray[i].innerHTML = '<p>' + mammals[i] + '</p>';
	imagesArray[i].addEventListener('click', function(){
		toggleClass(imagesArray[i], 'image');
	});	
}


function compareRandom(a, b) {
  return Math.random() - 0.5;
}

function toggleClass(item, subclass) {	
		let earlySelected = document.querySelectorAll('.' + subclass + '.selected');

		earlySelected.forEach(function(elem) {
			if (elem != item) {
				elem.classList.remove('selected');
			}
		});		

		item.classList.toggle('selected');


		if ( !!document.querySelectorAll('.icon.selected')[0] && !!document.querySelectorAll('.image.selected')[0]) {
			setTimeout(compareAnimals(), 1000);
		}
}


//block the click and compare animals
function compareAnimals() {
	for (icon of iconsArray) {
		icon.classList.add('unclickable');
	}
	for (image of imagesArray) {
		image.classList.add('unclickable');
	}

	let selectedIcon = document.querySelector('.icon.selected');
	let selectedImage = document.querySelector('.image.selected');

	if (selectedIcon.classList.item(1) == selectedImage.classList.item(1) ) {
		selectedIcon.classList.remove('selected');
		selectedIcon.classList.add('guessed');

		selectedImage.classList.remove('selected');
		selectedImage.classList.add('guessed');

		attemptMessage('Yes!');		
	}	
	else {
		attemptMessage('No!');
	}

	setTimeout(function() {
		for (icon of iconsArray) {
			icon.classList.remove('unclickable');
		}
		for (image of imagesArray) {
			image.classList.remove('unclickable');
		}
	}, 1500);
}

function attemptMessage(text) {
	let message = document.querySelector('#messages');

	message.innerHTML = '<p>' + text + '</p>';
	message.classList.add('showMessage');

	setTimeout(function() {
		message.classList.remove('showMessage');
		message.innerHTML = '';
		if (document.querySelectorAll('.guessed').length == iconsArray.length*2) {
			setTimeout(startAgain(), 3000);
		}
	}, 1500);

}

function startAgain() {
	let message = document.querySelector('#messages');
	message.classList.add('showMessage');
	message.classList.add('showLastMessage');
	message.innerHTML = '<p>All are guessed!</p> <button>Play again?</button>';
	document.querySelector('button').onclick = function() {
		location.reload();
	}
}