
import React, {Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
// import { toggleTodo, receiveTodos } from '../actions'
import * as actions from '../actions'
import {getVisibleTodos} from '../reducers'
import TodoList from '../components/TodoList'
import { fetchTodos } from '../api'

// moved to the todo reducer###
// const getVisibleTodos = (todos, filter) => {
//   switch (filter) {
//     case 'all':
//       return todos
//     case 'completed':
//       return todos.filter(t => t.completed)
//     case 'active':
//       return todos.filter(t => !t.completed)
//     default:
//       throw new Error('Unknown filter: ' + filter)
//   }
// }

class VisibleTodoList extends Component {
  componentDidMount() {
    this.fetchData()
  }
  componentDidUpdate(prevProps) {
    if(this.props.filter !== prevProps.filter){
      this.fetchData()   
    }
  }
  fetchData() {
    const { filter, fetchTodos } = this.props
    fetchTodos(filter)
    // .then(todos => {
    //   console.log(this.props.filter, todos)
    //   receiveTodos(filter, todos)
    // })
  }
  render() {
    const { toggleTodo, ...rest } = this.props
    return <TodoList 
            {...rest}
            onTodoClick={toggleTodo}
            />
  }
}

const mapStateToProps = (state, { params }) => {
  const filter = params.filter || 'all'
  return {
    todos: getVisibleTodos(state, filter), filter
  }
}


// often this method is not needed as the args of mapDispatchToProps is the 
// same as the method to dispatch, we can pass this method straight into the connect 
// function in short hand 
// const mapDispatchToProps =  ({
//   onTodoClick: toggleTodo
// })

VisibleTodoList = withRouter(connect(
  mapStateToProps,
  actions
)(VisibleTodoList))

export default VisibleTodoList
