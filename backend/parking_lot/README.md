
# Setup
`asdf install`
`poetry install`
`poetry poe manage createsuperuser` # username password doesn't matter
`poetry poe manage migrate`

# Run
`poetry poe manage.py runserver`

# curl example
```bash
curl -X POST -d '{"username": "$user_name_from_createsuperuser","password": "$password_from_createsuperuser"}' \
     -H 'Content-Type: application/json'  http://127.0.0.1:8000/api/auth/token/login/
```
response =>
`{"auth_token":"63eff0b0bebeae009766a55d0f069b058b01fa5d"}`

```bash
curl -X POST -H 'Authorization: Token $token_from_previous_example' \
     -H 'Accept: application/json; indent=4'
     -H 'Content-Type: application/json'
     -d '{"taken": true}'  http://127.0.0.1:8000/api/v1/parking-spaces
```
response =>
```json
{
    "id": 12,
    "taken": true,
    "created": "2025-01-28T01:43:23.829940Z",
    "updated": "2025-01-28T01:43:23.829984Z"
}
```



# See routes
`poetry poe manage show_urls`

# Test
`poetry poe test`
