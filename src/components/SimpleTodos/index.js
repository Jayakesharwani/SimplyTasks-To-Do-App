import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TodoItem from '../TodoItem'
import './index.css'

const initialTodosList = [
  {
    id: uuidv4(),
    title: 'Book the ticket for today evening',
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: 'Rent the movie for tomorrow movie night',
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: 'Confirm the slot for the yoga session tomorrow morning',
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: 'Drop the parcel at Bloomingdale',
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: 'Order fruits on Big Basket',
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: 'Fix the production issue',
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: 'Confirm my slot for Saturday Night',
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: 'Get essentials for Sunday car wash',
    isCompleted: false,
  },
]

class SimpleTodos extends Component {
  state = {
    todosList: initialTodosList,
    inputText: '',
    filter: 'ALL',
  }

  componentDidMount() {
    const savedTodos = localStorage.getItem('todosList')

    if (savedTodos) {
      const parsed = JSON.parse(savedTodos)

      const updatedTodos = parsed.map(todo => ({
        ...todo,
        isCompleted: todo.isCompleted ?? false,
      }))

      this.setState({todosList: updatedTodos})
    } else {
      this.setState({todosList: initialTodosList})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {todosList} = this.state

    if (prevState.todosList !== todosList) {
      localStorage.setItem('todosList', JSON.stringify(todosList))
    }
  }

  onChangeInput = event => {
    this.setState({inputText: event.target.value})
  }

  onAddTodo = () => {
    const {inputText} = this.state

    if (inputText.trim() === '') return

    const parts = inputText.trim().split(' ')
    const lastPart = parts[parts.length - 1]

    let newTodos = []

    if (!Number.isNaN(Number(lastPart))) {
      const count = parseInt(lastPart, 10)
      const title = parts.slice(0, -1).join(' ')

      if (title.trim() === '' || count <= 0) return

      newTodos = Array.from({length: count}, () => ({
        id: uuidv4(),
        title,
        isCompleted: false,
      }))
    } else {
      newTodos = [
        {
          id: uuidv4(),
          title: inputText,
          isCompleted: false,
        },
      ]
    }

    this.setState(prevState => ({
      todosList: [...prevState.todosList, ...newTodos],
      inputText: '',
    }))
  }

  deleteTodo = id => {
    this.setState(prevState => ({
      todosList: prevState.todosList.filter(todo => todo.id !== id),
    }))
  }

  updateTodo = (id, newTitle) => {
    this.setState(prevState => ({
      todosList: prevState.todosList.map(todo =>
        todo.id === id ? {...todo, title: newTitle} : todo,
      ),
    }))
  }

  toggleComplete = id => {
    this.setState(prevState => ({
      todosList: prevState.todosList.map(todo =>
        todo.id === id ? {...todo, isCompleted: !todo.isCompleted} : todo,
      ),
    }))
  }

  render() {
    const {todosList, inputText, filter} = this.state

    const filteredTodos = todosList.filter(todo => {
      if (filter === 'ACTIVE') return !todo.isCompleted
      if (filter === 'COMPLETED') return todo.isCompleted
      return true
    })

    return (
      <div className="app-container">
        <div className="simple-todos-container">
          <h1 className="heading">To-do List❤️</h1>

          <div className="input-container">
            <input
              type="text"
              placeholder="Enter your new task here"
              className="input"
              value={inputText}
              onChange={this.onChangeInput}
              onKeyDown={e => {
                if (e.key === 'Enter') this.onAddTodo()
              }}
            />
            <button
              type="button"
              className="add-button"
              onClick={this.onAddTodo}
            >
              Add
            </button>
          </div>

          <div className="filter-container">
            <button
              type="button"
              onClick={() => this.setState({filter: 'ALL'})}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => this.setState({filter: 'ACTIVE'})}
            >
              Active
            </button>
            <button
              type="button"
              onClick={() => this.setState({filter: 'COMPLETED'})}
            >
              Completed
            </button>
          </div>

          <ul className="todos-list">
            {filteredTodos.map(eachTodo => (
              <TodoItem
                key={eachTodo.id}
                todoDetails={eachTodo}
                deleteTodo={this.deleteTodo}
                updateTodo={this.updateTodo}
                toggleComplete={this.toggleComplete}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos
