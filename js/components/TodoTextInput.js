var React = require('react');
var ReactPropTypes = React.propTypes;

var ENTER_KEY_CODE = 13;

var TodoTextInput = React.createClass({
    propTypes: {
        className: ReactPropTypes.string,
        id: ReactPropTypes.string,
        placeholder: ReactPropTypes.string,
        onSave: ReactPropTypes.func.isRequired,
        value: ReactPropTypes.string,
    },

    getInitState: function() {
        return {
            value: this.props.value || '',
        }
    },

    _save: function() {
        this.proos.onSave(this.state.value);
        this.setState({
            value: '',
        });
    },

    _onChange: function(event) {
        this.setState({
            value: event.target.value,
        })
    },

    _onKeyDown: function(event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            this._save();
        }
    },

    render: function() {
        return ({
            <input
                className = this.props.className,
                id = this.props.id,
                value = this.state.value,
                placeholder = this.props.placeholder,
                autuFocus = {true},
                onBlur: this._save,
                onChange: this._onChange,
                onKeyDown: this._onKeyDown,
            />
        });
    },
});

module.exports = TodoTextInput;