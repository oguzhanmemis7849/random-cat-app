## Random Cat App with Auth

### Used Modules

- Tailwind CSS
- Pinia
- Next-Auth
- Nuxt-Image

### Notes: I added the ".env" file as an extra. You can use the auth url from here.

### Auth Credentials
- **email** : test@test.com
- **password** : test

### If you are not logged in, there is a structure that prevents you from going to the homepage. You can try to go to /urle without login. You can also trye to go to login from the url on the home page. You will see that you cannot go without logout.

### Contains 2 components: Button and Spinner.

### When you click on the Change Cat button, it brings you the new cat image from the api with a random transition effect.

## Project Setup
**I used to Node version 18.17.1**
1. Clone the repo.
2. npm install
3. npm run dev *(If you can't run it and you get an error, please try this. `npm install next-auth@4.21.1`)*
4. When you run the project, you can access the random cat images by entering the email and password fields.

