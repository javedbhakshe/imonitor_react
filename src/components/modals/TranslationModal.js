import React,{Component} from 'react';
import { apiServices } from '../../services/apiServices';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap';
import Loader from '../../components/loaders/loader';
import _ from 'lodash';

class TranslationModal extends Component {

    state = {
        show:false,
        field : '',
        languageList: [],
        languageData : {},
        isLoading:false,
    }

    componentDidMount = () => {
        let communityBO = JSON.parse(localStorage.getItem('community'));
        let uuid = communityBO.community.uuid;
        let languageList = communityBO.uuidLocales[uuid] ? communityBO.uuidLocales[uuid] : [];  
        let languageData = {};
        if(!_.isEmpty(languageList)){            
            languageList.map((value, key) => {
                languageData[value.locale] = '';
            });
        }
        this.setState({languageList, languageData});
    }

    componentWillReceiveProps = (newProps) => {
        if(!_.isEmpty(newProps.formData)){
            this.setState({
                field:newProps.formData.field,
                languageData: newProps.formData.languageData,
                show: true
            })
        }
    } 

    handleUserInput = (e) =>{        	
        const name = e.target.name;
        const value = e.target.value;
        let lang = e.target.dataset["lang"];
        let langData = this.state.languageData;        
        if(!_.isEmpty(lang)){
            langData[lang] = value;
            this.setState({languageData: langData})
        }else{
            this.setState({[name]: value})
        }
    }

    handleSubmit = (e) =>{
        e.preventDefault();	
        var that = this;
        this.setState({isLoading : true});   
        let communityBO = JSON.parse(localStorage.getItem('community'));
        let uuid = communityBO.community.uuid;
        const promises = Object.entries(this.state.languageData).map(([key, val]) => {
            let requestOptions = { 
                uuid:uuid,
                field:this.state.field,
                text:val,
                locale_lang:key,
                domain:"lbl",
                module:"IMONITOR"
            }
            return apiServices.addTranslation(requestOptions);
        })
        Promise.all(promises).then(function(results) {
            that.props.loadTranslation();
            that.setState({ 
                show:false,
                field : '',                
                languageData : {},
                isLoading:false,
             });
        })
    }

    handleClose = () => {
        this.setState({ show: false });
      }
    
    handleShow = () => {
    this.setState({ show: true });
    }


    render(){
        return (
            <div className="card">
                <Loader isLoading={this.state.isLoading}/>
                <Button className="btn btn-light survey-btn" color="primary" onClick={this.handleShow}>Add Translation</Button>
				<Modal isOpen={this.state.show} className="modal-lg" onOpened={this.handleShow} onClosed = {this.handleClose} >
		          	<ModalHeader>Add Translations</ModalHeader>	          		
                    <form id="languageForm" onSubmit={this.handleSubmit}>                        
                        <ModalBody>                       
                            <div className="form-group">
                                <label>Field</label>
                                <input type="text" name="field" className="form-control" onChange={this.handleUserInput}  placeholder="Enter Field" value={this.state.field} />
                                <small id="fieldHelp" className="form-text text-muted">Field name used by mobile developer to show translated data .</small>
                            </div>
                            {
                                this.state.languageList.map((item, key) => {
                                    return (
                                        <div className="form-group" key={key}>
                                            <label><strong>{item.displayName}</strong> Text</label>
                                            <input type="text" onChange={this.handleUserInput} value={this.state.languageData[item.locale]} name="languageData" data-lang={item.locale} className="form-control"  placeholder="Enter Text" />
                                        </div>                               
                                    )
                                })
                            }	
                        </ModalBody>
                        <ModalFooter  className="text-center card-footer">
                            <button type="submit" disabled={!this.state.field} className="mr-3 btn btn-primary btn-sm"><i className="fa fa-plus"></i> Add </button>
                            <button type="button" className="btn btn-danger btn-sm" id="closeLangModal" onClick={this.handleClose} data-dismiss="modal" aria-label="Close"><i className="fa fa-close "></i> Close</button>
                        </ModalFooter>
                    </form>		
		        </Modal>
        </div>
        )
    }
}

export default TranslationModal;