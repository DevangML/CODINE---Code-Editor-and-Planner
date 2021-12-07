import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { CHANGE_CARD_TEXT, DELETE_CARD } from '../../../../../redux/constants/projectPlannerTypes';
import CardEditor from './CardEditor';

const Card = (props) => {
  const [hover, setHover] = useState(false);
  const [editing, setEditing] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [text, setText] = useState('');

  const startHover = () => setHover(true);

  const endHover = () => setHover(false);

  const startEditing = () => {
    setHover(false);
    setEditing(true);
    setText(props.card.text);
  };

  const endEditing = () => {
    setHover(false);
    setEditing(false);
  };

  const editCard = async (text) => {
    const { card, dispatch } = props;

    endEditing();

    dispatch({
      type: CHANGE_CARD_TEXT,
      payload: { cardId: card._id, cardText: text },
    });
  };

  const deleteCard = async () => {
    const { listId, card, dispatch } = props;

    if (window.confirm('Are you sure to delete this card?')) {
      dispatch({
        type: DELETE_CARD,
        payload: { cardId: card._id, listId },
      });
    }
  };

  const { card, index } = props;

  if (!editing) {
    return (
      <Draggable draggableId={card._id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className='Card'
            onMouseEnter={startHover}
            onMouseLeave={endHover}
          >
            {hover && (
              <div className='Card-Icons'>
                <div className='Card-Icon' onClick={startEditing}>
                  <ion-icon name='create' />
                </div>
              </div>
            )}

            {card.text}
          </div>
        )}
      </Draggable>
    );
  }
  return (
    <CardEditor text={card.text} onSave={editCard} onDelete={deleteCard} onCancel={endEditing} />
  );
};

const mapStateToProps = (state, ownProps) => ({
  card: state.cardsById[ownProps.cardId],
});

export default connect(mapStateToProps)(Card);
