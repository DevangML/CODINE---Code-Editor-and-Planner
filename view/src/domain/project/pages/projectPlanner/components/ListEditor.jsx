import { useEffect, useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

const ListEditor = function (props) {
  const ref = useRef(null);

  const onEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      props.saveList();
    }
  };

  useEffect(() => {
    const handleClick = (e) => {
      const node = ref.current;

      if (node.contains(e.target)) {
        return;
      }

      props.onClickOutside();
    };
    document.addEventListener('click', handleClick, false);
    return () => {
      document.removeEventListener('click', handleClick, false);
    };
  }, [props]);

  const { title, handleChangeTitle, deleteList } = props;

  return (
    <div className='List-Title-Edit' ref={ref}>
      <TextareaAutosize
        autoFocus
        className='List-Title-Textarea'
        placeholder='Enter list title...'
        value={title}
        onChange={handleChangeTitle}
        onKeyDown={onEnter}
        style={{ width: deleteList ? 220 : 245 }}
      />
      {deleteList && <ion-icon name='trash' onClick={deleteList} />}
    </div>
  );
};

export default ListEditor;
