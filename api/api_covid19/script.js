document.addEventListener("DOMContentLoaded", () => {
    const countryListElement = document.getElementById("country-list");

    fetch("https://pomber.github.io/covid19/timeseries.json")
        .then(response => response.json())
        .then(data => {
            const table = document.createElement("table");
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>Country</th>
                        <th>Total Cases</th>
                        <th>Recovered</th>
                        <th>Deaths</th>
                    </tr>
                </thead>
                <tbody id="country-table-body">
                </tbody>
            `;

            const tableBody = table.querySelector("#country-table-body");

            for (const country in data) {
                const countryData = data[country];
                const latestData = countryData[countryData.length - 1];

                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${country}</td>
                    <td>${latestData.confirmed}</td>
                    <td>${latestData.recovered}</td>
                    <td>${latestData.deaths}</td>
                `;

                tableBody.appendChild(row);
            }

            countryListElement.appendChild(table);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
});
