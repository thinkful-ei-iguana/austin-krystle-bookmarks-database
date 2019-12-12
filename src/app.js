require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const { NODE_ENV } = require('./config');
//const validateBearerToken = require('./validatBearerToken');
const errorHandler = require('./errorHandler');
const BookmarksService = require('./bookmarks-service')

const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

//app.use(validateBearerToken);

app.get('/bookmarks', (req, res, next) => {
  const knexInstance = req.app.get('db')
  BookmarksService.getAllBookmarks(knexInstance)
    .then(bookmarks => {
      res.json(bookmarks)
    })
    .catch(next)
})

app.get('/bookmarks/:id', (req, res, next) => {
  const knexInstance = req.app.get('db')
  BookmarksService.getById(knexInstance, req.params.id)
    .then(bookmarks => {
        if (!bookmarks) {
          return res.status(404).json({
            error: { message: `Bookmark doesn't exist` }
          })
        }
      res.json(bookmarks)
    })
    .catch(next)
})

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use(errorHandler);

module.exports = app;