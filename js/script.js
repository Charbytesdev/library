const myLibrary = [];

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function removeBookFromLibrary(index) {
  myLibrary.splice(index, 1);
}

function displayLibraryBooks() {
  for (book in myLibrary) {
  }
}

function Book(title, author, pageCount, doneReading) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.doneReading = doneReading;
}

function BookCard(book) {
  this.book = book;
  this.bookCardElement = document.createElement("div");
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

BookCard.prototype.createReadButton = function (doneReading) {
  const readingButton = document.createElement("button");
  if (doneReading) {
    readingButton.textContent = "Read";
    readingButton.classList.add("read");
  } else {
    readingButton.textContent = "Not Read";
    readingButton.classList.add("not-read");
  }
  return readingButton;
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

const duneBook = new Book("Dune", "Frank Herbert", 896, false);

addBookToLibrary(slaughterHouseFiveBook);
addBookToLibrary(duneBook);

duneBook.showBookCard();
