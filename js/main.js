//create text variable for elements:
var h1 = document.createElement('H1');
var div = document.createElement('DIV');
var divContainer = document.createElement('DIV');
var divResults = document.createElement('DIV');
var input = document.createElement('INPUT');
var btn = document.createElement('BTN');

//create #id for div:
divResults.id = "results";
btn.id = "btn";
input.id = "search";

//create .class for div:
div.className = "bookSearch";
divContainer.className = "container";
btn.className = 'btn btn-default btn-md';

// btn.type = "button";


//create textnode:
var h1Text = document.createTextNode('Book Search');
var btnText = document.createTextNode('SUBMIT');
// console.log(h1Text);
// console.log(btnText);

//create attribute:
input.placeholder = 'search here!'

// use .appendChild to append textNode or variable to element:
h1.appendChild(h1Text);
btn.appendChild(btnText);
div.appendChild(divContainer);
divContainer.appendChild(h1);
divContainer.appendChild(input);
divContainer.appendChild(btn);
divContainer.appendChild(divResults);

document.getElementById('googleBooks').appendChild(div);


//Google books API:
function bookSearch(){
//create text variable to assign the input's value.
	var search = input.value;
//Setting results.innerHTML to empty string will empty out the results div, so that
// whatever is searched next can take up that space.
	results.innerHTML = "";
//AJAX - you can load multiple things are once (i.e. call a bunch of data at same time).
	$.ajax({
		url: 'https://www.googleapis.com/books/v1/volumes?q=' + search + '&maxResults=40',
//JSON - JavaScript Object Notation, literally means that the entire file looks like a JS object.
		dataType: 'json',
//using GET to bring information back from API.
		type: 'GET',
//The data parameter is the entire JSON file retrieved from server. Reminder, the 
//parameter is just a variable.
		success: function(books){
			console.log(books);
//books is the name of large object, one of the property is 'items' array.
			for(var i=0; i < books.items.length; i++){
				var img = document.createElement('img');
				var a = document.createElement('a');
//
				img.src = books.items[i].volumeInfo.imageLinks.thumbnail;
				a.href = books.items[i].volumeInfo.previewLink;

				img.className = "animated infinite pulse"
				a.target = "_blank";
				a.appendChild(img);
//books is the name of large object, the 'volumeInfo' property in array and there is a 
//title property. This all goes inside the results div:
				results.innerHTML += '<h2>'+ books.items[i].volumeInfo.title + '</h2>';
				results.innerHTML += '<h2>'+ books.items[i].volumeInfo.authors + '</h2>';
				results.innerHTML += '<h3>'+ books.items[i].volumeInfo.publisher + '</h3>';
				results.innerHTML += '<h3>'+ books.items[i].volumeInfo.publishedDate + '</h3>';
				results.appendChild(a);
			}
		}
	});
}
//These are the parameters for addEventListener: ('type', listener, useCapture)
// example: btn.addEventListener('type', listener, useCapture);
btn.addEventListener('click', bookSearch, false);


//Example: immediately invoked expression. You targetted the body to run the program.
// (function() {
// 	var body = document.getElementById('body')
// 	body.addEventListener('click', bookSearch, false);
// })();


