"use strict";

function View(model, controller) {
    this.model = model;
    this.controller = controller;
    this.booksElement = document.getElementsByClassName("books")[0];
    this.formAddBook = document.forms.namedItem("addNewBookForm");
    this.addBookWindow = document.getElementById("add-book-window");
    this.bookAddSuccess = this.addBookWindow.getElementsByClassName("add-book-window__text-success")[0];
    this.bookAddError = this.addBookWindow.getElementsByClassName("add-book-window__text-success")[0];
	this.searchInput = document.getElementById("search");
    this.mostPopularElement = document.getElementById("most-popular-filter");
    this.browseBookPage = document.getElementById("browse-book");
    this.historyPage = document.getElementById("history-book");
    this.defaultCover = "no-cover.jpg";
}

View.prototype.init = function () {
    const addBookButton = document.getElementById("add-book-button");
    const addBookWindowClose = document.getElementById("add-book-window-close");
    const bookInfoWindowClose = document.getElementById("book-info-close");
    const addTagButton = document.getElementById("book-info-add-tag-btn");
    const inputTagElement = document.getElementById("new-tag-name-input");
    const that = this;
    this.mostPopularElement.addEventListener('click', event => {
        if (that.isBookPageActive())
            that.mostPopularFilter(event);
    });

    this.searchInput.addEventListener('input', () => {
        if (that.isBookPageActive())
            that.searchBook(that.model.books);
    });

    this.searchInput.addEventListener('blur', () => {
        let search = that.searchInput.value;
        if (that.isBookPageActive() && search !== "") {
            that.controller.historySearch(search);
        }
    });

    this.formAddBook.addEventListener('submit', event => {
        that.addNewBookForm(event);
    }, false);

    addBookButton.addEventListener('click', () => {
        that.bookAddSuccess.style.display = "none";
        that.bookAddError.style.display = "none";
        that.addBookWindow.style.display = "block";
    });

    addBookWindowClose.addEventListener('click', () => {
        that.addBookWindow.style.display = "none";
    });

    window.addEventListener('click', event => {
        if (event.target == this.addBookWindow) {
            this.addBookWindow.style.display = "none";
        }
        if (event.target == this.bookInfoWindow) {
            this.bookInfoWindow.style.display = "none";
        }
    });

    this.browseBookPage.addEventListener('click', () => {
        this.showBooks(this.model.books);
    });
};

View.prototype.showBooks = function (books) {
    let i = 0;

    this.historyPage.classList.remove("nav__item_selected");
    this.browseBookPage.classList.add("nav__item_selected");

    while (this.booksElement.firstChild) {
        this.booksElement.removeChild(this.booksElement.firstChild);
    }

    for (i; i < books.length; i += 1) {
        this.showBook(books[i]);
    }
    this.updateViewIfFilters();
};

View.prototype.updateRating = function (id, rating, maxRating) {
    const bookRating = document.getElementsByClassName("books__rating")[id].children;
    let i = 0;
    function fillStar(star) {
        star.classList.remove("fa-star-o");
        star.classList.add("fa-star");
    }
    function clearStar(star) {
        star.classList.remove("fa-star");
        star.classList.add("fa-star-o");
    }
    for (i = 0; i < maxRating; i += 1) {
        if (bookRating[i].classList.contains("fa-star"))
            clearStar(bookRating[i]);
    }
    for (i = 0; i < maxRating; i += 1) {
        if (rating > -1) {
            if (i == rating) {
                fillStar(bookRating[i]);
                return;
            }
            else {
                fillStar(bookRating[i]);
            }
        }
        else
            return;
    }
};

View.prototype.showBook = function (book) {
    const bookItem = document.createElement("div");
    const bookImage = document.createElement("img");
    const bookName = document.createElement("p");
    const bookAuthor = document.createElement("p");
    const bookRating = document.createElement("p");
    const maxRating = this.model.maxRating;
    const that = this;

    bookItem.classList.add("books__item");
    bookItem.setAttribute("book-id", book.id);

    bookImage.setAttribute("alt", "book cover image");
    bookImage.setAttribute("src", book.image);
    bookImage.classList.add("books__image");

    bookName.classList.add("books__name");
    bookName.innerHTML = book.title;

    bookAuthor.classList.add("books__author");
    bookAuthor.innerHTML = book.author;

    bookRating.classList.add("books__rating");

    this.booksElement.appendChild(bookItem);

    bookItem.appendChild(bookImage);
    bookItem.appendChild(bookName);
    bookItem.appendChild(bookAuthor);
    bookItem.appendChild(bookRating);

    bookImage.addEventListener('click', this.bookInfoHandler.bind(this));

    function addRating() {
        let j = 0;
        for (j; j < maxRating; j++) {
            let star = document.createElement('i');
            let nextLine = document.createTextNode('\n');
            star.classList.add("fa");
            star.classList.add("fa-star-o");
            star.setAttribute("data-index", j);
            bookRating.appendChild(star);
            bookRating.appendChild(nextLine);
            that.addStarEvents(star);
        }
    }
    addRating();
    this.updateRating(book.id, book.rating, maxRating);
};

View.prototype.displayBook = function (book) {
    const thisBook = this.booksElement.getElementsByClassName("books__item")[book.id];
    thisBook.style.display = "";
};

View.prototype.hideBook = function (book) {
    const thisBook = this.booksElement.getElementsByClassName("books__item")[book.id];
    thisBook.style.display = "none";
};

View.prototype.showMostPopularBooks = function (books) {
    let i = 0;
    for (i; i < books.length; i += 1) {
        if (this.model.isBookMostPopular(books[i])) {
            this.displayBook(books[i]);
        }
        else {
            this.hideBook(books[i]);
        }
    }
};

View.prototype.displayAllBooks = function (books) {
    let i = 0;
    for (i; i < books.length; i += 1) {
        this.displayBook(books[i]);
    }
};

View.prototype.mostPopularFilter = function (event) {
    const target = event.target;
    if (!target.classList.contains("filter__item_selected")) {
        target.classList.add("filter__item_selected");
        if (this.searchInput.value === "")
            this.showMostPopularBooks(this.model.books);
        else {
            this.searchBook(this.model.books);
        }
        this.controller.historyFilter("Most Popular");
    }
    else {
        target.classList.remove("filter__item_selected");
        if (this.searchInput.value === "")
            this.displayAllBooks(this.model.books);
        else
            this.searchBook(this.model.books);
    }
};

View.prototype.searchBook = function (books) {
    const isMostPopularSelected = document.getElementById("most-popular-filter").classList.contains("filter__item_selected");
    let filter = this.searchInput.value.toLowerCase();
    let i = 0;
    for (i; i < books.length; i += 1) {
        if (this.model.searchByFilter(books[i], filter)) {
            if (!isMostPopularSelected)
                this.displayBook(books[i]);
            else
                if (this.model.isBookMostPopular(books[i])) {
                    this.displayBook(books[i]);
                } else
                    this.hideBook(books[i]);
        }
        else {
            this.hideBook(books[i]);
        }
    }
};

View.prototype.updateViewIfFilters = function () {
    const isMostPopularSelected = document.getElementById("most-popular-filter").classList.contains("filter__item_selected");
    const isSearchFilterEmpty = this.searchInput.value === "";

    if (isMostPopularSelected && isSearchFilterEmpty) {
        this.showMostPopularBooks(this.model.books);
    }
    else if (!isSearchFilterEmpty) {
        this.searchBook(this.model.books);
    }

    return isMostPopularSelected || !isSearchFilterEmpty;
};

View.prototype.changeRating = function (bookId, rating) {
    this.updateRating(bookId, rating, this.model.maxRating);
    this.updateViewIfFilters();
};

View.prototype.addStarEvents = function (star) {
    this.starMouseOver(star);
    this.starMouseOut(star);
    this.starClick(star);
};

View.prototype.starMouseOver = function (star) {
    const that = this;
    const bookId = star.parentNode.parentElement.getAttribute("book-id");
    star.addEventListener("mouseover", function () {
        that.updateRating(bookId, star.getAttribute("data-index"), that.model.maxRating);
    });
};

View.prototype.starMouseOut = function (star) {
    const that = this;
    const bookId = star.parentNode.parentElement.getAttribute("book-id");
    star.addEventListener("mouseout", function () {
        that.updateRating(bookId, that.model.getRating(bookId), that.model.maxRating);
    });
};

View.prototype.starClick = function (star) {
    const bookId = star.parentNode.parentElement.getAttribute("book-id");
    star.addEventListener("click", () => {
        let rating = star.getAttribute("data-index");
        this.changeRating(bookId, rating);
        this.controller.changeRatingHandler(bookId, rating);
    });
};

View.prototype.isBookPageActive = function () {
    return this.browseBookPage.classList.contains("nav__item_selected");
};

View.prototype.isHistoryPageActive = function () {
    return this.historyPage.classList.contains("nav__item_selected");
};

View.prototype.addNewBookForm = function (event) {
    const url = "/upload";
    const formFiles = document.getElementById('bookCover').files;
    let bookData = {};    

    bookData.bookTitle = document.getElementById("bookTitle").value;
    bookData.bookAuthor = document.getElementById("bookAuthor").value;    

    event.preventDefault();

    if (formFiles.length !== 0) {
        let formData = new FormData(this.formAddBook);
        bookData.bookCover = formFiles[0].name;                
        this.controller.addNewBookWithCover(formData, url, bookData);        
    }
    else {
        bookData.bookCover = this.defaultCover;
        this.controller.createNewBook(bookData);                
    }
};

View.prototype.showNewBook = function (newBook) {        
        if (this.isBookPageActive()) {
            this.showBook(newBook);
            this.updateViewIfFilters();
        }                
        if (this.isHistoryPageActive()) {
            this.showHistoryPage(this.model.allHistory);
        }
};

View.prototype.bookAddSuccessMsg = function () {
    this.bookAddSuccess.style.display = "none";
    this.bookAddSuccess.style.display = "block";
};

View.prototype.bookAddErrorMsg = function () {
    this.bookAddError.style.display = "none";
    this.bookAddError.style.display = "block";
};

View.prototype.bookInfoHandler = function (event, id) {
    let bookId;

    if (arguments.length > 1) {
        bookId = id;
    }
    else {
        bookId = event.target.parentElement.getAttribute("book-id");
    }

    const thisBook = this.model.getBookById(bookId);
    const bookCover = this.bookInfoWindow.getElementsByClassName("book-info__book-cover")[0];
    const bookName = this.bookInfoWindow.getElementsByClassName("book-info__book-name")[0];
    const bookAuthor = this.bookInfoWindow.getElementsByClassName("book-info__book-author")[0];
    const tagInput = document.getElementById("new-tag-name-input");

    bookCover.setAttribute("src", thisBook.image);
    bookCover.setAttribute("alt", thisBook.title);
    bookName.innerHTML = thisBook.title;
    bookAuthor.innerHTML = thisBook.author;
    this.bookInfoWindow.setAttribute("book-id", bookId);

    tagInput.value = "";
    this.showAllBookTags(bookId);

    this.bookInfoWindow.style.display = "block";
};