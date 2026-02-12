import { type Todo } from './api/todos'

interface TodoListProps {
  todos: Todo[]
  loading: boolean
  selectedTodo: Todo | null
  newTodoTitle: string
  setNewTodoTitle: (title: string) => void
  onAddTodo: () => void
  onSelectTodo: (todo: Todo) => void
  onToggleTodo: (todo: Todo) => void
  onDeleteTodo: (todo: Todo) => void
}

export function TodoList({
  todos,
  loading,
  selectedTodo,
  newTodoTitle,
  setNewTodoTitle,
  onAddTodo,
  onSelectTodo,
  onToggleTodo,
  onDeleteTodo
}: TodoListProps) {
  return (
    <div className="max-w-2xl mx-auto p-6  min-h-screen">
      <h1 className="text-4xl font-bold text-center text-purple-400 mb-8">
        🎯 My Awesome Todo List 🎯
      </h1>

      {/* Add Todo Section */}
      <div className="bg-slate-800 border border-slate-700 p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-semibold text-slate-300 mb-4">➕ Add New Todo</h2>
        <div className="flex gap-3">
          <input
            type="text"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            placeholder="Enter your amazing todo here..."
            className="flex-1 p-3 border-2 border-slate-600 bg-slate-700 text-white rounded-lg focus:border-purple-500 outline-none placeholder-slate-400"
            disabled={loading}
          />
          <button
            onClick={onAddTodo}
            disabled={loading}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 font-semibold"
          >
            {loading ? '⏳ Adding...' : '🚀 Add Todo'}
          </button>
        </div>
      </div>

      {selectedTodo && (
        <div className="bg-yellow-900 bg-opacity-30 border-2 border-yellow-600 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-yellow-400">🎯 Currently Selected Todo:</h3>
          <p className="text-yellow-300">"{selectedTodo.title}" - {selectedTodo.completed ? 'Completed ✅' : 'Pending ⏳'}</p>
        </div>
      )}

      {/* Todo List */}
      <div className="bg-slate-800 border border-slate-700 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-slate-300 mb-4 flex items-center justify-between gap-3">
          <span>
            📝 Your Todos ({todos.length} items)
          </span>
          {loading && <div className="text-lg animate-spin">✅</div>}
        </h2>

        {todos.length === 0 ? (
          <div className="text-center text-slate-400 py-8">
            <div className="text-6xl mb-4">😴</div>
            <p className="text-xl">No todos yet! Add one above to get started!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {todos.map(todo => (
              <div
                key={todo.id}
                onClick={() => onSelectTodo(todo)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${todo.completed
                  ? 'bg-green-900 bg-opacity-30 border-green-600'
                  : 'bg-slate-700 border-slate-600'
                  } ${selectedTodo?.id === todo.id ? 'ring-4 ring-purple-500 transform scale-105' : ''
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onToggleTodo(todo)
                      }}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${todo.completed
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-slate-500 hover:border-green-400'
                        }`}
                    >
                      {todo.completed && '✓'}
                    </button>
                    <span
                      className={`flex-1 ${todo.completed
                        ? 'line-through text-slate-400'
                        : 'text-slate-200'
                        }`}
                    >
                      {todo.title}
                    </span>
                    <span className="text-xs text-slate-400 bg-slate-600 px-2 py-1 rounded">
                      ID: {todo.id}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteTodo(todo)
                    }}
                    className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm font-medium"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}