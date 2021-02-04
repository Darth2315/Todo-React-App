import React, {Component} from 'react';
import TodoList from '../todo-list';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import ItemStatusFilter from '../item-status-filter';

import './app.css';

export default class App extends Component {

    state = {
        todoData: [
            {label: 'drink coffee', important: false, id: 'a1'},
            {label: 'learn react', important: true, id: 'a2'},
            {label: 'read a book', important: false, id: 'a3'}
        ]
    }

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const inx = todoData.findIndex(el => el.id === id);
            
            // const newArray = [
            //     ...todoData.slice(0, inx),
            //     ...todoData.slice(inx + 1)
            // ]
            
            const newArray = todoData.filter((elem, i) => i !== inx);
            return {
                todoData: newArray
            }
        })
    }

    render() {
        return (
            <div className="todo-app">
                <AppHeader toDo={1} done={2}/>
                <div className="top-panel d-flex">
                <SearchPanel/>
                <ItemStatusFilter/>
                </div>
                <TodoList todos={this.state.todoData}
                onDeleted={this.deleteItem}/>
            </div>
        )
    }
}