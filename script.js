const books = document.getElementById("books");
const addBookBtn = document.getElementById("btn-add");
const bookModal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
const bookForm = document.getElementById("book-form");
const addthebook = document.getElementById("btn-submit");


let myLibrary = [];

//Object Constructor
function Book(title, author, pages, read) {
    
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

}


const getBookInput = () => {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("isRead").checked;
    return new Book(title, author, pages, read)
}

const addBookToLibrary = (e) => {
    e.preventDefault();
    let book = getBookInput();

    myLibrary.push(book);
    displayBook(book);
    closeAddBookModal();

}

const removeBook = (title) => {
    let index = myLibrary.findIndex(id => id.title == title);
    myLibrary.splice(index, 1);

}

const resetGrid = () => { //resets the grid before it loops
    books.innerHTML = "";
}


const displayBook = (book) => {
    const card = document.createElement("div");
    const title = document.createElement("p");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const buttonGroup = document.createElement("div");
    const readBtn = document.createElement("button");
    const removeBtn = document.createElement("button");

    card.classList.add("card");
    buttonGroup.classList.add("button-group");
    readBtn.classList.add("btn");
    removeBtn.classList.add("btn");

    title.textContent = `${book.title}`;
    author.textContent = `${book.author}`;
    pages.textContent = `${book.pages} pages`;
    removeBtn.textContent = "Remove";

   

    if (book.read) {
        readBtn.textContent = "Read";
        readBtn.classList.add("btn-light-green");
    } else {
        readBtn.textContent = "Not Read";
        readBtn.classList.add("btn-light-red");
    }
    
    books.appendChild(card);
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(buttonGroup);
    buttonGroup.appendChild(readBtn);
    buttonGroup.appendChild(removeBtn);


    removeBtn.addEventListener('click', () => {
        
        removeBook(book.title);
        card.remove();
    })

}

const openAddBookModal = () => { //opens the modal
    bookForm.reset();
    bookModal.classList.add("active");
    overlay.classList.add("active");
}

const closeAddBookModal = () => { //closes the modal
    bookModal.classList.remove("active");
    overlay.classList.remove("active");
}


addBookBtn.onclick = openAddBookModal;
overlay.onclick = closeAddBookModal;
addthebook.onclick = addBookToLibrary;

