
# GET User Info
`localhost:8080/api/user`

This endpoint request the user data form API.
This is GET request user to retrieve user info from the data base.
NOTE: This operation need JWT token in authentication Header sent in request headers.

## response Example On success:
JSON
```
{
    "id": 1,
    "intra_id": 62484,
    "first_name": "Mehdi",
    "last_name": "Bari",
    "login": "mbari",
    "user_name": "Barimehdi77",
    "email": "mbari@student.1337.ma",
    "image_url": "https://cdn.intra.42.fr/users/mbari.jpg",
    "ProfileDone": true
}
```

## Response Example on Failure:
```
{
    "statusCode": 401,
    "message": "Unauthorized"
}
```
## JWT Token

Authorization Bearer Token
`Token        Bearer <token>`
