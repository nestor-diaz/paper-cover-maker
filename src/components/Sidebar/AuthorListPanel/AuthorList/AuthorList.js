import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import className from 'classnames';
import Input from '@material-ui/core/Input';
import DndIcon from '@material-ui/icons/DragIndicator';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './AuthorList.css';

const DragHandle = SortableHandle(() => (
  <span className={styles.dndIcon}>
    <DndIcon />
  </span>
));

const Author = SortableElement(({
  author, isSelected, isHovered, onClick, onDelete, onItemMouseEnter, onItemMouseLeave
}) => {
  const authorClassnames = className(styles.itemWrapper, {
    [styles.selected]: isSelected
  });

  return (
    <div
      className={authorClassnames}
      onMouseEnter={() => onItemMouseEnter({ author })}
      onMouseLeave={() => onItemMouseLeave({ author })}
    >
      <div className={styles.itemDrag}>
        <DragHandle />
      </div>
      <div className={styles.itemInfo} onClick={() => onClick({ author })}>
        <div className={styles.authorName}>{author.name}</div>
      </div>
      <div className={styles.itemActions}>
        {isHovered && <div className={styles.delete} onClick={() => onDelete({ author })}><DeleteIcon /></div>}
      </div>
    </div>
  );
});

const AuthorSortableList = SortableContainer(({
  authors,
  authorSelected,
  authorHovered,
  onItemClick,
  onItemDelete,
  onItemMouseEnter,
  onItemMouseLeave
}) => (
  <div className={styles.authorList}>
    {authors.length === 0 && <div className={styles.emptyText}>No authors has been added</div>}
    {authors.map((author, index) => (
      <Author
        author={author}
        index={index}
        key={`author-${index}`}
        onClick={onItemClick}
        onDelete={onItemDelete}
        onItemMouseEnter={onItemMouseEnter}
        onItemMouseLeave={onItemMouseLeave}
        isSelected={author.id === authorSelected.id}
        isHovered={author.id === authorHovered.id}
      />
    ))}
  </div>
));

class AuthorList extends PureComponent {
  state = {
    authorHovered: {},
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

  handleItemMouseEnter = ({ author }) => {
    this.setState({ authorHovered: author });
  }

  handleItemMouseLeave = () => {
    this.setState({ authorHovered: {} });
  }

  render() {
    const { authorHovered, newAuthorName } = this.state;
    const {
      authorSelected,
      authors,
      onAuthorDelete,
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
          authorHovered={authorHovered}
          onItemClick={onAuthorClick}
          onItemDelete={onAuthorDelete}
          onItemMouseEnter={this.handleItemMouseEnter}
          onItemMouseLeave={this.handleItemMouseLeave}
          onSortEnd={onAuthorMove}
          useDragHandle
        />
      </div>
    );
  }
}

AuthorList.propTypes = {
  authorSelected: PropTypes.object,
  authors: PropTypes.array,
  onAuthorAdd: PropTypes.func,
  onAuthorDelete: PropTypes.func,
  onAuthorClick: PropTypes.func,
  onAuthorMove: PropTypes.func,
  showNewAuthorInput: PropTypes.bool
};

AuthorList.defaultProps = {
  authorSelected: {},
  authors: [],
  onAuthorAdd: () => {},
  onAuthorDelete: () => {},
  onAuthorClick: () => {},
  onAuthorMove: () => {},
  showNewAuthorInput: false
};

export default AuthorList;
