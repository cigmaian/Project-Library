//button event listeners for create new book, add new book to page, close popup
const addBtn = document.querySelector('#addBtn');
addBtn.addEventListener('click', addBookToLibrary);


const newBookBtn = document.querySelector('#newBtn');
newBookBtn.addEventListener('click', () => popUpForm.style.display = 'block');

const popUpForm = document.getElementById('popUp');
const closePopUp = document.getElementsByTagName('span')[0];
closePopUp.addEventListener('click', () => popUpForm.style.display = 'none');

//Book Constructor
let Book = class {
    constructor(title, author, pages, read) {
        this.title = form.title.value; 
        this.author = form.author.value; 
        this.pages = form.pages.value + 'pg'; 
        this.read = form.read.checked; 
    }
}

let myLibrary = [];
let newBook;

function addBookToLibrary() {
    event.preventDefault();
    popUpForm.style.display = 'none';

    newBook = new Book(title, author, pages, read); 
    myLibrary.push(newBook); 
    setData();  
    render(); 
    form.reset();
}

//Creates book visual in browser
function render() {
    const display = document.getElementById('Library-container');
    const books = document.querySelectorAll('.book');
    books.forEach(book => display.removeChild(book));
   
    for (let i=0; i<myLibrary.length; i++){
        createBook(myLibrary[i]);
    }
}

//creats book DOM elements, to use in render();
function createBook(item) {
    const library = document.querySelector('#Library-container');
    const bookDiv = document.createElement('div');
    const titleDiv = document.createElement('div');
    const authDiv = document.createElement('div');
    const pageDiv = document.createElement('div');
    const removeBtn = document.createElement('button');
    const readBtn = document.createElement('button');
    
    
    bookDiv.classList.add('book');
    bookDiv.setAttribute('id', myLibrary.indexOf(item));

    titleDiv.textContent = item.title;
    titleDiv.classList.add('title');
    bookDiv.append(titleDiv);

    authDiv.textContent = item.author;
    authDiv.classList.add('author');
    bookDiv.append(authDiv);

    pageDiv.textContent = item.pages;
    pageDiv.classList.add('pages');
    bookDiv.append(pageDiv);

    readBtn.classList.add('readBtn')    
    bookDiv.append(readBtn);
    if(item.read===false) {
        readBtn.textContent = 'Not Read';
        readBtn.style.backgroundColor = '#e04f63';
    }else {
        readBtn.textContent = 'Read';
        readBtn.style.backgroundColor = '#63da63'
    }
    readBtn.addEventListener('click', () => { 
        item.read = !item.read; 
        setData(); 
        render();
    }); 

    removeBtn.textContent = 'Remove'; 
    removeBtn.setAttribute('id', 'removeBtn');
    bookDiv.append(removeBtn);

    removeBtn.addEventListener('click', () => {
        myLibrary.splice(myLibrary.indexOf(item),1);
        setData()
        render();
    });

    library.append(bookDiv);
};

// search 

const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")

let users = []

searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase()
  users.forEach(user => {
    const isVisible =
      user.name.toLowerCase().includes(value) ||
      user.address.toLowerCase().includes(value)
    user.element.classList.toggle("hide", !isVisible)
  })
})

fetch("https://jsonplaceholder.typicode.com/users")
  .then(res => res.json())
  .then(data => {
    users = data.map(user => {
      const card = userCardTemplate.content.cloneNode(true).children[0]
      const header = card.querySelector("[data-header]")
      const body = card.querySelector("[data-body]")
      header.textContent = user.name
      body.textContent = user.address.city
      userCardContainer.append(card)
      return { name: user.name, address: user.address.city, element: card }
    })
  })

// setting Library to be stored in local storage
function setData() {
    localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
}

//pulls books from local storage when page is refreshed
function restore() {
    if(!localStorage.myLibrary) {
        render();
    }else {
        let objects = localStorage.getItem('myLibrary') 
        objects = JSON.parse(objects);
        myLibrary = objects;
        render();
    }
}

restore();


  