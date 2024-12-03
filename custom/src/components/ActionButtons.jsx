import React from 'react';

const ActionButtons = ({
  handleSaveForm,
  handleShowSavedForms,
  showSavedForms,
  handleCreate
}) => {
  return (
    <div className="p-4 flex flex-col space-y-2">
      <button
        onClick={handleSaveForm}
        className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-2 px-4 rounded shadow hover:bg-blue-600"
      >
        Save Form
      </button>
      <button
        onClick={handleShowSavedForms}
        className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-2 px-4 rounded shadow hover:bg-green-600"
      >
        {showSavedForms ? "Hide Saved Forms" : "Saved Forms"}
      </button>
      <button
        onClick={handleCreate}
        className="bg-gradient-to-r from-teal-500 via-blue-500 to-indigo-500 py-2 px-4 rounded shadow hover:bg-teal-600"
      >
        Preview Form
      </button>
    </div>
  );
};

export default ActionButtons;
