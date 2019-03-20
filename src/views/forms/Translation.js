import React, { Component } from 'react';
import { apiServices } from '../../services/apiServices';
import TranslationModal from '../../components/modals/TranslationModal';
import _ from 'lodash';
import Loader from '../../components/loaders/loader';
import swal from 'sweetalert';


class Translation extends Component{

    state = {
        uuid:'',
        languageList: [],
        languageData: {},
        editData : {},
        isLoading:false,
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

        this.setState({uuid:uuid,languageList:languageListObj, languageData, editData : {}});
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

    closedEdit = () => {
        this.setState({editData : {}});
    }

    deleteTranslation = (label) => {
        var that = this;
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) { 
                this.setState({isLoading : true});   
                const promises = Object.entries(this.state.languageData).map(([key, val]) => {
                    if(!_.isEmpty(val.lbl)){
                        let requestOptions = { 
                            uuid:this.state.uuid,
                            field:label,
                            text:val.lbl[label],
                            locale_lang:key,
                            domain:"lbl",
                            module:"IMONITOR",
                            deleteFlag:true
                        }
                        return apiServices.addTranslation(requestOptions);
                    }                    
                })
                Promise.all(promises).then(function(results) {
                    that.loadData();
                    that.setState({isLoading : false});   
                    swal("Poof! Data has been deleted Successfully!", {
                        icon: "success",
                    });
                })
              
            } 
          });
    }
   

    render(){
        var that = this;
        let englishLable = !_.isEmpty(this.state.languageData['en_US']) ? (this.state.languageData['en_US'].lbl ? this.state.languageData['en_US'].lbl : {}) : {};
        return (
        <div>
             <Loader isLoading={this.state.isLoading}/>
            <TranslationModal loadTranslation={ this.loadData} formData={this.state.editData} closedEdit={this.closedEdit}/>
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
                        <th width="160px" scope="col">Action</th>             
                    </tr>
                </thead>
                <tbody>               
                {
                    !_.isEmpty(englishLable) ? 
                        Object.entries(englishLable).map(([key, value]) => {                       
                            return <tr key={key}>
                                <th scope="row">{key}</th>
                                {that.renderLanguageData(key)}  
                                <th scope="col">
                                <button className="mr-1 btn btn-primary btn-sm" onClick={ () => this.editTranslation(key)} ><span className="fa fa-pencil" aria-hidden="true"></span> Edit</button>
                                <button className="btn btn-danger btn-sm" onClick={ () => this.deleteTranslation(key)} ><span className="fa fa-pencil" aria-hidden="true"></span> Delete</button>                                </th>                                                   
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