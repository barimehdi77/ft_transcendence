# Get all Friends (ACCEPTED FRIEND REQUESTS)

URL: `localhost:8080/api/friends/`

this endpoint retrive all friends for the user
NOTE: This operation need JWT token in authentication Header sent in request headers.

## response Example On success:

JSON

```
{
    "status": "success",
    "message": "All Friends Retrieved Successfully",
    "data": [
        {
            "id": 1,
            "to": {
                "user_name": "aerragha",
                "image_url": "https://cdn.intra.42.fr/users/aerragha.jpg"
            },
            "status": "ACCEPTED"
        },
        {
            "id": 4,
            "to": {
                "user_name": "aerragha",
                "image_url": "https://cdn.intra.42.fr/users/aerragha.jpg"
            },
            "status": "ACCEPTED"
        }
    ]
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

`Token Bearer <token>`

# POST send Friend Request

URL: `localhost:8080/api/friends/request`

this endpoint used to Create new Friend request

## Body Example:

```
{
    "to": 62473
}
```

## Response Example on success:

```
{
    "status": "success",
    "message": ""Friend Request sent Successfully""
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

`Token Bearer <token>`

# GET all Friend Request (PENDING FRIEND REQUESTS)

this endpoint retrive all friend Requests for the logged in user

## Response Example on success:

```
{
    "status": "success",
    "message": "All Friend Request retrieved Successfully",
    "data": []
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

`Token Bearer <token>`

# PATCH update specific Friend Request

this endpoint Update the friend request from PENDING to ACCEPTED

## Response Example on success:

```
{
    "status": "success",
    "message": "Friend Request Removed Successfully",
    "data": {
        "id": 5,
        "from": 62473,
        "to": 39523,
        "status": "PENDING"
    }
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

`Token Bearer <token>`

## Body Example:

```
NO BODY NEEDED :)
```

## Response Example on success:

```
{
    "status": "success",
    "message": "Friend Request accepted Successfully",
    "data": {
        "id": 2,
        "status": "ACCEPTED"
    }
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

`Token Bearer <token>`

# DELETE specific Friend Request (DECLINED)

this endpoint deleted the Friend Request when a user is declined it.

## Response Example on success:

```
{
    "status": "success",
    "message": "Friend Request Removed Successfully"
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

`Token Bearer <token>`
