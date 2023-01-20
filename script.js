const books = document.getElementById("books");
const addBookBtn = document.getElementById("btn-add");
const bookModal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
const bookForm = document.getElementById("book-form");

let myLibrary = [];

//Object Constructor
function Book(Title, Author, Pages, Read) {
    
    this.Title = Title;
    this.Author = Author;
    this.Pages = Pages;
    this.Read = Read;

}

const addBookToLibrary = (Title, Author, Pages, Read) => {

    let book = new Book(Title, Author, Pages, Read);
    myLibrary.push(book);

}

const displayBook = () => {
    myLibrary.forEach(myLibrary => {
        const card = document.createElement("div");
        card.classList.add("card");
        books.appendChild(card);

        for (let key in myLibrary) {
            const para = document.createElement("p");
            para.textContent = (`${key}: ${myLibrary[key]}`);
            card.appendChild(para);
        }
    })
}

const openAddBookModal = () => {
    bookForm.reset();
    bookModal.classList.add("active");
    overlay.classList.add("active");
}

const closeAddBookModal = () => {
    bookModal.classList.remove("active");
    overlay.classList.remove("active");
}


addBookBtn.onclick = openAddBookModal;
overlay.onclick = closeAddBookModal;

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, "Not read yet");
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, "Read");
addBookToLibrary("Dummy book", "J.R.R. Tolkien", 300, "Not read yet");
addBookToLibrary("Dummy book 2", "J.R.R. Not Tolkien", 265, "Not read yet");

displayBook();