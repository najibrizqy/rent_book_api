<h1 align="center">ExpressJS - Rent Book App RESTfull API</h1>



Rent Book App is a simple library application specially for backend only. Built with NodeJs using the ExpressJs Framework.
Express.js is a web application framework for Node.js. [More about Express](https://en.wikipedia.org/wiki/Express.js)
## Built With
[![Express.js](https://img.shields.io/badge/Express.js-v.4.17.1-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.10.16-green.svg?style=rounded-square)](https://nodejs.org/)

## Requirements
1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)

## How to run the app ?
1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Use `npm start` to start the server
4. Make new file a called **.env**, set up first [here](#set-up-env-file)
5. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
6. Create a database with the name note, and Import file [library.sql](library.sql) to **phpmyadmin**
7. Open Postman desktop application or Chrome web app extension that has installed before
8. Choose HTTP Method and enter request url.(ex. localhost:8016/books)
9. You can see all the end point [here](#end-point)

## Set up .env file
Open .env file on your favorite code editor, and copy paste this code below :
```
PORT= 3000
HOST= localhost
USER= root // default
PASS= // default
DATABASE= library
SECRET_KEY= 'secretkey'
```

## End Point

### 1. Books
  * **GET**
    * `/books`
    * `/books?search=aroma&sort=title&type=DESC&limit=5&page=1`
    * `/books/:id` (Get book by id)
    * `/books/year` (Get year of books)
    * `/books/year/:year` (Get books by year)
    * `/books/genre/:genre` (Get books by genre)
    * `/books/donate` (Get donate books by user, need admin previlege)
    * `/books/order` (Get ordered books by user, need admin previlege)

  * **POST**
    * `/books`
      * ``` { "title": "Kata", "description": "this is description", "image":"image(file)", "date_released": 2019-08-01, "id_genre": 1 } ``` (Body => form-data)

  * **PATCH**
    * `/books/:id` (Update book by id)
       * ``` { "title": "Kata", "description": "this is description", "image":"image(file)", "date_released": 2019-08-01, "id_genre": 1 } ``` (Body => form-data, need admin previlege)
    * `books/confirm/:id` (Confirm donate books by admin, need admin privelege)

  * **DELETE**
    * `/books/:id` (Delete book by id)
     
### 2. Genre
  * **GET**
    * `/genre`
    * `/genre?sort=name&type=DESC`


  * **POST**
    * `/genre` (need admin privelege)
       * ``` { "name": "Horror" } ``` 

  * **PATCH**
    * `/genre/:id` (Update genre by id, need admin privelege)
       * ``` { "name": "Adventure" } ```

  * **DELETE**
    * `/genre/:id` (Delete genre by id, need admin privelege)
     
### 3. Rent Books
  * **GET**
    * `/rent_book`
    * `/rent_book/borrowed/:id` (get borrowed book by id_book)
    * `/rent_book/history/:id` (get history rent book user by id_user)


  * **POST**
    * `/rent_book`
       * ``` { "id_book": "2" } ```
    * `/rent_book/request` (rent book by user)
       * ``` { "id_book": "2", "id_user": "8" } ```

  * **PATCH**
    * `/rent_book/:id` (return book by admin, need admin privelege)
    * `/rent_book/confirm/:id` (confirm ordered book, need admin privelege)

  * **DELETE**
    * `/rent_book/:id` (Delete data transaction by id, need admin privelege)
    
### 4. Users
  * **GET**
    * `/users` (need admin privelege)
    * `/users/:id` (get user by id)

  * **POST**
    * `/users/login` 
       * ``` { "email": "najibrizqy", "password": "mamang123" } ``` (admin)
    * `users/register`
       * ``` { "username": "user", "full_name": "user full name", "email": "user@gmail.com", "password": "user password"}

  * **DELETE**
    * `/users/:id` (Delete user by id, need admin privelege)

