// on template creation, ensure that group being requested is valid
Template.groups_view.created = function() {

    // get group from database using helper function
    group = getGroup();

    // if group doesn't exist, redirect to not found page
    if (!group)
        Router.go("notfound");
};


// on template render, update display of DOM elements
Template.groups_view.rendered = function() {

    // if current user is the creator of the group, allow editing and deletion
    if (getGroup().members[0] === Meteor.userId()) {
        $("#current_member").show();
        $("#group_information input").prop("disabled", false);
        $("#group_information textarea").prop("disabled", false);
        $("#edit_group").prop('disabled', false);
        $("#delete_group").prop('disabled', false);
    }

    // if user is a member of the group, allow leaving the group
    else if ($.inArray(Meteor.userId(), getGroup().members) !== -1)
    {
        $("#current_member").show();
        $("#leave_group").prop('disabled', false);
    }

    // if user isn't in the group, allow joining
    else {
        $("#prospective_member").show();
        $("#join_group").prop('disabled', false);
    }

};

Template.groups_view.events({

    // detect join group event
    'click #join_group': function() {

        // insert user into list of group members
        Groups.update({"_id": getGroup()._id}, {$push: {members: Meteor.userId()}});

        // update DOM to reflect user's new status
        $("#prospective_member").hide();
        $("#current_member").show();
        $("#join_group").prop('disabled', true);
        $("#leave_group").prop('disabled', false);

    },

    // detect leave group event
    'click #leave_group': function() {

        // remove user from list of group members and redirect user to groups page
        Groups.update({"_id": getGroup()._id}, {$pull: {members: Meteor.userId()}});
        Router.go("groups");

    },

    // detect edit group event
    'click #edit_group': function() {

        // verify user's authorization
        if (group.members[0] !== Meteor.userId())
        {
            // on fail display error and return
            group_edit_error("You are not authorized to edit this group.");
            return;
        }

        // collect group information from form
        var name = $('#name').val();
        var course = $('#course').val();
        var location = $('#location').val();
        var description = $("#description").val();

        // validate data
        if (course === "" || name === "" || location === "") {
            // on fail display error and return
            group_edit_error('Please fill in required fields.');
            return;
        }

        // update group with new information and display success banner
        Groups.update({"_id": getGroup()._id}, { $set: {name: name, course: course, location: location, description: description} });
        group_edit_success("Group updated successfully.");

    },

    // detect group deletion event
    'click #delete_group': function() {

        // verify user's authorization
        if (group.members[0] !== Meteor.userId()) {
            // on fail display error and return
            group_edit_error("You are not authorized to delete this group.");
            return;
        }

        // remove group from database and redirect to main groups page
        Groups.remove({"_id": getGroup()._id});
        Router.go("groups");

    }
});

// helper functions to provide data to html template
Template.groups_view.helpers({
    //  get group using function composition to ensure reactive live updates
    group : function() {
        return getGroup();
    }
});

// get group from local database
function getGroup() {
    group = Groups.findOne();
    return group;

}

// display error by updating hide / show and setting alert html
function group_edit_error(error) {
    $(".alert-success").hide();
    $(".alert-danger").show();
    $(".alert-danger").html(error);
}

// display success by updating hide / show and setting alert html
function group_edit_success(error) {
    $(".alert-danger").hide();
    $(".alert-success").show();
    $(".alert-success").html(error);
}
