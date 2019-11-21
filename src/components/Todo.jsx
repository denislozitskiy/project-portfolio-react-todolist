import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { theme } from '../App.js'

//========================== Styled Components
const StyledTodo = styled.div`
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    color: ${props => props.setStyles("#000")};
    padding: 0.75em 0em 0.5em 0.5em;
    margin: 0em 0.5em;
    border-bottom: 2px solid ${props => props.setStyles("#000")};
    transition: all ease-in-out 0.3s;
`;

const BtnContainer = styled.div`
    width: 30%;

    @media (min-width: 768px) {
        width: 15%;
    }
`;

const Title = styled.p`
    width: 70%;
    margin: 0em;
    padding-right: 0.5em;
    box-sizing: border-box;
    word-wrap: break-word;
`;

const Button = styled.button`
    height: 35px;
    width: 50%;
    background-color: ${props => props.theme.btnBgColor};
    border: none;
    transition: all ease-in-out 0.2s;

    &:hover {
        cursor: pointer;
    }

    &:focus {
        outline: none;
    }
`;

const DoneButton = styled(Button)`
    background-color: ${props => props.setStyles(props.theme.btnBgColor)};

    &:hover {
        background-color: ${props => props.theme.todoDoneColor};
    }
`;

//========================== Class Component
export class Todo extends Component {

    //========================== PropTypes
    static propTypes = {
        todo: PropTypes.object.isRequired,
        getTodoHeight: PropTypes.func.isRequired,
        toggleComplete: PropTypes.func.isRequired,
        deleteTodo: PropTypes.func.isRequired
    }

    //========================== LifeCycles 

    // DidMount
    componentDidMount() {
        this.props.getTodoHeight(this.styledTodo.clientHeight);
    }

    //========================== Custom Functions
    
    /**
        * Sets colors of UI depend on completion.
        *
        * @param {string} defaultColor Default HEX color of todo UI.
    */
    setStyles = (defaultColor) => {
        return (
            this.props.todo.completed ?
            theme.todoDoneColor : defaultColor
        )
    }

    //========================== Render
    render() {
        // Destruction
        const { todo, toggleComplete, deleteTodo } = this.props; 

        return (
            <StyledTodo 
                ref={styledTodo => this.styledTodo = styledTodo} 
                setStyles={this.setStyles}
            >
                <Title>{ todo.title }</Title>
                <BtnContainer>
                    <DoneButton 
                        theme={theme} 
                        setStyles={this.setStyles} 
                        onClick={toggleComplete.bind(this, todo.id)}
                    >
                        <FontAwesomeIcon icon={faCheck} />
                    </DoneButton>
                    
                    <Button 
                        theme={theme}
                        onClick={deleteTodo.bind(this, todo.id)}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </Button>
                </BtnContainer>
            </StyledTodo>
        )
    }
}

//========================== Exports
export default Todo;