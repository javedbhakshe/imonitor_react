import React, { Component } from 'react';
import Dropzone  from "react-dropzone";
import { apiServices } from '../../services/apiServices';
import Loader from '../../components/loaders/loader';
import nmTemplate from '../../assets/images/nmTemplate.xlsx';
import axios from "axios";

export class UploadNearme extends Component {

    state = {
        files: [],
        isLoading:false,
    };

    onDrop = async (files) => {
             this.setState({
                    files: files,
                    isLoading:true,
                });
           if(this.state.files.length > 0){

            const formData = new FormData();
            formData.append('file', files[0]);
            
            const response = await axios.post(`https://uat.imonitorplus.com/service/api/creative/nearme/nearmedataupload`,formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            if(response.data.successMessage === "Success"){
                this.props.toggle('nearme-list');
            }
            console.log(response);

           }
      }

    render(){
        return (
            <div>
                <Loader isLoading={this.state.isLoading}/>
                <div className="text-center card-footer">
                 <a href={nmTemplate} className="mr-3 btn btn-primary btn-sm" download>Download Sample File</a>
                </div>
                <div className="dropzone">
                    <Dropzone onDrop={this.onDrop}>
                        {({getRootProps, getInputProps}) => (
                            <section >
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <p className="dz-message">
                                    Drag & Drop or click here
                                </p>
                            </div>
                            </section>
                        )}
                    </Dropzone>                  
                   
                </div>
            </div>
          );
    }
}

export default UploadNearme;