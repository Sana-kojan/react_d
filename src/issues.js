import { Form, Input, Button , Select, Modal} from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space, Typography ,Collapse } from "antd";
import React, { useState, useEffect } from "react";
import { DeleteOutlined, EditOutlined   } from "@ant-design/icons";
import axios from "axios";
import {
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Image } from 'antd';


export function Issues(props) {
  const [type, setType] = useState("Task");
  const [description, setDescription] = useState("");
  const [id, setID] = useState();
  const [status, setStatus] = useState("");
  const [assignedUser, setAssignedUser] = useState();
  const [token, setToken] = useState("");
  const [sprint, setSprint] = useState();
  const [issue, setIssue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModel, setIsEditModel] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    CreateIssue();
    setIsModalVisible(false);
  };

  const handleOk2 = () => {
    setIsModalVisible(false);
  };


  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const { Option } = Select;
  const { Panel } = Collapse;

  let navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
      
        if(axios.defaults.headers.common['Authorization'] == null){
          navigate("/")
        }
        else{
        
        const res = await axios.get("http://127.0.0.1:8000/jira/");
        setIssue(res.data);}
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };
   
    fetchData();
  
   
  }, []);

  const CreateIssue = async () => {
    try {
      setLoading(true);
      const res = await axios.post("http://127.0.0.1:8000/jira/", {
        type: type ,
        description: description,
        status: status ,
        sprint: sprint ,
        user: assignedUser,
      });
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
    setLoading(false);
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
          <div style={{width: 900,  
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 'auto',
        marginRight: 'auto'
          }}>
            <Collapse className="p-1"  style={{  
       display: 'flex',
       justifyContent: 'center',
       alignItems: 'center',
       marginBottom: 5
        
      }}>
      <Panel header="Backlog" key="1" type="flex" align="middle" style={{width: 1100,}}>
      <div 
                style={{  
                  marginBottom: 5,
                  display: 'flex',
                  justifyContent: 'center',
                  columnGap: 50,
                  rowGap: 20,
                  flexDirection: 'column',

                }}>
      
            {issue.map((item) => (
            <div  style={{  
              display: 'flex',
              justifyContent: 'center',
              columnGap: 20,
              rowGap: 30,
              
            }}
            
            >
                <Select
                  name="type"
                  id="type"
                  style={{
                  minWidth: 60,  
                  }
                  }
                  defaultValue={item.type}
                  onSelect={(value) => {
                    props.UpdateIssue(item.id, value, "type");
                  }}
                >
                   <Option style={{
                  minWidth: 60,  
                  }
                  }value="Task" ><img className="mx-2" src="https://ordable.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium" width="16px" height="16px" alt="Task"/>Task</Option>
              <Option style={{
                  minWidth: 60,  
                  }
                  }value="Bug"><img className="mx-2" src="https://ordable.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10303?size=medium" width="16px" height="16px" alt="Bug"/>Bug</Option>
              <Option style={{
                  minWidth: 60,  
                  }
                  }value="Feature"><img className="mx-2" src="https://ordable.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10321?size=medium" width="16px" height="16px" alt="Feature"/>Feature</Option>
            
                </Select>
                
                {`${item.description}`}
                <Select
                  name="status"
                  id="status"
                  defaultValue={item.status}
                  onSelect={(value) => {
                    props.UpdateIssue(item.id, value, "status");
                  }}
                >
                  <Option value="In Progress">In Progress</Option>
                  <Option value="Closed">Closed</Option>
                  <Option value="Done">Done</Option>
                </Select>

                <Select
                  name="sprint_id"
                  id="sprint_id"
                  defaultValue=""
                  onChange={(value) => {
                    props.UpdateIssue(item.id, parseInt(value), "sprint_id");
                  }}
                >
                   <Option value=""></Option>
                  {
                  props.sprintsList.map((option, index) => (
          <Option key={index} value={option.id}>
           
            {option.name}
          </Option>
        ))}
                </Select>

                <Select
                  name="user_id"
                  id="user_id"
                  defaultValue=""
                  style={{width: 300}}
                  onSelect={(value) => {
                    props.UpdateIssue(item.id, value, "user_id");
                  }}
                >
                   <Option value=""></Option>
                  {
                  props.users.map((option, index) => (
          <Option key={index} value={option.id}>
             <Avatar className="mx-1"> {option.username[0]}</Avatar>
            {option.username}
          </Option>
        ))}
                </Select>
                <EditOutlined onClick={() => {showModal() ;setIsEditModel(true)}}/>
                <DeleteOutlined onClick={() => deleteIssue(item.id)}/>
              </div>
            ))}
            </div>
            </Panel></Collapse>
          </div>
        )}
      </div>
      <div>
      
      <Modal title="Create Issue" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form className="create Issue-form">
          <Form.Item>
            Issue Type
            <Select
            className="mt-2"
              name="types"
              id="types"
              placeholder="Type"
                
              onSelect={(value) => {
                setType(value);
              }}
              rules={[
                {
                  required: true,
                  message: 'Please Choose the Issue Type!',
                },
              ]}
            >
              <Option  value="Task"><img className="mx-1"  src="https://ordable.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium" width="16px" height="16px" alt="Task"/>Task</Option>
              <Option value="Bug"><img className="mx-1"  src="https://ordable.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10303?size=medium" width="16px" height="16px" alt="Bug"/>Bug</Option>
              <Option  value="Feature"><img className="mx-1"  src="https://ordable.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10321?size=medium" width="16px" height="16px" alt="Feature"/>Feature</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            Summary
            <Input
            className="mt-2"
              placeholder="Description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              rules={[
                {
                  required: true,
                  message: 'Please Enter Issue Description!',
                },
              ]}
            />
          </Form.Item>
          <Form.Item>
            Status
            <Select
            className="mt-2"
              name="status"
              id="status"
              placeholder="Status"
              onSelect={(value) => {
                setStatus(value);
              }}
            >
              <Option value="In Progress">In Progress</Option>
              <Option value="Closed">Closed</Option>
              <Option value="Done">Done</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            Sprint
          <Select
          className="mt-2"
                  name="sprint"
                  id="sprint"
                  placeholder="Sprint"
                  onSelect={(value) => {
                    setSprint(parseInt(value));
                  }}
                >
                  <Option value=""></Option>
                  {props.sprintsList.map((option, index) => (
          <Option key={index} value={option.id}>
            
            {option.name}
          </Option>
        ))}
                </Select>
          </Form.Item>

          <Form.Item>
            Assign to
          <Select className="mt-2"
                  name="user_id"
                  id="user_id"
                  placeholder="Assign to"
                  onSelect={(value) => {
                    setAssignedUser(parseInt(value));
                  }}
                >
                  <Option value=""></Option>
                  {props.users.map((option, index) => (
          <Option key={index} value={option.id}>
            <Avatar className="mx-1"> {option.username[0]}</Avatar>
            {option.username}
          </Option>
        ))}
                </Select>
          </Form.Item>

        </Form>
      

      </Modal>

          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ 
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 'auto',
          marginRight: 'auto'
            }}
            onClick={() => showModal()}
          >
            Create Issue
          </Button>
      </div>

    </>
  );
}

export default Issues;
