import {useState} from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import ListEditor from './ListEditor';
import EditButtons from './EditButtons';

const AddList = function (props) {

  const [title, setTitle] = useState('');

  const handleChangeTitle = (e) => setTitle(e.target.value);

  let createList = async () => {
    const { dispatch } = props;

    props.toggleAddingList();

    dispatch({
      type: 'ADD_LIST',
      payload: { listId: shortid.generate(), listTitle: title },
    });
  };

  const { toggleAddingList } = props;

    return (
      <div className="Add-List-Editor">
        <ListEditor
          title={title}
          handleChangeTitle={this.handleChangeTitle}
          onClickOutside={toggleAddingList}
          saveList={this.createList}
        />

        <EditButtons
          handleSave={this.createList}
          saveLabel="Add list"
          handleCancel={toggleAddingList}
        />
      </div>
    );
  }
}

export default connect()(AddList);
