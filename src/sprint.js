import { Form, Input, Button } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {Issues} from './issues';
import { Select, Modal} from "antd";
import { DeleteOutlined,EditOutlined} from "@ant-design/icons";
import { Dropdown, Menu, Space, Typography ,Collapse } from "antd";
import {
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Image, Table  } from 'antd';


export function Sprint(props) {
  const [name, setName] = useState("");
  const [id, setID] = useState();
  const [sprints, setSprints] = useState([]);
  const [issue, setIssue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [users, setUsers] = useState([]);


  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    CreateSprint();
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://127.0.0.1:8000/jiraSprint/");
        console.log(res.data);
        setSprints(res.data);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };

    fetchData();
    GetUsers();
  }, []);

  const CreateSprint = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/jiraSprint/", {
        name: name,
      });
      console.log(res.data);
      const OldArray = [...sprints];
      OldArray.push(res.data);
      setSprints(OldArray);
    } catch (error) {
      console.error(error.message);
    }
  };

  const UpdateSprint = async (id) => {
    try {
      const res = await axios.patch("http://127.0.0.1:8000/jiraSprint/", {
        issues:issue,
        id: id,
      });
      const index = sprints.findIndex((obj) => {
        if (obj.id === parseInt(id)) {
          return true;
        }
      });
      const newSprint = [...sprints];
      newSprint[index] = res.data;
      setSprints(newSprint);
    } catch (error) {
      console.error(error.message);
    }
  };

  const GetUsers = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/users/");
      setUsers(res.data);}
    catch (error) {
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
        const newSprint = [...sprints];
        const foundSprint = newSprint.find(element => element.id == value);
        
        foundSprint.issues.push(res.data);
        setSprints(newSprint);
        const newIssue = [...issue];
        newIssue.splice(index,1);
        setIssue(newIssue);
      }
      else
      {
        const newIssue = [...issue];
        newIssue[index] = res.data;
        setIssue(newIssue);
      } } catch (error) {
        console.error(error.message);
      }
    };
  

  const deleteSprint = async (id) => {
    try {
      const res = await axios.delete(`http://127.0.0.1:8000/jiraSprint/${id}/`, {});
      const index = sprints.findIndex((obj) => {
        if (obj.id === parseInt(id)) {
          return true;
        }
    });
    const newSprint = [...sprints];
    newSprint.splice(index, 1);
    setSprints(newSprint);
} catch (error) {
    console.error(error.message);
}
  };
  if(loading) return <div>Loading</div>
console.log(sprints)
  return (
    <>
        <Issues sprintsList={sprints} setSprints={setSprints} token={props.token} UpdateIssue={UpdateIssue} users={users}/>
      <div style={{width: 900,  
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
           
     
        {loading && <div>Loading</div>}
        {!loading && (
          <div>
            <br/>
            {sprints.map((item) => (
              <>
               <Collapse className="p-1"  style={{  
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5
       
   
      }}>
               <Panel header={`${item.name}`}  type="flex" align="middle" style={{width: 900,}}>
                <div 
                 style={{  
                  marginBottom: 5,
      

                }}>
                  
            {
            item.issues.map((item2) => (
              <div  style={{  
                display: 'flex',
                justifyContent: "space-between",
               
                
              }}>
             
                 <Select
                 style={{
                  minWidth: 120,  
                  //flex:2
                }}
                  name="type"
                  id="type"
                  defaultValue={item2.type}
                  onSelect={(value) => {
                   UpdateIssue(item2.id, value, "type");
                  }}
                >
                   <Option value="Task" ><img className="mx-2" src="https://ordable.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10318?size=medium" width="16px" height="16px" alt="Task"/>Task</Option>
              <Option value="Bug"><img className="mx-2" src="https://ordable.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10303?size=medium" width="16px" height="16px" alt="Bug"/>Bug</Option>
              <Option value="Feature"><img className="mx-2" src="https://ordable.atlassian.net/rest/api/2/universal_avatar/view/type/issuetype/avatar/10321?size=medium" width="16px" height="16px" alt="Feature"/>Feature</Option>
            
                </Select>
                <div>
                {`${item2.description}`}
                </div>
                <Select
                  name="status"
                  id="status"
                  defaultValue={item2.status}
                  onSelect={(value) => {
                    UpdateIssue(item2.id, value, "status");
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
                  UpdateIssue(item2.id, parseInt(value), "sprint_id");
                  }}
                >
                   <Option value=""></Option>
                  {
                 sprints.map((option, index) => (
          <Option key={index} value={option.id}>
           
            {option.name}
          </Option>
        ))}
                </Select>

                <Select
                  name="user_id"
                  id="user_id"
                  defaultValue={item2.username}
                  style={{width: 300}}
                  onSelect={(value) => {
                  UpdateIssue(item2.id, value, "user_id");
                  }}
                >
                   <Option value=""></Option>
                  {
                  users.map((option, index) => (
          <Option key={index} value={option.id}>
             <Avatar className="mx-1"> {option.username[0]}</Avatar>
            {option.username}
          </Option>
        ))
      }
                </Select>

              </div>
            ))}
          </div>
          <DeleteOutlined onClick={() => deleteSprint(item.id)}/>
                </Panel>
                </Collapse>
              </>
            ))}
          </div>
        )}
        
      </div>
      <div>
      <Modal title="Create Sprint" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form className="login-form">
          <Form.Item>
            <Input
              placeholder="Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
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
            Create
          </Button>
       
      </div>
    </>
  );
}

export default Sprint;
