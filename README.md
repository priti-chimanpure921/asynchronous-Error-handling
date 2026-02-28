# 🔄 Asynchronous Error Handling in Node.js & Express

A backend project demonstrating asynchronous error handling in a Node.js + Express application. This project shows how to catch errors in async functions, handle promise rejections, and send consistent error responses using middleware.

# What This Project Teaches

In asynchronous code (like database calls or file operations), errors don’t automatically go to Express error handlers. This project shows:

✔ How to wrap async route handlers so errors are caught

✔ How to forward errors from async functions to error middleware

✔ How to centralize error handling for clean and consistent responses

✔ How to handle uncaught promise rejections

# 🛠️ Technologies Used

Node.js – JavaScript runtime

Express.js – Web framework

# 🧪 How It Works

➤ Async Wrapper

The asyncWrapper utility is used to catch promise rejections or thrown errors:

➤ Routes

Async routes in userRoute.js look like:

➤ Error Middleware

All errors are handled centrally:

➤ 404 Middleware

Handles unknown routes:

# Learnings From This Project

By practicing this project, you’ll learn:

✔ How to handle errors in asynchronous route handlers

✔ How to use middleware for error management

✔ How to separate error logic from business logic

✔ How to build cleaner and safer APIs

# 📌 Why Asynchronous Error Handling Matters

When working with async code (like database calls, file operations, third-party APIs):

❌ Errors thrown inside async functions don’t go to Express error handlers…

✔ Unless they’re caught and forwarded using middleware.

This pattern improves:

API stability

Debug-ability

Code maintainability

Middleware – For handling errors

Custom async wrapper utility – To wrap async route functions
