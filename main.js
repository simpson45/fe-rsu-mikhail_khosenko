function loadBooks() {

	var xhr = new XMLHttpRequest();

	xhr.open('GET', 'books.json', true);

	var button = document.getElementById('button-load_books');
	var status = document.getElementById('status');

	xhr.onreadystatechange = function() {
		if (xhr.readyState != 4) return;

		// button.parentNode.removeChild(button);
		status.innerHTML = '&nbsp; Done!';

		button.disabled = false;

		if (xhr.status != 200) {
			// обработать ошибку
			alert(xhr.status + ': ' + xhr.statusText);
		} else {
			try {
				var books = JSON.parse(xhr.responseText);
			} catch (e) {
				alert("Uncorrect answer " + e.message);
			}
			showBooks(books);
		}
	}

	xhr.send();

	status.innerHTML = 'Downloading...';
	button.disabled = true;
}

function showBooks(books) {

	list.innerHTML = ' ';
	books.forEach(function(book) {
		var li = list.appendChild(document.createElement('li'));
		var img = li.appendChild(document.createElement('img'))
		var header = li.appendChild(document.createElement('h3'))
		var author = li.appendChild(document.createElement('p'))
		var rating = li.appendChild(document.createElement('p'))
		img.innerHTML = '<img class="book-cover" src="'+book.imageUrl+'">';
		header.innerHTML = '<h3 class="book-title">'+book.name+'</h3>';
		author.innerHTML = '<p class="book-author">by <a class="reference" href="#">'+book.author+'</a></p>';
		rating.innerHTML = book.rating;
		var stars = '';
		for (var i=0; i < book.rating; i++){
			stars += '<i class="rating fa fa-star">';
		}
		if (book.rating < 5) {
			var empty_stars = 5 - book.rating;
			for (var i=0; i < empty_stars; i++){
				stars += '<i class="rating fa fa-star-o">';
			}
		};
		rating.innerHTML = stars;
		// console.log(book);
	});

}