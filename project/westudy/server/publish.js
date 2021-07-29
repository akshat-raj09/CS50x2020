// groups publishes
Meteor.publish('groups', function() {
    return Groups.find();
});

Meteor.publish('group', function(group_id) {
    return Groups.find({_id : group_id});
});

Meteor.publish('user_groups', function() {
    return Groups.find({members: this.userId});
});

// forums publishes
Meteor.publish('posts', function() {
    return Posts.find();
});

Meteor.publish('tagged_posts', function(tag) {
    return Posts.find({tags: tag});
});

Meteor.publish('post', function(post_id) {
    return Posts.find({_id: post_id});
});

Meteor.publish('user_posts', function() {
    return Posts.find({author: this.userId});
});

// user publishes
Meteor.publish('user_data', function() {
    return Meteor.users.find({}, {fields : {profile: 1, _id: 1}});
});
