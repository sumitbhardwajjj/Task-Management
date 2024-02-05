import React, { useEffect, useState, useCallback} from 'react';
import axios from 'axios';
import TaskDataGrid from '../dataTable/DataTable';
import "./Home.css"
import {useNavigate} from "react-router-dom"

const Home = () => {

  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);

  const [newTask, setNewTask] = useState({ title: '', desc: '', dueDate: '' });
  const [editingTaskId, setEditingTaskId] = useState(null);

  const apiUrl = 'https://tasks-api-vwnm.onrender.com/task';
  const token = localStorage.getItem('token');

  const createTask = async () => {
    try {
      const res = await axios.post(apiUrl, newTask, { headers: { Authorization: `Bearer ${token}` } });
      setTasks([...tasks, res.data]);
      setNewTask({ title: '', desc: '', dueDate: '' });
    } catch (err) {
      console.error(err);
    }
  };

  const getTask =  useCallback(async () => {
    try {
      const res = await axios.get(apiUrl, { headers: { Authorization: `Bearer ${token}` } });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  },[token]);

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.log(err);
    }
  };


  const editTask = (id) => {
    setEditingTaskId(id);
    const editingTask = tasks.find((task) => task._id === id);
    setNewTask({ title: editingTask.title, desc: editingTask.desc, dueDate: editingTask.dueDate });
  };

  const saveEditedTask = async () => {
    try {
      await axios.put(`${apiUrl}/${editingTaskId}`, newTask, { headers: { Authorization: `Bearer ${token}` } });
      setTasks((prevTasks) => prevTasks.map((task) => (task._id === editingTaskId ? { ...task, ...newTask } : task)));
      setNewTask({ title: '', desc: '', dueDate: '' });
      setEditingTaskId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editingTaskId ? saveEditedTask() : createTask();
  };

  const Logout = () =>{
    try{
      localStorage.removeItem('token')
      navigate('/')
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    getTask();
  },[getTask]);


  return (
    <div className='container'>
      <div className='log'>
        <button onClick={Logout}>logout</button>
      </div>
      <form className='task-form' onSubmit={handleSubmit}>
        <div className='task-head'>
          <div className='task-input'>
            <label>Title</label>
            <input
              name="title"
              type="text"
              value={newTask.title}
              onChange={handleChange}
              required={true}
            />
          </div>
          <div className='task-input'>
            <label>Due-Date</label>
            <input
              name="dueDate"
              type="date"
              value={newTask.dueDate}
              onChange={handleChange}
              required={true}
            />
          </div>
        </div>
        <div className='task-input'>
          <label>Description</label>
          <input
            name="desc"
            type="text"
            value={newTask.desc}
            onChange={handleChange}
            required={true}
          />
        </div>
        <button className='task-button' type="submit">
          {editingTaskId ? 'Save Changes' : 'Add Task'}
        </button>
      </form>
      <TaskDataGrid tasks={tasks} editTask={editTask} deleteTask={deleteTask} />
    </div>
  );
};

export default Home;
