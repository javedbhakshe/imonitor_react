import React, { Component } from 'react';
import { apiServices } from '../services/apiServices';
import {NavLink} from 'react-router-dom';
import Loader from '../components/loaders/loader';
import swal from 'sweetalert';
import Menu from './menu';

class ForgotPassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            verficationCode: '',
            newPassword: '',
            formErrors: {email: ''},
            emailValid: false,            
            formValid: false,
            isLoading:false,
            firstpage:true 
          }
          this.handleSubmit = this.handleSubmit.bind(this);
    }    

    handleSubmit(e) {
      e.preventDefault();
      var that = this;        
      this.setState({isLoading : true});  
      if(this.state.emailValid){
        let requestOptions = { email : this.state.email, generateVerificationCode: "true"};
        apiServices.verificationCode(requestOptions).then(function(response){
          if(response.errors){
            that.setState({responseError: response.errors[0],isLoading : false, email:''});
          }  
          if(response.status === "SUCCESS"){            
            that.setState({isLoading : false});            
            swal({
              title: "Verification!",
              text:  "Verification Code sent on given email, Please verify.",
              icon: "success",
              button: "OK",
            })
            .then((response) => {
              if (response) {
                  that.setState({firstpage:false});
              } 
            });
          }          
        });
      }
  }

  handleResetSubmit = (e) => {
    e.preventDefault();
    var that = this;        
    this.setState({isLoading : true});  
    if(this.state.emailValid){
      let requestOptions = { email : this.state.email, verficationCode: this.state.verficationCode, newPassword:this.state.newPassword};
      apiServices.changePassword(requestOptions).then(function(response){
        if(response.errors){
          that.setState({responseError: response.errors[0],isLoading : false, email:'',verficationCode:'',newPassword:''});
        }  
        if(response.status === "SUCCESS"){            
          that.setState({isLoading : false, email:'', verficationCode:'',newPassword:''});            
          swal({
            title: "Thank You!",
            text:  "Reset Password successfully.",
            icon: "success",
            button: "OK",
          })
          .then((response) => {
            if (response) {
                that.props.history.push('/');
            } 
          });
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

    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;        

        switch(fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : 'Email is invalid';
                break;           
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            emailValid: emailValid,
          }, this.validateForm);
    }

    validateForm = () => {
        this.setState({formValid: this.state.emailValid});
    }

    errorClass = (error) => {
        return(error.length === 0 ? '' : 'is-invalid');
    }

    render(){
      let errorResp;
      if(this.state.responseError){
        errorResp = <div className="alert alert-danger">{this.state.responseError}</div>;
      }
        return(     
        <div>
        <Menu />       
        <div className="app flex-row align-items-center">  
        <Loader isLoading={this.state.isLoading}/>
        <div className="container">   
          <div className="row justify-content-center">
          <div className="col-md-8">
          <div className="card-group">
          
            <div className="card p-4">
            {errorResp}
            <div className={`card-body ${this.state.firstpage  == true ? 'showDiv': 'hideDiv'}`}>
             
              <form onSubmit={this.handleSubmit}>
                <h1>Forgot Password</h1>
                <p className="text-muted">Forgot Password</p>
                
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">@</span>
                  </div>
                  <input className={`form-control  ${this.errorClass(this.state.formErrors.email)}`}
                   type="text"
                   placeholder="Enter Email"
                   name="email"
                   value={this.state.email}
                   onChange={this.handleUserInput} 
                   />
                   <em className="error invalid-feedback">{this.state.formErrors.email}</em>
                </div>
                
                <button className="btn btn-block btn-success" 
                 type="submit"
                 disabled={!this.state.formValid} 
                 >Verification</button>
                <div className="col-12 text-right">
                  <NavLink to={`/login`} className="btn btn-link px-0">Sign In</NavLink>
                </div>
                </form>
              </div> 

              <div className={`card-body ${this.state.firstpage  == false ? 'showDiv': 'hideDiv'}`}>
             
              <form onSubmit={this.handleResetSubmit}>
                <h1>Forgot Password</h1>
                <p className="text-muted">Forgot Password</p>
                
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">@</span>
                  </div>
                  <input className={`form-control  ${this.errorClass(this.state.formErrors.email)}`}
                   type="text"
                   placeholder="Enter Email"
                   name="email"
                   value={this.state.email}
                   onChange={this.handleUserInput} 
                   />
                   <em className="error invalid-feedback">{this.state.formErrors.email}</em>
                </div>

                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="icon-key"></i></span>
                  </div>
                  <input className={`form-control`}
                   type="text"
                   placeholder="Enter Generated Verification Code"
                   name="verficationCode"
                   value={this.state.verficationCode}
                   onChange={this.handleUserInput} 
                   />
                  
                </div>

                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="icon-lock"></i></span>
                  </div>
                  <input className={`form-control `}
                   type="password"
                   placeholder="Enter New Password"
                   name="newPassword"
                   value={this.state.newPassword}
                   onChange={this.handleUserInput} 
                   />
                   
                </div>
                
                <button className="btn btn-block btn-success" 
                 type="submit"
                 disabled={!this.state.formValid} 
                 >Reset Password</button>
                <div className="col-12 text-right">
                  <NavLink to={`/login`} className="btn btn-link px-0">Sign In</NavLink>
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
         </div>
        )
    }
}

export default ForgotPassword;