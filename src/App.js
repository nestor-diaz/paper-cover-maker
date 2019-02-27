import React, { Component } from 'react';
import classNames from 'classnames';
import { arrayMove } from 'react-sortable-hoc';
import randomKey from 'random-key';
import PaperTitle from '~/components/PaperTitle';
import Sidebar from '~/components/Sidebar';
import { calculateAffiliatinIndexes } from '~/utils/affiliations';
import AppContext from './AppContext';
import styles from './App.css';

import 'react-tippy/dist/tippy.css';

class App extends Component {
  state = {
    title: '',
    authors: [],
    authorSelected: {},
    affiliations: [],
    affiliationsIndexes: {
      institutionsIndexes: [],
      authorsIndexes: []
    },
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
    const { authors, affiliations } = this.state;

    this.setState({
      authors: [newAuthor, ...authors],
      affiliationsIndexes: calculateAffiliatinIndexes({ authors, affiliations }),
      isAddingAuthor: false
    });
  };

  handleAuthorClick = ({ author }) => this.setState({ authorSelected: author });

  handleAuthorMove = ({ oldIndex, newIndex }) => {
    const { authors, affiliations } = this.state;
    const newAuthorsOrder = arrayMove(authors, oldIndex, newIndex);

    this.setState({
      authors: newAuthorsOrder,
      affiliationsIndexes: calculateAffiliatinIndexes({ authors: newAuthorsOrder, affiliations })
    });
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

  handleInstitutionClick= ({ institution }) => {
    const { authors, affiliations, authorSelected } = this.state;

    if (Object.keys(authorSelected).length > 0) {
      const updatedAffiliations = affiliations.concat({ author: authorSelected, institution });

      this.setState({
        affiliations: updatedAffiliations,
        affiliationsIndexes: calculateAffiliatinIndexes({ authors, affiliations: updatedAffiliations })
      });
    }
  };

  render() {
    const {
      title, authors, authorSelected, affiliationsIndexes, institutions, isAddingAuthor, isAddingInstitution
    } = this.state;

    return (
      <AppContext.Provider value={{
        title,
        authors,
        authorsIndexes: affiliationsIndexes.authorsIndexes,
        authorSelected,
        institutions,
        institutionsIndexes: affiliationsIndexes.institutionsIndexes,
        isAddingAuthor,
        isAddingInstitution,
        onTitleChange: this.handleTitleChange,
        onAuthorStartAdding: this.handleAuthorStartAdding,
        onAuthorAdd: this.handleAuthorAdd,
        onAuthorClick: this.handleAuthorClick,
        onInstitutionStartAdding: this.handleInstitutionStartAdding,
        onInstitutionAdd: this.handleInstitutionAdd,
        onInstitutionClick: this.handleInstitutionClick,
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
