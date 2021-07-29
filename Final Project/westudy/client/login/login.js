Template.login.events({

    // detect login form submission event
    'submit form': function(event){

        // prevent default page reload
        event.preventDefault();

        // collect form data
        var email = $('#email').val();
        var password = $('#password').val();

        // define regular expression for valid email addresses
        var validEmail = /^[a-zA-Z0-9_\.\+\-]+@[a-zA-Z0-9\.\-]+\.[a-zA-Z0-9\.\-]+$/;

        // ensure that values are submitted for all fields
        if (email === "" || password === "") {
            // throw error and return on fail
            login_error('Please enter values for both the email and password fields.');
            return;
        }

        // test validity of inputted email and display error / return on fail
        else if (!validEmail.test(email)) {
            // throw error and return on fail
            login_error('Email must match the following format: email@domain.com');
            return;
        }

        // attempt to log user in
        Meteor.loginWithPassword(email, password, function(error){
            if(error){
                // on fail, display error
                login_error(error.reason);
            }

            else {
                // on success, redirect user to home page
                Router.go("home");
            }
        });
    }
});

// display error by updating hide / show and setting alert html
function login_error(error) {
    $(".alert-danger").show();
    $(".alert-danger").html(error);
}
