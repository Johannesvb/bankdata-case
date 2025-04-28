# Bankdata coding challenge: Account API
*Author: Johannes Valentin Berg*

## Problem statement
The goal of this project was to build a simple API for a bank system, where users can:
- CREATE a new bank account
- LIST all existing accounts
- TRANSFER funds between account

## Solution Overview

This project delivers a **Node.js API** written in **TypeScript**, with a **SolidJS frontend** to interact with the API.

The backend provides:
- **REST endpoints** for account creation, listing, and transfers
- **Type-safe** request and response handling via TypeScript
- **In-memory storage** of accounts for simplicity (no database)

The frontend allows users to:
- Create a new account
- View a list of accounts in a table view
- Perform fund transfers between accounts

The frontend includes solid-ui components that i have not written. 

### Error handling:
Errors are handled in the backend and displayed clearly in the frontend. Input validation is also included in the frontend to provide effective feedback for users.

### Auditing:
A simple transaction history is kept for each account. 

### Observability:
Basic observability considerations have been done by logging operations. This should be improved in the future by integrating monitoring tools.

### Security:
It goes without saying that any banking application should be secure. 
Achieving a solution to ensure proper account security should be the logical next step for this project. Future considerations should at least include:
- Authentication through secure user login
- Authorization to make sure a user can only perform operations on their own accounts
- Secure data transmission using HTTPS
