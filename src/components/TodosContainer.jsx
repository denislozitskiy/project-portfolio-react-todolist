import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Todo from './Todo.jsx'
import { theme } from '../App.js'

//========================== Styled Components
const Container = styled.div`
    max-height: ${props => props.todoHeight === null ?
    "auto" : props.todoHeight * props.todosAtScreen + "px"};
    overflow-y: ${props => props.filteredItems.length > props.todosAtScreen ? 
    "scroll" : "none"};

    &::-webkit-scrollbar {
        width: 0.25em;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.btnBgColor};
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: ${props => props.theme.activeBtnBorderColor};
    }
`;

//============================ Class Component
export class TodosContainer extends Component {
    
    //============================ PropTypes
    static propTypes = {
        activeFilterBtn: PropTypes.string.isRequired,
        todos: PropTypes.array.isRequired,
        toggleComplete: PropTypes.func.isRequired,
        deleteTodo: PropTypes.func.isRequired,
    }

    //============================ State
    state = {
        todoHeight: null,
        todosAtScreen: null
    }

    //========================== LifeCycles
    
    /**
        * Motivation to use sessionStorage is saving todosAtScreen. Otherwise when changing router page and going back to main app page you have all todos rendered at ones.  
    */

    // DidMount
    componentDidMount() { 
        sessionStorage.getItem('todosAtScreen') && this.setState({
            todosAtScreen: sessionStorage.getItem('todosAtScreen')
        });
    }
    
    // DidUpdate
    componentDidUpdate() {
        sessionStorage.getItem('todosAtScreen') !== this.state.todosAtScreen && sessionStorage.setItem('todosAtScreen', this.state.todosAtScreen);
    }

    //============================ Custom functions

    /**
        * Sets state.
        *
        * @param {number} height Height of todo.
    */
    getTodoHeight = (height) => {
        if (this.state.todoHeight < height)
        this.setState({
            todoHeight: height,
            todosAtScreen: Math.floor((window.innerHeight * 0.80) / (height * 1.5 )) // Calculates number of todos that will appear at the same time depend on screen size.
        });
     
    }
    
    //============================ Render
    render() {
        // Destruction
        const { todos, activeFilterBtn } = this.props;
        
        let filteredItems = [];
        
        //============================ Filter Module
        switch(activeFilterBtn) {
            case "All": 
                filteredItems = todos;
                break;
            case "Active":
                filteredItems = todos.filter(todo => !todo.completed);
                break;
            case "Completed":
                filteredItems = todos.filter(todo => todo.completed);
                break;
            default:
                filteredItems = todos;
        }

        //============================ Return
        return (
            <Container
                todoHeight={this.state.todoHeight}
                todosAtScreen={this.state.todosAtScreen}
                filteredItems={filteredItems}
                theme={theme}
            >
                {filteredItems.map((todo) => (
                    <Todo 
                        key={todo.id}
                        todo={todo}
                        getTodoHeight={this.getTodoHeight}
                        toggleComplete={this.props.toggleComplete}
                        deleteTodo={this.props.deleteTodo}
                    />
                ))}
            </Container>   
        )
    }
}

//============================ Exports
export default TodosContainer;