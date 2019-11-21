import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { theme } from '../App.js'

//========================== Styled Components
const InputText = styled.input`
    flex: 4;
    width: 100%;
    font-size: 1.5em;
    padding: 0.5em;
    border: 2px solid transparent;
    box-sizing: border-box;
    transition: all ease-in-out 0.2s;

    &:hover {
        border-bottom: 2px solid ${props => props.theme.activeBtnBorderColor};
    }
    
    &:focus {
        outline: none;
        border: 2px solid ${props => props.theme.activeBtnBorderColor};
    }
`;

const InputBtn = styled.input`
    flex: 1;
    font-family: 'Raleway', 'sans-serif';
    background-color: ${props => props.theme.btnBgColor};
    border: none;
    border-bottom: 2px solid transparent;
    transition: all ease-in-out 0.3s;

    &:hover {
        border-color: ${props => props.theme.activeBtnBorderColor};
        cursor: pointer;
    }
    &:focus {
        outline: none;
    }
`
//============================ Class Component
class NewTodo extends Component {
    
    //============================ PropTypes
    static propTypes = {
        addTodo: PropTypes.func.isRequired,
        numberOfTodos: PropTypes.number.isRequired
    }
    
    //============================ State
    state = { }

    //============================ Custom functions

    /**
        * Sets state to formInput: formInputValue. 
    */
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    /**
        * Passes title of new todo to App.js. 
    */
    onSubmit = (e) => {
        e.preventDefault();
        this.props.addTodo(this.state.title);
        e.target.reset(); // Clears form
    }

    //============================ Render
    render() { 
        return ( 
            <form 
                autoComplete="off" 
                style={{display: "flex"}} 
                onSubmit={this.onSubmit}
            >
                <InputText 
                    type="text"
                    name="title"
                    required
                    theme={theme}
                    onChange={this.onChange}
                />
                <InputBtn type="submit" value="New Todo" theme={theme}/>
            </form>
        )
    }
}
 
//============================ Exports
export default NewTodo;