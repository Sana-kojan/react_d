//import { Col, Divider, Row } from 'antd';
import { Form, Input, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space, Typography } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {Sprint} from './sprint';

export function Issues(props) {
  const [type, setType] = useState("Task");
  const [description, setDescription] = useState("");
  const [id, setID] = useState();
  const [status, setStatus] = useState("");
  const [sprint, setSprint] = useState();
  const [issue, setIssue] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://127.0.0.1:8000/jira/");
        console.log(res.data);
        setIssue(res.data);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };
   
    fetchData();
    
   
  }, []);

  const CreateIssue = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjo0ODE1NDUyOTgzLCJpYXQiOjE2NjE4NTI5ODMsImp0aSI6ImEwYmQyNmQ1YmEzZTQyYTg5NTNiMmI1OTU4YTc3NDI3IiwidXNlcl9pZCI6MX0.EfH6g4wg7UXrXulu4-JtX4tWG9-5BtozZU6AiRl8vnY"}` }
    };
      const res = await axios.post("http://127.0.0.1:8000/jira/", {
        type: type ,
        description: description,
        status: status ,
        sprint: sprint ,
      },config);
      if (res.data.sprint != null){
    const newSprint = [...props.sprintsList];
      const foundSprint = newSprint.find(element => element.id == sprint);
      foundSprint.issues.push(res.data)
      props.setSprints(newSprint);}
      else{
        const OldArray = [...issue];
      OldArray.push(res.data);
      setIssue(OldArray);
      }
      
    } catch (error) {
      console.error(error.message);
    }
  };

  const UpdateIssue = async (id, value, key) => {
    try {
      const res = await axios.patch("http://127.0.0.1:8000/jira/", {
        key: key,
        value: value,
        id: id,
      });
      
      const index = issue.findIndex((obj) => {
        if (obj.id === parseInt(id)) {
          return true;
        }
      });

      if(key == "sprint_id"){
        const newSprint = [...props.sprintsList];
        const foundSprint = newSprint.find(element => element.id == value);
        console.log(newSprint);
        //console.log(foundSprint,sprint);
        foundSprint.issues.push(res.data);
        props.setSprints(newSprint);
        const newIssue = [...issue];
        newIssue.splice(index,1);
        setIssue(newIssue);
        
      }
      else{
        const newIssue = [...issue];
        newIssue[index] = res.data;
        setIssue(newIssue);
        props.UpdateSprint();
      }
      
    } catch (error) {
      console.error(error.message);
    }
  };

  
  const deleteIssue = async (id) => {
    try {
      const res = await axios.delete(`http://127.0.0.1:8000/jira/${id}/`, {});
      const index = issue.findIndex((obj) => {
        if (obj.id === parseInt(id)) {
          return true;
        }
      });
      const newIssue = [...issue];
      newIssue.splice(index, 1);
      setIssue(newIssue);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <div>
        <p>Issues</p>
        {loading && <div>Loading</div>}
        {!loading && (
          <div>
            {issue.map((item) => (
              <>
                <select
                  name="type"
                  id="type"
                  defaultValue={item.type}
                  onClick={(e) => {
                    UpdateIssue(item.id, e.target.value, e.target.name);
                  }}
                >
                  <option value="Task">Task</option>
                  <option value="Bug">Bug</option>
                  <option value="Feature">Feature</option>
                </select>
                
                {`${item.description}`}
                <select
                  name="status"
                  id="status"
                  defaultValue={item.status}
                  onClick={(e) => {
                    UpdateIssue(item.id, e.target.value, e.target.name);
                  }}
                >
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                  <option value="Done">Done</option>
                </select>

                <select
                  name="sprint_id"
                  id="sprint_id"
                  defaultValue=""
                  onClick={(e) => {
                    UpdateIssue(item.id, parseInt(e.target.value), e.target.name);
                  }}
                >
                   <option value=""></option>
                  {
                  props.sprintsList.map((option, index) => (
          <option key={index} value={option.id}>
            {option.name}
          </option>
        ))}
                </select>

                <div onClick={() => deleteIssue(item.id)}>x</div>
              </>
            ))}
          </div>
        )}
      </div>
      <div>
        <Form className="login-form">
          <Form.Item>
            <select
              name="types"
              id="types"
              onClick={(e) => {
                setType(e.target.value);
              }}
            >
              <option value="Task">Task</option>
              <option value="Bug">Bug</option>
              <option value="Feature">Feature</option>
            </select>
          </Form.Item>

          <Form.Item>
            <Input
              placeholder="Description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item>
            <select
              name="status"
              id="status"
              onClick={(e) => {
                setStatus(e.target.value);
              }}
            >
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
              <option value="Done">Done</option>
            </select>
          </Form.Item>

          <Form.Item>
          <select
                  name="sprint"
                  id="sprint"
                  //defaultValue={item.sprint}
                  onClick={(e) => {
                    setSprint(parseInt(e.target.value));
                  }}
                >
                  <option value=""></option>
                  {props.sprintsList.map((option, index) => (
          <option key={index} value={option.id}>
            {option.name}
          </option>
        ))}
                </select>
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            onClick={() => CreateIssue()}
          >
            Create
          </Button>

          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            onClick={() => UpdateIssue()}
          >
            Update
          </Button>
        </Form>
      </div>

    </>
  );
}

export default Issues;
