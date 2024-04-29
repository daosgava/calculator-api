### Calculator API

#### Overview

This API offers basic arithmetic operations—addition, subtraction, multiplication, and division—through HTTP GET requests. Users can perform calculations by providing two numbers as query parameters, receiving results in JSON format.

#### Getting Started

1. **Installation**

   Before running the application, ensure you have Node.js installed. Then, clone the repository and install dependencies:

   ```bash
   npm install
   ```

2. **Running the Server**

   To start the server, use the following command:

   ```bash
   npm run dev
   ```

   This command will launch the Express server on port 3010. 

#### API Usage

- **Add Two Numbers**

  - **Endpoint:** `/add`
  - **Method:** `GET`
  - **Query Parameters:**
    - `num1`: The first number.
    - `num2`: The second number.
  - **Success Response:** JSON object containing the result of the addition.
  - **Error Response:** If any of the inputs are invalid, an error message is returned.

- **Subtract Two Numbers**

  - **Endpoint:** `/subtract`
  - **Method:** `GET`
  - **Query Parameters:**
    - `num1`: The first number.
    - `num2`: The second number.
  - **Success Response:** JSON object containing the result of the subtraction.
  - **Error Response:** If any of the inputs are invalid, an error message is returned.

- **Multiply Two Numbers**

  - **Endpoint:** `/multiply`
  - **Method:** `GET`
  - **Query Parameters:**
    - `num1`: The first number.
    - `num2`: The second number.
  - **Success Response:** JSON object containing the result of the multiplication.
  - **Error Response:** If any of the inputs are invalid, an error message is returned.

- **Divide Two Numbers**

  - **Endpoint:** `/divide`
  - **Method:** `GET`
  - **Query Parameters:**
    - `num1`: The numerator.
    - `num2`: The denominator (must not be zero).
  - **Success Response:** JSON object containing the result of the division.
  - **Error Response:** If any of the inputs are invalid, an error message is returned, especially if `b` is zero.

- **Exponentiation**

  - **Endpoint:** `/exponentiation`
  - **Method:** `GET`
  - **Query Parameters:**
    - `num1`: The first number.
    - `num2`: The second number.
  - **Success Response:** JSON object containing the result of the exponentiation.
  - **Error Response:** If any of the inputs are invalid, an error message is returned.

- **Square Root**

  - **Endpoint:** `/square-root`
  - **Method:** `GET`
  - **Query Parameters:**
    - `num1`: The first number.
  - **Success Response:** JSON object containing the result of the exponentiation.
  - **Error Response:** If num1 is not a number, an error message is returned.

- **Modulo**

  - **Endpoint:** `/module`
  - **Method:** `GET`
  - **Query Parameters:**
    - `num1`: The first number.
    - `num2`: The second number.
  - **Success Response:** JSON object containing the result of the module operation.
  - **Error Response:** If any of the inputs are invalid, an error message is returned.

- **Base Logarithm**
  - **Endpoint:** `/logarithm`
  - **Method:** `GET`
  - **Query Parameters:**
    - `num1`: The first number.
    - `num2`: The second number.
  - **Success Response:** JSON object containing the result of the base logarithm operation.
  - **Error Response:** If any of the inputs are invalid, an error message is returned.


#### Example

To add two numbers, navigate to the following URL in your browser or use a tool like `curl`:

```
http://localhost:3010/add?num1=10&num2=5
```

This will return:

```json
{
  "data": 15
}
```

#### Logging

The API uses a simple logger to log information and errors. All logs are output to the console.

- Information logs are created for valid requests.
- Error logs are created for invalid inputs or server errors.

#### Error Handling

The API includes basic error handling. If invalid input is provided, it logs an error and returns a `500` status code with an error message.
