import React from 'react';
import AppContext from '~/AppContext';
import TextField from '@material-ui/core/TextField';
import styles from './TitleTextField.css';

const TitleTextArea = () => (
  <AppContext.Consumer>
    {({
      title,
      onTitleChange
    }) => (
      <TextField
        className={styles.textArea}
        label="Paper Title"
        margin="normal"
        multiline
        onChange={onTitleChange}
        value={title}
        variant="outlined"
      />
    )}
  </AppContext.Consumer>
);

export default TitleTextArea;
