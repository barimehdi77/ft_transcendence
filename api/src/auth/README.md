# Authenticate user With Intra API

URL: `localhost:8080/api/auth/login`

This endpoint uses to redirect user to loign with his inta account

# After Authenticate with Intra

URL: `localhost:8080/api/auth/redirect`

After The user Successfully Login and give us the permisson to get his PUBLIC data from inta

This will endpoint will generate a JWT and set it in response cookies, Then redirect the user to the '/setup' or '/' (index Page) or '/authenticate' if user activate 2FA.

## JWT Set in Cookies

`Token <token>`

# GET Generate a QR Code

This endpoint for Generating a QR Code for the use to be able to turn on 2FA.
This endpoint need JWT to verify the user.

## response Example On success:

JSON

```
{
    "status": 'success',
	"message": "QR Code Generated successfully",
	"data": QRcode (This is a QR Code Image)
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

# POST Turn on 2FA

This endpoint for Activating 2FA.

## Body Example:

```
{
    "twoFactorAuthenticationCode": "377297",
}
```

## response Example On success:

JSON

```
{
    "status": 'success',
	"message": "2FA Activated Successfully",
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

# GET Turn Off 2FA

This endpoint for disactivating 2FA.

## response Example On success:

JSON

```
{
    "status": 'success',
	"message": "2FA Disactivated Successfully",
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

# POST Authenticate

This endpoint verify the user 2FA after login.
This will endpoint will generate a JWT and set it in response cookies, Then redirect the user to the '/setup' or '/' (index Page)

## response Example On success:

JSON

```
{
    "status": 'success',
	"message": "2FA Code is valid",
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
