import React from 'react'
import { CreateUid } from '../../static/js/common'

class TodoList extends React.Component {
    
    constructor (props) {
        super(props)
        this.state = {
            todo: ''
        }
    }

    render () {
        const todoList = this.props.value.map( value => {
            // 判断是否编辑
            const isTodo = value.isEdit ? (
               <input type="text" onChange={ e => this.setState({ todo: e.target.value }) }  defaultValue={ value.todo } placeholder="请输入todo"/>
            ):
            (
                <span style={{ textDecoration:value.isComplete ? 'line-through' : '' }}>{ value.todo }</span>
            )
            // 判断编辑和保存
            const isEdit = value.isEdit ? (
                <button onClick={ () => { this.props.handleSave(value.uid,this.state.todo) } }>保存</button>
            ):
            (
                <button onClick={ () => { this.props.handleEdit(value.uid) } }>编辑</button>
            )
            return (
                <div className="todo flex flex-around" key={ value.uid } style={{ width:300 + 'px' }}>
                    { isTodo }
                    <button onClick={ () => { this.props.handleDelete(value.uid) } }>删除</button>
                    <button onClick={ () => { this.props.handleComplete(value.uid) } }>完成</button>
                    { isEdit }
                </div>
            )
        })
        return (
            <div className="todo-list">
                { todoList }
            </div>
        )
    }

}

class Todo extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            todoList: [],
            todo: ''
        }
    }
    // 添加todo
    AddTodo () {
        const TodoList = this.state.todoList.slice()
        if (!this.state.todo.length) {
            return
        }
        const todo = {
            uid: CreateUid(4),
            todo: this.state.todo,
            isComplete: false,
            isEdit: false
        }
        TodoList.push(todo)
        this.setState({
            todoList: TodoList,
            todo: ''
        })
    }
    // 删除
    handleDelete (uid) {
        const todoList = this.state.todoList.slice()
        const newTodoList = todoList.filter( val => val.uid !== uid )
        this.setState({
            todoList: newTodoList
        })
    }
    // 完成
    handleComplete (uid) {
        const todoList = this.state.todoList.slice()
        todoList.forEach( val => {
            if (val.uid === uid) {
                val.isComplete = true
            }
        })
        this.setState({
            todoList: todoList
        })
    }
    // 编辑
    handleEdit (uid) {
        const todoList = this.state.todoList.slice()
        const index = todoList.findIndex ( val => val.uid === uid )
        todoList[index].isEdit = true
        this.setState({
            todoList: todoList
        })
    }
    // 保存
    handleSave (uid,todo) {
        const todoList = this.state.todoList.slice()
        const index = todoList.findIndex( val => val.uid === uid )
        todoList[index].todo = todo
        todoList[index].isEdit = false
        this.setState({
            todoList: todoList
        })
    }
    render () {
        const todoList = this.state.todoList.slice()
        const hasCompleteTodoList = todoList.filter( val => val.isComplete )
        const notCompleteLength = todoList.length - hasCompleteTodoList.length
        return (
            <div>
                <h1>Todo</h1>
                <div className="input">
                    <input type="text" onChange={ e => this.setState({ todo: e.target.value }) } value={ this.state.todo } placeholder="请输入todo"/>
                    <button onClick={ () => this.AddTodo() }>添加</button>
                </div>
                <TodoList
                    value= { this.state.todoList }
                    handleDelete = { (uid) => { this.handleDelete(uid) } }
                    handleComplete = { (uid) => { this.handleComplete(uid) } }
                    handleEdit = { (uid) => { this.handleEdit(uid) } }
                    handleSave = { (uid,todo) => { this.handleSave(uid,todo) } }
                />
                <span>已完成: { hasCompleteTodoList.length }</span>
                <span>未完成: { notCompleteLength }</span>
            </div>
        )
    }
}

export default Todo