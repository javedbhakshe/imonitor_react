import React, { Component } from 'react';
import Select from 'react-select';
import {aQuestionType}  from '../../data/config';
class QuestionForm extends Component {
    constructor(props) {
        super(props);

     /*   this.state = {
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
        console.log('initilize');
        let oTemp = {};
        for(let i in this.aLanguageList){
            let sProp = this.aLanguageList[i].locale;
            oTemp[sProp] = {name:'',nominal:'',type:aQuestionType[0]};
        }
        if(p_isSet){
            this.setState({
                showNomial: false,
                data:oTemp
            });
        }else{
            this.state = {
                showNomial: false,
                data:oTemp
            };
        }
    }



    handleSubmit = (e) => {
        e.preventDefault();
        this.props.getQuestionData(this.state.data);
        this.initializeState(true);
    }


    getTabList = (e) =>{
        return this.aLanguageList.map((ele,ind) => {
            return (
                <li className="nav-item" key={ind}>
                    <a className={`nav-link ${ind === 0 ? 'active' : ''}`} data-toggle="tab" role="tab" href={`#tab-${ind}`}>{ele.displayName}</a>
                </li>
            );
        });
    }

    handleInputChange = (e) =>{
        let sLang = e.target.dataset['lang'],
            {value,name} = e.target;
        this.setState(prevState => {
            let {data} = prevState;
            data[sLang][name] = value;
            return{
                data:data
            }  
        });
    }

    handleSelect = (selectedOption,e) => {
        let sName = 'type',
            sLang =  e.name.split('type_')[1];
        this.setState(prevState => {
            let {data} = prevState,
                sValue = selectedOption.value, 
                bFlag =  (sValue === 'Dropdown' || sValue === 'Radio' || sValue === 'Checkbox');

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
        return this.aLanguageList.map((ele,ind) => {
            const {value} = this.state.data[ele.locale]['type'];
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
                                className="form-control"
                                id={`name_${ele.locale}`} name="name" data-lang={ele.locale}  
                                placeholder="Enter title ..."
                                value = {this.state.data[ele.locale]['name']}
                                onChange = {this.handleInputChange}
                            />
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
                                name = {`type_${ele.locale}`}
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
                showNomial:bFlag
            }

        });
    }

    
    render() {
        console.log(this.state)
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
                        <button type="submit" className="mr-3 btn btn-primary btn-sm" ><i className="fa fa-plus"></i> Add </button>
                    </div>
                </form>
            </div>
        ); 
    }
}

export default QuestionForm;