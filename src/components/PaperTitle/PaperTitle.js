import React from 'react';
import AppContext from '~/AppContext';
import Title from './Title';
import Authors from './Authors';
import styles from './PaperTitle.css';
import Institutions from './Institutions';

const PaperTitle = () => (
  <AppContext.Consumer>
    {({
      authors,
      authorsIndexes,
      institutionsIndexes,
      title
    }) => (
      <div className={styles.paperTitle}>
        <Title title={title} />
        <Authors authors={authors} authorsIndexes={authorsIndexes} />
        <Institutions institutionsIndexes={institutionsIndexes} />
      </div>
    )}
  </AppContext.Consumer>
);

export default PaperTitle;
