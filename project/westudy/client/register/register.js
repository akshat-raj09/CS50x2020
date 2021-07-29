Template.register.events({

    // detect registration form submission
    'submit form': function(){

        // prevents form from reloading the page by default
        event.preventDefault();

        // collect form data
        var first_name = $('#first_name').val();
        var last_name = $('#last_name').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var password_confirmation = $('#password_confirmation').val();

        // define regular expression for valid email addresses
        var validEmail = /^[a-zA-Z0-9_\.\+\-]+@[a-zA-Z0-9\.\-]+\.[a-zA-Z0-9\.\-]+$/;

        // validate data and throw error / return on fail
        if (first_name === "" || last_name === "" || email === "" ||
            password === "" || password_confirmation === "") {
                registration_error('All fields are required.');
                return;
        }

        // validate email address and throw error / return on fail
        else if (!validEmail.test(email)) {
            registration_error('Email must match the following format: email@domain.com');
            return;
        }

        // ensure that password matches confirmation and throw error / return on fail
        else if (password !== password_confirmation) {
            registration_error('The passwords you have entered don\'t match.');
            return;
        }

        // insert the account in the database
        Accounts.createUser({
            email: email,
            password: password,
            profile: {
                first_name: first_name,
                last_name: last_name
            }
        }, function(error){
            if(error){
                // throw error on fail
                registration_error(error.reason);
            }

            else {
                // on success, redirect user to homepage
                Router.go("home");
            }
        });

    }
});

// display error by updating hide / show and setting alert html
function registration_error(error) {
    $(".alert-danger").show();
    $(".alert-danger").html(error);
}
