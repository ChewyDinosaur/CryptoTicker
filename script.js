const button = document.querySelector('#button');
const input = document.querySelector('#coinInput');

button.addEventListener('click', getData);
input.addEventListener('keypress', function(key) {
    if (key.keyCode === 13) {
        getData();
    }
});


// Run initially to fill content
getData();


function getData() {
    const coin = document.querySelector('#coinInput').value;
    const currency = document.querySelector('#currency').value;
    const url = `https://api.coinmarketcap.com/v1/ticker/${coin}/?convert=${currency}`;

    fetch(url).then(blob => blob.json()).then(data => {
        if (data.error != undefined) {
            showError();
        } else {
            showData(data[0]);
        }
    });
}


function showError() {
    document.querySelector('.content').innerHTML = '<h2>Coin not found.</h2>';
}

function showData(data) {
    //console.log(data);
    const price = priceInCurrency(data);
    const html = `<h1>${data.name} (${data.symbol})</h1>
                  <h2>${price}</h2>
                  <h3>%${data.percent_change_24h} Change (24h)</h3>`;
    document.querySelector('.content').innerHTML = html;
}

function priceInCurrency(data) {
    if (data.price_eur != undefined) {
        return `€${parseFloat(data.price_eur).toFixed(2)}`;
    } else if (data.price_cad != undefined) {
        return `$${parseFloat(data.price_cad).toFixed(2)}`;
    } else if (data.price_gbp != undefined) {
        return `£${parseFloat(data.price_gbp).toFixed(2)}`;
    } else {
        return `$${parseFloat(data.price_usd).toFixed(2)}`;
    }
}

