import React from 'react';
import AppContext from '~/AppContext';
import Title from './Title';
import Authors from './Authors';
import styles from './PaperTitle.css';
import Affiliations from './Affiliations/Affiliations';

const authors = [
  'Alice Abaraham',
  'Christie Chang',
  'Bill Byron',
  'David Doel'
];

const affiliations = [
  'University of Utopia',
  'Neverland Institute of Technology',
  'University of Argleton'
];

const PaperTitle = () => (
  <AppContext.Consumer>
    {({
      title
    }) => (
      <div className={styles.paperTitle}>
        <div className={styles.title}>
          <Title title={title} />
        </div>
        <div className={styles.authors}>
          <Authors authors={authors} />
        </div>
        <div className={styles.affiliations}>
          <Affiliations affiliations={affiliations} />
        </div>
      </div>
    )}
  </AppContext.Consumer>
);

export default PaperTitle;
