const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Library API',
      version: '1.0.0'
    }
  },
  apis: ['app.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

/**
 * @swagger
 * /books:
 *  post:
 *      description: Create a new book
 *      parameters:
 *      - name: title
 *        description: title of the book
 *        in: formData
 *        required: true
 *        type: String
 *        responses:
 *        201:
 *        description: Created
 * 
 */

app.get('/books', (req, res) => {
  res.send([
    {
      id: 1,
      title: 'Harry Potter'
    }
  ])
});

app.post('/books', (req, res) => {
  res.status(201).send();
})

app.listen(5000, () => {
  console.log("Listening on port 5000")
});