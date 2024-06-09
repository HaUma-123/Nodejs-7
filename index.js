const express = require("express");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 5000;

// Replace 'your_api_key_here' with your actual API key from NewsAPI
const newsApiKey = '73b780144b2a4feb933d1c9436a2b989';

app.get('/news', async (req, res) => {
  const query = req.query.q || 'space';

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  const apiUrl = `https://newsapi.org/v2/top-headlines?q=${query}&apiKey=${newsApiKey}`;

  try {
    const response = await axios.get(apiUrl);

    if (response.status !== 200) {
      throw new Error('Failed to fetch news');
    }

    const articles = response.data.articles;

    if (articles.length === 0) {
      return res.status(404).json({ error: 'No news articles found for the query.' });
    } else {
      return res.json(articles);
    }
  } catch (err) {
    const errorMessage = err.response?.data?.message || err.message || '';
    return res.status(500).json({
      error: 'An error occurred: ' + errorMessage
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})
