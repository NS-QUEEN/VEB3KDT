# User Guide: Testing the Raamatud API Project

## 1. Install Node.js

Go to https://nodejs.org/ and download the LTS version.
Install it with default options.
Open Command Prompt and verify installation with:
 node -v
 npm -v
 
## 2. Save the project files

Save them to a known location, e.g.:
 C:\Users\YourName\Documents\raamatud_api
 
## 3. Open PowerShell or Command Prompt

Navigate to the extracted project folder:
 cd "C:\Users\YourName\Documents\raamatud_api"
 
## 4. Fix PowerShell script policy if needed

If you get a script execution error (e.g. npm.ps1 cannot be loaded), run:
 Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
Confirm with Y and Enter.

## 5. Install required packages

Run the following command to install dependencies:
 npm install express body-parser jsonwebtoken swagger-ui-express yamljs
 
## 6. Run the server

Start the project server with:
 node server.js
You should see: Server töötab: http://localhost:3000

## 7. Test the API

Visit Swagger UI in your browser:
 http://localhost:3000/docs
Use the "Try it out" button on endpoints like /login, /books.

## 8. Login as Admin or User

To login, use:
 Username: admin
 Password: adminpass
Or:
 Username: user
 Password: userpass
Copy the returned token and use it in 'Authorize' section in Swagger.

## 9. Common Actions in Swagger

- View books: GET /books
- Update book: PUT /books/1 (send full object)
- Comment as User: POST /books/1/comments
- Only Admin can add/delete books (if supported)
- Only User can comment (unless changed in code)


## 10. Optional: Allow Node.js Through Firewall

When prompted by Windows Security, allow Node.js access only on:
 - Private networks (allow)
 - Public networks (do not allow)


# Raamatute RESTful API (JWT Autentimine)

Lihtne Node.js/Express API raamatute haldamiseks. Toetab kasutaja rolle (Admin/Kasutaja), JWT autentimist ja tegevuste logimist.

## Funktsionaalsus

**Admin:**
- Muuda raamatu andmeid (`PUT /books/:id`)
- Kustuta raamat (`DELETE /books/:id`)

**Kasutaja:**
- Vaata raamatuid (`GET /books`)
- Lisa kommentaare (`POST /books/:id/comments`)

Kõik tegevused logitakse faili `log.txt`.

## Autentimine

1. Logi sisse: `POST /login`  
   Body: `{ "username": "admin", "password": "adminpass" }`

2. Salvesta saadud `token` ja lisa see päringutesse:
   ```
   Authorization: Bearer <token>
   ```

## Paigaldamine

```bash
npm install express body-parser jsonwebtoken swagger-ui-express yamljs
node server.js
```

## Swagger UI

Avamiseks: [http://localhost:3000/docs](http://localhost:3000/docs)
