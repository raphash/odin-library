const books = document.querySelector(".books-grid");
const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function createBookCard(book) {
  // Creates a new visible book card.
  const card = document.createElement("div");
        card.classList.add("book");

  const bookInfo = {
    title: document.createElement("p"),
    author: document.createElement("p"),
    pages: document.createElement("p"),
    read: document.createElement("p")
  }

  bookInfo.title.innerHTML = `<strong>Title:</strong> ${book.title}`;
  bookInfo.author.innerHTML = `<strong>Author:</strong> ${book.author}`;
  bookInfo.pages.innerHTML = `<strong>Pages:</strong> ${book.pages}`;
  bookInfo.read.innerHTML = `<strong>Read:</strong> ${this.read ? "read" : "not read yet"}`;
  
  // Insert all book properties into card.
  for (const info in bookInfo) {
    card.appendChild(bookInfo[info]);
  }

  books.appendChild(card);
}

function renderBooks() {
  for (const book of myLibrary) {
    createBookCard(book);
  }
}

// Default book instances.
const hobbit = new Book("The Hobbit by J.R.R", "Tolkien", 295, false);
const luaBook = new Book("Programming in Lua", "Roberto Ierusalimschy", 388, false);

addBookToLibrary(hobbit);
addBookToLibrary(luaBook);

renderBooks();