import React,{Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
  

  render() {
    return (
      <Map google={this.props.google} 
  			zoom={14}
  			initialCenter={{
	            lat: 19.0760,
	            lng: 72.8777
	        }}
		>
 
        <Marker onClick={this.onMarkerClick}
                name={'Current location'} 
        />
 
        <InfoWindow onClose={this.onInfoWindowClose}>
          
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBedTd_YjXAiOM8I34K2MRUzqso2wu0wlA')
})(MapContainer)