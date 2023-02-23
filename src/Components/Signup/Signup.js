import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogo from "../../Assets/Image/google.svg";
import { auth } from "../../Firebase/firebase.init";

const Signup = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState({ inputvalue: '', error: '' });
  const [password, setPassword] = useState({ inputvalue: '', error: '' });
  const [confirmPassword, setConfirmPassword] = useState({ inputvalue: '', error: '' });

  console.log(password, confirmPassword)

  const googleProvider = new GoogleAuthProvider();

  const handleGoogleAuth = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        console.log(user);
        navigate('/');
      })
      .catch(error => {
        const errorMessage = error.message;
        console.log(errorMessage);
      })
  }

  const handleSignUp = (event) => {
    event.preventDefault();

    if (email.inputvalue === '') {
      setEmail({ inputvalue: '', error: 'Email is required' })
    }
    if (password.inputvalue === '') {
      setPassword({ inputvalue: '', error: 'Password is required' })
    }


    if (email.inputvalue && password.inputvalue && confirmPassword.inputvalue === password.inputvalue) {

      createUserWithEmailAndPassword(auth, email.inputvalue, password.inputvalue)
        .then(userCredential => {
          const user = userCredential.user;
          console.log(user);
          navigate('/');
        })
        .catch(error => {
          const errorMessage = error.message;
          console.log(errorMessage);
        })

    }
  }

  const handleEmail = emailInput => {
    if (/[^\s@]+@[^\s@]+\.[^\s@]+/.test(emailInput)) {
      setEmail({ inputvalue: emailInput, error: '' });
    }
    else {
      setEmail({ inputvalue: '', error: 'Please provide a valid email address' });
    }
  }

  const handlePassword = passwordInput => {
    if (passwordInput.length < 7) {
      setPassword({ inputvalue: '', error: 'Password is too short' });
    }
    else {
      setPassword({ inputvalue: passwordInput, error: '' });
    }
  }

  const handleConfirmPassword = confirmPasswordInput => {
    if (confirmPasswordInput !== password.inputvalue) {
      setConfirmPassword({ inputvalue: '', error: 'Password is missmatched' });
    }
    else {
      setConfirmPassword({ inputvalue: confirmPasswordInput, error: '' });
    }
  }

  return (
    <div className='auth-form-container '>
      <div className='auth-form'>
        <h1>Sign Up</h1>
        <form onSubmit={handleSignUp}>
          <div className='input-field'>
            <label htmlFor='email'>Email</label>
            <div className='input-wrapper'>
              <input type='email' onBlur={(event) => handleEmail(event.target.value)} name='email' id='email' />
            </div>
            {
              email.error && <p className="error ">{email.error}</p>
            }
          </div>
          <div className='input-field'>
            <label htmlFor='password'>Password</label>
            <div className='input-wrapper'>
              <input type='password' onBlur={(event) => handlePassword(event.target.value)} name='password' id='password' />
            </div>
            {
              password.error && <p className="error">{password.error}</p>
            }
          </div>
          <div className='input-field'>
            <label htmlFor='confirm-password'>Confirm Password</label>
            <div className='input-wrapper'>
              <input
                type='password'
                onBlur={(event) => handleConfirmPassword(event.target.value)}
                name='confirmPassword'
                id='confirm-password'
              />
            </div>
            {
              confirmPassword.error && <p className="error">{confirmPassword.error}</p>
            }
          </div>
          <button type='submit' className='auth-form-submit'>
            Sign Up
          </button>
        </form>
        <p className='redirect'>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
        <div className='horizontal-divider'>
          <div className='line-left' />
          <p>or</p>
          <div className='line-right' />
        </div>
        <div className='input-wrapper'>
          <button className='google-auth' onClick={handleGoogleAuth}>
            <img src={GoogleLogo} alt='' />
            <p> Continue with Google </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
