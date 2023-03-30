<h1 align='center'>Acebook</h1>

<div align='center'>
    
![logo](https://github.com/alexHoggett/acebook/blob/main/frontend/public/logo-blue.png?raw=true)
    
</div>

## ⚡️ Technologies

- [React](https://react.dev/) - framework for our frontend.
- [Express](https://expressjs.com/) - framework for our backend.
- [Node.js](https://nodejs.org/en) - our javascript runtime environment
- [MongoDB](https://www.mongodb.com/) - our database management system
- [Jest](https://jestjs.io/) - for unit testing on the back end.
- [Cypress](https://www.cypress.io/) - for end-to-end testing and component testing, on the front end.
- [Mongoose](https://mongoosejs.com) - to model objects in MongoDB.
- [Handlebars](https://handlebarsjs.com/) - for the `home` template.
- [ESLint](https://eslint.org) - for linting.
- [Nodemon](https://nodemon.io/) - to reload the server automatically.


## ✨ Features

Users can:
- Sign up
- Sign in
- Sign out
- Delete their own posts
- View a list of posts
- Like a post
- Comment on a post
- View a list of suggested friends
- Add friends to your friends list


## 📐 Architecture

This application is comprised of two distinct pieces.

- A backend API built with Express
- A front end built with React

The React front end sends HTTP requests to the backend API and receives JSON in response body, rather than a whole page of HTML.

For example, the React front end would send this request to retrieve the entire `Post` collection.

```
GET "/posts"
```

And the body of the response would look like this.

```
{
    "posts": [
        {
            "_id": "62f8ef0e6c1ffcf74cbbb181",
            "message": "Hello, this is my first Acebook post!",
            "__v": 0
        },
        {
            "_id": "62f8ef366c1ffcf74cbbb188",
            "message": "Welcome to Acebook! Have an Acetime :)",
            "__v": 0
        },
        {
            "_id": "62f8f08af1cffef85a7426ae",
            "message": "Thank you :D",
            "__v": 0
        }
    ]
}
```

Here's a diagram of the above
<br>
<br>
![a diagram of the MERN stack](./diagrams/mern_stack.png)
<br>
<br>

Once received by the React FE, the JSON in the response body is used to render a list of posts on the page.

![response body mapped onto a page](./diagrams/response_parsing.png)

## 🔑 Authentication

Here's the authentication flow for this application

1. A registered user submits their email address and password via the React front end.
2. The Express backend receives the data and tries to find a user in the DB with the same email address.
3. If a user is found, the password in the database is compared to the password that was submitted.
4. If the passwords match, a JSON Web Token is generated and returned, as part of the response.
5. The React front end receives the token and holds on to it.
6. Every request to `"/posts"` must include a valid token (which is checked by the backend).
7. When the user logs out, the front end discards the token.

![authentication flow diagram](./diagrams/auth_flow.png)

## 🛠 Installation and setup

### Install Node.js

1. Install Node Version Manager (NVM)
   ```
   brew install nvm
   ```
   Then follow the instructions to update your `~/.bash_profile`.
2. Open a new terminal
3. Install the latest version of [Node.js](https://nodejs.org/en/), currently `18.1.0`.
   ```
   nvm install 18
   ```

### Set up your project

1. Install Node.js dependencies for both FE and BE (API)
   ```
   ; cd api
   ; npm install
   ; cd ../frontend
   ; npm install
   ```
2. Install an ESLint plugin for your editor. For example: [`linter-eslint`](https://github.com/AtomLinter/linter-eslint) for Atom.
3. Install MongoDB
   ```
   brew tap mongodb/brew
   brew install mongodb-community@5.0
   ```
   *Note:* If you see a message that says `If you need to have mongodb-community@5.0 first in your PATH, run:`, follow the instruction. Restart your terminal after this.
4. Start MongoDB
   ```
   brew services start mongodb-community@5.0
   ```

### Start

1. Start the server

  **Note the use of an environment variable for the JWT secret**

   ```
   ; cd api
   ; JWT_SECRET=SUPER_SECRET npm start
   ```
2. Start the front end

  In a new terminal session...

  ```
  ; cd frontend
  ; npm start
  ```

You should now be able to open your browser and go to `http://localhost:3000/signup` to create a new user.

Then, after signing up, you should be able to log in by going to `http://localhost:3000/login`.

## 🧪 Testing


### The Backend (API)

**Note the use of an environment variable for the JWT secret**

  Start the server in test mode (so that it connects to the test DB)

  ```
  ; cd api
  ; JWT_SECRET=SUPER_SECRET npm run start:test
  ```

  Then run the tests in a new terminal session

  ```
  ; cd api
  ; JWT_SECRET=SUPER_SECRET npm run test
  ```

### The frontend (React)

**Note the use of an environment variable for the JWT secret**

  Start the server in test mode (so that it connects to the test DB)

  ```
  ; cd api
  ; JWT_SECRET=SUPER_SECRET npm run start:test
  ```

  Then start the front end in a new terminal session

  ```
  ; cd frontend
  ; JWT_SECRET=SUPER_SECRET npm start
  ```

  Then run the tests in a new terminal session

  ```
  ; cd frontend
  ; JWT_SECRET=SUPER_SECRET npm run test
  ```

## MongoDB Connection Errors?

Some people occasionally experience MongoDB connection errors when running the tests or trying to use the application. Here are some tips which might help resolve such issues.

- Check that MongoDB is installed using `mongo --version`
- Check that it's running using `brew services list`
