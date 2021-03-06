import React, { Component } from 'react';
import { apiServices } from '../services/apiServices';
import {NavLink} from 'react-router-dom';
import Loader from '../components/loaders/loader';
import swal from 'sweetalert';
import Menu from './menu';

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            name: '',
            formErrors: {email: '', name: ''},
            emailValid: false,
            nameValid: false,
            formValid: false,
            isLoading:false   
          }
          this.handleSubmit = this.handleSubmit.bind(this);
    }    

    handleSubmit(e) {
      e.preventDefault();
      var that = this;        
      this.setState({isLoading : true});  
      if(this.state.emailValid && this.state.nameValid){
        let requestOptions = {community: { name: this.state.name, emaill : this.state.email}};
        apiServices.register(requestOptions).then(function(response){
          if(response.errors){
            that.setState({responseError: response.errors[0],isLoading : false, name:'', email:''});
          }  
          if(response.status === "SUCCESS"){            
            that.setState({isLoading : false, name:'', email:''});            
            swal({
              title: "Thanks for signing up!",
              text:  "Community has been registered successfully.Please click on the activation link that has been sent on registered email address.",
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

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let nameValid = this.state.nameValid;

        switch(fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : 'Email is invalid';
                break;
            case 'name':
                nameValid = value.length >= 6;
                fieldValidationErrors.name = nameValid ? '': 'name is too short, atleast 6 character';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            emailValid: emailValid,
            nameValid: nameValid
          }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.nameValid});
    }

    errorClass(error) {
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
          <div className="col-md-10">
          <div className="card-group">
          <div className="card text-white bg-primary py-5 d-md-down-none" >
              <div className="card-body text-center">
                <div>
                  <h2>Community Registration</h2>
                  <p></p>
                  <ul className="text-left">
                  <li>Self-use commmunity setup</li>
                  <li>Content management</li>
                  <li>Effective Activity Monitoring</li>
                  <li>Enable Evidence-based Advocacy</li>
                  <li>Interactive Dashboards & Reports</li>
                  <li>Quick access to nearby facilities</li>
                  </ul>
                  {/* <button className="btn btn-primary active mt-3" type="button">Register Community!</button> */}
                </div>
              </div>
            </div>
            <div className="card p-6">
              <div className="card-body">
              {errorResp}
              <form onSubmit={this.handleSubmit}>
                <h1>Register</h1>
                <p className="text-muted">Create your community</p>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="icon-user"></i>
                    </span>
                  </div>
                  <input className={`form-control  ${this.errorClass(this.state.formErrors.name)}`}
                    type="text" 
                    placeholder="Community Name" 
                    name="name"
                    value={this.state.name}
                    onChange={this.handleUserInput} 
                    />
                    <em className="error invalid-feedback">{this.state.formErrors.name}</em>
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">@</span>
                  </div>
                  <input className={`form-control  ${this.errorClass(this.state.formErrors.email)}`}
                   type="text"
                   placeholder="Community Email"
                   name="email"
                   value={this.state.email}
                   onChange={this.handleUserInput} 
                   />
                   <em className="error invalid-feedback">{this.state.formErrors.email}</em>
                </div>
                
                <button className="btn btn-block btn-success" 
                 type="submit"
                 disabled={!this.state.formValid} 
                 >Create Community</button>
                <div className="col-12 text-right">
                  <NavLink to={`/login`} className="btn btn-link px-0">Sign In</NavLink>
                </div>
                </form>
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