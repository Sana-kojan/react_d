import "./App.css";
import { Form, Input, Button } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {Issues} from './issues';

function App() {
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [id, setID] = useState();
  // const [instrument, setInstrument] = useState("");
  // const [music, setMusic] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const res = await axios.get("http://127.0.0.1:8000/mus/");
  //       console.log(res.data);
  //       setMusic(res.data);
  //     } catch (error) {
  //       console.error(error.message);
  //     }
  //     setLoading(false);
  //   };

  //   fetchData();
  // }, []);

  // const CreateMus = async () => {
  //   try {
  //     const res = await axios.post("http://127.0.0.1:8000/mus/", {
  //       first_name: firstName,
  //       last_name: lastName,
  //       instrument: instrument,
  //     });
  //     console.log(res.data);
  //     const OldArray = [...music];
  //     OldArray.push(res.data);
  //     setMusic(OldArray);
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  // const UpdateMus = async () => {
  //   try {
  //     const res = await axios.patch("http://127.0.0.1:8000/mus/", {
  //       first_name: firstName,
  //       last_name: lastName,
  //       instrument: instrument,
  //       id: id,
  //     });
  //     const index = music.findIndex((obj) => {
  //       if (obj.id === parseInt(id)) {
  //         return true;
  //       }
  //     });
  //     const newMusic = [...music];
  //     newMusic[index] = res.data;
  //     setMusic(newMusic);
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  // const deleteMusic = async (id) => {
  //   try {
  //     const res = await axios.delete(`http://127.0.0.1:8000/mus/${id}/`, {
  //      // id: id,
  //     });
  //     const index = music.findIndex((obj) => {
  //       if (obj.id === parseInt(id)) {
  //         return true;
  //       }
  //     });
  //     const newMusic = [...music];
  //     newMusic.splice(index, 1); 
  //     setMusic(newMusic);
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  return (
    <div className="App">
      <Issues></Issues>
      {/* <div>
        {loading && <div>Loading</div>}
        {!loading && (
          <div>
            <ul>
              {music.map((item) => (
       
                <>
                  <li>{`${item.first_name} ${item.last_name}`}</li>
                  <div  onClick={() => deleteMusic(item.id)}>
              x
            </div>
                </>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Form className="login-form">
        <Form.Item>
          <Input
            placeholder="First Name"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          ,
        </Form.Item>
        <Form.Item>
          <Input
            placeholder="Last Name"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          ,
        </Form.Item>
        <Form.Item>
          <Input
            placeholder="Instrument"
            onChange={(e) => {
              setInstrument(e.target.value);
            }}
          />
          ,
        </Form.Item>

        <Form.Item>
          <Input
            placeholder="ID"
            onChange={(e) => {
              setID(e.target.value);
            }}
          />
          ,
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          onClick={() => CreateMus()}
        >
          Create
        </Button>

        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          onClick={() => UpdateMus()}
        >
          Update
        </Button>
      </Form> */}
      
    </div>
  );
}

export default App;
