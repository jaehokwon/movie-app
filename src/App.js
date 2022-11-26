import { useEffect, useState } from "react";

function App() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const onChange = (ev) => setTodo(ev.target.value);
  const onSubmit = (ev) => {
    ev.preventDefault();
    if (todo === "") {
      return;
    }
    setTodoList((current) => [todo, ...current]);
    setTodo("");
  };
  return (
    <div>
      <h1>My TO-DOs ({todoList.length})</h1>
      <form onSubmit={onSubmit}>
        <input
          value={todo}
          onChange={onChange}
          type="text"
          placeholder="Write your to do..."
        />
        <button>Add To-Do</button>
      </form>
      <hr />
      <ul>
        {todoList.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
