import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class NearmeMap extends Component{
    state = {        
        latitude:'',
        longitude:'',
        isLoading:false         
    }
  
    onSelectedMarker = () => {
       
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
                            title={nearme.name}
                            name={nearme.name}
                            onClick={this.onSelectedMarker}
                            position={{ lat: nearme.latitude, lng: nearme.longitude }}
                        />
                    )                    
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