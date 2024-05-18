import React, { useState } from 'react';
import './App.css';

interface Todo {
  id: number;
  text: string;
}

function App(): JSX.Element {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleInputChange = (event:any): void => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = (): void => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: inputValue }]);
      setInputValue('');
    }
  };

  const handleDeleteTodo = (index: number): void => {
    const updatedTodos: Todo[] = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const handleDeleteAll = () => {
    setTodos([]);
  };

  const handleEditTodo = (index: number): void => {
    setInputValue(todos[index].text);
    setEditingIndex(index);
  };

  const handleUpdateTodo = (): void => {
    if (inputValue.trim() !== '') {
      const updatedTodos: Todo[] = [...todos];
      updatedTodos[editingIndex as number].text = inputValue;
      setTodos(updatedTodos);
      setInputValue('');
      setEditingIndex(null);
    }
  };

  return (
    <div className="app">
      <h1>Todo App</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Add Todo"
          value={inputValue}
          onChange={handleInputChange}
        />
        {editingIndex !== null ? (
          <button onClick={handleUpdateTodo}>Update</button>
        ) : (
          <button onClick={handleAddTodo}>Add</button>
        )}
      </div>
      <div className="todo-list">
        {todos.map((todo, index) => (
          <div key={todo.id} className="todo-item">
            <span>{todo.text}</span>
            <div className="button-container">
              <button onClick={() => handleEditTodo(index)}>Edit</button>
              <button onClick={() => handleDeleteTodo(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleDeleteAll} className="delete-all-btn">Delete All</button>
    </div>
  );
}

export default App;
