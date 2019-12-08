let UI = {
    addBookToList(book) {
        const list = document.getElementById('book-list');
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>
        `;

        list.appendChild(row);
    },

    showAlert(message, className) {
        // Create div with alert
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        
        // Insert div before the form
        const alertContainer = document.getElementById('book-form').parentElement;
        const form = document.getElementById('book-form');
        alertContainer.insertBefore(div, form);

        // remove after 3 sec
        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 3000);
    },

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    },

    deleteBook(target) {
        target.parentElement.parentElement.remove();
    }
};

let Store = {
    getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    },

    displayBooks() {
        const books = Store.getBooks();

        books.forEach(function(book) {
            UI.addBookToList(book);
        });
    },

    addBook(book) {
        const books = Store.getBooks();

        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    },

    removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach(function(book, index) {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
};

// DOM load event
document.addEventListener('DOMContentLoaded', Store.displayBooks());

// Event Listener for add book
document.getElementById('book-form').addEventListener('submit', function(e) {
    const book = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        isbn: document.getElementById('isbn').value
    };

    // Validate
    if (book.title === '' || book.author === '' || book.isbn === '') {
        UI.showAlert('Please fill in all fields', 'danger');
    } else {
        // Add Book
        UI.addBookToList(book);

        // Add book to lokal storage
        Store.addBook(book);

        // Success Alert
        UI.showAlert('Book added!', 'success');

        // Clear Fields
        UI.clearFields();
    }

    e.preventDefault();
});

// Event Listener for delete
document.getElementById('book-list').addEventListener('click', function(e) {
    console.log(e.target.parentElement.previousElementSibling.textContent)
    if (e.target.className === 'delete') {
        UI.deleteBook(e.target);
        UI.showAlert('Book was deleted', 'warning');

        // Remove from LS
        Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    }

    e.preventDefault();
});