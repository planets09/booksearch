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

//create textNode:
var h1Text = document.createTextNode('Book Search');
var btnText = document.createTextNode('SUBMIT');

//create attribute:
input.placeholder = 'search here!'

h1.appendChild(h1Text);
btn.appendChild(btnText);
div.appendChild(divContainer);
divContainer.appendChild(h1);
divContainer.appendChild(input);
divContainer.appendChild(btn);
divContainer.appendChild(divResults);

document.getElementById('googleBooks').appendChild(div);

function bookSearch(){
	var search = input.value;
	results.innerHTML = "";
	$.ajax({
		url: 'https://www.googleapis.com/books/v1/volumes?q=' + search + '&maxResults=40',
		dataType: 'json',
		type: 'GET',
		success: function(books){
			// console.log(books);
			for(var i=0; i < books.items.length; i++){
				var img = document.createElement('img');
				var a = document.createElement('a');
				
				img.src = books.items[i].volumeInfo.imageLinks.thumbnail;
				a.href = books.items[i].volumeInfo.previewLink;
				img.className = "animated infinite pulse"
				a.target = "_blank";
				a.appendChild(img);

				results.innerHTML += '<h2>'+ "Title: " + books.items[i].volumeInfo.title + '</h2>';
				results.innerHTML += '<h3>'+ "Author: " + books.items[i].volumeInfo.authors + '</h3>';
				results.innerHTML += '<h3>'+ "Publisher: " + books.items[i].volumeInfo.publisher + '</h3>';
				results.innerHTML += '<h3>'+ "Published date: " + books.items[i].volumeInfo.publishedDate + '</h3>';
				results.appendChild(a);
			}
		}
	});
}
btn.addEventListener('click', bookSearch, false);



