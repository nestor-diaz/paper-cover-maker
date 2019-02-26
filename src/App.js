import React, { Component } from 'react';
import classNames from 'classnames';
import { arrayMove } from 'react-sortable-hoc';
import randomKey from 'random-key';
import PaperTitle from '~/components/PaperTitle';
import Sidebar from '~/components/Sidebar';
import AppContext from './AppContext';
import styles from './App.css';

import 'react-tippy/dist/tippy.css';

class App extends Component {
  state = {
    title: '',
    authors: [],
    authorSelected: '',
    institutions: [],
    isAddingAuthor: false,
    isAddingInstitution: false
  };

  // Title handlers.

  handleTitleChange = (event) => this.setState({ title: event.target.value });

  // Authors handlers.

  handleAuthorStartAdding = () => this.setState({ isAddingAuthor: true });

  handleAuthorAdd = ({ name }) => {
    const newAuthor = { name, id: randomKey.generate() };
    const { authors } = this.state;

    this.setState({
      authors: [newAuthor, ...authors],
      isAddingAuthor: false
    });
  };

  handleAuthorClick = ({ id }) => this.setState({ authorSelected: id });

  handleAuthorMove = ({ oldIndex, newIndex }) => {
    this.setState(({ authors }) => ({
      authors: arrayMove(authors, oldIndex, newIndex)
    }));
  };

  // Institutions handlers.

  handleInstitutionStartAdding = () => this.setState({ isAddingInstitution: true });

  handleInstitutionAdd = ({ name }) => {
    const newInstitution = { name, id: randomKey.generate() };
    const { institutions } = this.state;

    this.setState({
      institutions: [newInstitution, ...institutions],
      isAddingInstitution: false
    });
  };

  render() {
    const {
      title, authors, authorSelected, institutions, isAddingAuthor, isAddingInstitution
    } = this.state;

    return (
      <AppContext.Provider value={{
        title,
        authors,
        authorSelected,
        institutions,
        isAddingAuthor,
        isAddingInstitution,
        onTitleChange: this.handleTitleChange,
        onAuthorStartAdding: this.handleAuthorStartAdding,
        onAuthorAdd: this.handleAuthorAdd,
        onAuthorClick: this.handleAuthorClick,
        onInstitutionStartAdding: this.handleInstitutionStartAdding,
        onInstitutionAdd: this.handleInstitutionAdd,
        onAuthorMove: this.handleAuthorMove
      }}
      >
        <div className={styles.layout}>
          <div className={classNames(styles.column, styles.left)}>
            <PaperTitle />
          </div>
          <div className={classNames(styles.column, styles.right)}>
            <Sidebar />
          </div>
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;
