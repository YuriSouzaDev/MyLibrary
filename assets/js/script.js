const form = document.querySelector("#form");
const bookContainer = document.querySelector(".book-container");

// Evento de envio do formulário
function handleSubmit(event) {
  event.preventDefault();
  // Valide os campos e mostre os botões de erro, se necessário
  validateForm();
}

// Array de livros
const myLibrary = [];

// Object Constructor dos livros
const Book = function (title, author, pages, year) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.year = year;
};

/* Alterar para check unico este status */
// Prototype para verificar se já foi lido
Book.prototype.readStatus = function () {
  if (this.read) {
    return "Já foi lido";
  } else {
    return "Não foi lido";
  }
};

// funtion para validacao de inputs
function validateForm() {
  const title = form.inTitle.value;
  const author = form.inAuthor.value;
  const pages = form.inPages.value;
  const year = form.inYear.value;
  const read = form.isRead.checked;
  const isReadInput = document.getElementById("isRead");
  const notReadInput = document.getElementById("notRead");

  const titleError = document.getElementById("titleError");
  const authorError = document.getElementById("authorError");
  const pagesError = document.getElementById("pagesError");
  const yearError = document.getElementById("yearError");
  const readError = document.getElementById("readError");

  let isValid = true;

  if (title.trim() === "") {
    titleError.style.color = "red";
    isValid = false;
  } else {
    titleError.style.color = "white";
  }

  if (author.trim() === "") {
    authorError.style.color = "red";
    isValid = false;
  } else {
    authorError.style.color = "white";
  }

  if (pages.trim() === "") {
    pagesError.style.color = "red";
    isValid = false;
  } else {
    pagesError.style.color = "white";
  }

  if (year.trim() === "") {
    yearError.style.color = "red";
    isValid = false;
  } else if (year.length < 4 || year.length > 5) {
    yearError.innerHTML = "Please, insert 4 digits";
    yearError.style.color = "red";
    isValid = false;
  } else {
    yearError.style.color = "white";
  }

  if (!isReadInput.checked && !notReadInput.checked) {
    readError.style.color = "red";
    isValid = false;
  } else {
    readError.style.color = "white";
  }

  if (isValid) {
    addBookToLibrary();
  }
}

// function para adição de livro a biblioteca
function addBookToLibrary() {
  const title = form.inTitle.value;
  const author = form.inAuthor.value;
  const pages = form.inPages.value;
  const year = form.inYear.value;
  const read = form.isRead.checked;

  if (title && author && pages && year) {
    const newBook = new Book(title, author, pages, year);
    newBook.read = read;
    myLibrary.push(newBook);
    form.reset();
    createBook(newBook);
  }
}

// function para criação dos elementos
function createBook(book) {
  const bookCard = `
  <article class="book-card">
  <div>
  <h2 class="title">"${book.title}"</h2>
  <p class="year">${book.year}</p>
  </div>
  <div>
  <p class="author">By: ${book.author}</p>
  <p class="pages">Number of pages: ${book.pages}</p>
  </div>
  <!-- <p>Already read</p> -->
  </article>`;

  bookContainer.innerHTML += bookCard;
  // bookContainer.appendChild(bookCard);
}

form.addEventListener("submit", handleSubmit);
