import React, {Component} from 'react';
import TodoList from '../todo-list';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

    maxId = 4;

    state = {
        todoData: [
            this.createTodoItem('drink coffee'),
            this.createTodoItem('learn react'),
            this.createTodoItem('read a book')
        ],
        term: ''
    }

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            // delete with slice
            // const inx = todoData.findIndex(el => el.id === id);
            // const newArray = [
            //     ...todoData.slice(0, inx),
            //     ...todoData.slice(inx + 1)
            // ]
            
            // delete with filter
            const newArray = todoData.filter(el => el.id !== id);
            return {
                todoData: newArray
            }
        })
    }

    addItem = (text) => {
        // generate id
        const newItem = this.createTodoItem(text);
        // add item in array
        this.setState(({todoData}) => {
            const newArray = [...todoData, newItem];
            return {
                todoData: newArray
            }
        })
    }

    onToggleProps(arr, id, propName) {
        const inx = arr.findIndex(el => el.id === id);
            const oldItem = arr[inx];
            const newItem = {...oldItem, [propName]: !oldItem[propName]}

            return [
                ...arr.slice(0, inx),
                newItem,
                ...arr.slice(inx + 1)
            ]
    }

    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.onToggleProps(todoData, id, 'important')
            }
        })
    }

    onToggleDone = (id) => {
        this.setState(({todoData}) => {
           return {
               todoData: this.onToggleProps(todoData, id, 'done')
           }
        })
    }

    search(items, term) {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        })
    } toLo

    onSearch = (term) => {
        this.setState({term})
    }

    render() {

        const {todoData, term} = this.state;
        const doneCount = todoData.filter(el => el.done).length;
        const todoCount = todoData.length - doneCount;
        const visibleItems = this.search(todoData, term);

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className="top-panel d-flex">
                <SearchPanel onSearch={this.onSearch}/>
                <ItemStatusFilter/>
                </div>
                <TodoList todos={visibleItems}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}/>
                <ItemAddForm onItemAdded={this.addItem}/>
            </div>
        )
    }
}