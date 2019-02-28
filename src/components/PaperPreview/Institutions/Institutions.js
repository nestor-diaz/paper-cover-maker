import React from 'react';
import PropTypes from 'prop-types';
import Institution from './Institution';
import styles from './Institutions.css';

const Institutions = ({ institutionsIndexes }) => (
  <div className={styles.institutions}>
    {institutionsIndexes.map((institutionIndex) => {
      const { institution, index } = institutionIndex;
      const { id, name } = institution;

      return <Institution key={id} label={name} index={index} />;
    })}
  </div>
);

Institutions.propTypes = {
  institutionsIndexes: PropTypes.array
};

Institutions.defaultProps = {
  institutionsIndexes: []
};

export default Institutions;
