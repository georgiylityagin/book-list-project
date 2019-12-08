let UI = {
    addBookToList(book) {
        const list = document.getElementById('book-list');
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td>
                <a href="#" class="delete">X</a>
            </td>
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


// Event Listener for add book
document.getElementById('book-form').addEventListener('submit', function(e) {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    // Initialize Book
    const book = {};
    book.title = title;
    book.author = author;
    book.isbn = isbn;

    // Initialize UI
    const ui = Object.create(UI);

    // Validate
    if (title === '' || author === '' || isbn === '') {
        ui.showAlert('Please fill in all fields', 'danger');
    } else {
        // Add Book
        ui.addBookToList(book);

        // Success Alert
        ui.showAlert('Book added!', 'success');

        // Clear Fields
        ui.clearFields();
    }

    e.preventDefault();
});

// Event Listener for delete
document.getElementById('book-list').addEventListener('click', function(e) {
    if (e.target.className === 'delete') {
        const ui = Object.create(UI);
        ui.deleteBook(e.target);
        ui.showAlert('Book was deleted', 'warning');
    }

    e.preventDefault();
});