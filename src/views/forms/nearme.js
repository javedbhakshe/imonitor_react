import React, { Component } from 'react';
import Map from '../../components/maps/map';
import AddNearme from '../../components/maps/addNearme';


class Nearme extends Component{
    constructor(props){
        super(props);        
    }   

	render(){
		return(
			<div className="card">
                <div className="card-body">
                
                
                <div className="nav nav-tabs nearmeTab" role="tablist">
                    <button className="btn btn-custom btn-light" title="Add Content" data-toggle="tab" href="#map" role="tab" aria-controls="map" >
                        <span className="fa fa-home" data-toggle="tab" href="#map" role="tab" aria-controls="map"></span> Home
                    </button>
                    <button className="btn btn-custom btn-light" title="Add Content" data-toggle="tab" href="#mapList" role="tab" aria-controls="mapList" >
                        <span className="fa fa-list" data-toggle="tab" href="#mapList" role="tab" aria-controls="mapList"></span> List
                    </button>     
                    <button className="btn btn-custom btn-light" title="Add Content" data-toggle="tab" href="#addMap" role="tab" aria-controls="addMap" >
                        <span className="fa fa-plus" data-toggle="tab" href="#addMap" role="tab" aria-controls="addMap"></span> Add
                    </button>      
                </div> <div className="clear"></div>
                <div className="tab-content">
                  <div className="tab-pane mapDetail active" id="map" role="tabpanel">
                  <Map />
                   </div>
                  <div className="tab-pane" id="mapList" role="tabpanel">
                    2. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                  <div className="tab-pane mapDetail" id="addMap" role="tabpanel">
                    <AddNearme />
                  </div>
                </div>
                </div>
                <div className="text-center card-footer">
					<button type="submit" className="mr-3 btn btn-primary btn-sm"><i className="fa fa-dot-circle-o"></i> Save and Continue </button>
					<button type="reset" className="btn btn-danger btn-sm"><i className="fa fa-ban "></i> Reset</button>
				</div>
            </div>
		);
	}
}

export default Nearme;