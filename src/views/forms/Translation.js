import React, { Component } from 'react';
import { apiServices } from '../../services/apiServices';
import _ from 'lodash';

class Translation extends Component{

    state = {
        languageList: [],
        languageData: {}
    }

    async componentDidMount(){
        let communityBO = JSON.parse(localStorage.getItem('community'));
        let uuid = communityBO.community.uuid;
        let languageList = communityBO.uuidLocales[uuid] ? communityBO.uuidLocales[uuid] : [];
        const languageData = {};
        const languageListObj = {};
        await Promise.all(languageList.map( async(value, index) => {
            const language = await apiServices.translation(uuid, value.locale);
            languageData[[value.locale]] = language;
            languageListObj[[value.locale]] = value;
        }));

        this.setState({languageList:languageListObj, languageData});
    }
    
    renderLanguageData = (label) => {
        return  Object.entries(this.state.languageData).map(([key, val])  => {
            return (
                <th scope="col" key={key}>{!_.isEmpty(val.lbl) ? val.lbl[label] : ''}</th>                                
            )
        })
    }
   

    render(){
        var that = this;
        let englishLable = !_.isEmpty(this.state.languageData) ? this.state.languageData['en_US'].lbl : {};
        return (
        <div>
            <table className="table table-bordered">
                <thead className="thead-dark">
                    <tr> 
                        <th scope="col">Label</th>            
                            {
                                Object.entries(this.state.languageList).map(([key, item]) => {
                                    return (
                                        <th scope="col" key={key}>{item.displayName}</th>                                
                                    )
                                })
                            }	
                        <th width="100px" scope="col">Action</th>             
                    </tr>
                </thead>
                <tbody>               
                {
                    !_.isEmpty(englishLable) ? 
                        Object.entries(englishLable).map(([key, value]) => {                       
                            return <tr key={key}>
                                <th scope="row">{key}</th>
                                {that.renderLanguageData(key)}  
                                <th scope="col"><button className="btn btn-sm btn-custom badge-success" ><span className="fa fa-pencil" aria-hidden="true"></span> Edit</button>
                        </th>                                                   
                            </tr>
                        }) 
                    : null
                } 
                </tbody>
            </table>
        </div>
        )
    }
}

export default Translation;