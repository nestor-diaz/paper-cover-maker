import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import styles from './Footer.css';

const Footer = ({ onSave }) => (
  <div className={styles.footer}>
    <Button color="primary" variant="contained" onClick={onSave}>Save</Button>
  </div>
);

Footer.propTypes = {
  onSave: PropTypes.func
};

Footer.defaultProps = {
  onSave: () => {}
};

export default Footer;
