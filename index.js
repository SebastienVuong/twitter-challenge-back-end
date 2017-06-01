const express = require('express');
const cors = require('cors');

const tweets = require('./tweets.js')

const app = express();
app.use(cors());
app.use('/tweets', tweets());

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  if (process.env.C9_HOSTNAME) {
    console.log(`Web server is listening on https://${process.env.C9_HOSTNAME}`);
  } else {
    console.log(`Web server is listening on http://localhost:${port}`);
  }
});