import React from 'react';
import PropTypes from 'prop-types';
import Affiliation from '~/components/Affiliation';
import styles from './Affiliations.css';

const Affiliations = ({ affiliations }) => (
  <div className={styles.affiliations}>
    {affiliations.map((label, index) => <Affiliation key={`affiliation-${index}`} label={label} />)}
  </div>
);

Affiliations.propTypes = {
  affiliations: PropTypes.array
};

Affiliations.defaultProps = {
  affiliations: []
};

export default Affiliations;
