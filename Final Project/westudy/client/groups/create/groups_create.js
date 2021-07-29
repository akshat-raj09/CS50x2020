Template.groups_create.events({

    // detect group creation form submission
    'submit form': function(){

        // prevent default page reload
        event.preventDefault();

        // collect user form data
        var name = $('#name').val();
        var course = $('#course').val();
        var location = $('#location').val();
        var description = $("#description").val();
        var user_id = Meteor.userId();
        var timestamp = new Date();

        // validate required fields
        if (course === "" || name === "" || location === "") {
            // on fail, display error and return
            group_creation_error('Please fill in required fields.');
            return;
        }

        // insert group into database
        Groups.insert({
            timestamp: timestamp,
            name: name,
            course: course,
            location: location,
            description: description,
            members: [user_id]
        }, function(error, id) {
            if(error){
                // show error if any
                group_creation_error(error.reason);
            }
            else {
                // redirect user to group details page on success
                Router.go('groups_view', {group_id: id});
            }
        });

    }
});

// display error by updating hide / show and setting alert html
function group_creation_error(error) {
    $(".alert-danger").show();
    $(".alert-danger").html(error);
}
