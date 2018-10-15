import React, { Component } from 'react';
// import { FormErrors } from './FormErrors';
import {NavLink} from 'react-router-dom';

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            formErrors: {email: '', password: ''},
            emailValid: false,
            passwordValid: false,
            formValid: false
          }
    }    

    handleUserInput = (e) => {
        console.log(e);
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value},
            () => { this.validateField(name, value) });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;

        switch(fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : 'Email is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '': 'PAssword is too short';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid
          }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid});
    }

    errorClass(error) {
        return(error.length === 0 ? '' : 'is-invalid');
    }

    render(){
        return(         
        <div className="app flex-row align-items-center">  
        <div className="container">   
          <div className="row justify-content-center">
          <div className="col-md-10">
          <div className="card-group">
          <div className="card text-white bg-primary py-5 d-md-down-none" >
              <div className="card-body text-center">
                <div>
                  <h2>Community Register</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <ol className="text-left">
                  <li>Community Management</li>
                  <li>Instant Alerts and Response</li>
                  <li>Effective Activity Monitoring</li>
                  <li>Enable Evidence-based Advocacy</li>
                  <li>Interactive Dashboards & Reports</li>
                  <li>Rate Quality of Services</li>
                  </ol>
                  {/* <button className="btn btn-primary active mt-3" type="button">Register Community!</button> */}
                </div>
              </div>
            </div>
            <div className="card p-6">
              <div className="card-body">
                <h1>Register</h1>
                <p className="text-muted">Create your community</p>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="icon-user"></i>
                    </span>
                  </div>
                  <input className="form-control" type="text" placeholder="Name" />
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">@</span>
                  </div>
                  <input className="form-control" type="text" placeholder="Email" />
                </div>
                
                <button className="btn btn-block btn-success" type="button">Create Community</button>
                <div className="col-12 text-right">
                  <NavLink to={`/login`} className="btn btn-link px-0">Sign In</NavLink>
                </div>
              </div>              
            </div>            
          </div>
          </div>
        </div>
         </div>
         </div>
        )
    }
}

export default Register;