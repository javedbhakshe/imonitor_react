import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import StarRatings from 'react-star-ratings';

class NearmeMap extends Component{
    state = {
        isLoading:false,
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},         
    } 
    
    onMarkerClick = (props, marker, e) =>{
        this.setState({
            selectedPlace: props.data,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    render() {
        const data = this.props.data;

        return (
            <div>
                { this.props.latitude ? 

                <Map  
                    google={this.props.google}     
                    zoom={16}          
                    initialCenter={{
                        lat: this.props.latitude,
                        lng: this.props.longitude
                    }}  
                >            
                {                   
                    data.map(({nearme}, key) =>                        
                        <Marker 
                            key={key}
                            data={nearme}
                            name={nearme.name}
                            onClick={this.onMarkerClick}
                            position={{ lat: nearme.latitude, lng: nearme.longitude }}
                        />                        
                    )                    
                }               

                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>                    
                        <div className="infoWindowBox">                            
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">{this.state.selectedPlace.name}</h5>     
                                <small className="text-muted"><StarRatings rating={this.state.selectedPlace.rate} starRatedColor="#20a8d8" starDimension="15px"
                                    starSpacing="1px"/></small>                          
                                </div>
                                <p className="mb-1">{this.state.selectedPlace.city}, {this.state.selectedPlace.state}, {this.state.selectedPlace.country}  </p>
                                <small className="text-muted">{this.state.selectedPlace.type}</small>                                
                        </div>
                </InfoWindow>              

                </Map> 
                : null }
            </div>
        );
      }

}


export default GoogleApiWrapper({
    apiKey: ('AIzaSyAQw9CocoHxqErBbM-GwMQxxFJ5AGLKpBQ')
  })(NearmeMap)