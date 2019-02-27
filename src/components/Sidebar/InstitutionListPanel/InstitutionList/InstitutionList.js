import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './InstitutionList.css';

class InstitutionList extends PureComponent {
  state = {
    institutionHovered: {},
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

  handleItemMouseEnter = ({ institution }) => {
    this.setState({ institutionHovered: institution });
  }

  handleItemMouseLeave = () => {
    this.setState({ institutionHovered: {} });
  }

  renderListItem = ({ institution }) => {
    const { onInstitutionClick, onInstitutionDelete } = this.props;
    const { institutionHovered } = this.state;
    const isHovered = institution.id === institutionHovered.id;

    return (
      <div
        className={styles.item}
        key={institution.id}
        onMouseEnter={() => this.handleItemMouseEnter({ institution })}
        onMouseLeave={() => this.handleItemMouseLeave({ institution })}
      >
        <div className={styles.institutionName} onClick={() => onInstitutionClick({ institution })}>
          {institution.name}
        </div>
        {isHovered && <div className={styles.delete} onClick={() => onInstitutionDelete({ institution })}><DeleteIcon /></div>}
      </div>
    );
  }

  renderList = () => {
    const { institutions } = this.props;

    return (
      <div className={styles.institutionList}>
        {institutions.length === 0 && <div className={styles.emptyText}>No institutions has been added</div>}
        {institutions.map((institution) => this.renderListItem({ institution }))}
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
  onInstitutionDelete: PropTypes.func,
  onInstitutionClick: PropTypes.func,
  showNewInstitutionInput: PropTypes.bool
};

InstitutionList.defaultProps = {
  institutions: [],
  onInstitutionAdd: () => {},
  onInstitutionDelete: () => {},
  onInstitutionClick: () => {},
  showNewInstitutionInput: false
};

export default InstitutionList;
