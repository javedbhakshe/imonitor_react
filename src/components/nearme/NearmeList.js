import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';
import { apiServices } from '../../services/apiServices';
import { connect } from 'react-redux';
import swal from 'sweetalert'
import {activeNearme} from '../../actions'
import Loader from '../../components/loaders/loader';
import _ from 'lodash';

class NearmeList extends Component {

    state = {
        isLoading:false
    }

    componentWillReceiveProps = (newProps) => {
        console.log(newProps);
    }

    onEdit = (nearme) =>{
        this.props.activeNearme(nearme);
        this.props.onEditData();
    }

    onDelete = (nearmeBO) =>{
        var that = this;
        that.setState({isLoading:true});
        nearmeBO.nearme.active = false;
        let requestOptions = {
            nearme:nearmeBO.nearme,
            nearmeExtesionBOs:nearmeBO.allExtensionBOs
        }
        
        apiServices.addNearme(requestOptions).then(function(response){
            if(response.status === "SUCCESS"){
                const nearmeIndex = _.findIndex(that.props.data, function({ nearme }) { return nearme.id == nearmeBO.nearme.id; });
                if(_.isNumber(nearmeIndex)){    
                    that.props.data.splice(nearmeIndex, 1);
                }
                that.setState({isLoading:false});
                swal("Nearme Deactivated successfully", {
                    icon: "error",
                });
            }
            
        });
    }

       nearmeListRender(data){
        const nearListData = data.map(({nearme, allExtensionBOs}, key) =>{
             return (
                <li key ={key} className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{nearme.name}</h5>
                    <small className="text-muted"><StarRatings rating={nearme.rate} starRatedColor="#20a8d8" starDimension="20px"
                        starSpacing="2px"/>
                        <button className="btn btn-sm btn-custom badge-success" onClick={() => this.onEdit({nearme, allExtensionBOs})} ><span className="fa fa-pencil" aria-hidden="true"></span> Edit</button>
                        <button className="btn btn-sm btn-custom badge-danger" onClick={() => this.onDelete({nearme, allExtensionBOs})}  ><span className="fa fa-trash" aria-hidden="true"></span> Deactive</button>
                    </small>
                    </div>
                    <p className="mb-1">{nearme.city}, {nearme.state}, {nearme.country}  </p>
                    <small className="text-muted">{nearme.type}</small>
                </li>
             )
        });

        return (
            <ul className="list-group">
                {nearListData}
            </ul>
        )
    }
    
    render(){
        return(
            <div>
                 <Loader isLoading={this.state.isLoading}/>
                 {this.nearmeListRender(this.props.data)}              
            </div>
        )
    }
}

export default connect(
	null,
	{ activeNearme }
  )(NearmeList)