# 21-pagination

This project is a simple Express server that provides an API for retrieving a list of items with support for sorting, filtering, and pagination.

## Project Structure

- **src/controllers/**: Intended for controller files that handle business logic for different routes. Currently empty.
- **src/middlewares/**: Intended for middleware functions that can be used in the request handling pipeline. Currently empty.
- **src/routes/items.js**: Exports an Express router that defines the endpoint for retrieving a list of items. Implements sorting, filtering, and pagination based on query parameters.
- **src/data/items.js**: Exports an array of item objects, each with properties such as id, name, and category. This data is used by the items route to respond to requests.
- **src/server.js**: The entry point of the application. Creates an instance of the Express app, sets up middleware, and mounts the items router to handle requests to the /items endpoint.
- **package.json**: Configuration file for npm. Lists project metadata, dependencies, and scripts for the project.

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   cd 21-pagination
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```

4. Access the API at `http://localhost:3000/items`.

## API Endpoints

### GET /items

Retrieve a list of items with optional sorting, filtering, and pagination.

#### Query Parameters

- **sort**: Sort items by a specific field (e.g., `name:asc` or `category:desc`).
- **filter**: Filter items by category (e.g., `category=A`).
- **page**: Specify the page number for pagination (default is 1).
- **limit**: Specify the number of items per page (default is 10).

## License

This project is licensed under the ISC License.