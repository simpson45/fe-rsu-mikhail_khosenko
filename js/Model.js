"use strict";

function Model() {
    this.books = [];
	this.booksDataFile = 'books/books.json';
	this.booksData = [];
	this.imagePath = "img/";
    this.maxRating = 5;

    // Стандартные теги
    this.allBooksTags = new TagsClass(["Must Read Titles", "Best Of List", "Classic Novels", "Non Fiction"]);
}

// Загрузка JSON файла с сервера
Model.prototype.httpLoadJson = function (url) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        let jsonData = [];
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                jsonData = JSON.parse(xhr.responseText);
            }
        };

        xhr.onload = function () {
            if (this.status == 200) {
                console.log(jsonData);
                resolve(jsonData);
            }
            else {
                var error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };
        xhr.open("GET", url, true);
        xhr.send();
    });
};

// Заполнение массива books данными из файла books.json
Model.prototype.createTags = function (books) {
    let i = 0;
    books.forEach(item => {
        this.allBooksTags.addTag(item.tags);
    });

    return this.allBooksTags;
};

// Загрузить обложку на сервер
Model.prototype.httpPostForm = function (formData, url) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();

        xhr.open("POST", url, true);

        xhr.onload = function (event) {
            if (xhr.status == 200) {
                resolve();
            }
            else {                
                reject(xhr.status);
            }
        };
        xhr.send(formData);
    });
};

// Конструктор класса тегов - пока не работает
function TagsClass(defaultTags) {
    this.tags = defaultTags;
}

// Добавить новый тег
TagsClass.prototype.addTag = function (newTags) {
    if (Array.isArray(newTags))
        Array.prototype.push.apply(this.tags, newTags);
    else
        this.tags.push(newTags);
    this.tags = uniqueArray(this.tags);
};


// Выбран ли флаг "most popular"
Model.prototype.isBookMostPopular = function (book) {
    return (book.rating == this.maxRating - 1);
};

// Фильтр по заголовку и автору
Model.prototype.searchByFilter = function (book, filter) {
    return (book.title.toLowerCase().indexOf(filter) > -1 || book.author.toLowerCase().indexOf(filter) > -1);
};

// Получить рейтинг и обновить 
Model.prototype.getRating = function (bookId) {
    return this.books[bookId].rating;
};

// Задать рейтинг и обновить
Model.prototype.setRating = function (bookId, rating) {
    if (rating > -2) {
        this.books[bookId].rating = rating;
    }
};

// Геттеры
Model.prototype.getBookById = function (bookId) {
    return this.books[bookId];
};

Model.prototype.getBookTitle = function (bookId) {    
    return this.books[bookId].title;
};

Model.prototype.getBookAuthor = function (bookId) {
    return this.books[bookId].author;
};

function uniqueArray(arr) {
    const obj = {};
    let i = 0;

    for (i; i < arr.length; i += 1) {
        let item = arr[i].trim();
        obj[item] = true;
    }

    return Object.keys(obj);
}
