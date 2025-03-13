let clickCount = 0;

document.addEventListener('click', () => {
    clickCount++;
    document.getElementById('click-count').innerText = clickCount;
});

document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Formularz wysłany!');
});

async function fetchAndFillCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        const countryList = document.getElementById('countryList');
        data.forEach(country => {
            let option = document.createElement('option');
            option.value = country.name.common;
            countryList.appendChild(option);
        });
    } catch (error) {
        console.error('Błąd pobierania krajów:', error);
    }
}

function getCountryByIP() {
    fetch('https://get.geojs.io/v1/ip/geo.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('country').value = data.country;
            getCountryCode(data.country);
            if (data.postal) {
                document.getElementById('zipCode').value = data.postal;
            }
        })
        .catch(error => console.error('Błąd pobierania lokalizacji:', error));
}

function getCountryCode(countryName) {
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('countryCode').innerText = data[0].idd.root + data[0].idd.suffixes.join("");
        })
        .catch(error => console.error('Błąd pobierania kodu:', error));
}

// Automatyczne formatowanie kodu pocztowego
document.getElementById('zipCode').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, ''); // Usuwa wszystko, co nie jest cyfrą
    if (value.length > 2) {
        value = value.slice(0, 2) + '-' + value.slice(2, 5);
    }
    e.target.value = value.slice(0, 6);
});

// Automatyczne formatowanie numeru telefonu
document.getElementById('phoneNumber').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, ''); // Usuwa wszystko, co nie jest cyfrą
    if (value.length > 3) {
        value = value.slice(0, 3) + '-' + value.slice(3);
    }
    if (value.length > 7) {
        value = value.slice(0, 7) + '-' + value.slice(7);
    }
    e.target.value = value.slice(0, 11);
});

document.addEventListener('DOMContentLoaded', () => {
    fetchAndFillCountries();
    getCountryByIP();
});
