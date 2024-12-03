import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormBuilderPage from "./Pages/FormBuilderPage"
import PreviewPage from "./Pages/PreviewPage"

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<FormBuilderPage />} />
      <Route path="/form-builder" element={<FormBuilderPage />} />
      <Route path="/preview" element={<PreviewPage />} />
    </Routes>
  </Router>
);

export default App;
