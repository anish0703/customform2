import React, { useState } from "react";

const FormArea = ({
  formTitle,
  setFormTitle,
  formElements,
  onFormAreaDrop,
  onDragStart,
  onDragOver,
  onDrop,
  handleDelete,
  setFormElements,
}) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [tempEdit, setTempEdit] = useState({});
  const [newOption, setNewOption] = useState(""); // State to store the new option input value
  const [categories] = useState(["General", "Personal", "Contact"]); // Predefined categories

  const handleEdit = (index) => {
    const selectedElement = formElements[index];
    setEditingIndex(index);
    setTempEdit({
      ...selectedElement,
      options: selectedElement.options || [], // Ensure options array exists
    });
  };

  const saveEdit = (index) => {
    const updatedElements = [...formElements];
    updatedElements[index] = { ...tempEdit };
    setFormElements(updatedElements); // Update state
    localStorage.setItem("formElements", JSON.stringify(updatedElements)); // Persist to localStorage
    setEditingIndex(null); // Exit editing mode
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setTempEdit({});
  };

  // Function to handle adding a new option to a dropdown
  const addOptionToDropdown = () => {
    if (newOption.trim()) {
      const updatedOptions = [...tempEdit.options, newOption.trim()];
      setTempEdit({ ...tempEdit, options: updatedOptions }); // Update tempEdit with the new option
      setNewOption(""); // Clear the new option input
    }
  };

  // Function to handle changing the option name
  const handleOptionChange = (optionIndex, newName) => {
    const updatedOptions = [...tempEdit.options];
    updatedOptions[optionIndex] = newName.trim(); // Update the specific option
    setTempEdit({ ...tempEdit, options: updatedOptions }); // Update tempEdit with the new options
  };

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

      <div
        className="bg-white p-4 rounded shadow"
        style={{ maxHeight: "400px", overflowY: "auto" }}
      >
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
            <button
              className="absolute top-2 right-10 text-blue-500 font-bold"
              onClick={() => handleEdit(index)}
            >
              ✏️
            </button>

            {editingIndex === index ? (
              <div className="p-2 border rounded bg-gray-50">
                <label className="block text-sm font-medium text-gray-600">
                  Edit Label
                </label>
                <input
                  type="text"
                  value={tempEdit.label || ""}
                  onChange={(e) =>
                    setTempEdit({ ...tempEdit, label: e.target.value })
                  }
                  className="border border-gray-300 rounded w-full p-2 mb-2 focus:ring-2 focus:ring-indigo-300"
                />

                <label className="block text-sm font-medium text-gray-600">
                  Is Required?
                </label>
                <input
                  type="checkbox"
                  checked={tempEdit.required || false}
                  onChange={(e) =>
                    setTempEdit({ ...tempEdit, required: e.target.checked })
                  }
                  className="mr-2"
                />
                <span>Required</span>

                {/* Dropdown options editing */}
                {tempEdit.type === "dropdown" && (
                  <>
                    <label className="block text-sm font-medium text-gray-600">
                      Edit Options
                    </label>
                    <div>
                      {tempEdit.options?.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex mb-2">
                          <input
                            type="text"
                            value={option}
                            onChange={(e) =>
                              handleOptionChange(optionIndex, e.target.value)
                            }
                            className="border border-gray-300 rounded w-full p-2 mr-2"
                          />
                          <button
                            className="text-red-500 font-bold text-xl"
                            onClick={() => {
                              const updatedOptions = tempEdit.options.filter(
                                (_, optIndex) => optIndex !== optionIndex
                              ); // Remove selected option
                              setTempEdit({
                                ...tempEdit,
                                options: updatedOptions,
                              }); // Update options in edit mode
                            }}
                          >
                            ❌
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4">
                      <input
                        type="text"
                        value={newOption}
                        onChange={(e) => setNewOption(e.target.value)}
                        placeholder="Add a new option"
                        className="border border-gray-300 rounded w-full p-2 focus:ring-2 focus:ring-indigo-300"
                      />
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                        onClick={addOptionToDropdown}
                      >
                        Add Option
                      </button>
                    </div>

                    {/* Category Selection - Only for Dropdown */}
                    <label className="block text-sm font-medium text-gray-600 mt-4">
                      Category
                    </label>
                    <input
                      type="text"
                      value={tempEdit.category || ""}
                      onChange={(e) =>
                        setTempEdit({ ...tempEdit, category: e.target.value })
                      }
                      placeholder="Enter custom category"
                      className="border border-gray-300 rounded w-full p-2 mb-2 focus:ring-2 focus:ring-indigo-300"
                    />
                  </>
                )}

                <button
                  className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                  onClick={() => saveEdit(index)}
                >
                  Save
                </button>
                <button
                  className="bg-gray-300 text-black px-4 py-2 rounded mt-2 ml-2"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <label className="block font-medium text-gray-600 mb-1">
                  {element.label}{" "}
                  {element.required && <span className="text-red-500">*</span>}
                </label>
                {["text", "email", "number", "password", "tel"].includes(
                  element.type
                ) && (
                  <input
                    type={element.type}
                    placeholder={element.placeholder}
                    className="border border-gray-300 rounded w-full p-2"
                    disabled
                  />
                )}
                {element.type === "dropdown" && (
                  <div>
                    <select
                      className="border border-gray-300 rounded w-full p-2"
                      disabled
                    >
                      {element.options.map((opt, idx) => (
                        <option key={idx}>{opt}</option>
                      ))}
                    </select>
                    {element.category && (
                      <p className="text-sm mt-2 text-gray-500">
                        Category: {element.category}
                      </p>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormArea;
