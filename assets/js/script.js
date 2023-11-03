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
  const isReadInput = document.querySelector("#isRead");
  const notReadInput = document.querySelector("#notRead");

  const titleError = document.querySelector("#titleError");
  const authorError = document.querySelector("#authorError");
  const pagesError = document.querySelector("#pagesError");
  const yearError = document.querySelector("#yearError");
  const readError = document.querySelector("#readError");

  let isValid = true;
  // Verifica a data atual para validacao
  const now = new Date();
  const currentYear = now.getFullYear();

  // validacao do titulo
  if (title.trim() === "") {
    titleError.style.color = "red";
    isValid = false;
  } else if (title.length > 41 || title.length === 0) {
    titleError.innerHTML = "Please, insert between 1 - 40 characters";
    titleError.style.color = "red";
    isValid = false;
  } else {
    titleError.style.color = "#f7efe5";
  }

  // validacao do autor
  if (author.trim() === "") {
    authorError.style.color = "red";
    isValid = false;
  } else if (author.length > 20 || author.length === 0) {
    authorError.innerHTML = "Please, insert between 1 - 20 characters";
    authorError.style.color = "red";
    isValid = false;
  } else {
    authorError.style.color = "#f7efe5";
  }

  // validacao de pages
  if (pages.trim() === "") {
    pagesError.style.color = "red";
    isValid = false;
  } else if (pages.length > 5 || pages.length === 0) {
    pagesError.innerHTML = "Please, insert between 1 - 5 digits";
    pagesError.style.color = "red";
    isValid = false;
  } else {
    pagesError.style.color = "#f7efe5";
  }

  // validacao do ano
  if (year.trim() === "") {
    yearError.style.color = "red";
    isValid = false;
  } else if (year.length < 4 || year.length > 4) {
    yearError.innerHTML = "Please, insert 4 digits";
    yearError.style.color = "red";
    isValid = false;
  } else if (year > currentYear) {
    yearError.innerHTML = `Please, insert a date less then ${year}`;
    yearError.style.color = "red";
    isValid = false;
  } else {
    yearError.style.color = "#f7efe5";
  }

  // validacao do read button
  if (!isReadInput.checked && !notReadInput.checked) {
    readError.style.color = "red";
    isValid = false;
  } else {
    readError.style.color = "#f7efe5";
  }

  // Verifica a variavel
  if (isValid) {
    addBookToLibrary();
    closeModal();
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
  <h2 class="title">${book.title}</h2>
  <p class="year">${book.year}</p>
  </div>
  <div>
  <p class="author">By: ${book.author}</p>
  <p class="pages">Number of pages: ${book.pages}</p>
  </div>
  <button id="button-${book.title}" class="${
    !book.read ? "not-Read" : ""
  } button-read"}>${book.readStatus()}</button>
  </article>`;

  bookContainer.innerHTML += bookCard;

  // Encontra e adiciona o evento ao botao criado
  const newButton = document.getElementById(`button-${book.title}`);

  ["touchstart", "click"].forEach((userEvent) => {
    newButton.addEventListener(userEvent, (event) => {
      handleCheck(event);
    });
  });
}

form.addEventListener("submit", handleSubmit);

// Modal
const buttonNewBook = document.querySelector(".newBook button");
const modal = document.querySelector(".modal");
const buttonCloseModal = document.querySelector(".close-modal");
const body = document.querySelector("body");

// Abre o modal do form
function handleModal() {
  modal.style.display = "flex";

  // bloqueia o scroll ao abrir o modal
  document.body.classList.add("scroll-lock");
}

buttonNewBook.addEventListener("click", handleModal);

// Fecha o modal do form
function closeModal() {
  modal.style.display = "none";

  // desbloqueia o scroll ao abrir o modal
  document.body.classList.remove("scroll-lock");
}

buttonCloseModal.addEventListener("click", closeModal);

// button de read
const buttonRead = document.querySelectorAll(".button-read");

function handleCheck(event) {
  const clickedButton = event.currentTarget;
  clickedButton.classList.toggle("not-Read");
  if (clickedButton.innerHTML === "Read") {
    clickedButton.innerHTML = "Not read";
  } else {
    clickedButton.innerHTML = "Read";
  }
}

buttonRead.forEach((item) => {
  ["touchstart", "click"].forEach((userEvent) => {
    item.addEventListener(userEvent, (event) => {
      handleCheck(event);
    });
  });
});
