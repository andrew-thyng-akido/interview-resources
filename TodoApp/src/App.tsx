import { useEffect, useState } from 'react'
import { type Todo, fetchTodos, createTodo, updateTodo, deleteTodo } from './api/todos'
import { TodoList } from './TodoList'

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null)
  const [newTodoTitle, setNewTodoTitle] = useState<string>('')

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const data = await fetchTodos()
        setTodos(data)
      } catch (error) {
        if (error instanceof Error) {
          setError(error)
        } else {
          setError(new Error('An unknown error occurred'))
        }
      } finally {
        setLoading(false)
      }
    }
    loadTodos()
  }, [])

  const handleAddTodo = async () => {
    if (newTodoTitle.trim() === '') {
      alert('Please enter a todo title!')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const createdTodo = await createTodo(newTodoTitle)

      const newTodo: Todo = {
        userid: 1,
        id: createdTodo.id,
        title: createdTodo.title,
        completed: createdTodo.completed,
      }

      setTodos([newTodo, ...todos])
      setNewTodoTitle('')
    } catch (error) {
      if (error instanceof Error) {
        setError(error)
      } else {
        setError(new Error('Failed to add todo'))
      }
    } finally {
      setLoading(false)
      setError(null)
    }
  }

  const handleSelectTodo = (todo: Todo) => {
    setSelectedTodo(selectedTodo?.id === todo.id ? null : todo)
  }

  const handleToggleTodo = async (todo: Todo) => {
    setLoading(true)
    setError(null)

    try {
      const updatedTodo = await updateTodo(todo)

      const updatedTodos = todos.map(t =>
        t.id === todo.id ? { ...t, ...updatedTodo } : t
      )
      setTodos(updatedTodos)

      if (selectedTodo?.id === todo.id) {
        setSelectedTodo({ ...selectedTodo, ...updatedTodo })
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error)
      } else {
        setError(new Error('Failed to update todo'))
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteTodo = async (todoToDelete: Todo) => {
    setLoading(true)
    setError(null)

    try {
      await deleteTodo(todoToDelete.id)

      const newTodos = todos.filter(todo => todo.id !== todoToDelete.id)
      setTodos(newTodos)
      setSelectedTodo(null)
    } catch (error) {
      if (error instanceof Error) {
        setError(error)
      } else {
        setError(new Error('Failed to delete todo'))
      }
    } finally {
      setLoading(false)
    }
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-900">
        <div className="text-xl text-red-400 bg-red-900 bg-opacity-30 border border-red-700 p-4 rounded">
          Oops! Something went wrong: {error.message}
        </div>
      </div>
    )
  }

  return (
    <TodoList
      todos={todos}
      loading={loading}
      selectedTodo={selectedTodo}
      newTodoTitle={newTodoTitle}
      setNewTodoTitle={setNewTodoTitle}
      onAddTodo={handleAddTodo}
      onSelectTodo={handleSelectTodo}
      onToggleTodo={handleToggleTodo}
      onDeleteTodo={handleDeleteTodo}
    />
  )
}

export default App
