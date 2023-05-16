import Container from 'react-bootstrap/Container';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = (props) => {
  const navigate = useNavigate();
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [otpLogin, setOtpLogin] = useState("");

  const getMail = (e) => {
    const emailid = e.target.value;
    setMail(emailid);
  };
  const getPassword = (e) => {
    const passworde = e.target.value;
    setPassword(passworde);
  };

  const getotpLogin = (e) => {
    setOtpLogin(e.target.value);
  }

  const requestOtp = async (e) => {
    e.preventDefault();
    const mssg = "otp";
    const otp  = otpLogin;

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password, mssg, otp})
    });
    //logic
    const data = await res.json();

    if (res.status === 422 || !data) {
      window.alert(" Galat hai");
    }
    else {
      window.alert("OTP Sent to your " + email);
    }
  }

  const handleSubmit = async (e) => {
    // console.log("haa, submit ni hua");
    e.preventDefault();
    const mssg = "notOTp";
    const otp = otpLogin;
    // logic 

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password, mssg, otp})
    });
    console.log(res.status);

    // const data = await res.json();

    if (res.status === 422) {
      window.alert("Invalid login");
    }
    else {
      window.alert("Logged In..");
      props.getLoginEmail(email);

      if (res.status === 200) {
        navigate('/abouts');
      }
      else if (res.status === 201) {
        navigate('/abouta');
      }
      else {
        navigate('/abouti');
      }
    }

  }
  return (
    <>
      < div className="mt-12">
        <h1 className='text-center'>
          Login
        </h1>
        <Container style={{ "fontSize": "20px", "marginTop": "12px" }}>
          <form method="POST">
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" className="form-control" id="email" name='email' value={email} placeholder="dep-T12@iitrpr.ac.in " onChange={getMail} />
            </div>

            <div className="form-group ">
              <label htmlFor="password">Password</label>
              <input className="form-control" id="password" name="password" type="password" value={password} placeholder='******' onChange={getPassword} />
            </div>

            <div className="form-group ">
              <input className="btn btn-primary" type="submit" name="getotpl" id="getotpl" value="Get OTP" onClick={requestOtp} />
            </div>
            <div className='form-group'>
              <label htmlFor="otpl">OTP</label>
              <input className="form-control" id="otpl" name="otpl" type="text" placeholder='123456' value={otpLogin} onChange={getotpLogin} />
            </div>
            <div className="form-group">
              <input className="btn btn-primary" type="submit" name="login" id="login" value="Log In" onClick={handleSubmit} />
            </div>
          </form>

        </Container>
      </div>
    </>
  );
}

export default Login;