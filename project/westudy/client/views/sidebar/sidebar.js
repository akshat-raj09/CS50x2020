// actions to be performed after router brings up page
Router.onAfterAction(function() {

    // highlight proper tab
    var currentPage = Router.current().route.getName();
    var currentTab;

    if (currentPage.indexOf('_') >= 0) {
        currentTab = currentPage.substring(0, currentPage.indexOf('_'));
    }
    else {
        currentTab = currentPage;
    }


    // change active tab
    $(".active").removeClass("active");
    $("#" + currentTab).addClass("active");

    // hide/unhide things based on if user is logged in
    var loggedIn = $(".loggedIn");
    var loggedOut = $(".loggedOut");

    if (Meteor.userId() !== null) {
        loggedIn.removeClass("hidden");
        loggedOut.addClass("hidden");
    }
    else {
        loggedOut.removeClass("hidden");
        loggedIn.addClass("hidden");
    }

    // hide the sidebar if the collapse button is visible (on mobile)
    if($(".navbar-toggle").is(":visible")) {
        $('#sidebar').hide();
    }

});

Template.sidebar.events({

    // handle logouts
    'click .logout': function(event){

        Meteor.logout();

        Router.go('login');
    }

});
