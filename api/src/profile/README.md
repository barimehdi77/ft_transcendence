
# GET Profile by user_name
URL: `localhost:8080/api/profile/:user_name`

This endpoint used for getting profile info for a specific user using his user_name.
This is GET request user to retrieve Profile info from the database.
NOTE: This operation need JWT token in authentication Header sent in request headers.

## response Example On success:
JSON
URL Example: `localhost:8080/api/profile/barimehdi77`
```
{
    "status": "success",
    "message": "User found",
    "data": {
        "user_name": "barimehdi77",
        "first_name": "Mehdi",
        "last_name": "Bari",
        "login": "mbari",
        "image_url": "https://cdn.intra.42.fr/users/mbari.jpg",
        "email": "mbari@student.1337.ma",
        "profile": {
            "status": "online",
            "played_games": 7,
            "user_points": 77,
            "wins": 7,
            "losses": 0
        }
    }
}
```

## Response Example on Failure:
URL Example: `localhost:8080/api/profile/some_fake_user_name`

```

    "status": "failure",
    "message": "Can not find this User"
}
```

## Response Example on error:
```
{
    "status": "error",
    "message": "Error updating user data",
    "error": error.message ? error.message : error
}
```
## JWT Token

Authorization Bearer Token

`Token        Bearer <token>`


# GET My Profile

URL: `localhost:8080/api/profile/me`


This endpoint used to get the data of the logged in user.
This endpoint need JWT of that user.

## Response Example on success:
```
{
    "status": "success",
    "message": "User found",
    "data": {
        "user_name": "barimehdi77",
        "first_name": "Mehdi",
        "last_name": "Bari",
        "login": "mbari",
        "image_url": "https://cdn.intra.42.fr/users/mbari.jpg",
        "email": "mbari@student.1337.ma",
        "profile": {
            "status": "online",
            "played_games": 7,
            "user_points": 77,
            "wins": 7,
            "losses": 0
        }
    }
}
```

## Response Example if user is Unauthorized:
```
{
    "statusCode": 401,
    "message": "Unauthorized"
}
```

## Response Example on error:
```
{
    "status": "error",
    "message": "Error updating user data",
    "error": error.message ? error.message : error
}
```

## JWT Token
Authorization Bearer Token

`Token        Bearer <token>`
