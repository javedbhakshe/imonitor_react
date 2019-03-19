import React, { Component } from 'react';
import { apiServices } from '../../services/apiServices';
import TranslationModal from '../../components/modals/TranslationModal';
import _ from 'lodash';


class Translation extends Component{

    state = {
        languageList: [],
        languageData: {},
        editData : {}
    }

    componentDidMount(){
        this.loadData();
    }

    loadData = async () => {
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

        this.setState({languageList:languageListObj, languageData, editData : {}});
    }
    
    renderLanguageData = (label) => {
        return  Object.entries(this.state.languageData).map(([key, val])  => {
            return (
                <th scope="col" key={key}>{!_.isEmpty(val.lbl) ? val.lbl[label] : ''}</th>                                
            )
        })
    }

    editTranslation = (label) => {
        let transData = {};
        for (let i in this.state.languageData) {
            let transVal = this.state.languageData[i];
            transData[i] = !_.isEmpty(transVal.lbl) ? transVal.lbl[label] : ''
        }      
        
        let editData = {
            field:label,
            languageData:transData
        }

        this.setState({editData});
        console.log(transData);
    }
   

    render(){
        var that = this;
        let englishLable = !_.isEmpty(this.state.languageData['en_US']) ? (this.state.languageData['en_US'].lbl ? this.state.languageData['en_US'].lbl : {}) : {};
        return (
        <div>
            <TranslationModal loadTranslation={ this.loadData} formData={this.state.editData}/>
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
                                <th scope="col"><button className="btn btn-sm btn-custom badge-success" onClick={ () => this.editTranslation(key)} ><span className="fa fa-pencil" aria-hidden="true"></span> Edit</button>
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