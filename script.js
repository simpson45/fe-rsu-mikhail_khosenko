// JS 
"use strict";

(function() {

  var eventsHistory = [];
  var initialAction = new Action("added ", "Fight Club", "Chuck Palahniuk", "to your", "Must Read Titles");
  eventsHistory.push(initialAction);
  
  var tagList = ["Must read titles", "Best of list", "Classic novels", "Non fiction"];
  
  var searchBook = document.getElementById("book-search");
  var booksArray = document.getElementsByClassName("preview");
  var ratingArray = document.getElementsByClassName("rating");
  
  for (var i = 0; i < ratingArray.length; i++) {
    ratingArray[i].addEventListener("click", changeRating);
  }
  
  // Change Rating Function
  function changeRating(event) {
      var rating = this.dataset.rating;
      rating = parseFloat(rating);
  
      var userRating = event.target.dataset.order;
      userRating = parseFloat(userRating);
      this.dataset.rating = userRating;
  
      var starsArray = this.getElementsByClassName("fa");
  
      for (var i = 0; i < starsArray.length; i++) {
      	starsArray[i].classList.remove("fa-star-half-o");
        if ( starsArray[i].dataset.order <= userRating ) {
          starsArray[i].classList.add("fa-star");
          starsArray[i].classList.remove("fa-star-o");
        } else {
          starsArray[i].classList.remove("fa-star");
          starsArray[i].classList.add("fa-star-o");
        }
      }
  
      var book = this.parentNode;
      var title = book.getElementsByClassName("book-title")[0].innerHTML;
      var author = book.getElementsByClassName("book-author")[0].getElementsByClassName("reference")[0].innerHTML;
  
      var setRatingAction = new Action("rated " + userRating + " stars to", title, author, "", "");
      eventsHistory.push(setRatingAction);
      updateEventList();
  }
  
  // Search Field Input
  searchBook.oninput = function() {
  
    var str = searchBook.value;
    str = str.toLowerCase();
  
    for (var i = 0; i < booksArray.length; i++) {
      
      var title = booksArray[i].getElementsByClassName("book-title")[0].innerHTML;
      title = title.toLowerCase();
  
      var author = booksArray[i].getElementsByClassName("book-author")[0];
      author = author.getElementsByClassName("reference")[0].innerHTML;
      author = author.toLowerCase();
  
      if ( title.indexOf(str) == -1 && author.indexOf(str) == -1) {
        booksArray[i].hidden = true;
      } else {
      	booksArray[i].hidden = false;
      };
  
    }
  
    var searchAction = new Action("searched ", "books", str, "", "");
    eventsHistory.push(searchAction);
    updateEventList();
  };
  
  var mostPopularBooks = document.getElementById("popularbooks");
  
  // Most Popular Books Filter
  mostPopularBooks.onchange = function() {
  
    for (var i = 0; i < booksArray.length; i++) {
      var rating = booksArray[i].getElementsByClassName("rating")[0].dataset.rating;
      rating = parseFloat(rating);
  
      if ( rating == 5 ) {
        booksArray[i].hidden = false;
      } else {
      	booksArray[i].hidden = true;
      };
	  
    }
  
    var filterAction = new Action("filtered", "books", "Most Popular", "", "");
    eventsHistory.push(filterAction);
    updateEventList();
  }
  
  // Show All Books 
  var allBooks = document.getElementById("allbooks");
  
  allBooks.onchange = function() {
    for (var i = 0; i < booksArray.length; i++) {
      booksArray[i].hidden = false;
    }
  }
  
  // Add Book Button at SideBar | New Window for Input
  var addBookButton = document.getElementById("addbook-button");
  
  addBookButton.onclick = function() {

  	var htmlBookInputInfo = "<table>"
        + "<caption><h3>Add a Book</h3></caption>"

    	  + "<tr><td><label for=\"input-author\">Author:</label></td>"
    	  + "<td><input class=\"inputfield\" type=\"text\" id=\"input-author\" "
    	  + "placeholder=\"Charles Dickens\" required></td></tr>"

    	  + "<tr><td><label for=\"input-title\">Title:</label></td>"
    	  + "<td><input class=\"inputfield\" type=\"text\" id=\"input-title\" "
    	  + "placeholder=\"Bleak House\" required></td></tr>"

    	  + "<tr><td colspan=2>"
    	  + "<button class=\"button button--add\" type=\"button\" name=\"newbookmodal\" "
    	  + "id=\"add-button\"><span class=\"button__wrapper\">"
				+ "<i class=\"fa fa-plus\"></i>"
				+ "<span class=\"button__text\">Add a book</span>"
				+ "</span></button>"
    	  + "</td></tr>"
  			+ "</table>";

  	var newModal = makeModalWindow(htmlBookInputInfo);
    var oldModal = document.getElementById("modal-w");
    
    document.body.replaceChild(newModal, oldModal);

    var addButton = document.getElementById("add-button");  
    addButton.addEventListener("click", modalAddButtonClick);
  }

  // Add Book Button at Modal Window
  function modalAddButtonClick() {
    var author = document.getElementById("input-author").value;
    var title = document.getElementById("input-title").value;
    
    if ( author == "" || title == "" ) {
    	alert("Please input author and title information!");
    } else {

		var src = "img/no-cover.jpg";
  
    	var newBook = makeDOMBook(src, title, author);
  
  		booksArray[0].parentNode.appendChild(newBook);
  		ratingArray[ratingArray.length - 1].addEventListener("click", changeRating);
  		booksArray[booksArray.length - 1].addEventListener("click", showBookDetails);
  		document.getElementById("modal-w").classList.add("non-visual");
  		
  		var addBookAction = new Action("added new book", title, author, "to the", "library");
  		eventsHistory.push(addBookAction);
  		updateEventList();
    }
  }
  
  // Create DOM Elements for Book
  function makeDOMBook(coverSrc, title, author) {
  	var book = document.createElement("div");
    book.className = "preview";
    book.dataset.tags = "";
  
    var htmlBookDetails = "<img class=\"book-cover\" " 
    	  +"src=\""
    	  + coverSrc
    	  + "\" alt=\"book cover image\">"
    	  +"<h3 class=\"book-title\">"
    	  + title
    	  + "</h3><p class=\"book-author\">by <a class=\"reference\" href=\"#\">"
    	  + author
    	  + "</a></p><div class=\"rating\" data-rating=\"2.5\">"
    	  + "<i data-order=\"1\" class=\"fa fa-star\"></i> "
    	  + "<i data-order=\"2\" class=\"fa fa-star\"></i> "
  			+ "<i data-order=\"3\" class=\"fa fa-star-half-o\"></i> "
  			+ "<i data-order=\"4\" class=\"fa fa-star-o\"></i> "
  			+ "<i data-order=\"5\" class=\"fa fa-star-o\"></i> "
  			+ "</div>";
  	book.innerHTML = htmlBookDetails;
    return book;
  }
  
  // History panel at SideBar
  var historyPanelArray = document.getElementsByClassName("history__item-description");
  
  function updateEventList() {
  	var now = new Date;
  	
  	historyPanelArray[1].innerHTML = makeDOMAction(eventsHistory[eventsHistory.length - 2], now);
  	historyPanelArray[0].innerHTML = makeDOMAction(eventsHistory[eventsHistory.length - 1], now);
  }
  
  // Create Action function
  function Action (action, withBook, by, prep, where) {
  	this.action = action, 
  	this.withBook = withBook, 
  	this.by = by, 
  	this.prep = prep || "", 
  	this.where = where || "", 
  	this.when = new Date
  }
  
  // Create DOM Elements for Action at SideBar
  function makeDOMAction (act, now) {
  
  	var delay = Math.round( (now - act.when) / 1000 / 60 );
  
  	var htmlActionString = "<p class=\"p--reduced-vertical-margin\">You "
  	  + act.action
  	  + " <a class=\"reference reference--bright\" href=\"#\">"
  	  + act.withBook
  	  + "</a> by "
  	  + "<a class=\"reference reference--bright\" href=\"#\">"
  	  + act.by
  	  + "</a> "
  	  + act.prep
  		+ "<a class=\"reference reference--bright\" href=\"#\"> "
  		+ act.where
  		+ "</a>. </p>"
  		+ "<p class=\"p--reduced-vertical-margin\">"
  		+ delay
  		+ " minutes ago</p>";
  
  	return htmlActionString;
  }

  for (var i = 0; i < booksArray.length; i++) {
    booksArray[i].addEventListener("click", showBookDetails);
  }

  // On Book click | Show Info
  function showBookDetails(event) {

    if ( event.target.tagName != "H3" 
    	&& event.target.tagName != "I" 
    	&& event.target.tagName != "A" ) {

      var title = this.getElementsByClassName("book-title")[0].innerHTML;
      var author = this.getElementsByClassName("book-author")[0].getElementsByClassName("reference")[0].innerHTML;
      var rating = this.getElementsByClassName("rating")[0].dataset.rating;
      rating = parseFloat(rating);
	
      var tags = "";
      for (var i = 0; i < tagList.length; i++) {
      	if ( ~this.dataset.tags.indexOf(tagList[i]) ) {
      		tags += "<label><input type=\"checkbox\" name=\"tags\" checked>" + tagList[i] + "</label> <br>";
      	} else {
      	  tags += "<label><input type=\"checkbox\" name=\"tags\">" + tagList[i] + "</label> <br>";
      	}
      }

      var htmlBookDescription = "<table>"
        + "<caption><h3>"
    	  + title
    	  + "</h3></caption>"
    	  + "<tr><td>Author:</td><td>"
    	  + author
    	  + "</td></tr>"
    	  + "<tr><td>Rating:</td><td>"
    	  + rating
    	  + "</td></tr>"

    	  + "<tr><td>Tags:</td><td id=\"list-of-tags\">"
    	  + tags
    	  + "<input class=\"inputfield\" type=\"text\" placeholder=\"Custom Tag\" id=\"custom-tag\">"
    	  + "</td></tr>"

    	  + "<tr><td colspan=2>"
    	  + "<button class=\"button button--add\" type=\"button\" name=\"newbookmodal\" "
    	  + "id=\"add-tag-button\"><span class=\"button__wrapper\">"
				+ "<span class=\"button__text\">Save tags</span>"
				+ "</span></button>"
    	  + "</td></tr>"

  			+ "</table>";

      var newModal = makeModalWindow(htmlBookDescription);
      var oldModal = document.getElementById("modal-w");

      document.body.replaceChild(newModal, oldModal);

      var addTagButton = document.getElementById("add-tag-button");  
      addTagButton.addEventListener("click", modalAddTagButtonClick.bind(this));
    }
  }

  // Add Tag for a Book on Modal Info Window
  function modalAddTagButtonClick() {

    var checkTagsArray = document.getElementsByName("tags");
    var customTag = document.getElementById("custom-tag").value;

    var newDataTags = "";

    for (var i = 0; i < checkTagsArray.length; i++) {
    	if ( checkTagsArray[i].checked) {
    		newDataTags += checkTagsArray[i].parentNode.textContent + ", ";
    	}
    }

    if (customTag) {
    	newDataTags += customTag + ", ";
    	tagList.push(customTag);
    }

    if (newDataTags) {
    	newDataTags = newDataTags.slice(0, newDataTags.length - 2);
    }

    this.dataset.tags = newDataTags;

  	document.getElementById("modal-w").classList.add("non-visual");

  	var title = this.getElementsByClassName("book-title")[0].innerHTML;
    var author = this.getElementsByClassName("book-author")[0].getElementsByClassName("reference")[0].innerHTML;
  		
  	var addTagAction = new Action("changed tags at", title, author, "to", newDataTags);
  	eventsHistory.push(addTagAction);
  	updateEventList();
  }

  // Create Modal Window
  function makeModalWindow(htmlInnerString) {

  	var modal = document.createElement("div");
    modal.className = "modal";
    modal.id = "modal-w";

    var form = document.createElement("form");
    form.className = "new-book";
  
  	form.innerHTML = htmlInnerString;

  	var closeButton = document.createElement("button");
    closeButton.className = "close-modal";
    closeButton.type = "button";
    closeButton.innerHTML = "✖";

    closeButton.addEventListener("click", function() {
  	  this.parentNode.classList.add("non-visual");
    });

    modal.appendChild(form);
    modal.appendChild(closeButton);

    return modal;
  }

  var historyPageLink = document.getElementById("history-page-link");
  historyPageLink.addEventListener("click", loadHistory);

  var browsePageLink = document.getElementById("browse-page-link");
  browsePageLink.addEventListener("click", loadBooks);

  var contentBuffer;
  
  // Load History of Events
  function loadHistory() {
  	var browseBooksContent = document.getElementById("page-content");
  	var historyContent = document.createElement("section");
    historyContent.className = "content";
    historyContent.id = "page-content";

    var now = new Date;

    for (var i = eventsHistory.length - 1; i >= 0; i--) {
    	var item  = document.createElement("div");
		item.className = "history__item";

		var icon = document.createElement("p");
		icon.className = "p--reduced-vertical-margin";
		icon.innerHTML = "<i class=\"fa fa-clock-o\"></i>";

		var description  = document.createElement("div");
		description.className = "history__item-description";
		description.innerHTML = makeDOMAction(eventsHistory[i], now);

		item.appendChild(icon);
		item.appendChild(description);

		historyContent.appendChild(item);
    }

    contentBuffer = browseBooksContent.parentNode.replaceChild(historyContent, browseBooksContent);
    
    var nav = document.getElementsByClassName("navigation--main")[0];
    var refArray = nav.getElementsByClassName("navigation__item");
    for (var i = 0; i < refArray.length; i++) {
    	refArray[i].classList.remove("current");
    }
    document.getElementById("history-page-link").classList.add("current");
  }

  // Load Books
  function loadBooks() {

  	var historyContent = document.getElementById("page-content");
  	var browseBooksContent = contentBuffer;

    historyContent.parentNode.replaceChild(browseBooksContent, historyContent);

    var nav = document.getElementsByClassName("navigation--main")[0];
    var refArray = nav.getElementsByClassName("navigation__item");
    for (var i = 0; i < refArray.length; i++) {
    	refArray[i].classList.remove("current");
    }
    document.getElementById("browse-page-link").classList.add("current");

  }

})();