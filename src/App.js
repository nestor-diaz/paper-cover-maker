import React, { Component } from 'react';
import classNames from 'classnames';
import { arrayMove } from 'react-sortable-hoc';
import PaperTitle from '~/components/PaperTitle';
import Sidebar from '~/components/Sidebar';
import AppContext from './AppContext';
import styles from './App.css';

import 'react-tippy/dist/tippy.css';

class App extends Component {
  state = {
    title: '',
    authors: [{
      id: 0,
      name: 'Alice Abaraham'
    }, {
      id: 1,
      name: 'Christie Chang'
    }, {
      id: 2,
      name: 'Bill Byron'
    }, {
      id: 3,
      name: 'David Doel'
    }],
    institutions: [],
    isAddingAuthor: false,
    isAddingInstitution: false
  };

  // Title handlers.

  handleTitleChange = (event) => this.setState({ title: event.target.value });

  // Authors handlers.

  handleAuthorStartAdding = () => this.setState({ isAddingAuthor: true });

  handleAuthorAdd = (name) => {
    const newAuthor = { name, id: 10 };
    const { authors } = this.state;

    this.setState({
      authors: [newAuthor, ...authors],
      isAddingAuthor: false
    });
  };

  handleAuthorMove = ({ oldIndex, newIndex }) => {
    this.setState(({ authors }) => ({
      authors: arrayMove(authors, oldIndex, newIndex)
    }));
  };

  // Institutions handlers.

  handleInstitutionStartAdding = () => this.setState({ isAddingInstitution: true });

  handleInstitutionAdd = () => {};

  render() {
    const {
      title, authors, institutions, isAddingAuthor, isAddingInstitution
    } = this.state;

    return (
      <AppContext.Provider value={{
        title,
        authors,
        institutions,
        isAddingAuthor,
        isAddingInstitution,
        onTitleChange: this.handleTitleChange,
        onAuthorStartAdding: this.handleAuthorStartAdding,
        onAuthorAdd: this.handleAuthorAdd,
        onInstitutionAddStartAdding: this.handleInstitutionStartAdding,
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
