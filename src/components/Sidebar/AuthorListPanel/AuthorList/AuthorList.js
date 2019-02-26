import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import className from 'classnames';
import Input from '@material-ui/core/Input';
import DndIcon from './icons/DndIcon';
import styles from './AuthorList.css';

const DragHandle = SortableHandle(() => (
  <span className={styles.dndIcon}>
    <DndIcon />
  </span>
));

const Author = SortableElement(({
  id, isSelected, name, onClick
}) => {
  const authorClassnames = className(styles.item, {
    [styles.selected]: isSelected
  });

  return (
    <div className={authorClassnames} onClick={() => onClick({ id, name })}>
      <DragHandle />
      {name}
    </div>
  );
});

const AuthorSortableList = SortableContainer(({ authors, authorSelected, onItemClick }) => (
  <div className={styles.authorList}>
    {authors.map((author, index) => (
      <Author
        id={author.id}
        index={index}
        key={`author-${index}`}
        name={author.name}
        onClick={onItemClick}
        isSelected={author.id === authorSelected}
      />
    ))}
  </div>
));

class AuthorList extends PureComponent {
  state = {
    newAuthorName: ''
  };

  handleKeyPress = (event) => {
    const { onAuthorAdd } = this.props;
    const { newAuthorName } = this.state;

    if (event.key === 'Enter') {
      onAuthorAdd({ name: newAuthorName });

      this.setState({ newAuthorName: '' });
    }
  };

  handleChange = (event) => {
    this.setState({ newAuthorName: event.target.value });
  }

  render() {
    const { newAuthorName } = this.state;
    const {
      authorSelected,
      authors,
      onAuthorClick,
      onAuthorMove,
      showNewAuthorInput
    } = this.props;

    return (
      <div className={styles.authorListWrapper}>
        {showNewAuthorInput
          && (
          <Input
            autoFocus
            className={styles.input}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            placeholder="New Author Name"
            value={newAuthorName}
          />
          ) }
        <AuthorSortableList
          authorSelected={authorSelected}
          authors={authors}
          onItemClick={onAuthorClick}
          onSortEnd={onAuthorMove}
          useDragHandle
        />
      </div>
    );
  }
}

AuthorList.propTypes = {
  authorSelected: PropTypes.number,
  authors: PropTypes.array,
  onAuthorAdd: PropTypes.func,
  onAuthorClick: PropTypes.func,
  onAuthorMove: PropTypes.func,
  showNewAuthorInput: PropTypes.bool
};

AuthorList.defaultProps = {
  authorSelected: -1,
  authors: [],
  onAuthorAdd: () => {},
  onAuthorClick: () => {},
  onAuthorMove: () => {},
  showNewAuthorInput: false
};

export default AuthorList;
