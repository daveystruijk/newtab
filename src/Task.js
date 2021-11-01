import React from 'react';
import EdiText from 'react-editext';

export function Task(props) {
  const { task, setTask } = props;

  const onSave = (text) => setTask({ ...task, text });

  return (
    <div className={`task category-${task.category}`}>
      <div className="icon" />
      <EdiText
        value={task.text}
        onSave={onSave}
        submitOnEnter={true}
        cancelOnEscape={true}
        editOnViewClick={true}
        showButtonsOnHover={true}
      ></EdiText>
    </div>
  );
}
