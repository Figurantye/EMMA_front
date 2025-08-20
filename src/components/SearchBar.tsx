import React from 'react';
import styles from './SearchBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar: React.FC = () => (
  <div className={styles.searchBar}>
    <input type="text" placeholder="Search..." className={styles.input} />
    <button className={styles.button}><FontAwesomeIcon icon={faSearch}/></button>
  </div>
);

export default SearchBar;