
let booksArray = require('./books.json');
var library = [];
var imagePath = "img/";

createBooks(booksArray);

function Book(id, title, author, rating, image) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.rating = rating;
    this.image = image;
    this.tags = [];
}

 function addNewBook(bookTitle, bookAuthor, bookCover) {
    library.push(new Book(library.length, bookTitle, bookAuthor, -1, imagePath + bookCover));
    console.log(library[library.length - 1]);
    return JSON.stringify(library[library.length - 1]);
};

function setRating(bookId, rating) {
    if (rating > -2) {
        library[bookId].rating = rating;
    }
    return JSON.stringify(library[bookId]);
};

function createBooks(booksArray) {
    let i = 0;
    for (i; i < booksArray.length; i += 1) {
        let title = booksArray[i].title;
        let author = booksArray[i].author;
        let rating = booksArray[i].rating;
        let image = imagePath + booksArray[i].image;
        let bookTags = booksArray[i].tags.split(",");
        bookTags = uniqueArray(bookTags);

        library[i] = new Book(i, title, author, rating, image);
        library[i].tags = bookTags;               
    }
    return library;
};

//попробовать отключить
function uniqueArray(arr) {
    const obj = {};
    let i = 0;

    for (i; i < arr.length; i += 1) {
        let item = arr[i].trim();
        obj[item] = true;
    }
    return Object.keys(obj);
}

function getBooks() {
    return JSON.stringify(library);
}

exports.getBooks = getBooks;
exports.addNewBook = addNewBook;
exports.setRating = setRating;