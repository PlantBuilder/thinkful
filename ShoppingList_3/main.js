/**
 * Created by jim on 12/08/13.
 * // for Net Tuts Backbone tutorial
 * Question 1: what would be the model for a Shopping List app?
 * Answer: a single item
 */

(function() {

window.App = {
    Models: {},
    Collections: {},
    Views: {}
};

window.template = function(id) {
    // use mustache rather than ERB
    _.templateSettings = {
        interpolate: /\{\{([\s\S]+?)\}\}/g
    };
    return  _.template( $('#' + id).html() );
};

    App.Models.Task = Backbone.Model.extend({
        validate: function(attrs) {
            if( ! $.trim(attrs.title)) {
                return 'Empty Task!';
            }
        }
    });

    App.Collections.Tasks = Backbone.Collection.extend({
    model: App.Models.Task
    });

    App.Views.Tasks = Backbone.View.extend({
        tagName: "ul class='list-unstyled'",

        render: function() {
            this.collection.each(this.addOne, this);
            return this;
        },

        addOne: function(task) {
            // create a new child view
            var taskView = new App.Views.Task( {model: task} );
            // append it to root element
            this.$el.append(taskView.render().el);
        }
    });

    App.Views.Task = Backbone.View.extend({
        tagName: "li class='list-group-item'",

        template: template('taskTemplate'),

        initialize: function() {
            this.model.on('change', this.render, this);
            this.model.on('destroy', this.remove, this);
        },

        events: {
            'click .edit': 'editTask',
            'click .delete': 'destroy'
        },

        editTask: function() {
            var newTaskTitle = prompt('What would you like to change text to?', this.model.get('title'));
            this.model.set('title', newTaskTitle, {validate: true});  // must intentionally call to validate
        },

        destroy: function() {
            this.model.destroy();
        },

        remove: function() {
            this.$el.remove();
        },

        render: function() {
            var template = this.template(this.model.toJSON());
            this.$el.html( template );
            return this;
        }

    });

    App.Views.AddTask = Backbone.View.extend({

    });

    var tasks = new App.Collections.Tasks([
        {
        title: 'Milk',
        priority: 3
        },
        {
            title: 'Eggs',
            priority: 4
        },
        {
            title: 'Cheese',
            priority: 5
        }
    ]);

    var tasksView = new App.Views.Tasks( {collection: tasks} );
//    console.log(tasksView.el);
    $('.tasks').html(tasksView.render().el)
})();
