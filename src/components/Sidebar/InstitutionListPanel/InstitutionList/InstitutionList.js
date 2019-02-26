import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import styles from './InstitutionList.css';

class InstitutionList extends PureComponent {
  state = {
    newInstitutionName: ''
  };

  handleKeyPress = (event) => {
    const { onInstitutionAdd } = this.props;
    const { newInstitutionName } = this.state;

    if (event.key === 'Enter') {
      onInstitutionAdd({ name: newInstitutionName });

      this.setState({ newInstitutionName: '' });
    }
  };

  handleChange = (event) => {
    this.setState({ newInstitutionName: event.target.value });
  }

  renderList = () => {
    const { institutions } = this.props;

    return (
      <div className={styles.institutionList}>
        {institutions.length === 0 && <div className={styles.emptyText}>No institutions has been added</div>}
        {institutions.map((institution, index) => <span key={`institution-list-${index}`}>{institution.name}</span>)}
      </div>
    );
  };

  render() {
    const { newInstitutionName } = this.state;
    const { showNewInstitutionInput } = this.props;

    return (
      <div className={styles.institutionListWrapper}>
        {showNewInstitutionInput
          && (
          <Input
            autoFocus
            className={styles.input}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            placeholder="New Institution Name"
            value={newInstitutionName}
          />
          ) }
        {this.renderList()}
      </div>
    );
  }
}

InstitutionList.propTypes = {
  institutions: PropTypes.array,
  onInstitutionAdd: PropTypes.func,
  showNewInstitutionInput: PropTypes.bool
};

InstitutionList.defaultProps = {
  institutions: [],
  onInstitutionAdd: () => {},
  showNewInstitutionInput: false
};

export default InstitutionList;
