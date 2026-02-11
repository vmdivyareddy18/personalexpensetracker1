const balance = document.getElementById("balance");
const form = document.getElementById("form");
const list = document.getElementById("list");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function updateUI() {

    list.innerHTML = "";
    let total = 0;

    expenses.forEach((exp, index) => {

        total += exp.amount;

        const li = document.createElement("li");

        li.innerHTML = `
      ${exp.text} (${exp.category}) - ₹${exp.amount}
      <button onclick="deleteExp(${index})">❌</button>
    `;

        list.appendChild(li);
    });

    balance.innerText = "₹" + total;

    localStorage.setItem("expenses", JSON.stringify(expenses));
}

form.addEventListener("submit", e => {

    e.preventDefault();

    const text = document.getElementById("text").value;
    const amount = +document.getElementById("amount").value;
    const category = document.getElementById("category").value;

    expenses.push({ text, amount, category });

    updateUI();
    form.reset();
});

function deleteExp(index) {
    expenses.splice(index, 1);
    updateUI();
}

updateUI();
