import React, { useState, useEffect } from "react";
import { MdDelete, MdEdit, MdConfirmationNumber } from "react-icons/md";
import axios from "axios";
import { format } from "date-fns";

// internal imports

const index = () => {
  const [editText, seteditText] = useState();
  const [todos, setTodos] = useState([]);
  const [todosCopy, setTodosCopy] = useState(todos);
  const [todoInput, setTodoInput] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // state management
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");
  const [searchItem, setSearchItem] = useState(search);

  // functionality
  useEffect(() => {
    // fetchTodos
  }, [count]);

  const editTodo = (index) => {
    setTodoInput(todos[index].title);
    setEditIndex(index);
  };

  const fetchTodos = async () => {
    try {
      const response = await axios.get("https://127.0.0.1:8080/todos");
      setTodos(response.data);
      setTodosCopy(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = async () => {
    try {
      if (editIndex === -1) {
        // add new to do
        const response = await axios.get("https://127.0.0.1:8080/todos", {
          title: todoInput,
          completed: false,
        });
        setTodos(response.data);
        setTodosCopy(response.data);
        setTodoInput("");
      } else {
        // update existing todo
        const todoToUpdate = { ...todos[editIndex], title: todoInput };
        const response = await axios.put(
          `https://127.0.0.1:8080/todos/${todoToUpdate.id}`,
          {
            todoToUpdate,
          }
        );
        console.log(response);
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = response.data;
        setTodos(updatedTodos);
        setTodoInput("");
        setEditIndex(-1);
        setCount(count + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(`https://127.0.0.1:8080/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const toggleCompleted = async (index) => {
    try {
      const todoToUpdate = {
        ...todos[index],
        completed: !todos[index].completed,
      };
      const response = await axios.delete(
        `https://127.0.0.1:8080/todos/${todoToUpdate.id}`
      );
      const updatedTodos = [...todos];
      updatedTodos[index] = response.data;
      setTodos(updatedTodos);
      setCount(count + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const searchTodo = () => {
    const results = todos.filter((todo) =>
      todo.title.toLowerCase().includes(searchInput.toLowerCase())
    );

    setSearchResults(results);
  };

  const formatDate = (dateString) => {
    try {
      const data = new Date(dateString);
      return isNaN(date.getTime())
        ? "Invalid Date"
        : format(date, "dd/MM/yyyy HH:mm:ss");
    } catch (error) {
      console.log(error);
    }
  };

  return <div>index</div>;
};

export default index;
