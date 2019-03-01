import React, { Component } from 'react';
import { apiServices } from '../services/apiServices';
import {NavLink} from 'react-router-dom';
import Loader from '../components/loaders/loader';

class FirstTimeLogin extends Component {
    constructor(props){
        super(props);

        this.state = {
            password: '',
            newPassword: '',
            confirmPassword: '',
            responseError: '',
            formErrors: {password: '',newPassword:'', confirmPassword:'' },
            confirmPasswordValid: false,
            newPasswordValid : false,
            passwordValid: false,
            formValid: false,
            isLoading:false           
          }

        this.handleSubmit = this.handleSubmit.bind(this);
    }    
    handleSubmit(e) {
        e.preventDefault();
        var that = this;  

        const communityBO = JSON.parse(localStorage.getItem('community'));
        let email = '';
        if(communityBO){
          email = communityBO.identityBO.users.username;			
        }

        this.setState({isLoading : true});      
        if(this.state.confirmPasswordValid && this.state.passwordValid && email){
          let requestOptions = {email : email, password: this.state.password, newPassword: this.state.newPassword};
          apiServices.changePassword(requestOptions).then(function(response){
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
        let confirmPasswordValid = this.state.confirmPasswordValid;
        let passwordValid = this.state.passwordValid;
        let newPasswordValid  = this.state.newPasswordValid

        switch(fieldName) {           
            case 'password':
                passwordValid = value.length >= 6 ;
                fieldValidationErrors.password = passwordValid ? '': 'Please Enter Current Password';
                break;  
            case 'newPassword':
                newPasswordValid = value.length >= 6 ;
                fieldValidationErrors.newPassword = newPasswordValid ? '': 'Enter Current Password is too short';
                break;           
            case 'confirmPassword':
                confirmPasswordValid = this.state.newPassword ===  this.state.confirmPassword;
                fieldValidationErrors.confirmPassword = confirmPasswordValid ? '': 'New Password Fields Do Not Match';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            confirmPasswordValid: confirmPasswordValid,
            passwordValid: passwordValid
          }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.confirmPasswordValid && this.state.passwordValid});
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
                        <h1>Change Password</h1>                      
                        <p className="text-muted">Change Password to your community</p>
                        
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
                        <div className="input-group mb-4">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="icon-lock"></i>
                            </span>
                          </div>
                          <input className={`form-control  ${this.errorClass(this.state.formErrors.newPassword)}`}
                           type="password"
                           placeholder="New Password"  
                           name="newPassword"
                           value={this.state.newPassword}
                           onChange={this.handleUserInput} />
                           <em className="error invalid-feedback">{this.state.formErrors.newPassword}</em>                         
                        </div>
                        <div className="input-group mb-4">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="icon-lock"></i>
                            </span>
                          </div>
                          <input className={`form-control  ${this.errorClass(this.state.formErrors.confirmPassword)}`}
                           type="password"
                           placeholder="Confirm Password"  
                           name="confirmPassword"
                           value={this.state.confirmPassword}
                           onChange={this.handleUserInput} />
                           <em className="error invalid-feedback">{this.state.formErrors.confirmPassword}</em>                         
                        </div>
                        <div className="row">
                          <div className="col-6">
                            <button className="btn btn-primary px-4" type="submit"
                              disabled={!this.state.formValid}
                            >Update</button>
                          </div>
                          {/* <div className="col-6 text-right">
                            <button className="btn btn-link px-0" type="button">Forgot password?</button>
                          </div> */}
                        </div>
                        </form>
                      </div>
                    </div>
                    <div className="card text-white bg-primary py-5 d-md-down-none" >
                      <div className="card-body text-center">
                        <div>
                          <h2>Sign up</h2>
                          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                          <NavLink to={`/register`} className="btn btn-primary active mt-3">Register Community!</NavLink>
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


export default FirstTimeLogin;