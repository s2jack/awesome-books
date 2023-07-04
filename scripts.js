// variables
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const form = document.querySelector(".add-book-form");

// constructor function for book objects
function Book(title, author) {
  this.title = title;
  this.author = author;
  this.id = (Math.floor(Math.random()*10000) +1).toString() //unique id declaration
}

// load book section function
const postContainer = document.querySelector(".book-list");

function loadBookSection() {
  // clear all elements in this section
  postContainer.parentElement.removeChild(postContainer);
  // check the local storage if there is any database for books list
  const bookDB = JSON.parse(localStorage.getItem("bookData"));
  if (bookDB === null || bookDB.length === 0) {
    // exit before
    return;
  }
  // if there is a data then create a card for each elements
  bookDB.forEach((book) => {
    const postElement = document.createElement("article");
    postElement.classList.add("book-item");
    postElement.innerHTML = `
    <p class="book-title">${book.title}</p>
          <p class="book-author">${book.author}</p>
    `;
    postContainer.appendChild(postElement);
    // create a remove button for each book and give it an same id with book object containing button
    const removeBtn = document.createElement("button");
    removeBtn.className = "remove-btn";
    removeBtn.innerText = "Remove";
    removeBtn.id = book.id;
    postElement.appendChild(removeBtn);
    // add event listener for each remove buttons to run removeBook function
    removeBtn.addEventListener('click', removeBook)
  });
}
// run load book section function immediately
loadBookSection();

// add book function 
function addBook() {
  // check bookDB if it is empty then give it an empty array
  const bookDB = JSON.parse(localStorage.getItem("bookData")) || [];
  /* if inputs are not empty */
  if (titleInput.value && authorInput.value) {
    //create a book with input values for title and authors
    const book = new Book(titleInput.value, authorInput.value);
    // add this book to new array with existing array elements
    const newBookData = [...bookDB, book];
    // set new array as bookDatabase
    localStorage.setItem("bookData", JSON.stringify(newBookData));
  }
}

function removeBook(event) {
  // check event target id. It runs for every button which is clicked by user. It calls book id that contains clicked button
  const id = event.target.id;
  // call existing database as an array
  const bookDB = JSON.parse(localStorage.getItem('bookData'));
  // filter existing array to create a new array without removed book
  const newBookData = bookDB.filter((book) => book.id !== id);
  // then set it as a bookDatabase on localstorage 
  localStorage.setItem('bookData', JSON.stringify(newBookData));
  // then reload page to reload book list section
  window.location.reload();
}

form.addEventListener("submit", addBook);
