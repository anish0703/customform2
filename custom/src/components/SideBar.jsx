import React from 'react';

const Sidebar = ({
  showSavedForms,
  showRecentForms,
  savedForms,
  recentForms,
  handleEditSavedForm,
  handleDeleteSavedForm,
  handleShowSavedForms,
  inputs,
  onSidebarDragStart
}) => {
  return (
    <div className="bg-teal-100 w-1/4 p-4 rounded-l-lg">
      <h2 className="font-bold text-gray-700 mb-4 text-center">
        {showSavedForms ? "Saved Forms" : showRecentForms ? "Recent Forms" : "Form Elements"}
      </h2>
      {showRecentForms ? (
        <div>
          {recentForms.map((form, index) => (
            <div
              key={index}
              className="bg-white p-2 mb-3 shadow rounded hover:bg-teal-200 cursor-pointer"
            >
              <div>{form.title || `Form ${index + 1}`}</div>
              <div className="text-sm text-gray-500">Created On: {form.timestamp}</div>
            </div>
          ))}
        </div>
      ) : showSavedForms ? (
        <div>
          {savedForms.map((form, index) => (
            <div
              key={index}
              className="bg-white p-2 mb-3 shadow rounded hover:bg-teal-200 cursor-pointer relative"
            >
              <div onClick={() => handleEditSavedForm(index)}>
                {form.title || `Form ${index + 1}`}
              </div>
              <button
                onClick={() => handleDeleteSavedForm(index)}
                className="absolute top-2 right-2 text-red-500 font-bold"
              >
              ❌
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-y-auto max-h-80">
          {inputs.map((input, index) => (
            <div
              key={index}
              draggable
              onDragStart={(e) => onSidebarDragStart(e, input)}
              className="bg-white p-2 mb-3 shadow rounded hover:bg-teal-200 cursor-pointer"
            >
              {input.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
                    