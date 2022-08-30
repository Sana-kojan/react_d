import "./App.css";
import { Form, Input, Button } from "antd";
import React, { useState, useEffect } from "react";
import {Sprint} from './sprint';
import {Login} from './login';
import { Routes, Route, Link , BrowserRouter } from "react-router-dom";

function App() {

  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/jira" element={<Sprint />} />
      </Routes> 
      </BrowserRouter>
    </div>
  );
}

export default App;
