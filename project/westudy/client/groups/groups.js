// helper functions to provide data to html template
Template.groups.helpers({
    //  get groups using function composition to ensure reactive live updates
    groups : function() {
        return getGroups();
    }
});

// get groups from local database sorted by creation timestamp in descending order
function getGroups() {
    return Groups.find({},{sort : {timestamp : -1}}).fetch();
}
