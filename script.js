const dialog = document.querySelector("dialog");
const bookGrid = document.querySelector(".grid");
const newBook = document.querySelector(".new-book");
const submitBook = document.querySelector(".book-submit");

const dialogInfo = {
  title: document.querySelector(".book-title"),
  author: document.querySelector(".book-author"),
  pages: document.querySelector(".book-pages"),
  read: document.querySelector(".book-read")
}

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
    read: document.createElement("p"),
    delete: document.createElement("button")
  }

  bookInfo.title.classList.add("title");
  bookInfo.author.classList.add("author");
  bookInfo.pages.classList.add("pages");
  bookInfo.read.classList.add("read");
  bookInfo.delete.classList.add("delete");

  bookInfo.title.innerHTML = `<strong>Title:</strong> ${book.title}`;
  bookInfo.author.innerHTML = `<strong>Author:</strong> ${book.author}`;
  bookInfo.pages.innerHTML = `<strong>Pages:</strong> ${book.pages}`;
  bookInfo.read.innerHTML = `<strong>Read:</strong> ${book.read ? "read" : "not read yet"}`;
  bookInfo.delete.textContent = `Delete`;

  // Insert all book properties into card.
  for (const info in bookInfo) {
    card.appendChild(bookInfo[info]);
  }

  bookGrid.appendChild(card);

  // Logic to remove a book from library and html.
  bookInfo.delete.addEventListener("click", ()=>{
    const bookNode = document.querySelectorAll(".book");
    
    for (const bookCard of bookNode) {
      const bookTitle = bookCard.querySelector(".title").textContent.replace("Title: ", "");
      const bookAuthor = bookCard.querySelector(".author").textContent.replace("Author: ", "");
      
      if (book.title == bookTitle && book.author == bookAuthor) {
        for (const libraryBook of myLibrary) {
          if (book.title == libraryBook.title && book.author == libraryBook.author) {
            myLibrary.splice(myLibrary.indexOf(libraryBook), 1);
          }
        }

        bookGrid.removeChild(bookCard);

        break;
      }
    }
  });
}

// Show the dialog to add a book.
newBook.addEventListener("click", ()=>{
  document.querySelector("dialog").setAttribute("open", true)
});

// Insert a new book in book grid.
submitBook.addEventListener("click", (e)=>{
  const book = new Book(
    dialogInfo.title.value,
    dialogInfo.author.value,
    dialogInfo.pages.value,
    dialogInfo.read.checked
  );

  dialogInfo.title.value = "";
  dialogInfo.author.value = "";
  dialogInfo.pages.value = "";
  dialogInfo.read.checked = false;

  addBookToLibrary(book);
  createBookCard(book);
});