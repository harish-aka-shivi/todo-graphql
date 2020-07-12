import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../../providers/DataProvider';
import styles from './taskItem.module.css';

const TaskItem = ({ task }) => {
  const { editTask, editTaskStatus: { data }, deleteTask } = useContext(DataContext);
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(task.title);

  useEffect(() => {
    if (data) {
      setTitle(data.update_tasks_by_pk.title);
      setEditMode(false);
    }
  }, [data]);

  return (
    <li className={styles.root}>
      {!editMode ? (
        <>
          <p>
            {task.title}
          </p>
          <div className={styles.buttonContainer}>
            <button type="button" onClick={() => setEditMode(true)}>Edit</button>
            <button type="button" onClick={() => { deleteTask({ variables: { id: task.id } }); }}>Delete</button>
          </div>
        </>
      ) : (
        <form className={styles.root}>
          <input className={styles.input} type="input" value={title} disabled={!editMode} onChange={e => setTitle(e.target.value)} />
          <input
            type="button"
            value="Done"
            onClick={() => {
              if (!title) {
                return;
              }
              editTask({
                variables: {
                  id: task.id,
                  title,
                },
              });
            }}
          />
        </form>
      )}
    </li>
  );
};

export default TaskItem;
