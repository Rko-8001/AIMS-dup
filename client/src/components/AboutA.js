import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { FiRefreshCw } from 'react-icons/fi';

const AboutA = (props) => {

  const [aCourseID, setACourseID] = useState("");
  const [aor, setAor] = useState("");
  const [studentIDA, setStudentIDA] = useState("");
  const [buttond, setbuttond] = useState("1");
  const [dataA, setDataA] = useState();


  const buttonClicked = () => {
    // console.log("button clicked");
    if (buttond === "1") {
      setbuttond("0");
    }
    else {
      setbuttond("1");
    }
  };


  const getDataA = async (req, res) => {
    try {

      const resp = await fetch("/abouta", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
      // console.log(resp);
      return resp.json();
      // console.log(resp);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDataA()
      .then((resp) => {
        setDataA(resp);
        console.log(resp);
      }).catch((e) => {
        console.log(e.message)
      });
  }, [buttond]);

  // logic Advisor..
  const getCourseIDA = (e) => {
    var courseid = e.target.value;
    setACourseID(courseid);
  }
  const getStudentIDA = (e) => {
    setStudentIDA(e.target.value);
  }
  const getAor = (e) => {
    setAor(e.target.value);
  }


  const handleSubmitA = async (e) => {
    e.preventDefault();
    const courseID = aCourseID;
    const email = props.emailWeGot;
    const studentID = studentIDA;
    const toDo = aor;

    //logic
    const res = await fetch("/abouta", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ courseID, email, studentID, toDo })
    });

    if (res.status === 201) {
      window.alert("Student Rejected.");
    }
    else if (res.status === 202) {
      window.alert("Student Approved..");
    }
    else {
      window.alert("Enrolling Failed.. Try Again");
    }
  };

  return (
    <>
      <Container style={{ "fontSize": "20px", "marginTop": "12px" }}>

        <h1> NinHao!! <br /> Email: {props.emailWeGot} <br /> </h1>
        <h2>Role: Advisor</h2>
        <br />  <br />

        <form method="POST">
          <div className="form-group">
            <label htmlFor="courseida">Course ID</label>
            <input type="text" className="form-control" id="courseida" value={aCourseID} name='courseida' placeholder="CS305" onChange={getCourseIDA} />
          </div>

          <div className="form-group">
            <label htmlFor="ids">Student Mail</label>
            <input type="text" className="form-control" id="ids" value={studentIDA} name='ids' placeholder="team12-dep@iitrpr.ac.in" onChange={getStudentIDA} />
          </div>

          <div className="form-group">
            <label htmlFor="optiona">Approve or Reject:</label>
            <select className="form-control" name="optiona" id="optiona" value={aor} onChange={getAor} >
              <option>Choose Option..</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
          </div>

          <div className="form-group">
            <input className="btn btn-primary" type="submit" name="option" id="Adda" value="Approve or Reject" onClick={handleSubmitA} />
          </div>
        </form>

        <br />
        <br />

        <h3>Student Info:   <FiRefreshCw className='float-right' onClick={buttonClicked} /> </h3>
         <ul className='list-group list-group-flush'>
          {dataA && dataA.map( function(d){
            if(d.statusInfo && d.statusInfo.charAt(0) == "0") {
              return <li className='list-group-item'>{d.statusInfo.substring(1)}  <span className="float-right">Course: {d.courseID}</span> </li>
            }
          })}
        </ul>
      </Container>

    </>
  );
}

export default AboutA;