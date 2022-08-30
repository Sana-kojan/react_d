import { Form, Input, Button } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {Issues} from './issues';

export function Sprint(props) {
  const [name, setName] = useState("");
  const [id, setID] = useState();
  const [sprints, setSprints] = useState([]);
  const [issue, setIssue] = useState([]);
  const [loading, setLoading] = useState(true);

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
  return (
    <>
        <Issues sprintsList={sprints} setSprints={setSprints} token={props.token}/>
        <p>Sprints</p>
    
      <div>
        {loading && <div>Loading</div>}
        {!loading && (
          <div>
            {sprints.map((item) => (
              <>
                {
                `${item.name}`}
                <div>
                    Issues
                    <br></br>
            {
            item.issues.map((item2) => (
              <>
                {
                `Type: ${item2.type}  Description: ${item2.description} Status: ${item2.status}`}
                <br></br>
              </>
            ))}
          </div>
                <div onClick={() => deleteSprint(item.id)}>x</div>
              </>
            ))}
          </div>
        )}
      </div>
      <div>
        <Form className="login-form">
          <Form.Item>
            <Input
              placeholder="Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Form.Item>
          
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            onClick={() => CreateSprint()}
          >
            Create
          </Button>
        </Form>
      </div>
    </>
  );
}

export default Sprint;
