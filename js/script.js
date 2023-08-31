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

BookCard.prototype.appendCardButtons = function (readValue) {
  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("buttons-container");
  buttonsContainer.appendChild(this.createReadButton(readValue));
  buttonsContainer.appendChild(this.createDeleteButton());
  this.appendCardElement(buttonsContainer);
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

BookCard.prototype.removeBook = function () {
  this.bookCardElement.parentElement.removeChild(this.bookCardElement);
};

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

BookCard.prototype.createDeleteButton = function () {
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => this.removeBook());
  return deleteButton;
};

const bookCardContainer = document.getElementById("book-card-container");

function addCardToContainer(card) {
  bookCardContainer.appendChild(card);
}

Book.prototype.showBookCard = function () {
  const bookCard = new BookCard(this);

  for (const [key, value] of Object.entries(this)) {
    if (key === Object.keys(this).pop()) {
      bookCard.appendCardButtons(value);
      continue;
    }

    let element = "div";
    if (key === "title" || key === "author") {
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

const addBookButton = document.getElementById("add-book-button");
const newBookDialog = document.getElementById("new-book-dialog");
const formTitle = document.getElementById("form-title");
const formAuthor = document.getElementById("form-author");
const formPageCount = document.getElementById("form-page-count");
const formDoneReading = document.getElementById("form-done-reading");
const confirmButton = document.getElementById("confirm-button");

addBookButton.addEventListener("click", () => {
  newBookDialog.showModal();
});

confirmButton.addEventListener("click", (e) => {
  let formDoneReadingValue = false;
  if (formDoneReading.value === "on") formDoneReadingValue = true;
  const book = new Book(
    formTitle.value,
    formAuthor.value,
    formPageCount.value,
    formDoneReadingValue
  );
  bookLibrary.addBookToLibrary(book);
  book.showBookCard();
});

const bookLibrary = new BookLibrary();

bookLibrary.addBookToLibrary(slaughterHouseFiveBook);
bookLibrary.addBookToLibrary(duneBook);
bookLibrary.displayLibraryBooks();
