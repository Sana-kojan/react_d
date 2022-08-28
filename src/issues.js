//import { Col, Divider, Row } from 'antd';
import { Form, Input, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space, Typography } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";

export function Issues() {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [id, setID] = useState();
  const [status, setStatus] = useState("");
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
      const res = await axios.post("http://127.0.0.1:8000/jira/", {
        type: type,
        description: description,
        status: status,
      });
      console.log(res.data);
      const OldArray = [...issue];
      OldArray.push(res.data);
      setIssue(OldArray);
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
      const newIssue = [...issue];
      newIssue[index] = res.data;
      setIssue(newIssue);
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
            <Input
              placeholder="ID"
              onChange={(e) => {
                setID(e.target.value);
              }}
            />
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

      {/* //     <div>
    //     <Divider orientation="left">Issues</Divider>
    //     <Row gutter={[16, 24]}>
    //     <div>
    //     {loading && <div>Loading</div>}
    //     {!loading && ( */}
      {/* //       <div>
    //         <ul>
    //           {issues.map((item) => (
       
    //             <>
                 
    //             </>
    //           ))}
    //         </ul>
    //       </div>
    //     )}
    //   </div>
    //       <Col className="gutter-row" span={6}>
    //         <div style={style}>col-6</div>
    //       </Col>
    //       <Col className="gutter-row" span={6}>
    //         <div style={style}>col-6</div>
    //       </Col>
    //       <Col className="gutter-row" span={6}>
    //         <div style={style}>col-6</div>
    //       </Col>
    //       <Col className="gutter-row" span={6}>
    //         <div style={style}>col-6</div>
    //       </Col>
    //       <Col className="gutter-row" span={6}>
    //         <div style={style}>col-6</div>
    //       </Col>
    //       <Col className="gutter-row" span={6}>
    //         <div style={style}>col-6</div>
    //       </Col>
    //       <Col className="gutter-row" span={6}>
    //         <div style={style}>col-6</div>
    //       </Col>
    //       <Col className="gutter-row" span={6}>
    //         <div style={style}>col-6</div>
    //       </Col>
    //     </Row>
    //     </div> */}
    </>
  );
}

export default Issues;
