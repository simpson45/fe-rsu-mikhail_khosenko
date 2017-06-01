"use strict";

function Controller() {
    this.socket = io();
    this.model = new Model();
    this.view = new View(this.model, this);
}

// Загрузка данных из JSON-файла
Controller.prototype.loadBooks = function () {
    this.model.httpLoadJson("/getBooks")
        .then(books => {
            console.log("Loading books from server");
            console.log(books);
            this.model.createTags(books);
            this.model.books = books;            
            return books;
        }, 
        error => {
            console.log("Error: " + error);
            return;
        })
        .then(books => {
            this.view.showBooks(books);
            this.view.updateTagsList(this.model.allBooksTags.tags);
        });
};

// Создать новую книгу
Controller.prototype.createNewBook = function (bookData) {
    fetch('/addNewBook', {
        method: "POST", 
        body: JSON.stringify(bookData),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'}
    }) 
        .then(res => {
            return res.json();
        })
        .then(newBook => {
            console.log(newBook);            
            this.view.bookAddSuccessMsg();            
            this.view.showNewBook(newBook);      
            return newBook;                
        },
        err => {
            console.log("Error: " + err);                
            this.view.bookAddErrorMsg();
        })
        .then(newBook => {
            fetch("/getBooks")
                .then(res => {
                    return res.json();
                })
                .then(books => {
                    this.model.books = books;
                    this.historyAddBook(newBook.id);
            });            
        });
};

// Событие добавления новой книги и обложки
Controller.prototype.addNewBookWithCover = function (formData, url, bookData) {
    this.model.httpPostForm(formData, url)
        .then(() => {
            this.createNewBook(bookData);
        }, err => {
            console.log("Error: " + err);                
            this.view.bookAddErrorMsg();
        });
};

// Событие по нажатию на звезды рейтинга
Controller.prototype.changeRatingHandler = function (bookId, rating) {
    let data = {
        "bookId": bookId,
        "rating": rating
    };    
    fetch('/setRating', {
        method: "POST", 
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'}
        })
        .then(res => {
            this.view.changeRating(bookId, rating);
            return res.json();
        })
        .then((books) => {
            this.model.books = books;
            this.view.changeRating(bookId, rating);            
            this.historyChangeRating(bookId, rating);
        })
        .catch(err => {
            console.log("Error: " + err);
        });
};

Controller.prototype.start = function () {
    this.loadBooks();
    this.view.init();
};