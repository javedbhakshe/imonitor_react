import React, { Component } from 'react';
import NearmeMap from '../../components/nearme/NearmeMap';
import { apiServices } from '../../services/apiServices';
import AddNearme from '../../components/nearme/addNearme';
import NearmeList from '../../components/nearme/NearmeList';
import UploadNearme from '../../components/nearme/UploadNearme';
import classnames from 'classnames';
import _ from 'lodash';

class Nearme extends Component{

    state = {        
        latitude: '',
        longitude: '',
        isLoading:false,
        nearmeList:[],
        activeTab: 'map',
        activeNearme : {}
    }

    toggle = (activeTab) => {
        if (this.state.activeTab !== activeTab) {
            this.setState({activeTab});
       }
    }   

    toggleList =(nearme) => {
          const nearmeData = this.state.nearmeList;
          if(nearme.status === "SUCCESS"){
            nearmeData.push(nearme);           
          }    
          if(nearme.status === "DUPLICATE"){
              const nearmeIndex = _.findIndex(nearmeData, function({ nearme }) { return nearme.id == nearme.nearme.id; });
              if(!_.isEmpty(nearmeIndex)){    
                  nearmeData[nearmeIndex] = nearme;
              }              
          }      
        this.setState({nearmeList:nearmeData, activeTab:'nearme-list'});
    }
  
    
    async componentDidMount(){
        let position;
        try { 
            position = await this.geCurrenttLocation();
            this.setState({latitude:position.coords.latitude, longitude:position.coords.longitude})
        } catch(err) {
            
        }        
        let communityBO = JSON.parse(localStorage.getItem('community'));			
        let requestOptions =  {
            // latitude: this.state.latitude ? this.state.latitude : 19.0760,
            // longitude: this.state.longitude ? this.state.longitude : 72.8777,
            uuid:communityBO.community.uuid,
            limit:1000
        }
        const response = await apiServices.nearmeList(requestOptions);       

        if(!_.isEmpty(response.nearmeList)){
            this.setState({nearmeList: response.nearmeList, latitude:response.nearmeList[0].nearme.latitude,longitude:response.nearmeList[0].nearme.longitude})
        }
    }

     geCurrenttLocation = () => {
        const geolocation = navigator.geolocation;

        return new Promise((resolve, reject) =>{
            if (!geolocation) {
                reject(new Error("Not Supported"));
            }
            geolocation.getCurrentPosition((position) =>{
                resolve(position);
            }, (e) => {
                reject(e.message)
            });
        })
       
      }

      onEditNearme = () => {  
          var that = this;
          this.setState({activeTab:'nearme-map'});          
      }


      render(){
		return(
			<div className="card">
                <div className="card-body">
                
                
                <div className="nav nav-tabs nearmeTab" role="tablist">
                    <button className={`btn btn-custom btn-light ${classnames({ active: this.state.activeTab === 'map' })}`} onClick={() => { this.toggle('map')}} title="Add Content" data-toggle="tab" href="#map" role="tab" aria-controls="map" >
                        <span className="fa fa-home" data-toggle="tab" href="#map" role="tab" aria-controls="map"></span> Home
                    </button>
                    <button className={`btn btn-custom btn-light ${classnames({ active: this.state.activeTab === 'nearme-list' })}`} onClick={() => { this.toggle('nearme-list')}} title="Add Content" data-toggle="tab" href="#mapList" role="tab" aria-controls="mapList" >
                        <span className="fa fa-list" data-toggle="tab" href="#mapList" role="tab" aria-controls="mapList"></span> List
                    </button>     
                    <button className={`btn btn-custom btn-light ${classnames({ active: this.state.activeTab === 'nearme-map' })}`} onClick={() => { this.toggle('nearme-map')}} title="Add Content" data-toggle="tab" href="#addMap" role="tab" aria-controls="addMap" >
                        <span className="fa fa-plus" data-toggle="tab" href="#addMap" role="tab" aria-controls="addMap"></span> Add
                    </button>    
                    <button className={`btn btn-custom btn-light ${classnames({ active: this.state.activeTab === 'nearme-bulk' })}`} onClick={() => { this.toggle('nearme-bulk')}} title="Add Content" data-toggle="tab" href="#nearmeBulk" role="tab" aria-controls="nearmeBulk" >
                        <span className="fa fa-upload" data-toggle="tab" href="#nearmeBulk" role="tab" aria-controls="nearmeBulk"></span> Upload
                    </button>   
                </div> <div className="clear"></div>
                <div className="tab-content">
                  <div className={`tab-pane mapDetail ${classnames({ active: this.state.activeTab === 'map' })}`} id="map" role="tabpanel">
                    <NearmeMap data={this.state.nearmeList} latitude={this.state.latitude} longitude={this.state.longitude} />
                  </div>
                  <div className={`tab-pane ${classnames({ active: this.state.activeTab === 'nearme-list' })}`} id="mapList" role="tabpanel">
                    <NearmeList data={this.state.nearmeList} onEditData={this.onEditNearme} />
                  </div>
                  <div className={`tab-pane mapDetail ${classnames({ active: this.state.activeTab === 'nearme-map' })}`} id="addMap" role="tabpanel">
                    <AddNearme nearmeList={this.state.nearmeList}  toggleList={this.toggleList} toggle={this.toggle} ref="NearmeData" />
                  </div>

                  <div className={`tab-pane ${classnames({ active: this.state.activeTab === 'nearme-bulk' })}`} id="nearmeBulk" role="tabpanel">
                    <UploadNearme toggle={this.toggle} />
                  </div>
                  
                </div>
                </div>
                {/* <div className="text-center card-footer">
					<button type="submit" className="mr-3 btn btn-primary btn-sm"><i className="fa fa-dot-circle-o"></i> Save and Continue </button>
					<button type="reset" className="btn btn-danger btn-sm"><i className="fa fa-ban "></i> Reset</button>
				</div> */}
            </div>
		);
	}
}

export default Nearme;