var React = require('react');
var ReactPropTypes = React.propTypes
var TodoActions = require('../actions/TodoActions');
var TotoTextInput = require('./TodoTextInput');

var classNames = require('classnames');

var TodoItem = React.createClass({
    propTypes: {
        todo: ReactPropTypes.object.isRequired,
    },

    getInitState: function() {
        return {
            isEditing: false,
        }
    },

    render: function() {
        var todo = this.props.todo;

        var input;
        if (this.state.isEditing) {
            input =
                <TodoTextInput
                    className='edit'
                    onSave={this._save}
                    value={todo.text}
                />;
        }

        return (
            <li
                className={classNames({
                    'completed': todo.complete,
                    'editing': this.state.isEditing,
                })}
                key={todo.id}>
                <div className='view'>
                    <input
                        className='toggle'
                        type='checkbox'
                        checked={todo.complete}
                        onChange={this._onToggleComplete}
                    />
                    <label onDoubleClick={this._onDoubleClick}>
                        {todo.text}
                    </label>
                </div>
                {input}
            </li>
        );
    },

    _onToggleComplete: function() {
        TodoActions.toggleComplete(this.props.todo);
    },

    _onDoubleClick: function() {
        this.setState({isEditing: true});
    },

    _onSave: function() {
        TodoActions.updateText(this.props.todo.id, text);
        this.setState({isEditing: false});
    },

    _onDistroyClick: function() {
        TodoActions.destroy(this.props.todo.id);
    },
});

module.exports = TodoItem;
