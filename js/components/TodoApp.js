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

function _onChange() {
    this.setState(getTodoState());
};

var TodoApp = React.createClass({
    getInitState: function() {
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
            <Header />
            <MainSection allTodos={this.state.allTodos} areAllComplete={this.state.areAllComplete} />
            <Footer allTodos={this.state.allTodos} />
        );
    }
});

module.exports = TodoApp;
