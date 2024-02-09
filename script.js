let payments = [];

// Memeriksa apakah ada data yang tersimpan di local storage saat aplikasi dimuat
window.onload = function() {
    if (localStorage.getItem('payments')) {
        payments = JSON.parse(localStorage.getItem('payments'));
    }
    displayPayments();
}

function showForm() {
    document.getElementById('form').classList.toggle('hidden');
    document.getElementById('payments').classList.add('hidden');
}

function showPayments() {
    document.getElementById('form').classList.add('hidden');
    document.getElementById('payments').classList.toggle('hidden');
    displayPayments();
}

function addPayment() {
    const name = document.getElementById('name').value;
    const className = document.getElementById('class').value;
    const paymentType = document.getElementById('type').value;
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const timestamp = new Date().toLocaleString();

    const payment = { name, className, paymentType, description, amount, timestamp };
    payments.push(payment);

    // Menyimpan data ke local storage
    localStorage.setItem('payments', JSON.stringify(payments));

    document.getElementById('form').reset();
    localStorage.setItem('payments', JSON.stringify(payments));
}

function deletePayment(index) {
    payments.splice(index, 1);

    // Menyimpan data ke local storage setelah penghapusan
    localStorage.setItem('payments', JSON.stringify(payments));

    displayPayments();
    localStorage.setItem('payments', JSON.stringify(payments));
}

function displayPayments() {
    const tableBody = document.getElementById('paymentsBody');
    tableBody.innerHTML = '';

    payments.forEach((payment, index) => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${payment.name}</td>
            <td>${payment.className}</td>
            <td>${payment.paymentType}</td>
            <td>${payment.description}</td>
            <td>${formatRupiah(payment.amount)}</td>
            <td>${payment.timestamp}</td>
            <td><button onclick="deletePayment(${index})">Hapus</button></td>
        `;
    });
}

function formatRupiah(angka) {
    let reverse = angka.toString().split('').reverse().join(''),
    ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join('.').split('').reverse().join('');
    return 'Rp. ' + ribuan;
}
