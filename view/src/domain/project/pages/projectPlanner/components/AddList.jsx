import { useState } from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import ListEditor from './ListEditor';
import EditButtons from './EditButtons';
import { ADD_LIST } from '../../../../../redux/constants/projectPlannerTypes';

const AddList = function (props) {
  const [title, setTitle] = useState('');

  const handleChangeTitle = (e) => setTitle(e.target.value);

  const createList = async () => {
    const { dispatch } = props;

    props.toggleAddingList();

    dispatch({
      type: ADD_LIST,
      payload: { listId: shortid.generate(), listTitle: title },
    });
  };

  const { toggleAddingList } = props;

  return (
    <div className='Add-List-Editor'>
      <ListEditor
        title={title}
        handleChangeTitle={handleChangeTitle}
        onClickOutside={toggleAddingList}
        saveList={createList}
      />

      <EditButtons handleSave={createList} saveLabel='Add list' handleCancel={toggleAddingList} />
    </div>
  );
};

export default connect()(AddList);
