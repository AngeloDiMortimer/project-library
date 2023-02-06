const books = document.getElementById("books");
const addBookBtn = document.getElementById("btn-add");
const bookModal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
const bookForm = document.getElementById("book-form");
const addthebook = document.getElementById("btn-submit");
const errorMsg = document.getElementById("error-msg");


let myLibrary = [];

class Book {
    //Object Constructor
    constructor(title, author, pages, read) {
    
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    
}

/* User input */
const getBookInput = () => { 
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("isRead").checked;
    return new Book(title, author, pages, read)
}

/* Pushes the book into the array and displays the book on screen */
const addBookToLibrary = (e) => {
    e.preventDefault();
    let book = getBookInput();

    if (isInLibrary(book)) {
        errorMsg.textContent = "This books already exists in your library";
        errorMsg.classList.add("active");
        return
    }

    myLibrary.push(book);
    displayBook(book);
    closeAddBookModal();

}

const removeBook = (title) => {
    let index = myLibrary.findIndex(id => id.title == title); //identifies the index of the specific object
    myLibrary.splice(index, 1); //removes said object using the found index

}

const changeRead = (title) => { //changes value of "read" in the object and returns it
    let index = myLibrary.findIndex(id => id.title == title);

    if (myLibrary[index].read === true) {
        return myLibrary[index].read = false;
    } else { 
        return myLibrary[index].read = true;
    }
}

const isInLibrary = (newBook) => { //checks if the book is already in the array by using its name
    return myLibrary.some((book) => book.title == newBook.title);
}

const displayBook = (book) => { //generates the divs displayed on screen
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
    });

    readBtn.addEventListener('click', () => {
        let isRead = changeRead(book.title);
        
        if (isRead === true) {
            readBtn.textContent = "Read";
            readBtn.classList.replace("btn-light-red", "btn-light-green");
        } else {
            readBtn.textContent = "Not Read";
            readBtn.classList.replace("btn-light-green", "btn-light-red");
        }
    });

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

