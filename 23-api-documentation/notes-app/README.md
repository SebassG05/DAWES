# README.md CONTENTS
# This file contains documentation for the project, including setup instructions and usage.

# Notes Application

This is a simple notes application built with Express.js. It allows users to create, edit, and delete notes, which are stored as text files on the server.

## Project Structure

```
notes-app
├── src
│   ├── controllers        # Contains request handlers for notes
│   ├── loaders            # Initializes application loaders
│   ├── middlewares        # Custom middleware for logging and error handling
│   ├── routes             # Defines application routes
│   ├── services           # Business logic for notes management
│   ├── utils              # Utility functions, including logging
│   ├── app.js             # Main application file
│   └── config.js          # Configuration settings
├── .env                   # Environment variables
├── index.js               # Entry point for starting the application
├── package.json           # Project metadata and dependencies
└── package-lock.json      # Locked versions of dependencies
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd notes-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and set the desired port:
   ```
   PORT=3000
   ```

4. Start the application:
   ```
   npm start
   ```

## Usage

- **Create a Note**: Send a POST request to `/notes/create` with the note name and content.
- **Edit a Note**: Send a PUT request to `/notes/edit` with the note name and new content.
- **Delete a Note**: Send a DELETE request to `/notes/delete` with the note name.

## License

This project is licensed under the MIT License.