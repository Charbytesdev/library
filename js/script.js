const myLibrary = [];

const slaughterHouseFiveBook = new Book(
  "Slaughterhouse Five",
  "Kurt Vonnegut",
  288,
  false
);
const duneBook = new Book("Dune", "Frank Herbert", 896, false);

function Book(title, author, pageCount, doneReading) {
  this.title = title;
  this.author = author;
  this.pageCount = pageCount;
  this.doneReading = doneReading;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function removeBookFromLibrary(index) {
  myLibrary.splice(index, 1);
}
