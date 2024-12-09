import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from '../components/SideBar';
import FormArea from '../components/FormArea';
import ActionButtons from '../components/ActionButtons';

const FormBuilderPage = () => {
  const [formElements, setFormElements] = useState([]);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [savedForms, setSavedForms] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [recentForms, setRecentForms] = useState([]);
  const [showSavedForms, setShowSavedForms] = useState(false);
  const [showRecentForms, setShowRecentForms] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const navigate = useNavigate();

  const inputs = [
    { label: "First Name", type: "text", placeholder: "Enter text" },
    { label: "Last Name", type: "text", placeholder: "Enter text" },
    { label: "Address", type: "text", placeholder: "Enter text" },
    { label: "Email", type: "email", placeholder: "Enter email" },
    { label: "Phone Number", type: "tel", placeholder: "Enter phone number" },
    { label: "Password", type: "password", placeholder: "Enter password" },
    { label: "Checkbox", type: "checkbox", placeholder: "Select checkbox" },
    { label: "Radio Button", type: "radio", placeholder: "Select an option" },
    {
      label: "Dropdown",
      type: "dropdown",
      options: ["Option 1", "Option 2", "Option 3"],
      placeholder: "Choose an option",
    },
    { label: "File Upload", type: "file", placeholder: "Upload a file" },
    { label: "Date Picker", type: "date", placeholder: "Select a date" },
    { label: "Range Slider", type: "range", placeholder: "Select range" },
    
  ];

  useEffect(() => {
    const storedForms = JSON.parse(localStorage.getItem("savedForms"));
    if (storedForms) {
      setSavedForms(storedForms);
    }
  }, []);

  const onDragStart = (e, index) => {
    setDraggingIndex(index);
  };

  const onDragOver = (e, index) => {
    e.preventDefault();
    if (draggingIndex === index) return;

    const updatedElements = [...formElements];
    const [draggedElement] = updatedElements.splice(draggingIndex, 1);
    updatedElements.splice(index, 0, draggedElement);
    setFormElements(updatedElements);
    setDraggingIndex(index);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDraggingIndex(null);
  };

  const onSidebarDragStart = (e, input) => {
    e.dataTransfer.setData("input", JSON.stringify(input));
  };

  const onFormAreaDrop = (e) => {
    e.preventDefault();
    const input = JSON.parse(e.dataTransfer.getData("input"));
    setFormElements([...formElements, input]);
  };

  const handleCreate = () => {
    if (!formTitle.trim()) {
      alert("Please enter a title for the form.");
      return;
    }

    localStorage.setItem("formElements", JSON.stringify(formElements));
    localStorage.setItem("formTitle", formTitle);
    const recentForm = { title: formTitle, form: formElements, timestamp: new Date().toLocaleString() };
    setRecentForms([recentForm, ...recentForms].slice(0, 5));
    setShowRecentForms(true);
    setFormElements([]);
    setFormTitle("");
    navigate("/preview");
  };

  const handleSaveForm = () => {
    if (!formTitle.trim()) {
      alert("Please enter a title for the form.");
      return;
    }
    if (editingIndex !== null) {
      const updatedSavedForms = [...savedForms];
      updatedSavedForms[editingIndex] = { title: formTitle, form: formElements };
      setSavedForms(updatedSavedForms);
      setEditingIndex(null);
    } else {
      const newSavedForms = [...savedForms, { title: formTitle, form: formElements }];
      setSavedForms(newSavedForms);
      localStorage.setItem("savedForms", JSON.stringify(newSavedForms));
    }
    setFormElements([]);
    setFormTitle("");
  };

  const handleShowSavedForms = () => {
    setShowSavedForms(!showSavedForms);
    setShowRecentForms(false);
  };

  const handleEditSavedForm = (index) => {
    const formToEdit = savedForms[index];
    setFormElements(formToEdit.form);
    setFormTitle(formToEdit.title);
    setEditingIndex(index);
    setShowSavedForms(false);
  };

  const handleDeleteSavedForm = (index) => {
    const updatedSavedForms = savedForms.filter((_, i) => i !== index);
    setSavedForms(updatedSavedForms);
    localStorage.setItem("savedForms", JSON.stringify(updatedSavedForms));
  };

  const handleDelete = (index) => {
    const updatedElements = formElements.filter((_, i) => i !== index);
    setFormElements(updatedElements);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-blue-100 to-indigo-200 flex items-center justify-center">
      <div className="flex bg-white shadow-lg rounded-lg w-4/5 max-w-5xl">
        <Sidebar
          showSavedForms={showSavedForms}
          showRecentForms={showRecentForms}
          savedForms={savedForms}
          recentForms={recentForms}
          handleEditSavedForm={handleEditSavedForm}
          handleDeleteSavedForm={handleDeleteSavedForm}
          handleShowSavedForms={handleShowSavedForms}
          inputs={inputs}
          onSidebarDragStart={onSidebarDragStart}
        />
        <FormArea
          formTitle={formTitle}
          setFormTitle={setFormTitle} 
          formElements={formElements}
          setFormElements={setFormElements} 
          onFormAreaDrop={onFormAreaDrop}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
          handleDelete={handleDelete}
        />
        <ActionButtons
          handleSaveForm={handleSaveForm}
          handleShowSavedForms={handleShowSavedForms}
          showSavedForms={showSavedForms}
          handleCreate={handleCreate}
        />
      </div>
    </div>
  );
};

export default FormBuilderPage;
