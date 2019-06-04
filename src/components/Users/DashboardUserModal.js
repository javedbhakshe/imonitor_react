import React,{Component} from 'react';
import { apiServices } from '../../services/apiServices';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap';
import {dashboardUserType}  from '../../data/config';
import Loader from '../../components/loaders/loader';
import Select from 'react-select';
import _ from 'lodash';

class DashboardUserModal extends Component {

    state = {
        show:false,       
        email:'',
        password : '',  
        role:'',     
        isLoading:false,
    }
    
    componentWillReceiveProps = (newProps) => {
        if(!_.isEmpty(newProps.formData)){
            this.setState({                
                show: true
            })
        }
    } 

    handleUserInput = (e) =>{        	
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    }

    handleSelect = (e) =>{        	
       this.setState({role:e});
    }


    handleSubmit = (e) =>{
        e.preventDefault();	
        var that = this;
        this.setState({isLoading : true});   
        let communityBO = JSON.parse(localStorage.getItem('community'));
        let uuid = communityBO.community.uuid;
        let repEmail = communityBO.identityBO.users.username;
        let requestOptions = { 
            email:this.state.email,
            password:this.state.password,
            repEmail:repEmail,
            roles:[this.state.role.value]          
        }
        apiServices.addDashboardUsers(requestOptions).then(function(response){
            that.setState({isLoading : false}); 
            if(response.status === "SUCCESS"){   
                that.setState({ 
                    show:false,
                    name : '',                
                    password : '',
                    role:'',
                 });
                 this.props.loadData();
            }
        })
    }

    handleClose = () => {
        this.setState({ show: false });
      }
    
    handleShow = () => {
        this.setState({ 
            show: true,
            email : '',
            password : '',  
            role:''   
        });
    }


    render(){
        return (
            <div className="card">
                <Loader isLoading={this.state.isLoading}/>
                <Button className="btn btn-light survey-btn" color="primary" onClick={this.handleShow}>Add Dashboard User</Button>
				<Modal isOpen={this.state.show} className="modal-lg" >
		          	<ModalHeader>Dashboard User</ModalHeader>	          		
                    <form id="dashboardUser" onSubmit={this.handleSubmit}>                        
                        <ModalBody>                       
                            <div className="form-group">
                                <label className="col-form-label">Email</label>
                                <input type="email" name="email" className="form-control" onChange={this.handleUserInput}  placeholder="Enter Email" value={this.state.email} />
                                <small id="fieldHelp" className="form-text text-muted">Email used by admin to login DashboardUserModal.</small>
                            </div>
                            <div className="form-group">
                                <label className="col-form-label">Password</label>
                                <input type="password" name="password" className="form-control" onChange={this.handleUserInput}  placeholder="Enter Password" value={this.state.password} />
                            </div>   
                            <div className="form-group">
                            <label className="col-form-label">ROLE : </label>
                            <div className="input-group">
                                <Select
                                    name="role"
                                    options={dashboardUserType}
                                    className="form-control p-0 mb-3"
                                    defaultValue = {dashboardUserType[0]}
                                    onChange={this.handleSelect}
                                    value={this.state.role}
                                />
                            </div>
                    </div>                        
                        </ModalBody>
                        <ModalFooter  className="text-center card-footer">
                            <button type="submit" disabled={!this.state.email} className="mr-3 btn btn-primary btn-sm"><i className="fa fa-plus"></i> Add </button>
                            <button type="button" className="btn btn-danger btn-sm" id="closeLangModal" onClick={this.handleClose} data-dismiss="modal" aria-label="Close"><i className="fa fa-close "></i> Close</button>
                        </ModalFooter>
                    </form>		
		        </Modal>
        </div>
        )
    }
}

export default DashboardUserModal;