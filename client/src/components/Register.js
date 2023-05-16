
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';


const Register = () => {

    // const [name, setName] = useState("");
    // const [entryNo, setEntryNo] = useState("");
    // const [mail, setMail] = useState("");
    // const [password, setPassword] = useState(""); 
    // const [cpassword, setCpassword] = useState(""); 
    // const [otp, setOtp] = useState("");
    // const [role, setRole] = useState("");

    const navigate = useNavigate();
    const [userData, setData] = useState({
        name: "",
        entryNo: "",
        email: "",
        password: "",
        cpassword: "",
        otp: "",
        role: ""
    });

    const handleChange = (e) => {

        setData(userData => ({
            ...userData,
            [e.target.name]: e.target.value
        }));

        // console.log(userData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const mssg = "nototp";
        const { name, entryNo, email, password, cpassword, otp, role } = userData;

        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, entryNo, role, password, cpassword, otp, mssg
            })
        });
        //logic
        const data = await res.json();
        if (res.status === 422 || !data) {
            window.alert("Invalid Registration..");
            console.log("invalid");
        }
        else {
            window.alert("Registration.. Success. You can login now..");
            // console.log("valid");
            navigate('/login');
        }

    }
    const requestOtp = async (e) => {
        e.preventDefault();
        const mssg = "otp";
        const { name, entryNo, email, password, cpassword, otp, role } = userData;

        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, entryNo, role, password, cpassword, otp, mssg
            })
        });
        //logic
        const data = await res.json();

        if(res.status === 422 || !data){
            window.alert(" Galat hai");
        }
        else{
            window.alert("OTP Sent to your " + email);
        }

        
    }
    return (
        < div className="mt-12">
            <Container style={{ "fontSize": "20px" }}>
                <form method="POST">

                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" className="form-control" id="name" name="name" placeholder="Team12" value={userData.name} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="entryNo">EntryNo:</label>
                        <input type="text" className="form-control" id="entryNo" name="entryNo" placeholder="T-12" value={userData.entryNo} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" className="form-control" id="email" name='email' placeholder="dep-T12@iitrpr.ac.in" value={userData.email} onChange={handleChange} />
                    </div>

                    <div className="form-group ">
                        <input className="btn btn-primary" type="submit" name="getotp" id="getotp" value="Get OTP" onClick={requestOtp} />
                    </div>

                    <div className="form-group row ml-1 mt-3">
                        <div className='mr-4'>
                            <label htmlFor="password">Password</label>
                            <input className="form-control" id="password" name="password" type="password" placeholder='******' value={userData.password} onChange={handleChange} />
                        </div>
                        <div className='mr-4'>
                            <label htmlFor="cpassword">Confirm Password:</label>
                            <input className="form-control" id="cpassword" name="cpassword" type="password" placeholder="******" value={userData.cpassword} onChange={handleChange} />
                        </div>
                        <div className='mr-4'>
                            <label htmlFor="otp">OTP</label>
                            <input className="form-control" id="otp" name="otp" type="text" placeholder='123456' value={userData.otp} onChange={handleChange} />
                        </div>
                        <div className='mr-4'>
                            <label htmlFor="role">Role:</label>
                            <select className="form-control" name="role" id="role" value={userData.role} onChange={handleChange} >
                                <option>Student</option>
                                <option>Advisor</option>
                                <option>Prof</option>
                            </select>
                        </div>

                    </div>

                    <div className="form-group">
                        <input className="btn btn-primary" type="submit" name="register" id="register" value="Register" onClick={handleSubmit} />
                    </div>
                </form>
            </Container>
        </div>
    );
}

export default Register;