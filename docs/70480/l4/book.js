// book.js

(function(global) {
  "use strict";

  function Book(title, length, author) {
    this.title = title;
    this.Length = length;
    this.author = author;
  }

  Book.prototype = {
    ISBN: "",
    Length: -1,
    genre: "",
    covering: "",
    author: "",
    currentPage: 0,
    title: "",
    flipTo: function FlipToAPage(pNum) {
      this.currentPage = pNum;
    },
    turnPageForward: function turnForward() {
      this.flipTo(this.currentPage++);
    },
    turnPageBackward: function turnBackward() {
      this.flipTo(this.currentPage--);
    }
  };

  function PopUpBook(title, length, author) {
    Book.call(this, title, length, author);
  }

  PopUpBook.prototype = Book.prototype;
  PopUpBook.prototype.hasSound = false;
  PopUpBook.prototype.showPopUp = function ShowPop() { };

  /* const popUpBook = Object.create(Book.prototype, {
    hasSound: {
      value:true
    },
    showPopUp: {
      value: function showPop() {
        //do logic to show a popup
      }
    }
  }); */

  const book = new Book("Title", 50, "User");
  const popUpBook = new PopUpBook("PopUp Title", 505, "PopUp Title");

  console.log("book: ", book, "\npopUpBook: ", popUpBook);
})(window);
