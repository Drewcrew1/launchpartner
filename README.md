# launchpartner

This app is deployed live on heroku at -- https://safe-chamber-33749.herokuapp.com/

In this application "People Space" users can signup for an account to upload an individual account,see other profiles that contains a users name, image and short bio and lets them edit thier own account.

Users passwords are encrypted upon storage along with sending a jsonwebtoken to the front end in the event that the application would be built with more security in the future. Passport handles the middleware functions of authenticating users. AWS S3 was used for image storage and retrieval. If The application was not hosted on heroku and my personal hosting platform I would most likley handle image storage within the hosting enviorment. I have implemented a Redux store in order to handle auth events and loading in users profiles, in this way any number of components can easily have the state accessible to them to use for increased functionailty or application scaleing along with ease of access to data.


I built this small application with scale in mind so it leans heavily on resuable components, a auth system that can easily handle more private routes and features can be added relativley quickly. Adding a posts and comments section would only need a new component, mongoose model and route to save a users id along with thier name next to comments on another users account, these can be easily protected agianst users who are not signed into the app with the protected routes and checkes for authenticated users. 
