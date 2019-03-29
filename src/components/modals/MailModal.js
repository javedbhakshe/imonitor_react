import React,{Component} from 'react';
import { apiServices } from '../../services/apiServices';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap';
import Loader from '../../components/loaders/loader';
import _ from 'lodash';
import swal from 'sweetalert';

const toMail = "imonitorsales@mailinator.com";

class MailModal extends Component {

    constructor(props){
        super(props);

        let communityBO = JSON.parse(localStorage.getItem('community'));
        let community = communityBO.community;
         
        this.state = {
            show:false, 
            uuid:community.uuid,      
            email:community.emaill,
            mobile : '',               
            isLoading:false,
        }
    }
   
    componentWillReceiveProps = (newProps) => {
        if(newProps.show){
            this.setState({
                show:newProps.show,                
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
      
        // let MailContent = `<h3>White Label App requirement!</h3>
        //     <h6>Community has been registered with id ${this.state.uuid}.</h6>
        //     <p>Please click on Email : ${this.state.email} and Mobile : ${this.state.mobile}.</p>`;

        let requestOptions = 
        {
            to:toMail, 
            uuid:this.state.uuid,
            email:this.state.email,
            mobile:this.state.mobile
        }

        apiServices.whiteLabelEmail(requestOptions).then(function(response){
            that.setState({isLoading : false}); 
            if(response.status === "SUCCESS"){   
                that.setState({ 
                    show:false,
                    mobile : '',                  
                 });
                 swal("Sales Team will contact you shortly", {
                    icon: "success",
                });
                that.props.hideModalBox();
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
				<Modal isOpen={this.state.show} className="modal-lg" >
		          	<ModalHeader>Information</ModalHeader>	          		
                    <form id="mobileUser" onSubmit={this.handleSubmit}>                        
                        <ModalBody>                       
                            <h6>Please provide following information so that sales team contact you.</h6>
                            <div className="form-group">
                                <label className="col-form-label">Email</label>
                                <input type="email" name="email" className="form-control" disabled  placeholder="Enter email" value={this.state.email} />
                                <small id="fieldHelp" className="form-text text-muted">Email used by user to login mobile.</small>
                            </div>
                            <div className="form-group">
                                <label className="col-form-label">Mobile</label>
                                <input type="tel" name="mobile" className="form-control" onChange={this.handleUserInput}  placeholder="Enter Mobile" value={this.state.password} />
                            </div>           
                        </ModalBody>
                        <ModalFooter  className="text-center card-footer">
                            <button type="submit" disabled={!this.state.email} className="mr-3 btn btn-primary btn-sm"><i className="fa fa-plus"></i> Submit </button>
                            <button type="button" className="btn btn-danger btn-sm" id="closeLangModal" onClick={this.handleClose} data-dismiss="modal" aria-label="Close"><i className="fa fa-close "></i> Close</button>
                        </ModalFooter>
                    </form>		
		        </Modal>
        </div>
        )
    }
}

export default MailModal;