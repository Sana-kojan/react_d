import { Button, Checkbox, Form, Input } from 'antd';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import {
    useParams,
    useNavigate,
    useLocation,
  } from "react-router-dom";


export function Login(props)  {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    let navigate = useNavigate();
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const Loginfun = async () => {
    try {
   
      const res = await axios.post("http://127.0.0.1:8000/api/token/", {
        username: username,
        password: password,
      });
      const token = res.data.access
      localStorage.setItem('token', token);

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      navigate("/jira",{token:{token}})
      
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
    
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
        
      >
        <Input 
          onChange={(e) => {
            setUsername(e.target.value);
          }}/>
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password
         onChange={(e) => {
            setPassword(e.target.value);
          }} />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit"
        onClick={(e) => {
            Loginfun(username,password);
          }}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;