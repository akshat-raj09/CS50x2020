// define databasees
Groups = new Mongo.Collection('groups');
Posts = new Mongo.Collection('posts');

// specify allowed operations for groups collection
Groups.allow({
    insert: function (userId, doc) {
        return true;
    },
    update: function (userId, doc, fieldNames, modifier) {
        return true;
    },
    remove: function (userId, doc) {

        if (doc.members[0] == userId) {
            return true;
        }
        else {
            return false;
        }
    }

});

// specify allowed operations for posts collection
Posts.allow({
    insert: function (userId, doc) {
        return true;
    },
    update: function (userId, doc, fieldNames, modifier) {
        return true;
    },
    remove: function (userId, doc) {

        if (doc.author == userId) {
            return true;
        }
        else {
            return false;
        }
    }

});
