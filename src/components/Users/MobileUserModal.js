import React,{Component} from 'react';
import { apiServices } from '../../services/apiServices';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap';
import Loader from '../../components/loaders/loader';
import md5 from 'md5';
import _ from 'lodash';

class MobileUserModal extends Component {

    state = {
        show:false,       
        email:'',
        password : '',               
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

    handleSubmit = (e) =>{
        e.preventDefault();	
        var that = this;
        this.setState({isLoading : true});   
        let communityBO = JSON.parse(localStorage.getItem('community'));
        let uuid = communityBO.community.uuid;
        let requestOptions = 
        { applicant :{
            email:this.state.email,
            password: md5(this.state.password),
            userType:"VOLUNTEER",
            community:{uuid}}}
        apiServices.addApplicants(requestOptions).then(function(response){
            that.setState({isLoading : false}); 
            if(response.status === "SUCCESS"){   
                that.setState({ 
                    show:false,
                    name : '',                
                    password : '',                   
                 });
                 that.props.loadData();

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
            password : ''
        });
    }


    render(){
        return (
            <div className="card">
                <Loader isLoading={this.state.isLoading}/>
                <Button className="btn btn-light survey-btn" color="primary" onClick={this.handleShow}>Add Mobile User</Button>
				<Modal isOpen={this.state.show} className="modal-lg" >
		          	<ModalHeader>Mobile User</ModalHeader>	          		
                    <form id="mobileUser" onSubmit={this.handleSubmit}>                        
                        <ModalBody>                       
                            <div className="form-group">
                                <label class="col-form-label">Email</label>
                                <input type="email" name="email" className="form-control" onChange={this.handleUserInput}  placeholder="Enter Field" value={this.state.email} />
                                <small id="fieldHelp" className="form-text text-muted">Email used by user to login mobile.</small>
                            </div>
                            <div className="form-group">
                                <label class="col-form-label">Password</label>
                                <input type="password" name="password" className="form-control" onChange={this.handleUserInput}  placeholder="Enter Field" value={this.state.password} />
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

export default MobileUserModal;