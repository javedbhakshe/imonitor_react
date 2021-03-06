import React, { Component } from 'react';
import { apiServices } from '../../services/apiServices';
import Loader from '../../components/loaders/loader';
import DashboardUserModal from './DashboardUserModal';
import _ from 'lodash';
import swal from 'sweetalert';

class DashboardUsers extends Component {

    state = {
        isLoading:true,
        authorities:[],
        users:[]
    }

    componentDidMount = () => {
        this.loadData();
    }

    loadData = async () => {
        let communityBO = JSON.parse(localStorage.getItem('community'));
        let uuid = communityBO.community.uuid;
        const usersObj = await apiServices.dashboardUsers(uuid);
        this.setState({users:usersObj.users, authorities:usersObj.authorities, isLoading:false})
    }

   

    onDelete = (users, enabled) => {
        var that = this;
        swal({
            title: "Are you sure?",
            text: `you want to ${!users.enabled ? ' active' : ' deactive'} this user!`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) { 
                this.setState({isLoading : true}); 
                let communityBO = JSON.parse(localStorage.getItem('community'));
                let uuid = communityBO.community.uuid;
                let repEmail = communityBO.identityBO.users.username;  
                let requestOptions = { 
                    email:users.username,                    
                    repEmail:repEmail,                   
                    enabled:enabled,
                    action:'edit'
                }
                apiServices.addDashboardUsers(requestOptions).then(function(response){
                    that.setState({isLoading : false}); 
                    if(response.status === "SUCCESS"){   
                        that.loadData();
                        swal("Dashboard user deleted successfully!", {
                            icon: "success",
                        });
                    }
                })
              
            } 
          });
    }

    usersRender = (data) => {
        const usersData = data.map(({users}, key) =>{
            return (
               <li key ={key} className="list-group-item list-group-item-action flex-column align-items-start">
                   <div className="d-flex w-100 justify-content-between">
                   <h5 className="mb-1">
                        {users.username}
                        <span className="badge badge-success ml-3"> {users.enabled ? 'Active' : 'DeActive'}</span> 
                    </h5>
                    <small className="text-muted">
                          <button className={`btn btn-sm btn-custom ${users.enabled ? 'badge-danger' : 'badge-success'}`} onClick={() => this.onDelete(users, !users.enabled)}  >
                          <span className="fa fa-trash" aria-hidden="true"></span> 
                            {!users.enabled ? ' Active' : ' Deactive'}
                          </button>
                    </small>               
                   </div>
                   <p className="mb-1">
                    {
                        users.authoritieses.map(({id}, key) =>{
                            return id.authority;
                        })
                    }
                   </p>                   
               </li>
            )
       });

       if(_.isEmpty(usersData)){
           return (
            <div className="alert alert-warning" role="alert">Dashbard Users not found</div>
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
                 <DashboardUserModal loadData ={this.loadData} />
                 {this.usersRender(this.state.users)}              
            </div>
        )
    }

}

export default DashboardUsers;