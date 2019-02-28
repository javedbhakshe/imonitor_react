import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class NearmeMap extends Component{
    state = {        
        latitude:'',
        longitude:'',
        isLoading:false,
        isOpen: false,
        markerObjects:[]       
    }
  
    onSelectedMarker = () => {
        this.setState({
            isOpen: !this.state.isOpen
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
                    
                    data.map(({nearme}, key) => {
                       
                        return (
                            <Marker 
                                key={key}
                                title={nearme.name}
                                name={nearme.name}
                                onClick={this.onSelectedMarker}
                                position={{ lat: nearme.latitude, lng: nearme.longitude }}
                            >
                            <InfoWindow  visible={this.state.isOpen} >
                                <div>
                                    <h4>{nearme.name}</h4>
                                </div>
                            </InfoWindow>  
                            </Marker>
                        )
                    })
                }

                

                </Map> 
                : null }
            </div>
        );
      }

}


export default GoogleApiWrapper({
    apiKey: ('AIzaSyAQw9CocoHxqErBbM-GwMQxxFJ5AGLKpBQ')
  })(NearmeMap)