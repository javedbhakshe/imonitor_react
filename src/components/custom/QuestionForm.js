import React, { Component } from 'react';
import Select from 'react-select';
import {aQuestionType,aUserType}  from '../../data/config';
import Options from '../options/Options';
import swal from 'sweetalert'; 


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
            oTemp[sProp] =  {   
                /*mandatory: false,*/ name:'',nominal:[],
                type:aQuestionType[0]
            };
        }
        if(p_isSet){
            this.setState({
                showNomial: false,
                formValid:false,
                editMode:false,
                errorClass:{title:'',type:''},
                mandatory:false,
                userType:aUserType,
                dependantQuestion:null,
                dependantAnswer:null,
                data:oTemp
            });
        }else{
            this.state = {
                showNomial: false,
                formValid:false,
                editMode:false,
                errorClass:{title:'',type:''},
                mandatory:false,
                userType:aUserType,
                dependantQuestion:null,
                dependantAnswer:null,
                data:oTemp
            };
        }
    }



    handleSubmit = (e) => {
        e.preventDefault();
        /* */
        let aDepAns = [];
        if(this.state.dependantAnswer){
            let i, {dependantAnswer} = this.state;
            for(i in dependantAnswer){
                aDepAns.push(dependantAnswer[i].index);
            }
        }
        /* */

        let nDepeant = this.state.dependantQuestion ? this.state.dependantQuestion.index : -1, 
            oQuestionConfig = {
                isMandatory:this.state.mandatory,
                userType:this.state.userType,
                dependantIndex:nDepeant,
                dependantAnswer:aDepAns
            };
        if(this.state.editMode){
            this.props.editQuestionData(this.state.data,oQuestionConfig);
        }else {
            this.props.addQuestionData(this.state.data,oQuestionConfig);
            swal("Good job!", "You have added question successfully.", "success");
        }
        this.initializeState(true);
    }

    addNewquestion = (e) => {
        e.preventDefault();
        this.initializeState(true);
        this.props.reset();
    }


    getTabList = (e) =>{
        return this.aLanguageList.map((ele,ind) => {
            return (
                <li className="nav-item" key={ind}>
                    <a className={`nav-link ${ind === 0 ? 'active' : ''}`} data-toggle="tab" role="tab" href={`#tab-${ind}`}>{`${ele.displayLanguage}_${ele.country}`}</a>
                </li>
            );
        });
    }

    handleInputChange = (e) =>{

        let sLang = e.target.dataset['lang'],
            {value,name} = e.target,
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
            
            data[sLang][name] = value;
           
            return{
                data:data,
                errorClass:oError,
                formValid:bFormValid
            }  
        });
    }

    handleCheckBox = (e) => {
        let { checked } = e.target;
        this.setState({
            mandatory:checked
        });
    }

    handleSelect = (selectedOption,e) => {
        let dataObj = e.name.split('#')
        let sName = dataObj[0];
        this.setState(prevState => {
            let {data} = prevState,
                sValue = selectedOption.value, 
                bFlag =  sName === 'type' ? (sValue === 'Dropdown' || sValue === 'Radio' || sValue === 'Checkbox') : this.state.showNomial;

            for(let i in data){
                data[i][sName] = selectedOption; 
            }
            return{
                data:data,
                showNomial:bFlag
            }
        });
    }

    handleOptionsChange = (options,e) => {
        this.setState(prevState => {
            let {data} = prevState;
            data[e.lang][e.name] = options;
            return{
                data:data
            }
        });
    }


    getTabConents = (e) => {

        return this.aLanguageList.map((ele,ind) => {
            return (
                <div className={`tab-pane ${ind === 0 ? 'active' : ''}`} id={`tab-${ind}`} key={ind} role="tabpanel">
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
                            <label  className="col-form-label">Nominals</label>
                            <Options
                                name="nominal" lang={ele.locale} 
                                value={this.state.data[ele.locale]['nominal']}
                                onChange={this.handleOptionsChange}
                            />
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
      
    showForm = ({whole_data,isMandatory,userType,dependantIndex,dependantAnswer}) => {    
        debugger
        let i,oDependant = null,aDepAnswer = [],aFinalAnswers = [],aRecieved = [];
        if(dependantIndex !== -1){
            /* */
            aRecieved = this.props.getDependant();
            for(i in aRecieved){
                if(aRecieved[i].index === dependantIndex){
                    oDependant = aRecieved[i];
                    break;
                }
            }

            /* */
            // oDependant = this.props.getDependant()[dependantIndex];
            aDepAnswer = this.getDepOpts(oDependant.nominals);
            for(let j in dependantAnswer){
                aFinalAnswers.push(aDepAnswer[dependantAnswer[j]]);
            }
        }

        this.setState(prevState => {
            let {value} = whole_data['en_US']['type'],
                bFlag = (value === 'Dropdown' || value === 'Radio' || value === 'Checkbox'); 

            return {
                data:whole_data,
                showNomial:bFlag,
                editMode:true,
                formValid:true,
                mandatory:isMandatory,
                userType:userType,
                dependantQuestion:oDependant,
                dependantAnswer:aFinalAnswers
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

    onDepndantChange = (selectedOption,e) => {
        this.setState({
            dependantQuestion:selectedOption
        });
    }

    getDepOpts = (p_arr) => {
        let aTempOpts = [],i,nLen = p_arr.length;
        for(i = 0; i < nLen; i++){
            let oTemp = {value:p_arr[i],label:p_arr[i],index:i};
            aTempOpts.push(oTemp);
        }
        return aTempOpts;
    }

    render() {
        const aDepOptions = this.props.getDependant(),
            oDepState = this.state.dependantQuestion,
            aDepAnswerOpt = oDepState ? this.getDepOpts(oDepState.nominals) : []; 
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">                        
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" id = "mandatory_checkbox"
                                onChange = {this.handleCheckBox} 
                                name = "mandatory" 
                                type = "checkbox"
                                checked = {this.state.mandatory} 
                            />
                            <label htmlFor="mandatory_checkbox" className="form-check-label" >Mandatory</label>
                        </div>
                    </div>

                    <ul className="nav nav-tabs" role="tablist">
                        {this.getTabList()}
                    </ul>
                    <div className="tab-content">
                        {this.getTabConents()}
                    </div>
                    {/*<div className="form-group">
                        <label className="col-form-label">User Type : </label>
                        <div className="input-group">
                            <Select
                                name="usertype"
                                options={aUserType}
                                className="form-control p-0 mb-3"
                                defaultValue = {aUserType[0]}
                                onChange={e => this.setState({userType:e})}
                                isMulti = {true}
                                value={this.state.userType}
                            />
                        </div>
                    </div>*/}
                    {
                        aDepOptions.length ?  
                        <div className="form-group">
                            <label className="col-form-label">Dependant question : </label>
                            <div className="input-group">
                                <Select
                                    name="dependantQuestion"
                                    className="form-control p-0 mb-3"
                                    options={aDepOptions}
                                    onChange={this.onDepndantChange}
                                    value={this.state.dependantQuestion}
                                    placeholder="Please select dependant question"
                                />
                            </div>
                        </div> :
                        null
                    }
                    {
                        aDepAnswerOpt.length ? 
                        <div className="form-group">
                            <label className="col-form-label">Dependant Answer : </label>
                            <div className="input-group">
                                <Select
                                    name="dependantAnswer"
                                    className="form-control p-0 mb-3"
                                    options={aDepAnswerOpt}
                                    onChange={ e => this.setState({dependantAnswer:e})}
                                    value={this.state.dependantAnswer}
                                    isMulti={true}
                                    placeholder="Please select dependant Answer"
                                />
                            </div>
                        </div> : 
                        null
                    }
                    <div className="text-center card-footer">
                        {   
                            this.state.editMode ?
                            <button type="submit" className="mr-3 btn btn-primary btn-sm" 
                                disabled={!this.state.formValid}
                            >
                                <i className="fa fa-pencil"></i> Save 
                            </button>
                            :
                            <button type="submit" className="mr-3 btn btn-primary btn-sm" 
                                disabled={!this.state.formValid}
                            >
                                <i className="fa fa-plus"></i> Add 
                            </button>
                        }

                        {
                            this.state.editMode ? 
                            <button className="mr-3 btn btn-danger btn-sm"
                                onClick = {this.addNewquestion}
                            >
                                <i className="fa fa-plus"></i> Add New 
                            </button>
                            :null
                        }
                    </div>
                </form>
            </div>
        ); 
    }
}

export default QuestionForm;