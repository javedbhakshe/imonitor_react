import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { apiServices } from '../../services/apiServices';
import Loader from '../../components/loaders/loader';

export class addNearme extends Component {

    constructor(props){
        super(props);  
        this.state = {
            name:'',
            type: '',
            email: '',           
            contact: '',
            summary: '',
            latitude:'',
            longitude:'',
            isLoading:false,
            markers: []
        };
        
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.geCurrenttLocation = this.geCurrenttLocation.bind(this);
        this.geCurrenttLocation();
    } 
    
	handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    }
    
    handleSubmit(e) {
        e.preventDefault();
        var that = this;  
        this.setState({isLoading : true});    

        var latlng = new this.props.google.maps.LatLng(this.state.latitude, this.state.longitude);
        var geocoder = new this.props.google.maps.Geocoder();
        var geoData = {};
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
            if (status == 'OK') {
                var geoArray = results[0].address_components;
                
                geoArray.map(function(item, index) {
                    if( item.types.indexOf('country') != '-1'){
                        geoData['country'] = item['long_name'];
                    }
                    if( item.types.indexOf('administrative_area_level_1') != '-1'){
                        geoData['state'] = item['long_name'];
                    }
                    if( item.types.indexOf('administrative_area_level_2') != '-1'){
                        geoData['district'] = item['long_name'];
                    }
                    if( item.types.indexOf('locality') != '-1'){
                        geoData['city'] = item['long_name'];
                    }
                    if( item.types.indexOf('sublocality') != '-1'){
                        geoData['area'] = item['long_name'];
                    }
                    if( item.types.indexOf('postal_code') != '-1'){
                        geoData['postal'] = item['long_name'];
                    }
                });
                // defer.resolve( instance );
            } else {
                // defer.resolve( instance );
            }
        });

        var nearmeExtesionBOs = [];
        for (var key in this.state) {
            if(key == 'address' || key == 'contact' || key == 'email'){
              var nearmeExtension = {
                  "nearmeExtension":{
                  "type":"address","subType":key,"extkey":key,"active":true,"text":this.state[key],"module":"POPUP"
                    }
                }
                nearmeExtesionBOs.push(nearmeExtension);
            }
        }     
        if(this.state.name && this.state.latitude &&  this.state.longitude){
          let requestOptions = {
              "nearme":{"title":this.state.name,"code":this.state.name,"name":this.state.name,"latitude":this.state.latitude,"longitude":this.state.longitude,"type":this.state.type,"tags":this.state.type,"fontFamily":"fontawesome","fontType":this.state.type,"country":"India","state":"Maharashtra","city":"Thane","scope":"PUBLIC","active":true,"rate":0},
              "nearmeExtesionBOs":nearmeExtesionBOs
            };
          apiServices.createCommunity(requestOptions).then(function(response){
			that.setState({isLoading: false});
            if(response.errors){
              that.setState({activeTab: 'appconfig-tab'});
            }  
            if(response.status === "SUCCESS"){
            //   that.props.configTab();
            }          
          });
        }
    }

    geCurrenttLocation() {
        let that = this;
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position){
            var markerPosition = [
                {
                    position: {
                        lat: position.coords.latitude,
                        lng:  position.coords.longitude
                    }
                }
            ];
            that.setState({				
                latitude : position.coords.latitude,
                longitude : position.coords.longitude,
                markers:markerPosition

            });           
          });
        } 
      }

      onMarkerDragEnd = (coord, index) => {
        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();
        this.setState({				
            latitude : lat,
            longitude : lng        
        });
        this.setState(prevState => {
          const markers = [...this.state.markers];
          markers[index] = { ...markers[index], position: { lat, lng } };
          return { markers };
        });
      };

      render() {
        return (

    <div className="row">
        <div className="col-lg-6">
        <div className="card">
        <Loader isLoading={this.state.isLoading}/>
        <div className="card-header">
            <strong>Add Nearme</strong> Details
        </div>
        <form onSubmit={this.handleSubmit}>
        <div className="card-body">        
            <div className="form-group row">
                <label className="col-md-3 col-form-label">Name</label>
                <div className="col-md-9">
                <input type="text"
                                name="name"
                                placeholder="Enter name"
                                className="form-control"
                                id="name"
                                value={this.state.name}
                                onChange={this.handleUserInput} />
                </div>
            </div>
            <div className="form-group row">
                <label className="col-md-3 col-form-label">Type</label>
                <div className="col-md-9">
                <select className="form-control" name="type" value={this.state.type} onChange={this.handleUserInput}>
                    <option value="Hospital">Hospital</option>
                    <option value="Blood Bank">Blood Bank</option>                            
                </select>
                </div>
            </div>        
            <div className="form-group row">
                <label className="col-md-3 col-form-label">Latitude</label>
                <div className="col-md-9">
                <input type="text"
                        name="latitude"
                        placeholder="Enter latitude"
                        className="form-control"
                        id="latitude"
                        value={this.state.latitude}
                        onChange={this.handleUserInput} />
                </div>
            </div>
            <div className="form-group row">
                <label className="col-md-3 col-form-label">Longitude</label>
                <div className="col-md-9">
                <input type="text"
                        name="longitude"
                        placeholder="Enter longitude"
                        className="form-control"
                        id="longitude"
                        value={this.state.longitude}
                        onChange={this.handleUserInput} />
                </div>
            </div>
            <div className="form-group row">
                <label className="col-md-3 col-form-label">Email</label>
                <div className="col-md-9">
                <input className="form-control"
                                type="email" 
                                name="email" 
                                placeholder="Enter Email" 
                                id='email'							 
                                value={this.state.email}
                                onChange={this.handleUserInput} />
                </div>
            </div>
            <div className="form-group row">
                <label className="col-md-3 col-form-label">Contact</label>
                <div className="col-md-9">
                <input type="text"
                                name="contact"
                                placeholder="Enter contact"
                                className="form-control"
                                id="contact"
                                value={this.state.contact}
                                onChange={this.handleUserInput} />
                </div>
            </div>
            <div className="form-group row">
                <label className="col-md-3 col-form-label">Summary</label>
                <div className="col-md-9">
                <textarea className="form-control" name="summary" placeholder="Enter Summary" row="10" id="community_summary"
                            value={this.state.summary} onChange={this.handleUserInput} style={{                           
                                height: "80px"
                                }}></textarea>
                </div>
            </div>
        </div>
        <div className="text-center card-footer">
            <button type="submit" className="mr-3 btn btn-primary btn-sm"><i className="fa fa-dot-circle-o"></i> Add Nearme </button>
            <button type="reset" className="btn btn-danger btn-sm"><i className="fa fa-ban "></i> Clear</button>
        </div>
        </form>
        </div>
    </div>

        <div className="col-lg-6">
            { this.state.latitude ? <Map 
                google={this.props.google}     
                zoom={14}          
                initialCenter={{
                    lat: this.state.latitude,
                    lng: this.state.longitude
                  }}                
                style={{
                    width: "100%",
                    height: "545px"
                }}
            >
                {this.state.markers.map((marker, index) => (
                <Marker
                    position={marker.position}
                    draggable={true}
                    onDragend={(t, map, coord) => this.onMarkerDragEnd(coord, index)}
                    name={marker.name}
                />
                ))}
            </Map> : null}
        </div>
    </div>

      );
     }
  
}


export default GoogleApiWrapper({
    apiKey: ('AIzaSyBedTd_YjXAiOM8I34K2MRUzqso2wu0wlA')
  })(addNearme)