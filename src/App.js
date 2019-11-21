import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import styled from 'styled-components'
import About from './components/pages/About.jsx'
import Menu from './components/Menu.jsx'
import TodosContainer from './components/TodosContainer.jsx'
import NewTodo from './components/NewTodo.jsx'
import Filter from './components/Filter.jsx'

//========================== Theme
const theme = {
  bgColor: "#EEDEFF",
  containerBgColor: "#E2D3F2",
  btnBgColor: "#D1CAE8",
  activeBtnBorderColor: "#9D91C9",
  todoDoneColor: "#639B5F",
}

//========================== Styled Components
const Container = styled.div`
  font-family: "Raleway", "sans-serif";
  font-display: swap;
  background-color: ${props => props.theme.containerBgColor};
  overflow: hidden;
  width: 90%;
  padding: 1em;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (min-width: 768px) {
    width: 500px;
  }
`;

//========================== Class Component
class App extends Component {
  
  //========================== State
  state = { 
      todos: [],
      activeFilterBtn: "All"
   }
  
  //========================== LifeCycles
  
  // DidMount
   componentDidMount() { 
    document.body.style.background = "#EEDEFF";
  }
  
  // WillUnmount
  componentWillUnmount() {
    document.body.style.backgroundColor = null;
  }

  //========================== Custom Functions

  /**
    * Sets state.
    *
    * @param {string} filterType Type of new active filter button.
  */
  setActiveFilter = (filterType) => {
    this.setState({ activeFilterBtn: filterType });
  }

  /**
    * Creates new todo.
    *
    * @param {string} title Title of new todo that was given via form.
  */
  addTodo = (title) => {
    const newTodo = {
      id: Math.random().toString(36).substr(2, 9), // Creates random id: 9 symbols(letters & numbers).
      title,
      completed: false
    }

    this.setState({ todos: [newTodo, ...this.state.todos] });
    this.state.todos.length <= 1 && this.setState({ activeFilterBtn: "All" }); // If one or less todos left, starts to show any todos.
  }

  /**
    * Changes status of todo.
    *
    * @param {string} id ID of clicked todo.
  */
  toggleComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      todo.id === id && (todo.completed = !todo.completed);
      return todo;    
    }) });
  }

  /**
    * Deletes todo.
    *
    * @param {string} id ID of clicked todo.
  */
  deleteTodo = (id) => {
    this.setState({ todos: [...this.state.todos
      .filter(todo => todo.id !== id)] });

    this.state.todos.length === 2 && this.setState({ activeFilterBtn: "All" }); // If two todos left, starts to show any todos.
  }

  //========================== Render
  render() { 
    return ( 
      <Router>  
          <Menu />   
          <Route exact path="/" render={props => (
            <Container theme={theme}>
              <NewTodo 
                addTodo={this.addTodo}
                numberOfTodos={this.state.todos.length}
              />
              {this.state.todos.length > 1 ?
                <Filter
                  setActiveFilter={this.setActiveFilter}
                  activeFilterBtn={this.state.activeFilterBtn}
                  numberOfTodosLeft={this.state.todos
                    .filter(todo => !todo.completed).length} 
                /> : null // Won't render component if amount of todos less than 2, because there won't be anything to filter.
              }
              <TodosContainer 
                todos={this.state.todos}
                activeFilterBtn={this.state.activeFilterBtn}
                toggleComplete={this.toggleComplete}
                deleteTodo={this.deleteTodo}
              />
            </Container>
          )}/>
          <Route path="/about" component={About} />
      </Router>
    );
  }
}

//========================== Exports
export { theme }; // Used everywhere but About.jsx. 
export { Container }; // Used in About.jsx.
export default App;