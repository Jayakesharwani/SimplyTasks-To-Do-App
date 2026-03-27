import {Component} from 'react'
import './index.css'

class TodoItem extends Component {
  constructor(props) {
    super(props)

    const {todoDetails} = props

    this.state = {
      isEditing: false,
      editedTitle: todoDetails.title,
    }
  }

  onClickEdit = () => {
    this.setState({isEditing: true})
  }

  onChangeInput = event => {
    this.setState({editedTitle: event.target.value})
  }

  onSave = () => {
    const {editedTitle} = this.state
    const {todoDetails, updateTodo} = this.props

    if (editedTitle.trim() === '') return

    updateTodo(todoDetails.id, editedTitle)
    this.setState({isEditing: false})
  }

  onDeleteTodo = () => {
    const {deleteTodo, todoDetails} = this.props
    deleteTodo(todoDetails.id)
  }

  onToggle = () => {
    const {toggleComplete, todoDetails} = this.props
    toggleComplete(todoDetails.id)
  }

  render() {
    const {todoDetails} = this.props
    const {isEditing, editedTitle} = this.state
    const {isCompleted, title} = todoDetails

    return (
      <li className="todo-item">
        <div className="todo-left">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={this.onToggle}
          />

          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={this.onChangeInput}
              className="input"
            />
          ) : (
            <p className={`title ${isCompleted ? 'completed' : ''}`}>{title}</p>
          )}
        </div>

        {isEditing ? (
          <button type="button" onClick={this.onSave}>
            Save
          </button>
        ) : (
          <button type="button" onClick={this.onClickEdit}>
            Edit
          </button>
        )}

        <button type="button" onClick={this.onDeleteTodo}>
          Delete
        </button>
      </li>
    )
  }
}

export default TodoItem
