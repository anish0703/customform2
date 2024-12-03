import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PreviewPage = () => {
  const [formTitle, setFormTitle] = useState("");
  const [formElements, setFormElements] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFormElements = JSON.parse(localStorage.getItem("formElements"));
    const storedFormTitle = localStorage.getItem("formTitle");
    if (storedFormElements) setFormElements(storedFormElements);
    if (storedFormTitle) setFormTitle(storedFormTitle);
  }, []);

  
  const validatePassword = (password) => {
    const minPasswordLength = 6;
    const maxPasswordLength = 12;

    if (password.length < minPasswordLength) {
      return `Password must be at least ${minPasswordLength} characters.`;
    }
    if (password.length > maxPasswordLength) {
      return `Password cannot exceed ${maxPasswordLength} characters.`;
    }
    return "";
  };

  
  const validateField = (element, value) => {
    switch (element.type) {
      case "email":
        if (!/\S+@\S+\.\S+/.test(value)) return "Please enter a valid email address.";
        break;
      case "number":
        if (isNaN(value)) return "Please enter a valid number.";
        break;
      case "text":
      case "tel":
      case "date":
        if (!value) return `${element.label} is required.`;
        break;
      case "password":
        return validatePassword(value);
      default:
        return "";
    }
    return "";
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    let errors = {};

    
    formElements.forEach((element) => {
      const value = data[element.label];
      const error = validateField(element, value);
      if (error) errors[element.label] = error;
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const submittedData = { title: formTitle, formData: data };
    localStorage.setItem("submittedFormData", JSON.stringify(submittedData));

    setFormSubmitted(true);

    
    setTimeout(() => {
      alert("Form submitted successfully!");
      navigate("/form-builder");
    }, 1000);
  };

  
  const renderFormElement = (element, index) => {
    const commonProps = {
      name: element.label,
      placeholder: element.placeholder,
      className: "w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300",
    };

    const error = formErrors[element.label];

    switch (element.type) {
      case "text":
      case "email":
      case "number":
      case "tel":
      case "date":
        return (
          <div>
            <input {...commonProps} type={element.type} required />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        );
      case "password":
        return (
          <div>
            <input {...commonProps} type="password" required />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        );
      case "checkbox":
        return (
          <div>
            <input type="checkbox" name={element.label} className="rounded border-gray-300" />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        );
      case "radio":
        return (
          <div>
            <input type="radio" name={element.label} className="rounded border-gray-300" />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        );
      case "dropdown":
        return (
          <div>
            <select name={element.label} {...commonProps}>
              {element.options?.map((option, i) => (
                <option key={i} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        );
      case "file":
        return (
          <div>
            <input type="file" {...commonProps} />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        );
      case "range":
        return (
          <div>
            <input
              type="range"
              name={element.label}
              min={element.min || 0}
              max={element.max || 100}
              step={element.step || 1}
              className="w-full"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        );
      default:
        return null;
    }
  };

  
  const handleDelete = () => {
    localStorage.removeItem("formElements");
    localStorage.removeItem("formTitle");
    localStorage.removeItem("submittedFormData");

    
    const deletedData = { title: formTitle, formElements: formElements };
    localStorage.setItem("deletedFormData", JSON.stringify(deletedData));

    navigate("/form-builder");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
      <div className="w-4/5 max-w-3xl bg-white shadow-lg rounded-lg p-8">
        {formTitle && <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">{formTitle}</h1>}
        {formSubmitted && (
          <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-4">Form submitted successfully!</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {formElements.map((element, index) => (
            <div key={index} className="mb-4">
              <label className="block font-medium text-gray-700 mb-2">{element.label}</label>
              {renderFormElement(element, index)}
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:ring focus:ring-blue-300"
          >
            Submit
          </button>
        </form>
        <button
          onClick={handleDelete}
          className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:ring focus:ring-red-300"
        >
          Delete Form
        </button>
      </div>
    </div>
  );
};

export default PreviewPage;
