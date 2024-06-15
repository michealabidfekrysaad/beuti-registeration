# beuti-registration-wizard
### deploy beuti-dashboard
copy /devops/.env.example to /devops/.env (put external port to access the url)
cd devops && docker-compose up -d 


++++++++++++++

### Activation code
It doesn't comeback now for security reasons. Use postman to get it.

```
https://test-auth.beuti.co/api/v1/account/Test/GetVerificationCode?phoneNumber=${the phone you eneterd}

```
Pass Authorization header with your token. response should be 
```
{
  "data": "YOUR ACTIVATION 4 DIGITS"
}
```