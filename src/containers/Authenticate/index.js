import React, { useState } from 'react';
import styles from './index.module.css';

const Authenticate = () => {
  const [token, setToken] = useState('');
  return (
    <div className={styles.root}>
      Go to
      {' '}
      <a href="https://test-323-c4fca.web.app/">
        https://test-323-c4fca.web.app/
      </a>
      {' '}
      and copy your_token
      <textarea value={token} onChange={e => setToken(e.target.value)} />
      <button
        type="button"
        onClick={() => {
          localStorage.setItem('token', token);
          window.location.href = '';
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default Authenticate;
