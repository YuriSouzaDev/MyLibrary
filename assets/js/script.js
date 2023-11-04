const form = document.querySelector("#form");
const bookContainer = document.querySelector(".book-container");

// Evento de envio do formulário
function handleSubmit(event) {
  event.preventDefault();

  // Valide os campos e mostre os botões de erro, se necessário
  validateForm();
}

// Array de livros
let myLibrary = [];

// Object Constructor dos livros
const Book = function (title, author, pages, year) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.year = year;
};

// verifica se o titulo ja existe
function isBookAlreadyInLibrary(title) {
  return myLibrary.some((book) => book.title === title);
}

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
  const errorBook = document.querySelector(".error-book");

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

  if (isBookAlreadyInLibrary(title)) {
    errorBook.style.color = "red";
    isValid = false;
  } else {
    errorBook.style.color = "#f7efe5";
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
    saveToLocalStorage();
  }
}

// evento para trocar o stattus de leitura
function handleCheck(event) {
  const clickedButton = event.currentTarget;
  clickedButton.classList.toggle("not-Read");
  if (clickedButton.innerHTML === "Read") {
    clickedButton.innerHTML = "Not read";
  } else {
    clickedButton.innerHTML = "Read";
  }
}

// function para criação dos elementos
function createBook(book) {
  const bookCard = `
  <article class="book-card" id="${book.title}">
    <div>
      <h2 class="title">${book.title}</h2>
      <p class="year">${book.year}</p>
    </div>
    <div>
      <p class="author">By: ${book.author}</p>
      <p class="pages">Number of pages: ${book.pages}</p>
    </div>
    <div>
      <button class="${!book.read ? "not-Read" : ""} button-read">${
    book.read ? "Read" : "Not Read"
  }</button>
      <button class="delete">Delete</button>
    </div>
    
  </article>`;

  bookContainer.innerHTML += bookCard;

  // Encontra e adiciona o evento ao botao criado
  const buttonRead = document.querySelectorAll(".button-read");
  const deleteButton = document.querySelectorAll(".delete");

  buttonRead.forEach((item) => {
    item.addEventListener("click", handleCheck);
  });

  deleteButton.forEach((item) => {
    item.addEventListener("click", handleDelete);
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
  form.reset();

  // desbloqueia o scroll ao abrir o modal
  document.body.classList.remove("scroll-lock");
}

buttonCloseModal.addEventListener("click", closeModal);

// button de read
const buttonRead = document.querySelectorAll(".button-read");

buttonRead.forEach((item) => {
  item.addEventListener("click", handleCheck);
});

// save local storage
function saveToLocalStorage() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

// load from storage

function loadFromLocalStorage() {
  const keyToUpdate = "myLibrary";
  const libraryJSON = localStorage.getItem(keyToUpdate);

  if (libraryJSON) {
    myLibrary = JSON.parse(libraryJSON);
    myLibrary.forEach((book) => {
      createBook(book);
    });
  }
}

loadFromLocalStorage();

// Para deletar do DOM e do storage

const deleteButton = document.querySelectorAll(".delete");

deleteButton.forEach((item) => {
  item.addEventListener("click", handleDelete);
});

function handleDelete(event) {
  // Seleciona o elemento pai do livro
  const element = event.currentTarget.parentElement.parentElement;

  // Verifica se existe e o deleta
  if (element) {
    element.remove();
  }

  const keyToUpdate = "myLibrary";
  const libraryJSON = localStorage.getItem(keyToUpdate);

  if (libraryJSON) {
    // Verifica se o titulo do index é igual ao do titulo do elemento a ser deletado
    const bookIndex = myLibrary.findIndex((book) => book.title === element.id);
    console.log(bookIndex);

    if (bookIndex !== -1) {
      // Remova o livro do array
      myLibrary.splice(bookIndex, 1);

      // Atualize os dados na localStorage
      localStorage.setItem(keyToUpdate, JSON.stringify(myLibrary));
    }
  }
}
