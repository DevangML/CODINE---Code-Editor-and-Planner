import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import EditButtons from './EditButtons';

const CardEditor = function (props) {
  const [text, setText] = useState(props.text || '');

  const handleChangeText = (e) => setText(e.target.value);

  const onEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.props.onSave(text);
    }
  };

  const { text } = this.state;
  const { onSave, onCancel, onDelete, adding } = this.props;

  return (
    <div className='Edit-Card'>
      <div className='Card'>
        <TextareaAutosize
          autoFocus
          className='Edit-Card-Textarea'
          placeholder='Enter the text for this card...'
          value={text}
          onChange={this.handleChangeText}
          onKeyDown={this.onEnter}
        />
      </div>
      <EditButtons
        handleSave={() => onSave(text)}
        saveLabel={adding ? 'Add card' : 'Save'}
        handleDelete={onDelete}
        handleCancel={onCancel}
      />
    </div>
  );
};

export default CardEditor;
