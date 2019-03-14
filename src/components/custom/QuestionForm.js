import React, { Component } from 'react';
import Select from 'react-select';
import {aQuestionType}  from '../../data/config';
import _ from 'lodash';

class QuestionForm extends Component {
    constructor(props) {
        super(props);

        /* this.state = {
            formErrors: { title: '', type: '' },
            titleValid: false,
            typeValid: false,
            formValid: false,
            showNomial: false,
            data:{}
        };*/


        const community = JSON.parse(localStorage.getItem('community')),
            uuid = community.community.uuid,
            aLanguageList = community.uuidLocales[uuid] ? community.uuidLocales[uuid] : [];


        /* GET en_US on default first place */
        for (let i in aLanguageList) {
            if (aLanguageList[i].locale === 'en_US') {
                let oEle = aLanguageList.splice(i, 1)[0];
                aLanguageList.unshift(oEle);
                break;
            }
        }

        /*this.formRef = React.createRef();*/

        this.aLanguageList = aLanguageList;
        this.initializeState();
    }

    initializeState = (p_isSet) => {
        let oTemp = {};
        for(let i in this.aLanguageList){
            let sProp = this.aLanguageList[i].locale;
            oTemp[sProp] = {mendatory: '',name:'',nominal:'',type:aQuestionType[0], dependent:{value:"", label:"Please Select"}};
        }
        if(p_isSet){
            this.setState({
                showNomial: false,
                formValid:false,
                editMode:false,
                errorClass:{title:'',type:''},
                data:oTemp
            });
        }else{
            this.state = {
                showNomial: false,
                formValid:false,
                editMode:false,
                errorClass:{title:'',type:''},
                data:oTemp
            };
        }
    }



    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.editMode);
        if(this.state.editMode){
            this.props.editQuestionData(this.state.data);
        }else {
            this.props.getQuestionData(this.state.data)
        }
        this.initializeState(true);
    }


    getTabList = (e) =>{
        return this.aLanguageList.map((ele,ind) => {
            return (
                <li className="nav-item" key={ind}>
                    <a className={`nav-link ${ind === 0 ? 'active' : ''}`} data-toggle="tab" role="tab" href={`#tab-${ind}`}>{ele.displayLanguage}</a>
                </li>
            );
        });
    }

    handleInputChange = (e) =>{

        let sLang = e.target.dataset['lang'],
            {value,name,checked} = e.target,
            oError = {title:'',type:''},
            bFormValid = true;

        if(name === 'name' && sLang === 'en_US'){
            if(!value){
                oError.title = 'English Title Should not empty';
                oError.type = 'is-invalid';
                bFormValid = false;
            }
        }

        this.setState(prevState => {
            let {data} = prevState;
            if(name == 'mendatory'){
                for(let i in data){
                    data[i]['mendatory'] = checked; 
                } 
            }else{
                data[sLang][name] = value;
            }
           
            return{
                data:data,
                errorClass:oError,
                formValid:bFormValid
            }  
        });
    }

    handleSelect = (selectedOption,e) => {
        let dataObj = e.name.split('#')
        let sName = dataObj[0],
            sLang =  dataObj[1];
        this.setState(prevState => {
            let {data} = prevState,
                sValue = selectedOption.value, 
                bFlag =  sName == 'type' ? (sValue === 'Dropdown' || sValue === 'Radio' || sValue === 'Checkbox') : this.state.showNomial;

            for(let i in data){
                data[i][sName] = selectedOption; 
            }
            return{
                data:data,
                showNomial:bFlag
            }
        });
    }


    getTabConents = (e) => {
    
        let dependentQuestionList = [];
        if(!_.isEmpty(this.props.listItems)){
            dependentQuestionList = this.props.listItems.map(({en_data}, index) => {
                return {value:index, label:en_data.name}
            });
            dependentQuestionList.unshift({value:"", label:"Please Select"});
        }

        return this.aLanguageList.map((ele,ind) => {
            const {value} = this.state.data[ele.locale]['type'];
            return (
                <div className={`tab-pane ${ind === 0 ? 'active' : ''}`} id={`tab-${ind}`} key={ind} role="tabpanel">
                   <div className="form-group float-right">                        
                        <div className="form-check form-check-inline mr-1">
                            <input className="form-check-input" id = {`mendatory_${ele.locale}`} data-lang={ele.locale} onChange = {this.handleInputChange} name="mendatory" 
                            type="checkbox"
                            checked = {this.state.data[ele.locale]['mendatory']}  />
                            <label className="form-check-label" >Mandatory</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor={`name_${ele.locale}`} className="col-form-label">Attribute Name</label>
                        <div className="input-group">
                            <span className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fa fa-user"></i>
                                </span>
                            </span>
                            <input type="text" 
                                className={`form-control ${ele.locale === 'en_US' ? this.errorClass() :''}`}
                                id={`name_${ele.locale}`} name="name" data-lang={ele.locale}  
                                placeholder="Enter title ..."
                                value = {this.state.data[ele.locale]['name']}
                                onChange = {this.handleInputChange}
                            />
                            <em className="error invalid-feedback">{this.state.errorClass.title}</em>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor={`type_${ele.locale}`} className="col-form-label">Attribute Type</label>
                        <div className="input-group">
                            <span className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fa fa-list"></i>
                                </span>
                            </span>
                            <Select 
                                name = {`type#${ele.locale}`}
                                className = "form-control p-0"
                                defaultValue = {aQuestionType[0]}                                
                                placeholder="Please Select Type"
                                options={aQuestionType}
                                onChange = {this.handleSelect}
                                data-lang={ele.locale}
                                value = { this.state.data[ele.locale]['type'] }
                            />
                        </div>
                    </div>
                    {

                        this.state.showNomial && 
                        <div className="form-group">
                            <label  htmlFor={`nominal_${ele.locale}`} className="col-form-label">Nominals(coma seperated) </label>
                            <div className="input-group">
                                <span className="input-group-prepend">
                                    <span className="input-group-text">
                                        <i className="fa fa-bars"></i>
                                    </span>
                                </span>
                                <textarea className="form-control" id={`nominal_${ele.locale}`} 
                                    name="nominal" data-lang={ele.locale}
                                    value = {this.state.data[ele.locale]['nominal']}
                                    onChange = {this.handleInputChange}
                                >
                                    
                                </textarea>
                            </div>
                        </div>
                    }
                    {/* <div className="form-group">
                        <label htmlFor={`type_${ele.locale}`} className="col-form-label">Dependent Question</label>
                        <div className="input-group">
                            <span className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fa fa-list"></i>
                                </span>
                            </span>
                            <Select 
                                name = {`dependent#${ele.locale}`}
                                className = "form-control p-0"
                                placeholder="Please Select Dependent"
                                options={dependentQuestionList}
                                onChange = {this.handleSelect}
                                data-lang={ele.locale}
                                value = { this.state.data[ele.locale]['dependent'] }
                            />
                        </div>
                    </div> */}
                </div>
            )
        });
    }
    
    showForm = (p_data) => {    
        
        this.setState(prevState => {
            let {value} = p_data['en_US']['type'],
                bFlag = (value === 'Dropdown' || value === 'Radio' || value === 'Checkbox'); 

            return {
                data:p_data,
                showNomial:bFlag,
                editMode:true
            }
        });

    }

    errorClass = () => {
        let {name} = this.state.data['en_US'],
            oError = {title:'',type:''};
        
        if(!name){
            oError.title = 'English Title Should not empty';
            oError.type = 'is-invalid';
        }
        return oError.type;
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <ul className="nav nav-tabs" role="tablist">
                        {this.getTabList()}
                    </ul>
                    <div className="tab-content">
                        {this.getTabConents()}
                    </div>
                    <div className="text-center card-footer">
                        <button type="submit" className="mr-3 btn btn-primary btn-sm" 
                            disabled={!this.state.formValid}
                        >
                        <i className="fa fa-plus"></i> Add 
                        </button>
                    </div>
                </form>
            </div>
        ); 
    }
}

export default QuestionForm;