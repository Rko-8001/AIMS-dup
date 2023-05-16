import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { FiRefreshCw } from 'react-icons/fi';
const AboutS = (props) => {

    const [sCourseID, setSCourseID] = useState("");
    const [buttond, setbuttond] = useState("1");
    const [data, setData] = useState();

    
    const buttonClicked = () => {
        console.log("button clicked");
        if (buttond === "1") {
            setbuttond("0");
        }
        else {
            setbuttond("1");
        }
    };
    const getData = async (req, res) => {
        try {

            const resp = await fetch("/abouts", {
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
        getData()
            .then((resp) => {
                setData(resp);
                console.log(resp);
            }).catch((e) => {
                console.log(e.message)
            });
    }, [buttond]);
    // }, []);

    // logic student
    const getCourseIDS = (e) => {
        var courseid = e.target.value;
        setSCourseID(courseid);
    }

    const handleSubmitS = async (e) => {
        e.preventDefault();
        const courseID = sCourseID;
        const email = props.emailWeGot;
        //logic
        const res = await fetch("/abouts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ courseID, email })
        });
        // console.log(res);
        if (res.status === 201) {
            window.alert("Requested for enroll. ");
        }
        else {
            window.alert("Enrolling Failed.. Try Again");
        }
    }


    return (
        <>
            <Container style={{ "fontSize": "20px", "marginTop": "12px" }}>

                <h1> NinHao!! <br /> Email: {props.emailWeGot} <br /> </h1>
                <h2>Role: Student</h2>
                <br />  <br />


                <form method="POST">
                    <div className="form-group">
                        <label htmlFor="enroll">Course ID</label>
                        <input type="text" className="form-control" id="enroll" value={sCourseID} name='enroll' placeholder="CS305" onChange={getCourseIDS} />
                    </div>

                    <div className="form-group">
                        <input className="btn btn-primary" type="submit" name="Adds" id="Adds" value="Enroll" onClick={handleSubmitS} />
                    </div>
                </form>

                <br />
                <br />


                <h3>Course Offered:   <FiRefreshCw className='float-right' onClick={buttonClicked} /> </h3>
                <ul className='list-group list-group-flush'>
                    {data && data.map( (d) => <li className='list-group-item' key={d.courseID}>{d.courseID} 
                    <div>2020csb1143@iitrpr.ac.in</div></li>)}
                </ul>
            </Container>



        </>
    );
}

export default AboutS;