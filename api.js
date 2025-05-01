const API_KEY = '7499d259adb446dd9c46831a65786011';
        const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                let articles = data.articles.slice(0, 12); //12 articles show
                let output = '';
                articles.forEach(article => {
                    if (article.urlToImage) {
                        output += `
                            <div class="news-card">
                                <img src="${article.urlToImage}" alt="News Image">
                                <h3>${article.title}</h3>
                                <p>${article.description ? article.description.substring(0, 100) + '...' : ''}</p>
                                <a href="${article.url}" class="read-more" target="_blank">Read More</a>
                            </div>
                        `;
                    }
                });
                document.getElementById('news-container').innerHTML = output;
            })
            .catch(error => console.log('Error fetching news:', error));