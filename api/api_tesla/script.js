document.addEventListener('DOMContentLoaded', () => {
    const API_KEY = '24bc944a786b4604abe9373a970cf573';
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const fromDateString = yesterday.toISOString().split('T')[0];
    const toDateString = new Date().toISOString().split('T')[0];

    fetch(`https://newsapi.org/v2/everything?q=Tesla&from=${fromDateString}&to=${toDateString}&sortBy=publishedAt&apiKey=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            const newsContainer = document.getElementById('news-container');
            const articles = data.articles;

            // Initialize pagination
            $('#pagination').pagination({
                dataSource: articles,
                pageSize: 9,
                callback: function(data, pagination) {
                    newsContainer.innerHTML = '';

                    data.forEach(article => {
                        const articleDiv = document.createElement('div');
                        articleDiv.className = 'article';
                        articleDiv.innerHTML = `
                            <h2>${article.title}</h2>
                            <p>Source: ${article.source.name}</p>
                            <p>${article.description}</p>
                            <a href="${article.url}" target="_blank">Read More</a>
                        `;
                        newsContainer.appendChild(articleDiv);
                    });
                }
            });
        })
        .catch(error => {
            console.error('Lỗi khi gọi API:', error);
        });
});