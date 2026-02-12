/* ⚠️ This file simulates a backend API for managing todos using localStorage.

      You should not need to modify this file for the basic functionality of the app,
      but feel free to enhance it with additional features or error handling as you see fit.
*/

const STORAGE_KEY = 'todos'

export interface Todo {
  userid: number
  id: number
  title: string
  completed: boolean
}

// Sample data for initialization
const SAMPLE_TODOS: Todo[] = [
  { userid: 1, id: 1, title: 'Learn React hooks', completed: false },
  { userid: 1, id: 2, title: 'Build a todo app', completed: true },
  { userid: 1, id: 3, title: 'Master TypeScript', completed: false },
  { userid: 1, id: 4, title: 'Write clean code', completed: false },
  { userid: 1, id: 5, title: 'Review pull requests', completed: true },
]

// Type guard to validate Todo objects
const isValidTodo = (obj: unknown): obj is Todo => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'userid' in obj &&
    'id' in obj &&
    'title' in obj &&
    'completed' in obj &&
    typeof (obj as Todo).userid === 'number' &&
    typeof (obj as Todo).id === 'number' &&
    typeof (obj as Todo).title === 'string' &&
    typeof (obj as Todo).completed === 'boolean'
  )
}

// Helper to simulate network delay
const simulateDelay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Helper function to get todos from localStorage with error handling
const getTodosFromStorage = (): Todo[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)

    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_TODOS))
      return [...SAMPLE_TODOS]
    }

    const parsed = JSON.parse(stored)

    // Validate that parsed data is an array of valid todos
    if (Array.isArray(parsed) && parsed.every(isValidTodo)) {
      return parsed
    }

    // If data is invalid, reset to sample data
    console.warn(
      'Invalid todo data found in localStorage, resetting to defaults',
    )
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_TODOS))
    return [...SAMPLE_TODOS]
  } catch (error) {
    console.error('Error reading from localStorage:', error)
    // Fallback to sample data if localStorage fails
    return [...SAMPLE_TODOS]
  }
}

// Helper function to save todos to localStorage with error handling
const saveTodosToStorage = (todos: Todo[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  } catch (error) {
    console.error('Error saving to localStorage:', error)
    throw new Error('Failed to save todos')
  }
}

export const fetchTodos = async (): Promise<Todo[]> => {
  await simulateDelay(300)
  return getTodosFromStorage()
}

export const createTodo = async (title: string): Promise<Todo> => {
  if (!title.trim()) {
    throw new Error('Todo title cannot be empty')
  }

  await simulateDelay(500)

  const todos = getTodosFromStorage()
  const newTodo: Todo = {
    userid: 1,
    id: Date.now(),
    title: title.trim(),
    completed: false,
  }

  const updatedTodos = [newTodo, ...todos]
  saveTodosToStorage(updatedTodos)
  return newTodo
}

export const updateTodo = async (todo: Todo): Promise<Todo> => {
  if (!isValidTodo(todo)) {
    throw new Error('Invalid todo object')
  }

  await simulateDelay(400)

  const todos = getTodosFromStorage()
  const todoIndex = todos.findIndex(t => t.id === todo.id)

  if (todoIndex === -1) {
    throw new Error('Todo not found')
  }

  const updatedTodo = { ...todo, completed: !todo.completed }
  const updatedTodos = [...todos]
  updatedTodos[todoIndex] = updatedTodo

  saveTodosToStorage(updatedTodos)
  return updatedTodo
}

export const deleteTodo = async (todoId: number): Promise<void> => {
  if (typeof todoId !== 'number' || todoId <= 0) {
    throw new Error('Invalid todo ID')
  }

  await simulateDelay(300)

  const todos = getTodosFromStorage()
  const todoExists = todos.some(todo => todo.id === todoId)

  if (!todoExists) {
    throw new Error('Todo not found')
  }

  const filteredTodos = todos.filter(todo => todo.id !== todoId)
  saveTodosToStorage(filteredTodos)
}
