import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { FiRefreshCw } from 'react-icons/fi';

const AboutI = (props) => {

    const [iCourseID, setICourseID] = useState("");
    const [buttond, setbuttond] = useState("1");
    const [datai, setDataI] = useState();

    const buttonClicked = () => {
        console.log("button clicked");
        if (buttond === "1") {
            setbuttond("0");
        }
        else {
            setbuttond("1");
        }
    };
    const getDataI = async (req, res) => {
        try {

            const resp = await fetch("/abouti", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log(resp);
            return resp.json();
            // console.log(resp);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDataI()
            .then((resp) => {
                setDataI(resp);
                console.log(resp);
            }).catch((e) => {
                console.log(e.message)
            });
    }, [buttond]);



    // logic instructor
    const getCourseIDI = (e) => {
        var courseid = e.target.value;
        setICourseID(courseid);
    }

    const handleSubmitI = async (e) => {
        e.preventDefault();
        const courseID = iCourseID;
        const email = props.emailWeGot;
        //logic
        const res = await fetch("/abouti", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ courseID, email })
        });

        if (res.status === 201) {
            window.alert("Course Added for offering.. ")
        }
        else {
            window.alert("Course Add operaton Failed.. Try Again");
        }
    }



    return (
        <>
            <Container style={{ "fontSize": "20px", "marginTop": "12px" }}>

                <h1> NinHao!! <br /> Email: {props.emailWeGot} <br /> </h1>
                <h2>Role: Instructor</h2>
                <br />  <br />

                <form method="POST">
                    <div className="form-group">
                        <label htmlFor="course">Add Course</label>
                        <input type="text" className="form-control" id="course" value={iCourseID} name='course' placeholder="CS305" onChange={getCourseIDI} />
                    </div>

                    <div className="form-group">
                        <input className="btn btn-primary" type="submit" name="Add" id="AddI" value="Add" onClick={handleSubmitI} />
                    </div>
                </form>

                <h3>Course Offered by you:  <FiRefreshCw className='float-right' onClick={buttonClicked} /></h3>
                
                <ul className='list-group'>
                    {datai && datai.map((d) => <li className='list-group-item' key={d.courseID}>{d.courseID} </li>)}
                </ul>

                
        </Container>

        </>
    );
}

export default AboutI;