import { useState } from 'react';
import shortid from 'shortid';
import { connect } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import {
  ADD_CARD,
  CHANGE_LIST_TITLE,
  DELETE_LIST,
} from '../../../../../redux/constants/projectPlannerTypes';
import Card from './Card';
import CardEditor from './CardEditor';
import ListEditor from './ListEditor';

const List = function (props) {
  const [editingTitle, setEditingTitle] = useState(false);
  const [title, setTitle] = useState(props.list.title);
  const [addingCard, setAddingCard] = useState(false);

  const toggleAddingCard = () => setAddingCard({ addingCard: !addingCard });

  const addCard = async (cardText) => {
    const { listId, dispatch } = props;

    toggleAddingCard();

    const cardId = shortid.generate();

    dispatch({
      type: ADD_CARD,
      payload: { cardText, cardId, listId },
    });
  };

  const toggleEditingTitle = () => setEditingTitle({ editingTitle: !editingTitle });

  const handleChangeTitle = (e) => setTitle(e.target.value);

  const editListTitle = async () => {
    const { listId, dispatch } = props;

    toggleEditingTitle();

    dispatch({
      type: CHANGE_LIST_TITLE,
      payload: { listId, listTitle: title },
    });
  };

  const deleteList = async () => {
    const { listId, list, dispatch } = props;

    if (window.confirm('Are you sure to delete this list?')) {
      dispatch({
        type: DELETE_LIST,
        payload: { listId, cards: list.cards },
      });
    }
  };

  const { list, index } = props;

  return (
    <Draggable draggableId={list._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className='List'
        >
          {editingTitle ? (
            <ListEditor
              list={list}
              title={title}
              handleChangeTitle={handleChangeTitle}
              saveList={editListTitle}
              onClickOutside={editListTitle}
              deleteList={deleteList}
            />
          ) : (
            <div className='List-Title' onClick={toggleEditingTitle}>
              {list.title}
            </div>
          )}

          <Droppable droppableId={list._id}>
            {(provided, _snapshot) => (
              <div ref={provided.innerRef} className='Lists-Cards'>
                {list.cards &&
                  list.cards.map((cardId, index) => (
                    <Card key={cardId} cardId={cardId} index={index} listId={list._id} />
                  ))}

                {provided.placeholder}

                {addingCard ? (
                  <CardEditor onSave={addCard} onCancel={toggleAddingCard} adding />
                ) : (
                  <div className='Toggle-Add-Card' onClick={toggleAddingCard}>
                    <ion-icon name='add' /> Add a card
                  </div>
                )}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

const mapStateToProps = (state, ownProps) => ({
  list: state.listsById[ownProps.listId],
});

export default connect(mapStateToProps)(List);
