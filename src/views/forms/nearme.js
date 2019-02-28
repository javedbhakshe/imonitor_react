import React, { Component } from 'react';
import NearmeMap from '../../components/nearme/NearmeMap';
import { apiServices } from '../../services/apiServices';
import AddNearme from '../../components/nearme/addNearme';
import NearmeList from '../../components/nearme/NearmeList';
import classnames from 'classnames';

class Nearme extends Component{

    state = {        
        latitude: '',
        longitude: '',
        isLoading:false,
        nearmeList:[],
        activeTab: 'map'
    }

    toggle = (activeTab) => {
        if (this.state.activeTab !== activeTab) {
            this.setState({activeTab});
       }
    }   
  
    
    async componentDidMount(){
        let position;
        try { 
            position = await this.geCurrenttLocation();
            this.setState({latitude:position.coords.latitude, longitude:position.coords.longitude})
        } catch(err) {
            
        }        

        let requestOptions =  {
            latitude: this.state.latitude ? this.state.latitude : 19.0760,
            longitude: this.state.longitude ? this.state.longitude : 72.8777,
            limit:100
        }
        const response = await apiServices.nearmeList(requestOptions);       

        this.setState({nearmeList: response.nearmeList})
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
                </div> <div className="clear"></div>
                <div className="tab-content">
                  <div className={`tab-pane mapDetail ${classnames({ active: this.state.activeTab === 'map' })}`} id="map" role="tabpanel">
                    <NearmeMap data={this.state.nearmeList} latitude={this.state.latitude} longitude={this.state.longitude} />
                  </div>
                  <div className={`tab-pane ${classnames({ active: this.state.activeTab === 'nearme-list' })}`} id="mapList" role="tabpanel">
                  <NearmeList data={this.state.nearmeList} />
                  
                  </div>
                  <div className={`tab-pane mapDetail ${classnames({ active: this.state.activeTab === 'nearme-map' })}`} id="addMap" role="tabpanel">
                    <AddNearme nearmeList={this.state.nearmeList} toggle={this.toggle} />
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