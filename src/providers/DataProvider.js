import React from 'react';
import useTaskAPI from '../hooks/useTaskAPI';

const initialContext = {
  tasks: [],
  taskQueryStatus: {
    loading: false,
    error: false,
  },
  tags: [],
  tagsQueryStatus: {
    loading: false,
    error: false,
  },
  deleteTask: () => {},
  deleteTaskStatus: {
    loading: false,
    error: false,
  },
  editTask: () => {},
  editTaskStatus: {
    loading: false,
    error: false,
    data: '',
  },
  createTask: () => {},
  createTaskStatus: {
    loading: false,
    error: false,
    data: '',
  },
  createTaskWithExistingTag: () => {},
  createTaskWithExistingTagStatus: {
    loading: false,
    error: false,
    data: '',
  },
  createTag: () => {},
  createTagStatus: {
    loading: false,
    error: false,
    data: '',
  },
  authenticated: true,
};

export const DataContext = React.createContext(initialContext);

const DataProvider = ({ ...props }) => {
  const {
    tasks,
    taskQueryStatus,
    tags,
    tagsQueryStatus,
    deleteTask,
    deleteTaskStatus,
    editTask,
    editTaskStatus,
    createTaskWithExistingTag,
    createTaskWithExistingTagStatus,
    createTask,
    createTaskStatus,
    createTag,
    createTagStatus,
    authenticated,
  } = useTaskAPI();

  return (
    <DataContext.Provider
      value={
      {
        tasks,
        taskQueryStatus,
        tags,
        tagsQueryStatus,
        deleteTask,
        deleteTaskStatus,
        editTask,
        editTaskStatus,
        createTask,
        createTaskStatus,
        createTag,
        createTagStatus,
        createTaskWithExistingTag,
        createTaskWithExistingTagStatus,
        authenticated,
      }
    }
      {...props}
    />
  );
};

export default DataProvider;
