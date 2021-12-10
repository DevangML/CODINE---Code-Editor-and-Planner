/* eslint-disable  lines-between-class-members */

import TaskItem from './TaskItem';

const TaskList = (props) => (
  <table>
    <thead>
      <tr>
        <th>Task</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.tasks.map((task, index) => (
        <TaskItem
          key={index}
          taskItem={task}
          id={index}
          deleteTask={props.deleteTask}
          editTask={props.editTask}
          toggleTask={props.toggleTask}
        />
      ))}
    </tbody>
  </table>
);

export default TaskList;
