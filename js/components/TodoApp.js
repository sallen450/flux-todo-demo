var Footer = require('./Footer');
var Header = require('./Header');
var MainSection = require('./MainSection');
var React = require('react');
var TodoStore = require('../stores/TodoStore');

/*
 * retrieve data from TodoStore
 */

 function getTodoState() {
     return {
         allTodos: TodoStore.getAll(),
         areAllComplete: TodoStore.areAllComplete(),
     }
 }

var TodoApp = React.createClass({
    _onChange: function() {
        this.setState(getTodoState());
    },

    getInitialState: function() {
        return getTodoState();
    },

    componentDidMount: function() {
        TodoStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        TodoStore.removeChangeListener(this._onChange);
    },

    render: function() {

        return (
            <div>
                <Header />
                <MainSection allTodos={this.state.allTodos} areAllComplete={this.state.areAllComplete} />
                <Footer allTodos={this.state.allTodos} />
            </div>
        );
    }
});

module.exports = TodoApp;
