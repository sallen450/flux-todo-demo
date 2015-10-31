var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('event').EventEmitter;
var TodoConstants = require('../constants/TodoConstants');
var assgin = require('object-assign');

var CHANGE_EVENT = 'change';

var _todos = {};

/*
 * Create a Todo item
 */
function create(text) {

    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    _todos[id]  = {
        id: id,
        text: text,
        complete: false,
    };
}

/*
 * Update all
 */
function updateAll(updates) {
  for (var id in _todos) {
    update(id, updates);
  }
}

/*
 * Update a todo item
 */
function update(id, updates) {
    _todos[id] = assgin({}, _todos[id], updates);
}

/*
 * Delete a todo item
 */
function destroy(id) {
    delete _todos[id];
}

/*
 * Delete all completed todo item
 */
function destroyCompleted() {
    for (var id in _todos) {
        if (_todos[id].complete) {
            destroy(id);
        }
    }
}


var TodoStore = assgin({}, EventEmitter.prototype, {
    /*
     * Test whether all the todo item are completed
     */
    areAllComplete: function() {
        for (var id in _todos) {
            if (_todos[id].complete === false) {
                return false;
            }
        }

        return true;
    },

    /*
     * Get all items
     */
    getAll: function() {
        return _todos;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeEventListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeEventListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
    var text;

    switch (action.actionType) {
        case TodoConstants.TODO_CREATE:
            text = action.text.trim();
            if (text != '') {
                create(text);
                TodoStore.emitChange();
            }
            break;

        case TodoConstants.TODO_TOGGLE_COMPLETE_ALL:
            if (TodoStore.areAllComplete()) {
                updateAll({complete: false})
            } else {
                updateAll({complete: true})
            }
            TodoStore.emitChange();
            break;

        case TodoConstants.TODO_UNDO_COMPLETE:
            update(action.id, {complete: false});
            TodoStore.emitChange();
            break;
        case TodoConstants.TODO_COMPLETE:
            update(action.id, {complete: true});
            TodoStore.emitChange();
            break;
        case TodoConstants.TODO_UPDATE_TEXT:
            text = action.text.trim();
            if (text !== '') {
                update(action.id, {text: text});
                TodoStore.emitChange();
            }
            break;
        case TodoConstants.TODO_DESTROY:
            destroy(action.id);
            TodoStore.emitChange();
            break;
        case TodoConstants.TODO_DESTROY_COMPLETED:
            destroyCompleted();
            TodoStore.emitChange();
            break;
        default:

    }
});

module.exports = TodoStore;
