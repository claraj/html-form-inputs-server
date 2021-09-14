## Demo app, submitting a form to a server 

Two examples of forms

* A form with named inputs, submitting data to a server for processing 
* Another form with named inputs and a hidden input, submitted data to a server for processing

To run this app:

1. Install node.js from https://nodejs.org/
2. Clone or download this code
3. In the base directory of this project, run
`npm install`
to install the app's dependencies 
4. To start the web server, type
`npm start`
5. Open your browser and go to http://127.0.0.1:3000
6. Enter example data in form and submit
7. In your terminal/console you'll see the data the server is receiving from the form - notice data from all inputs are there, and data is labeled with the form input name
8. Try editing the data you entered. Notice there's a hidden form input in edit_order_form.hbs which is populated with the order number when the page is created, and when the form is submitted, the order number is included in the form data
8. Press Control+C to stop the web server running. 