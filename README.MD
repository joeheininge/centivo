# Hello, and thank you for reviewing my take-home assessment!

## Setup:

1. npm install
2. npm run build
3. docker compose up --build

## Testing 
To test, run the following commands:
1. Get a specific user: `curl http://localhost:6000/users/651111111111111111111111`
2. Get all users: `curl http://localhost:6000/users`
3. Get all users, but filter out users under the age of 21: `curl http://localhost:6000/users?min_age=21`
