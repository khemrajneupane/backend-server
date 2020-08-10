const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pdf = require('html-pdf');
const pdfTemplate = require('./documents');
const items = require("./db.json");
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/items', (req, res) => {
  res.send((items.items))
})

app.get("/api/items/:id", (req, res) => {
  const itemId = req.params.id;
  const item = items.items.find(x => x.id === itemId);
  if (item)
    res.send(item);
  else
    res.status(404).send({ msg: "Product Not Found." })
});

app.post('/api/create-pdf', (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
    if (err) {
      res.send(Promise.reject());
    }

    res.send(Promise.resolve());
  });
});

app.get('/api/fetch-pdf', (req, res) => {

  res.sendFile(`${__dirname}/result.pdf`)
})


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
