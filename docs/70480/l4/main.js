// main.js

(function(global) {
  "use strict";

  function onLoadHandler() {
    console.info("onLoadHandler");

    tt();
  }

  function Book() {
    //just creates an empty book.
  }

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

  function tt() {
    const book = {
      ISBN: "55555555",
      Length: 560,
      genre: "programming",
      covering: "soft",
      author: "John Doe",
      currentPage: 5,
      title: "My Big Book of Wonderful Things",
      flipTo: function flipToAPage(pNum) {
        this.currentPage = pNum;
      },
      turnPageForward: function turnForward() {
        this.flipTo(this.currentPage++);
      },
      turnPageBackward: function turnBackward() {
        this.flipTo(this.currentPage--);
      }
    };

    const books = new Array(new Book(), new Book("First Edition",350,"Random"));

    console.log(books);
  }

  global.addEventListener("load", onLoadHandler, false);
})(window);
