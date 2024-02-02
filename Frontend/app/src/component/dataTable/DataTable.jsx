import React from 'react';
import "./DataTable.css"
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditIcon from '@mui/icons-material/Edit';

const TaskDataGrid = ({ tasks, editTask, deleteTask }) => {


  const columns = [
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'desc', headerName: 'Description', flex: 1 },
    { field: 'dueDate', headerName: 'Due Date', flex: 1 },
    {
      field: 'action',
      headerName: 'Action',
      width: 80,
      renderCell: (params) => {
        const task = tasks.find((t) => t._id === params.row.id);
        return (
          <div className='CellAction'>
            <div className='viewbutton'>
              <EditIcon className='editIcon' onClick={() => editTask(task._id)} />
            </div>
            <div className='deletebutton'>
              <DeleteOutlineOutlinedIcon className='deleteIcon' onClick={() => deleteTask(task._id)} />
            </div>
          </div>
        );
      },
    },
  ];



  const rows = tasks.map((task) => ({
    id: task._id,
    title: task.title,
    desc: task.desc,
    dueDate: task.dueDate,
    key:task._id
  }));

  return (
    <div className='data-table'>
      <DataGrid style={{fontSize:16,fontWeight:600}} rows={rows} columns={columns}  />
    </div>
  );
};

export default TaskDataGrid;
