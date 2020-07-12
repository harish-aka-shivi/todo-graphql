import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../../providers/DataProvider';
import styles from './allTags.module.css';

const AllTags = ({ handleAllTagsTagClicked }) => {
  const { tags, createTag, createTagStatus: { data } } = useContext(DataContext);
  const [creatingTag, setCreatingTag] = useState(false);
  const [tagName, setTagName] = useState('');

  const handleAddTag = e => {
    e.preventDefault();
    if (!tagName) {
      return;
    }
    createTag({
      variables: {
        name: tagName,
      },
    });
  };

  const handleChange = event => {
    setTagName(event.target.value);
  };

  useEffect(() => {
    setTagName('');
    setCreatingTag(false);
  }, [data]);

  return (
    <div className={styles.root}>
      {
        tags.map(tag => (<input className={styles.tag} type="button" onClick={handleAllTagsTagClicked} value={tag.name} />))
      }
      { !creatingTag ? (
        <button className={styles.button} type="button" onClick={() => setCreatingTag(true)}>Add new tag + </button>
      ) : (
        <form onSubmit={handleAddTag}>
          <input type="text" value={tagName} onChange={handleChange} placeholder="Enter tag  name" />
          <input type="submit" value="Add" />
        </form>
      )}
    </div>
  );
};

export default AllTags;
