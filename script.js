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
  for (const libBook of myLibrary) {
    if (libBook.title == book.title && libBook.author == book.author) {
      return;
    }
  }

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
    buttons: document.createElement("div"),
    read: document.createElement("button"),
    delete: document.createElement("button")
  }

  bookInfo.title.classList.add("title");
  bookInfo.author.classList.add("author");
  bookInfo.pages.classList.add("pages");
  bookInfo.buttons.classList.add("buttons");
  bookInfo.read.classList.add("read");
  bookInfo.delete.classList.add("delete");

  bookInfo.title.innerHTML = `${book.title}`;
  bookInfo.author.innerHTML = `<strong>Author:</strong> ${book.author}`;
  bookInfo.pages.innerHTML = `<strong>Pages:</strong> ${book.pages}`;
  bookInfo.delete.textContent = `Delete`;

  bookInfo.buttons.appendChild(bookInfo.read);
  bookInfo.buttons.appendChild(bookInfo.delete);

  // Read button initial value.
  if (book.read) {
    bookInfo.read.classList.remove("not-read");
    bookInfo.read.textContent = `Read`;
  } else {
    bookInfo.read.classList.add("not-read");
    bookInfo.read.textContent = `Not Read`;
  }

  // Insert all book properties into card.
  for (const info in bookInfo) {
    if (info == "read" || info == "delete") {
      continue;
    }

    card.appendChild(bookInfo[info]);
  }

  bookGrid.appendChild(card);

  // Button read logic.
  bookInfo.read.addEventListener("click", ()=>{
    bookInfo.read.classList.toggle("not-read");

    if (bookInfo.read.textContent == "Not Read") {
      bookInfo.read.textContent = "Read";
      bookInfo.read.classList.remove("not-read");
      myLibrary[myLibrary.indexOf(book)].read = true;
    } else {
      bookInfo.read.textContent = "Not Read";
      bookInfo.read.classList.add("not-read");
      myLibrary[myLibrary.indexOf(book)].read = false;
    }
  });

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

// Example Books.
const hobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
const minecraft = new Book("Minecraft for Devs", "Mojang", 512, true);
const superman = new Book("Superman", "DC", 624, false);

addBookToLibrary(hobbit);
addBookToLibrary(minecraft);
addBookToLibrary(superman);

createBookCard(hobbit);
createBookCard(minecraft);
createBookCard(superman);

// Show the dialog to add a book.
newBook.addEventListener("click", ()=>{
  document.querySelector("dialog").setAttribute("open", true);
  
  // Fix bug: https://stackoverflow.com/questions/22148080/an-invalid-form-control-with-name-is-not-focusable
  for (const input of Array.from(document.querySelectorAll("input"))) {
    input.setAttribute("required", true);
  }
});

// Insert a new book in book grid.
submitBook.addEventListener("click", (e)=>{
  const book = new Book(
     dialogInfo.title.value.trim(),
     dialogInfo.author.value.trim(),
    +dialogInfo.pages.value,
     dialogInfo.read.checked
  );

  // Check if input are filled.
  if (!book.title || 
      !book.author||
      !book.pages) {
      return;
  }

  // Fix bug: https://stackoverflow.com/questions/22148080/an-invalid-form-control-with-name-is-not-focusable
  for (const input of Array.from(document.querySelectorAll("input"))) {
    input.removeAttribute("required");
  }

  // Clear the inputs.
  dialogInfo.title.value = "";
  dialogInfo.author.value = "";
  dialogInfo.pages.value = "";
  dialogInfo.read.checked = false;

  // Logic to check if book already exists in bookCard.
  for (const gridBook of document.querySelectorAll(".book")) {
    const gridBookTitle = gridBook.querySelector(".title").textContent.replace("Title: ", "");
    const gridBookAuthor = gridBook.querySelector(".author").textContent.replace("Author: ", "");

    if (gridBookTitle == book.title && gridBookAuthor == book.author) {
      return;
    }
  }

  addBookToLibrary(book);
  createBookCard(book);
  dialog.close();
});