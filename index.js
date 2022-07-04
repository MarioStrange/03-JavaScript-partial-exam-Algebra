var timer;
let inputPromise = document.getElementById('input-promise');
inputPromise.addEventListener('keyup', promiseSearch);

function promiseSearch(event) {
    clearTimeout(timer);

    let value = event.target.value.trim();
    let url = 'https://itunes.apple.com/search?term=' + value + '&entity=song';

    let resultContainer = document.getElementById('result-promise');

    if (value.length != 0) {
        resultContainer.innerHTML = '<p class="fw-bold"> Molimo pričekajte...</p><div class="lds-ring"><div></div><div></div><div></div><div></div></div>';
        timer = setTimeout(function () {
            fetch(url).then(response => {
                return response.json();
            }).then((jsonResults) => showResults(jsonResults, resultContainer));
        }, 1000);
    }
    else {
        resultContainer.innerHTML = '<p class="fw-bold"> Molimo unesite pojam pretrage.</p>';
    }
}

function showResults(data, element) {
    if (data.resultCount == 0) {
        element.innerHTML = '<p class="fw-bold">Broj rezultata: 0</p>'
    }
    else {
        let result = '<p class="fw-bold">Broj rezultata: ' + data.resultCount + '</p>';
        result += '<table class="table table-striped"><thead><tr><th>Izvođač</th><th>Naziv pjesme</th></tr></thead><tbody>';

        data.results.forEach((res) => {
            result +=
                '<tr>'
                + '<td>' + res.artistName + '</td>'
                + '<td>' + res.trackName + '</td>'
                + '</tr>';
        });

        result += '</tbody></table>';

        element.innerHTML = result;
    }
}