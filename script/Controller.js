// JS 
"use strict";

function Controller() {
  this.model = new Model();
  this.view = new View(this.model, this);
}

Controller.prototype.start = function () {
  this.view.init();

  var tags = ["Must read titles", "Best of list", "Classic novels", "Non fiction"]

  var books = [];

  books.push( new Book("Jewels of Nizam", "Greeta Devi", 5, "img/cover1.jpg") );
  books.push( new Book("Cakes &amp; Bakes", "Sanjeev Kapoor", 5, "img/cover2.jpg") );
  books.push( new Book("Jamie’s Kitchen", "Jamie Oliver", 4, "img/cover3.jpg") );
  books.push( new Book("Inexpensive Family Meals", "Simon Holst", 4, "img/cover4.jpg") );
  books.push( new Book("Paleo Slow Cooking", "Chrissy Gower", 3, "img/cover5.jpg") );
  books.push( new Book("Cook Like an Italian", "Tobie Puttock", 4, "img/cover6.jpg") );
  books.push( new Book("Indian Cooking", "Suneeta Vaswani", 5, "img/cover7.jpg") );
  books.push( new Book("Jamie Does", "Jamie Oliver", 4, "img/cover8.jpg") );
  books.push( new Book("Jamie's Italy", "Jamie Oliver", 5, "img/cover9.jpg") );
  books.push( new Book("Vegetables Cookbook", "Matthew Biggs", 3, "img/cover10.jpg") );

  var actions = [];

  actions.push( new Action("added ", "Fight Club", "Chuck Palahniuk", "to your", "Must Read Titles") );
  actions.push( new Action("added ", "The Trial", "Franz Kafka", "to your", "Must Read Titles") );
  
  this.model.setInitialData( tags, books, actions );

  function Book (title, author, rating, coverSrc) {
    this.title = title, 
    this.author = author, 
    this.rating = rating, 
    this.coverSrc = coverSrc || "img/no-cover.jpg",
    this.hidden = false,
    this.tags = []
  }
  
  function Action (action, withBook, by, prep, where) {
    this.action = action, 
    this.withBook = withBook, 
    this.by = by, 
    this.prep = prep || "", 
    this.where = where || "", 
    this.when = new Date
  }
}

Controller.prototype.search = function (str) {
  this.model.searchBook(str);
}

Controller.prototype.changeRating = function (bookIndex, userRating) {
  this.model.changeRating(bookIndex, userRating);
}

Controller.prototype.filterBooks = function (byCathegory) {
  switch (byCathegory) {
    case "popularbooks":
      this.model.mostPopularFilter();
      break;
    case "allbooks":
      this.model.clearFilter();
      break;
    default:
      this.model.clearFilter();
      break;
  }
  
}

Controller.prototype.changeTags = function (bookIndex, tagSet) {
  this.model.changeTagSet(bookIndex, tagSet);
}

Controller.prototype.addBook = function (title, author, rating, coverSrc) {
  this.model.addBook(title, author, rating, coverSrc);
}

Controller.prototype.loadPage = function (pageId) {
  switch (pageId) {
    case "browse-page-link":
      this.view.loadBooks();
      break;
    case "history-page-link":
      this.view.loadHistory(this.model.actionsHistory);
      break;
    default:
      break;
  }
  
}