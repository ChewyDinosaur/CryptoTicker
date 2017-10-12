document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('button');
    button.addEventListener('click', getData);
});

function getData() {
    const coin = document.getElementById('coinInput').value;
    const currency = document.getElementById('currency').value;
    const url = `https://api.coinmarketcap.com/v1/ticker/${coin}/?convert=${currency}`;

    fetch(url).then(blob => blob.json()).then(data => {
        showData(data[0]);
    });
}

function showData(data) {
    console.log(data);
    const html = `<h2>${data.name}</h2>`;
    
    document.querySelector('.content').innerHTML = html;
}



