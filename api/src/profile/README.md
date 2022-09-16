
# GET Profile by user_name
URL: `localhost:8080/api/profile/:user_name`

This endpoint used for getting profile info for a specific user using his user_name.
This is GET request user to retrieve Profile info from the database.
NOTE: This operation need JWT token in authentication Header sent in request headers.

## response Example On success:
URL Example: `localhost:8080/api/profile/barimehdi77`

JSON
```
{
    "status": "success",
    "message": "User found",
    "data": {
        "user_name": "mbari",
        "first_name": "Mehdi",
        "last_name": "Bari",
        "login": "mbari",
        "image_url": "https://cdn.intra.42.fr/users/mbari.jpg",
        "email": "mbari@student.1337.ma",
        "intra_id": 62484,
        "profile": {
            "status": "ONLINE",
            "played_games": 0,
            "user_points": 0,
            "wins": 0,
            "losses": 0
        },
        "isFriends": "BLOCKED"
    }
}
```

## Response Example on Failure:
URL Example: `localhost:8080/api/profile/some_fake_user_name`

```
{
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
        "user_name": "aerragha",
        "first_name": "Ayoub",
        "last_name": "Erraghay",
        "login": "aerragha",
        "image_url": "https://cdn.intra.42.fr/users/aerragha.jpg",
        "email": "zeehindi@gmail.com",
        "intra_id": 39523,
        "profile": {
            "status": "ONLINE",
            "played_games": 0,
            "user_points": 0,
            "wins": 0,
            "losses": 0
        },
        "isFriends": null
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
