import React, { Component } from 'react';
import classNames from 'classnames';
import { arrayMove } from 'react-sortable-hoc';
import randomKey from 'random-key';
import PaperTitle from '~/components/PaperTitle';
import Sidebar from '~/components/Sidebar';
import { calculateAffiliationIndexes } from '~/utils/affiliations';
import AppContext from './AppContext';
import styles from './App.css';

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
      affiliationsIndexes: calculateAffiliationIndexes({ authors, affiliations }),
      isAddingAuthor: false
    });
  };

  handleAuthorDelete = ({ author }) => {
    const { authors, affiliations } = this.state;
    const filteredAuthors = authors.filter((currentAuthor) => currentAuthor.id !== author.id);
    const filteredAffiliations = affiliations.filter((affiliation) => affiliation.author.id !== author.id);

    this.setState({
      authors: filteredAuthors,
      affiliations: filteredAffiliations,
      affiliationsIndexes: calculateAffiliationIndexes({ authors: filteredAuthors, affiliations: filteredAffiliations })
    });
  };

  handleAuthorClick = ({ author }) => this.setState({ authorSelected: author });

  handleAuthorMove = ({ oldIndex, newIndex }) => {
    const { authors, affiliations } = this.state;
    const newAuthorsOrder = arrayMove(authors, oldIndex, newIndex);

    this.setState({
      authors: newAuthorsOrder,
      affiliationsIndexes: calculateAffiliationIndexes({ authors: newAuthorsOrder, affiliations })
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

  handleInstitutionDelete = ({ institution }) => {
    const { authors, institutions, affiliations } = this.state;
    const filteredInstitutions = institutions.filter((currentInstitution) => currentInstitution.id !== institution.id);
    const filteredAffiliations = affiliations.filter((affiliation) => affiliation.institution.id !== institution.id);

    this.setState({
      institutions: filteredInstitutions,
      affiliations: filteredAffiliations,
      affiliationsIndexes: calculateAffiliationIndexes({ authors, affiliations: filteredAffiliations })
    });
  };

  handleInstitutionClick= ({ institution }) => {
    const { authors, affiliations, authorSelected } = this.state;

    if (Object.keys(authorSelected).length > 0) {
      const updatedAffiliations = affiliations.concat({ author: authorSelected, institution });

      this.setState({
        affiliations: updatedAffiliations,
        affiliationsIndexes: calculateAffiliationIndexes({ authors, affiliations: updatedAffiliations })
      });
    }
  };

  // Save handlers

  handleOnSave = () => {
    const {
      title,
      authors,
      institutions,
      affiliations,
      affiliationsIndexes
    } = this.state;

    localStorage.setItem('paper', JSON.stringify({
      title,
      authors,
      institutions,
      affiliations,
      affiliationsIndexes
    }));
  };

  render() {
    const {
      title,
      authors,
      authorSelected,
      affiliations,
      affiliationsIndexes,
      institutions,
      isAddingAuthor,
      isAddingInstitution
    } = this.state;

    return (
      <AppContext.Provider value={{
        title,
        authors,
        authorsIndexes: affiliationsIndexes.authorsIndexes,
        authorSelected,
        affiliations,
        institutions,
        institutionsIndexes: affiliationsIndexes.institutionsIndexes,
        isAddingAuthor,
        isAddingInstitution,
        onTitleChange: this.handleTitleChange,
        onAuthorStartAdding: this.handleAuthorStartAdding,
        onAuthorAdd: this.handleAuthorAdd,
        onAuthorDelete: this.handleAuthorDelete,
        onAuthorClick: this.handleAuthorClick,
        onInstitutionStartAdding: this.handleInstitutionStartAdding,
        onInstitutionAdd: this.handleInstitutionAdd,
        onInstitutionDelete: this.handleInstitutionDelete,
        onInstitutionClick: this.handleInstitutionClick,
        onAuthorMove: this.handleAuthorMove
      }}
      >
        <div className={styles.layout}>
          <div className={classNames(styles.column, styles.left)}>
            <PaperTitle />
          </div>
          <div className={classNames(styles.column, styles.right)}>
            <Sidebar onSave={this.handleOnSave} />
          </div>
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;
