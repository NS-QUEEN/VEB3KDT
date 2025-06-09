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
