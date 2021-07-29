// keep track of groups that user owns and is a member of
var user_owned = [];
var user_in = [];

// helper functions to provide data to html template
Template.home.helpers({

    //  get user groups using function composition to ensure reactive live updates
    user_groups : function() {
        return getUserGroups();
    },

    //  get user posts using function composition to ensure reactive live updates
    user_posts : function() {
        return getUserPosts();
    }
});

function getUserGroups() {

    // get all groups with user as a member
    var user_groups = Groups.find({},{sort: {timestamp: 1}}).fetch();
    user_owned = [];
    user_in = [];

    // sort user groups into owned by user not owned by user
    user_groups.forEach(function(group) {
        if (group.members[0] == Meteor.userId()) {
            user_owned.push(group);
        }
        else {
            user_in.push(group);
        }
    });

    return {owned : user_owned, in : user_in};
}

function getUserPosts() {
    // get user posts from local database sorted in descending order
    var user_posts = Posts.find({},{sort: {timestamp: 1}}).fetch();
    return user_posts;
}
