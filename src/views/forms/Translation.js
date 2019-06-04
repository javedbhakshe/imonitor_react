import React, { Component } from 'react';
import { apiServices } from '../../services/apiServices';
import TranslationModal from '../../components/modals/TranslationModal';
import _ from 'lodash';
import Loader from '../../components/loaders/loader';
import swal from 'sweetalert';


class Translation extends Component{

    state = {
        uuid:'',
        searchTax:'',
        languageList: [],
        languageData: {},
        editData : {},
        isLoading:true,
        englishLable: {}
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

        let englishLable = !_.isEmpty(languageData['en_US']) ? (languageData['en_US'].lbl ? languageData['en_US'].lbl : {}) : {};
        this.setState({isLoading:false,uuid:uuid,languageList:languageListObj, languageData,englishLable, editData : {}});
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

    searchData = (e) => {
        var that = this;        
        let acceptedValues = e.target.value;
        let englishData = this.state.languageData['en_US'].lbl;
        var filteredObject = Object.keys(englishData).reduce(function(r, key) {
            if(englishData[key].toLowerCase().includes(acceptedValues.toLowerCase())){
                r[key] = englishData[key]
            }            
            return r;
          }, {})
        this.setState({englishLable:filteredObject,searchTax:e.target.value});
    }
   

    render(){
        var that = this;
        return (
        <div className="card">
            <div className="card-body">
            <Loader isLoading={this.state.isLoading}/>
            <div className="row">
                <div className="col-sm input-group mb-3">
                    <input type="text" className="form-control" placeholder="Please Enter English Word Here" value={this.props.searchTax} onChange={this.searchData} />
                </div>
                <div className="col-sm">
                    <TranslationModal loadTranslation={ this.loadData} formData={this.state.editData} closedEdit={this.closedEdit}/>
                </div>               
            </div>           
            <table className="table table-bordered translationTable">
                <thead className="thead-light">
                    <tr> 
                        <th width="200px" scope="col">Label</th>            
                            {
                                
                                Object.entries(this.state.languageList).map(([key, item]) => {                                    
                                    return (
                                        <th scope="col" key={key}>{item.displayName}</th>                                
                                    )
                                })
                            }	
                        <th width="140px" scope="col">Action</th>             
                    </tr>
                </thead>
                <tbody>               
                {
                    !_.isEmpty(this.state.englishLable) ? 
                        Object.entries(this.state.englishLable).map(([key, value]) => {                       
                            return <tr key={key}>
                                <th scope="row">{key}</th>
                                {that.renderLanguageData(key)}  
                                <th scope="col">
                                <button className="mr-1 btn btn-primary btn-sm" onClick={ () => this.editTranslation(key)} ><span className="fa fa-pencil" aria-hidden="true"></span> Edit</button>
                                <button className="btn btn-danger btn-sm" onClick={ () => this.deleteTranslation(key)} ><span className="fa fa-trash" aria-hidden="true"></span> Delete</button>                                </th>                                                   
                            </tr>
                        }) 
                    : null
                } 
                </tbody>
            </table>
            </div>
        </div>
        )
    }
}

export default Translation;