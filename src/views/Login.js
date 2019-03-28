import React, { Component } from 'react';
import { apiServices } from '../services/apiServices';
import {NavLink} from 'react-router-dom';
import Loader from '../components/loaders/loader';

class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            responseError: '',
            formErrors: {email: '', password: ''},
            emailValid: false,
            passwordValid: false,
            formValid: false,
            isLoading:false           
          }

        this.handleSubmit = this.handleSubmit.bind(this);
    }    
    handleSubmit(e) {
        e.preventDefault();
        var that = this;  
        this.setState({isLoading : true});      
        if(this.state.emailValid && this.state.passwordValid){
          let requestOptions = {email : this.state.email, password: this.state.password};
          apiServices.login(requestOptions).then(function(response){
            if(response.errors){
              that.setState({responseError: response.errors[0],isLoading : false});
            }  
            if(response.status === "SUCCESS"){
              that.props.onSuccess();
            }          
          });
        }
    }

    handleUserInput = (e) => {
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
                fieldValidationErrors.password = passwordValid ? '': 'Password is too short, atleast 6 character';
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
      let errorResp;
      if(this.state.responseError){
        errorResp = <div className="alert alert-danger" dangerouslySetInnerHTML={{__html: this.state.responseError}}></div>;
      }
        return(  
          <div className="app flex-row align-items-center">  
            <Loader isLoading={this.state.isLoading}/>
            <div className="container">       
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="card-group">
                    <div className="card p-4">
                      <div className="card-body">
                      {errorResp}
                      <form onSubmit={this.handleSubmit}>
                        <h1>Login</h1>                      
                        <p className="text-muted">Sign In to your community</p>
                        <div className="input-group mb-3">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="icon-user"></i>
                            </span>
                          </div>
                          <input className={`form-control  ${this.errorClass(this.state.formErrors.email)}`}
                              type="email"
                              placeholder="Email" 
                              name="email"
                              value={this.state.email}
                              onChange={this.handleUserInput} />
                              <em className="error invalid-feedback">{this.state.formErrors.email}</em>
                              
                        </div>
                        <div className="input-group mb-4">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="icon-lock"></i>
                            </span>
                          </div>
                          <input className={`form-control  ${this.errorClass(this.state.formErrors.password)}`}
                           type="password"
                           placeholder="Password"  
                           name="password"
                           value={this.state.password}
                           onChange={this.handleUserInput} />
                           <em className="error invalid-feedback">{this.state.formErrors.password}</em>                         
                        </div>
                        <div className="row">
                          <div className="col-6">
                            <button className="btn btn-primary px-4" type="submit"
                              disabled={!this.state.formValid}
                            >Login</button>
                          </div>
                          <div className="col-6 text-right">
                            <NavLink to={`/forgotPassword`} className="btn btn-link px-0">Forgot password?</NavLink>
                          </div>
                        </div>
                        </form>
                      </div>
                    </div>
                    <div className="card text-white bg-primary py-5 d-md-down-none" >
                      <div className="card-body text-center">
                        <div>
                          <h2>Sign up</h2>
                          <p className="py-5">An evaluation tool that drives public accountability</p>
                          <NavLink to={`/register`} className="btn btn-primary active">Register Community!</NavLink>
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


export default Login;