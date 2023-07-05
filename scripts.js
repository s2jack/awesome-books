// variables
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
// const form = document.querySelector('.add-book-form');
const addButton = document.querySelector('.add-btn');
const listButton = document.querySelector('.menu :nth-child(1) button');
const addBookButton = document.querySelector('.menu :nth-child(3) button');
const contactButton = document.querySelector('.menu :nth-child(5) button');
const addBookSection = document.querySelector('#add-book-section');
const contactSection = document.querySelector('#contact-section');

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.id = (Math.floor(Math.random() * 10000) + 1).toString(); // unique id
  }
}

// load book section function
const bookListSection = document.querySelector(".book-list-section");
const bookListHeading = document.createElement('h1')
bookListHeading.className = 'heading'
bookListHeading.innerText = 'All Awesome Books'
bookListSection.appendChild(bookListHeading)
const bookListContainer = document.createElement('div');
bookListContainer.className = 'book-list border full-width'
bookListSection.appendChild(bookListContainer)

class BookList {
  static loadBookSection() {
    const bookDB = JSON.parse(localStorage.getItem("bookData"));
    listButton.style = 'color: rgba(100, 126, 255, 1);';
    addBookButton.style = '';
    contactButton.style = '';
    bookListSection.style = '';
    addBookSection.style = 'display: none;'
    contactSection.style = 'display: none;'
    // check the local storage if there is any database for books list
    if (bookDB === null || bookDB.length === 0) {
    // if booklistContainer has a child element return
      if (bookListContainer.hasChildNodes()) {
        return
    // if bookListContiner has no child put a text. it means user has no any book added at your bookList
      } else {
        const noteText = document.createElement('p')
        noteText.innerText = 'Please add some books to your list'
        noteText.className = 'note-text'
        bookListContainer.appendChild(noteText)
        return;
      }
    }
    // if there is data, create a card for each element
    bookDB.forEach((book) => {
      const postElement = document.createElement("article");
      postElement.classList.add("book-item");
      postElement.innerHTML = `
        <p class="book-title">"${book.title}" by ${book.author}</p>
      `;
      bookListContainer.appendChild(postElement);
      // create a remove button for each book and give it the same id as the book object
      const removeBtn = document.createElement("button");
      removeBtn.className = "remove-btn border";
      removeBtn.innerText = "Remove";
      removeBtn.id = book.id;
      postElement.appendChild(removeBtn);
      // add event listener for each remove button to run removeBook function
      removeBtn.addEventListener("click", BookList.removeBook);
    });
  }

  static openAddBookSection() {
    listButton.style = ''
    addBookButton.style = 'color: rgba(100, 126, 255, 1);'
    contactButton.style = ''
    addBookSection.style = ''
    contactSection.style = 'display: none;'
    bookListSection.style = 'display: none;'
  }

  static openBookListSection() {
    listButton.style = 'color: rgba(100, 126, 255, 1);';
    addBookButton.style = '';
    contactButton.style = '';
    bookListSection.style = '';
    addBookSection.style = 'display: none;';
    contactSection.style = 'display: none;';
  }

  static openContactSection () {
    listButton.style = '';
    addBookButton.style = '';
    contactButton.style = 'color: rgba(100, 126, 255, 1);';
    bookListSection.style = 'display: none;';
    addBookSection.style = 'display: none;';
    contactSection.style = '';
  }

  static addBook() {
    // check bookDB if it is empty, then give it an empty array
    const bookDB = JSON.parse(localStorage.getItem("bookData")) || [];
    /* if inputs are not empty */
    if (titleInput.value && authorInput.value) {
      // create a book with input values for title and author
      const book = new Book(titleInput.value, authorInput.value);
      // add this book to a new array with existing array elements
      const newBookData = [...bookDB, book];
      // set the new array as bookDatabase
      localStorage.setItem("bookData", JSON.stringify(newBookData));
    }
    BookList.openAddBookSection();
  }

  static removeBook(event) {
    // check event target id. It runs for every button clicked by the user. It calls the book id that contains the clicked button
    const id = event.target.id;
    // call the existing database as an array
    const bookDB = JSON.parse(localStorage.getItem("bookData"));
    // filter the existing array to create a new array without the removed book
    const newBookData = bookDB.filter((book) => book.id !== id);
    // then set it as the bookDatabase on localStorage
    localStorage.setItem("bookData", JSON.stringify(newBookData));
    // then reload the page to refresh the book list section
    window.location.reload();
  }
}

// run load book section function immediately
BookList.loadBookSection();

// form.addEventListener("submit", BookList.addBook);


// Menu functionallity
addButton.addEventListener('click', BookList.addBook);
listButton.addEventListener('click', BookList.openBookListSection);
addBookButton.addEventListener('click', BookList.openAddBookSection);
contactButton.addEventListener('click', BookList.openContactSection);

