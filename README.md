# Overview:
Permalist website it's a permanent to-do list you can't lose your to-do list info anymore. It provides multiple to-do lists for Today, this Week, and this Month. Because some tasks can't be done in one day, some might take a week or a month.

The user can do many things such as add a new item, edit any list items, and even check them off by pressing the check box and deleting them from the to-do list.

# Technology Stack:
- HTML5.
- CSS.
- JavaScript.
- EJS.
- Node.js.
- Express.js.
- PostgreSQL.

# To Run The Project:
1- You can visit the link: https://permalist-ps2c.onrender.com

OR

- Create your Database by taking the Schema Definition from queries.sql file.
- Clone the repository, inside the terminal (git clone https://github.com/shahedsaadi/Permalist.git).
- Run npm install

2- After finishing the previous steps you need to follow the next instructions to complete the steps of running the project locally:

- Delete this part of the code that is related to the DB connection inside index.js file:

```javascript
const { Pool } = pg;
let connString = process.env.DATABASE_URL;
const db = new Pool({
  connectionString: connString,
  ssl: {
    rejectUnauthorized: false,
  },
});
```

- Replace it with this inside index.js:
```javascript
const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});
```

- Create a .env File: you can create your own .env file in the project's root directory and populate it with the necessary variables and values. Make sure to follow specific naming conventions like DB_USER which .env file requires the same names as what exists inside index.js.
- In the Sample .env file below, the placeholders like your_database_user, your_database_password, etc., are used instead of actual sensitive information. The user would need to replace these placeholders with their own database credentials when setting up their .env file.

#Sample .env file

  #Database configuration inside .env file:
 ```javascript
  DB_USER=your_database_user

  DB_HOST=your_database_host

  DB_NAME=your_database_name  # For example DB name is permalist

  DB_PASS=your_database_password

  DB_PORT=your_database_port
```
  - Run node index.js
  - Visit the link http://localhost:3000/

# Website Screenshot:
![Screenshot 2024-05-07 202619](https://github.com/shahedsaadi/Permalist/assets/108287237/c14b02eb-c29c-4f03-b5a3-c1b080f4fa62)

![Screenshot 2024-05-07 202825](https://github.com/shahedsaadi/Permalist/assets/108287237/d31be66f-27b6-4ea6-99ea-52ece3cfa730)

![Screenshot 2024-05-07 202732](https://github.com/shahedsaadi/Permalist/assets/108287237/1a546f17-5136-4178-8574-845a407b0344)

