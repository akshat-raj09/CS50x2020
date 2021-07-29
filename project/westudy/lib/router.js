// Router Configuration

// set default layout template that applies to all templates
Router.configure({
    layoutTemplate: 'layout'
});

// specify which routes need to be secured against unauthorized access
Router.onBeforeAction(security_check, {
  only: ['home', 'account', 'groups', 'groups_create', 'groups_view', 'forums', 'forums_tag', 'forums_create', 'forums_view']
});

// prevents not logged in users from visiting certain paths
function security_check() {
    if (Meteor.userId()) {
        this.next();
    }
    else {
        Router.go('login');
    }
}

// ROUTES BELOW

// home route
Router.route('/', {
    name: 'home',
    template: 'home',
    data: function() {
        return {title: "WeStudy"};
    },
    waitOn : function() {
        return [Meteor.subscribe('user_groups'), Meteor.subscribe('user_posts'),
            Meteor.subscribe('user_data')];
    }
});


// about routes
Router.route('/about', {
    name: 'about',
    template: 'about',
    data: function() {
        return {title: "About"};
    }
});

Router.route('/about/documentation', {
    name: 'about_documentation',
    template: 'documentation',
    data: function() {
        return {title: "Documentation"};
    }
});

Router.route('/about/design', {
    name: 'about_design',
    template: 'design',
    data: function() {
        return {title: "Design"};
    }
});

// acount page route
Router.route('/account', {
    name: 'account',
    template: 'account',
    data: function() {
        return {title: "Account"};
    }
});

Router.route('/forums', {
    name: 'forums',
    template: 'forums',
    waitOn : function() {
        return [Meteor.subscribe('posts'), Meteor.subscribe('user_data')];
    },
    data: function(){
        return {title: "Forums"};

    }
});

// forums routes
Router.route('/forums/create', {
    name: 'forums_create',
    template: 'forums_create',
    data: function() {
        return {title: "New Post"};
    }
});

Router.route('/forums/tag/:tag', {
    name: 'forums_tag',
    template: 'forums_tag',
    waitOn : function() {
        return [Meteor.subscribe('tagged_posts', this.params.tag), Meteor.subscribe('user_data')];
    },
    data: function() {
        return {title: "Tag Search", tag: this.params.tag};
    }
});

Router.route('/forums/view/:post_id', {
    name: 'forums_view',
    template: 'forums_view',
    waitOn : function() {
        return [Meteor.subscribe('post', this.params.post_id), Meteor.subscribe('user_data')];
    },
    data: function() {
        return {title: "View Post"};
    }
});

// groups routes
Router.route('/groups', {
    name: 'groups',
    template: 'groups',
    waitOn : function() {
        return Meteor.subscribe('groups');
    }
});

Router.route('/groups/create', {
    name: 'groups_create',
    template: 'groups_create',
    data: function() {
        return {title: "New Group"};
    }
});

Router.route('/groups/view/:group_id', {
    name: 'groups_view',
    template: 'groups_view',
    waitOn : function() {
        return Meteor.subscribe('group',this.params.group_id);
    },
    data: function() {
        return {title: "Group Details"};
    }
});

// login page route
Router.route('/login', {
    name: 'login',
    template: 'login',
    data: function() {
        return {title: "Login"};
    }
});

// not found route
Router.route('/notfound', {
    name: 'notfound',
    template: 'notfound',
    data: function() {
        return {title: "Page Not Found"};
    }
});

// register page route
Router.route('/register', {
    name: 'register',
    template: 'register',
    data: function() {
        return {title: "Register"};
    }
});

// catch-all route for everything else: renders notfound
Router.route('/(.*)', {
    action: function() {
        this.render('notfound');
    }
});
