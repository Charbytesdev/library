function BookLibrary() {
  this.bookCollection = [];
}

BookLibrary.prototype.addBookToLibrary = function (book) {
  this.bookCollection.push(book);
};

BookLibrary.prototype.removeBookFromLibrary = function (index) {
  this.bookCollection.splice(index, 1);
};

BookLibrary.prototype.displayLibraryBooks = function () {
  this.bookCollection.forEach((book) => book.showBookCard());
};

function Book(title, author, pageCount, doneReading) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.doneReading = doneReading;
}

function BookCard(book) {
  this.book = book;
  this.bookCardElement = document.createElement("div");
  this.bookCardElement.classList.add("book-card");
}

BookCard.prototype.createCardChildElement = function (bookKey, value, element) {
  const cardElement = document.createElement(element);
  cardElement.textContent = value;
  cardElement.classList.add(bookKey);
  return cardElement;
};

BookCard.prototype.appendCardElement = function (CardChildElement) {
  this.bookCardElement.appendChild(CardChildElement);
};

function changeReadButtonState() {
  this.classList.toggle("read");
  this.classList.toggle("not-read");
  if (this.classList.contains("read")) {
    this.textContent = "Read";
  } else {
    this.textContent = "Not Read";
  }
}
BookCard.prototype.createReadButton = function (doneReading) {
  const readButton = document.createElement("button");
  readButton.classList.add("read-button");
  if (doneReading) {
    readButton.textContent = "Read";
    readButton.classList.add("read");
  } else {
    readButton.textContent = "Not Read";
    readButton.classList.add("not-read");
  }
  readButton.onclick = changeReadButtonState;
  return readButton;
};

const bookCardContainer = document.getElementById("book-card-container");

function addCardToContainer(card) {
  bookCardContainer.appendChild(card);
}

Book.prototype.showBookCard = function () {
  const bookCard = new BookCard(this);

  for (const [key, value] of Object.entries(this)) {
    if (key == "doneReading") {
      bookCard.appendCardElement(bookCard.createReadButton(value));
      continue;
    }
    let element = "div";
    if (key == "title" || key == "author") {
      element = "h2";
    }
    bookCard.appendCardElement(
      bookCard.createCardChildElement(key, value, element)
    );
    addCardToContainer(bookCard.bookCardElement);
  }
};

const slaughterHouseFiveBook = new Book(
  "Slaughterhouse Five",
  "Kurt Vonnegut",
  288,
  false
);

const duneBook = new Book("Dune", "Frank Herbert", 896, true);

bookLibrary = new BookLibrary();

bookLibrary.addBookToLibrary(slaughterHouseFiveBook);
bookLibrary.addBookToLibrary(duneBook);
bookLibrary.displayLibraryBooks();
