'use strict';
process.title = 'burger-builder-server';

const express = require('express');
const app = express();
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');

app.use(compression());
app.use(helmet());
app.use(express.static(path.resolve(__dirname, '../build')));
app.use((req, res, next) => {
    res.status(404).json({
        'message': 'No page found.'
    });
})
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Application started at %s', port);
});