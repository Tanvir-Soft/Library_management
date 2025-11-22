let users = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "user", password: "user123", role: "user" }
];

let books = [];

// LOGIN
function login() {
    let u = document.getElementById("username").value;
    let p = document.getElementById("password").value;
    let r = document.getElementById("role").value;

    let found = users.find(x => x.username === u && x.password === p && x.role === r);

    if (!found) return alert("Invalid login!");

    document.getElementById("loginBox").classList.add("hidden");

    if (r === "admin") {
        document.getElementById("adminPanel").classList.remove("hidden");
    } else {
        document.getElementById("userPanel").classList.remove("hidden");
    }
}

// ADMIN – SHOW ADD FORM
function showAddForm() {
    document.getElementById("addBox").classList.toggle("hidden");
}

// ADMIN – ADD BOOK
function addBook() {
    let t = document.getElementById("title").value;
    let a = document.getElementById("author").value;
    let g = document.getElementById("genre").value;
    let y = document.getElementById("year").value;
    let q = document.getElementById("qty").value;

    books.push({ title: t, author: a, genre: g, year: y, qty: Number(q) });

    document.getElementById("addMsg").innerText = "Book Added Successfully!";
}

// ADMIN – SHOW BOOK LIST
function adminShowBooks() {
    let list = document.getElementById("adminBooks");
    list.innerHTML = "";

    books.forEach(b => {
        let item = `
            <li class="p-3 border rounded mb-2 bg-gray-100">
                <strong>${b.title}</strong> by ${b.author}
                <br>Genre: ${b.genre}, Year: ${b.year}
                <br>Quantity: ${b.qty}
            </li>
        `;
        list.innerHTML += item;
    });
}

// USER – SHOW BOOKS + BORROW BUTTON
function userShowBooks() {
    let list = document.getElementById("userBooks");
    list.innerHTML = "";

    books.forEach((b, i) => {
        let item = `
            <li class="p-3 border rounded mb-2 bg-gray-100">
                <strong>${b.title}</strong> by ${b.author}
                <br>Genre: ${b.genre}, Year: ${b.year}
                <br>Quantity: ${b.qty}
                <button onclick="borrowBook(${i})" class="mt-2 w-full bg-green-600 text-white py-1 rounded">
                    Borrow
                </button>
            </li>
        `;
        list.innerHTML += item;
    });
}

// USER – BORROW BOOK
function borrowBook(i) {
    if (books[i].qty > 0) {
        books[i].qty--;
        alert("Borrowed Successfully!");
        userShowBooks(); // refresh list
    } else {
        alert("Not Available!");
    }
}
