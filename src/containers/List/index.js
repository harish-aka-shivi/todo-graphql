import React, { useContext } from 'react';
import { DataContext } from '../../providers/DataProvider';
import TaskItem from '../../components/TaskItem';
import CreateTask from '../../components/CreateTask';
import styles from './list.module.css';
import Authenticate from '../Authenticate';

const List = () => {
  const { tasks, authenticated } = useContext(DataContext);

  if (!authenticated) {
    return (
      <Authenticate />
    );
  }

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <CreateTask />
        <ul className={styles.list}>
          {tasks.map(task => (
            <TaskItem task={task} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default List;
