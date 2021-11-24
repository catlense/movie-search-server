# Movie search app server docs

## Auth methods

### Register
=======
```
/auth/register
```

Body:

- first_name - user name
- last_name - user surname
- email - user email
- password - user password

Response:

```
{
    "activated": false,
    "activateCode": "41f37c67-e77a-4138-b89d-7c5310c3ced7",
    "password": "testpwd",
    "email": "max@voronin.xyz",
    "last_name": "Voronin",
    "first_name": "Maxim",
    "uid": 1,
    "_id": "619d31836356289d325db061",
    "__v": 0
}
```
Description: creates a new user object and sends a confirmation email to it with a key link that leads to /verify?key={key}


### Auth
```
/auth/auth
```
Body:
* email - user email
* password - user password

Responses:
User not found:
```
{
    "status": 404,
    "text": "Пользователь не найден"
}
```
OK:
```
{
    "_id": "619d31836356289d325db061",
    "activated": false,
    "activateCode": "41f37c67-e77a-4138-b89d-7c5310c3ced7",
    "password": "testpwd",
    "email": "max@voronin.xyz",
    "last_name": "Voronin",
    "first_name": "Maxim",
    "uid": 1,
    "__v": 0
}
```
