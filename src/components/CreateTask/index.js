import React, { useContext, useState, useEffect } from 'react';
import styles from './createTask.module.css';
import { DataContext } from '../../providers/DataProvider';
import AllTags from '../AllTags';

const CreateTask = () => {
  const [selectedTag, setSelectedTag] = useState('');
  const {
    tags,
    createTask,
    createTaskWithExistingTag,
    createTaskStatus: { data },
    createTaskWithExistingTagStatus:
    { data: dataAfterExistingTag },
  } = useContext(DataContext);

  const [textValue, setTextValue] = useState('');

  useEffect(() => {
    setTextValue('');
  }, [data, dataAfterExistingTag]);

  const handleSubmit = event => {
    event.preventDefault();
    if (!textValue) {
      return;
    }
    if (selectedTag) {
      createTaskWithExistingTag({
        variables: {
          title: textValue,
          tag_id: selectedTag.id,
        },
      });
    } else {
      createTask({
        variables: {
          title: textValue,
        },
      });
    }
  };

  const getSelectedTag = nameSelected => tags.filter(tag => tag.name === nameSelected)[0];

  const handleAllTagsTagClicked = event => {
    event.preventDefault();
    setSelectedTag(getSelectedTag(event.target.value));
  };

  const handleSelectedTag = () => {
    setSelectedTag('');
  };

  const handleChange = event => {
    setTextValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <form className={styles.formRoot} onSubmit={handleSubmit}>
        <input className={styles.taskTitle} placeholder="Add new Task" type="text" value={textValue} onChange={handleChange} />
        {selectedTag && (
        <button type="button" className={styles.buttonTag} onClick={handleSelectedTag}>
          {selectedTag.name}
        </button>
        )}
        <input className={styles.button} type="submit" value="Add" />
      </form>
      <div>
        <AllTags handleAllTagsTagClicked={handleAllTagsTagClicked} />
      </div>
    </div>
  );
};

export default CreateTask;
