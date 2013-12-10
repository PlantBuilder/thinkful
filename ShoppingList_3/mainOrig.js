/**
 * Created by jim on 12/07/13.
 * // for Net Tuts Backbone tutorial
 */

(function() {

window.App = {
    Models: {},
    Collections: {},
    Views: {}
};

window.template = function(id) {
    return  _.template( $('#' + id).html() );
};

// a single person
App.Models.Person = Backbone.Model.extend({
   defaults:{
        name: 'John',
        age: 30,
        occupation: 'worker'
   }
});

// a list (collection) of people
App.Collections.People = Backbone.Collection.extend({
    model: App.Models.Person
});

// view for collection (all people)
App.Views.People = Backbone.View.extend({
    tagName: 'ul',

    render: function() {
        // filter through all items in collection
        this.collection.each(function(person) {
        // for each, create a PersonView
        var personView = new App.Views.Person({model: person});
        // append to root element (ul)
        this.$el.append(personView.render().el);
        }, this); // sets the context
        return this;
    }
});

// the view for a person
App.Views.Person = Backbone.View.extend({
    tagName: 'li',

    template: template('personTemplate'),

    render: function() {
        this.$el.html( this.template(this.model.toJSON()) );
        return this;
    }
});



//var person = new Person   //defaults
//var personView = new PersonView({model: person});

//var person2 = new Person({name: 'Mary', age: 65})

//var peopleCollection = new PeopleCollection;
//peopleCollection.add(person);
//peopleCollection.add(person2);

var peopleCollection = new App.Collections.People([
{
    name: 'Larry',
    age:1,
    occupation:'hairdresser'
},
{
    name:'Moe',
    age:2,
    occupation: 'slapper'
},
{
    name:'Curly',
    age:3,
    occupation: 'slappee'

    }
]);

var peopleView = new App.Views.People({collection: peopleCollection});
$(document.body).append(peopleView.render().el)
console.log(App.Collections)
})();
/*
 validate: function (attrs) {
 if (attrs.age < 0) {
 return 'Really?';
 }
 if (!attrs.name) {
 return 'Give them a name.';
 }
 },

 work: function() {
 return this.get('name') + ' is wrkn.';
 }
 */