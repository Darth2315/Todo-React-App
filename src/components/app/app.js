import React from 'react';
import TodoList from '../todo-list';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import ItemStatusFilter from '../item-status-filter';

import './app.css';

const App = () => {

    const todoData = [
        {label: 'drink coffee', important: false, id: 'a1'},
        {label: 'learn react', important: true, id: 'a2'},
        {label: 'read a book', important: false, id: 'a3'}
    ];

    return (
        <div className="todo-app">
            <AppHeader/>
            <div className="top-panel d-flex">
            <SearchPanel/>
            <ItemStatusFilter/>
            </div>
            <TodoList todos={todoData}/>
        </div>
    )
}

export default App;