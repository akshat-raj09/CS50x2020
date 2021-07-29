// global helper functions that make data available to the HTML templates
UI.registerHelper('formatDateTime', function(timestamp) {
    // convert date timestamp to a formatted string
    return timestamp.toLocaleDateString('en-US') + " @ " +
        timestamp.toLocaleTimeString('en-US');
});

UI.registerHelper('getUserName', function(user_id) {
    // given a user's id, return his / her first and last name as a string
    var user = Meteor.users.findOne({_id : user_id});
    return user.profile.first_name + " " + user.profile.last_name;
});


// handles event to mobile nav collapse button
Template.layout.events({
    "click .navbar-toggle" : function() {
        $('#sidebar').toggle();
    }
});
