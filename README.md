# ChrisFlix
A system of microservices that combines backend and frontend techniques needed to run a student-made full stack movie purchasing site.

## Backend
The backend consists of 4 services - accounts, movies, paypal transactions, and the gateway written in Java.

### Accounts
The account service creates new users, verifies login credentials, and creates session tokens to signify a current session is active. This service is called by the following services(movies, paypal) to ensure the site functions perform properly.
### Movies
The movie service retrieves movie information based on the browse or search endpoints. The info is sent in JSON format and is then parsed by the frontend services to further display the retrieved information.
### Paypal
The paypal service consists of endpoints concerned with adding/updating items to a user's cart, creating a paypal transaction, and confirming a paid paypal transaction. Transactions are save to a separate database that indexes transactions and current user carts.
### Gateway
The gateway service acts as a queue handler for requests. Requests are sent to the previously mentioned servicecs whilst indexed in the gateway database for request tracking and managment.

## Frontend
I created two interfaces to display the information retrieved from the backend services in the form of a web page (created in React) and an mobile phone application (created in Android Studio). Below you can watch the demos for them.

[![WEB DEMO](http://img.youtube.com/vi/McPVB3qV26c/0.jpg)](http://www.youtube.com/watch?v=McPVB3qV26c "ChrisFlix Web Demonstration")
[![ANDROID DEMO](http://img.youtube.com/vi/7BrR9RtMFto/0.jpg)](http://www.youtube.com/watch?v=7BrR9RtMFto "ChrisFlix Android Demonstration")
