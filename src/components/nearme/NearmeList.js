import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';

class NearmeList extends Component {

    nearmeListRender(data){
        const nearListData = data.map(({nearme}, key) =>{
             return (
                <li key ={key} className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{nearme.name}</h5>
                    <small className="text-muted"><StarRatings rating={nearme.rate} starRatedColor="#20a8d8" starDimension="20px"
        starSpacing="2px"/></small>
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
                 {this.nearmeListRender(this.props.data)}              
            </div>
        )
    }
}

export default NearmeList;