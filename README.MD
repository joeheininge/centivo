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


## Discussion

### Docker 
I chose to use Docker compose to make it easy for the reviewer (e.g. you) to spin up a test environment. I used official images for Mongo and Node and created two containers to mimic a production environment (app and DB on separate servers). I didn't need to create a dockerfile for the MongoDB container, just set some config values in the docker-compose file where it gets created. The most interesting of these is the `volumes` section, that populates the DB by running the files in the `/seed` folder.

### API design

The instructions were not clear on this point, but it seemed most logical to me to assume that "Only return users where the age is greater than 21" should be an optional filter that can be passsed into a general `/users` endpoint, rather than a filter that always gets applied, even when looking up a user by ID.

In a real production environment, we would probably want to allow paging instead of just returning all the users, but since this is just a quick exercise, I chose to leave it out for now.


## Conclusion

I had a lot of fun with this exercise! Thanks for considering me for Centivo, and I look forward to speaking with you further! Please don't hesitate to reach out if you have any questions. Cheers!