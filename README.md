## You need:
- Database (MongoDB)
- Google Console Account to create the API Auth Key's

## Create .env file
Create a .env file to store your credentials. Example below:

```
MONGODB_URI = mongodb+srv://<username>:<password>@mongodburlhere
GOOGLE_CLIENT_ID= YOUR_GOOGLE_ID_HERE
GOOGLE_CLIENT_SECRET= YOUR_GOOGLE_CLIENT_SECRET_HERE
GOOGLE_CALLBACK_URL=http://localhost:3000/google/callback
```

## Installation
To install and run this project - install dependencies using npm and then start your server:

```
$ npm install
$ npm start
```
# Demonstration
### Home
![Screenshot 2023-12-25 141408](https://github.com/Taha-suhail/Notes-App-NodeJs/assets/96725175/54768681-9bca-459e-b65c-17aa4eaf42f7)
### Dashboard (After signing with google)
![Screenshot 2023-12-25 141513](https://github.com/Taha-suhail/Notes-App-NodeJs/assets/96725175/61d9be4f-2a63-4902-a0bf-0075c7cc834c)
### Adding a note
![Screenshot 2023-12-25 141526](https://github.com/Taha-suhail/Notes-App-NodeJs/assets/96725175/f776d688-b4ca-4f57-a5d8-346b2b7b4c00)
### Delete or Update Note
![Screenshot 2023-12-25 141659](https://github.com/Taha-suhail/Notes-App-NodeJs/assets/96725175/f36ee408-cbc8-4b2a-ad94-7f6d787f9c39)

