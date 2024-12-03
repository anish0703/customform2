import React from 'react';

const FormArea = ({
  formTitle,
  setFormTitle, 
  formElements,
  onFormAreaDrop,
  onDragStart,
  onDragOver,
  onDrop,
  handleDelete
}) => {
  return (
    <div
      className="flex-1 p-8 bg-slate-50 border-dashed border-4 border-indigo-300 rounded-lg mx-4"
      onDrop={onFormAreaDrop}
      onDragOver={(e) => e.preventDefault()}
      style={{ height: "600px", width: "calc(100% - 20px)" }}
    >
      <h1 className="text-lg font-bold text-gray-700 mb-4">
        Drag and Drop Your Form Elements Here
      </h1>
      
      
      <input
        type="text"
        value={formTitle}
        onChange={(e) => setFormTitle(e.target.value)} 
        placeholder="Enter form title"
        className="border border-gray-300 rounded w-full p-2 mb-4 focus:ring-2 focus:ring-indigo-300"
      />
      
      <div className="bg-white p-4 rounded shadow" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {formElements.map((element, index) => (
          <div
            key={index}
            className="mb-4 p-2 border rounded bg-gray-100 relative"
            draggable
            onDragStart={(e) => onDragStart(e, index)}
            onDragOver={(e) => onDragOver(e, index)}
            onDrop={onDrop}
          >
            <button
              className="absolute top-2 right-2 text-red-500 font-bold"
              onClick={() => handleDelete(index)}
            >
              ❌
            </button>
            <label className="block font-medium text-gray-600 mb-1">{element.label}</label>
            {["text", "email", "number", "password", "tel"].includes(element.type) && (
              <input
                type={element.type}
                placeholder={element.placeholder}
                className="border border-gray-300 rounded w-full p-2 focus:ring-2 focus:ring-indigo-300"
                disabled
              />
            )}
            {element.type === "checkbox" && (
              <input
                type="checkbox"
                className="form-checkbox"
                disabled
              />
            )}
            {element.type === "radio" && (
              <input
                type="radio"
                className="form-radio"
                disabled
              />
            )}
            {element.type === "dropdown" && (
              <select className="border border-gray-300 rounded w-full p-2 focus:ring-2 focus:ring-indigo-300" disabled>
                {element.options.map((option, idx) => (
                  <option key={idx} value={option}>{option}</option>
                ))}
              </select>
            )}
            {element.type === "file" && (
              <input
                type="file"
                className="border border-gray-300 rounded w-full p-2 focus:ring-2 focus:ring-indigo-300"
                disabled
              />
            )}
            {element.type === "date" && (
              <input
                type="date"
                className="border border-gray-300 rounded w-full p-2 focus:ring-2 focus:ring-indigo-300"
                disabled
              />
            )}
            {element.type === "time" && (
              <input
                type="time"
                className="border border-gray-300 rounded w-full p-2 focus:ring-2 focus:ring-indigo-300"
                disabled
              />
            )}
            {element.type === "range" && (
              <input
                type="range"
                className="border border-gray-300 rounded w-full p-2 focus:ring-2 focus:ring-indigo-300"
                disabled
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormArea;
