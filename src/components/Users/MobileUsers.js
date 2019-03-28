import React, { Component } from 'react';
import { apiServices } from '../../services/apiServices';
import Loader from '../../components/loaders/loader';
import MobileUserModal from './MobileUserModal'
import _ from 'lodash';
import swal from 'sweetalert';

class MobileUsers extends Component {

    state = {
        isLoading:false,
        users:[]
    }

    componentDidMount = () => {
        this.loadData();
    }

    loadData = async () => {
        let communityBO = JSON.parse(localStorage.getItem('community'));
        let uuid = communityBO.community.uuid;
        let requestOptions = {
            uuid:uuid,
            active:"Y",
            userType:"VOLUNTEER"

        }
        const users = await apiServices.loadApplicants(requestOptions);
        this.setState({users})
    }

    onDelete = (applicant) => {
        var that = this;
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this user!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) { 
                this.setState({isLoading : true}); 
                let communityBO = JSON.parse(localStorage.getItem('community'));
                let uuid = communityBO.community.uuid;
                let requestOptions = 
                { applicant :{
                    active:"N",
                    id: applicant.id,
                    email:applicant.email,
                    userType:"VOLUNTEER",
                    community:{uuid}}}
                apiServices.addApplicants(requestOptions).then(function(response){
                   
                    if(response.status === "SUCCESS"){                          
                       that.loadData();
                       that.setState({isLoading : false}); 
                    }
                })
              
            } 
          });
    }

    usersRender = (data) => {
        const usersData = data.map(({applicant}, key) =>{
            return (
               <li key ={key} className="list-group-item list-group-item-action flex-column align-items-start">
                   <div className="d-flex w-100 justify-content-between">
                   <h5 className="mb-1">{applicant.email}
                   <span className="badge badge-success ml-3"> {applicant.active == 'Y' ? 'Active' : 'DeActive'}</span> 
                   </h5>                 
                  
                   <small className="text-muted">
                          <button className="btn btn-sm btn-custom badge-danger" onClick={() => this.onDelete(applicant)}  ><span className="fa fa-trash" aria-hidden="true"></span> Deactive</button>
                    </small>   
                    </div>   
                   <p className="mb-1">{applicant.userType}  </p>
                  
               </li>
            )
       });

       if(_.isEmpty(usersData)){
           return (
            <div className="alert alert-warning" role="alert">Mobile Users not found</div>
           );
       }

       return (
           <ul className="list-group">
               {usersData}
           </ul>
       )
    }

    render(){
        return(
            <div>
                 <Loader isLoading={this.state.isLoading}/>
                 <MobileUserModal loadData ={this.loadData}/>
                 {this.usersRender(this.state.users)}              
            </div>
        )
    }

}

export default MobileUsers;