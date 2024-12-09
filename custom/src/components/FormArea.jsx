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
  const [userCategories, setUserCategories] = useState({});

  const handleEdit = (index) => {
    setEditingIndex(index);
    setTempEdit({ ...formElements[index] });
  };

  const saveEdit = (index) => {
    const updatedElements = [...formElements];
    updatedElements[index] = {
      ...tempEdit,
      options: tempEdit.category ? userCategories[tempEdit.category] : tempEdit.options,
    };
    setFormElements(updatedElements);
    localStorage.setItem("formElements", JSON.stringify(updatedElements)); // Save updated elements to localStorage
    setEditingIndex(null);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setTempEdit({});
  };

  const saveCustomCategory = () => {
    if (tempEdit.predefinedCategory && tempEdit.options) {
      setUserCategories((prev) => ({
        ...prev,
        [tempEdit.predefinedCategory]: tempEdit.options,
      }));
      setTempEdit({ ...tempEdit, predefinedCategory: "" });
    }
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

      <div className="bg-white p-4 rounded shadow" style={{ maxHeight: "400px", overflowY: "auto" }}>
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
                <label className="block text-sm font-medium text-gray-600">Edit Label</label>
                <input
                  type="text"
                  value={tempEdit.label || ""}
                  onChange={(e) => setTempEdit({ ...tempEdit, label: e.target.value })}
                  className="border border-gray-300 rounded w-full p-2 mb-2 focus:ring-2 focus:ring-indigo-300"
                />

                <label className="block text-sm font-medium text-gray-600">Is Required?</label>
                <input
                  type="checkbox"
                  checked={tempEdit.required || false}
                  onChange={(e) => setTempEdit({ ...tempEdit, required: e.target.checked })}
                  className="mr-2"
                />
                <span>Required</span>

                {tempEdit.type === "dropdown" && (
                  <>
                    <label className="block text-sm font-medium text-gray-600">Edit Options</label>
                    <textarea
                      value={tempEdit.options?.join(", ") || ""}
                      onChange={(e) =>
                        setTempEdit({ ...tempEdit, options: e.target.value.split(",").map((o) => o.trim()) })
                      }
                      placeholder="Enter options separated by commas"
                      className="border border-gray-300 rounded w-full p-2 focus:ring-2 focus:ring-indigo-300 mb-2"
                    />
                    <label className="block text-sm font-medium text-gray-600">Save as Category Name</label>
                    <input
                      type="text"
                      placeholder="Enter category name"
                      value={tempEdit.predefinedCategory || ""}
                      onChange={(e) => setTempEdit({ ...tempEdit, predefinedCategory: e.target.value })}
                      className="border border-gray-300 rounded w-full p-2 focus:ring-2 focus:ring-indigo-300 mb-2"
                    />
                    <button
                      className="bg-indigo-500 text-white px-4 py-2 rounded mt-2"
                      onClick={saveCustomCategory}
                    >
                      Save Category
                    </button>
                    <label className="block text-sm font-medium text-gray-600 mt-4">
                      Use Existing Category
                    </label>
                    <select
                      onChange={(e) => setTempEdit({ ...tempEdit, category: e.target.value })}
                      className="border border-gray-300 rounded w-full p-2 focus:ring-2 focus:ring-indigo-300"
                      value={tempEdit.category || ""}
                    >
                      <option value="">Select Category</option>
                      {Object.keys(userCategories).map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
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
                  {element.label} {element.required && <span className="text-red-500">*</span>}
                </label>
                {["text", "email", "number", "password", "tel"].includes(element.type) && (
                  <input
                    type={element.type}
                    placeholder={element.placeholder}
                    className="border border-gray-300 rounded w-full p-2 focus:ring-2 focus:ring-indigo-300"
                    disabled
                  />
                )}
                {element.type === "dropdown" && (
                  <div>
                    {element.category ? (
                      <span className="block text-gray-600">Category: {element.category}</span>
                    ) : (
                      <select
                        className="border border-gray-300 rounded w-full p-2 focus:ring-2 focus:ring-indigo-300"
                        disabled
                      >
                        {element.options.map((opt, idx) => (
                          <option key={idx}>{opt}</option>
                        ))}
                      </select>
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
