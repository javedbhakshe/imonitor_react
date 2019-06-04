import React, {useState, useEffect} from 'react';
import {getCommunity, getLanguageList} from '../../core/useCommunityBO'
import CKEditor from "react-ckeditor-component";
import {Modal, ModalHeader, ModalBody,ModalFooter} from 'reactstrap';
import { apiServices } from '../../services/apiServices';
import _ from 'lodash';

const PageModal = props => {

    
    const languageList = getLanguageList();   

    const [show, setShow] =useState(false);  
    const [page, setPage] = useState({});
    useEffect(() => {
        let showModal = props.show ? true : false;
        let pageData = !_.isEmpty(props.data) ? props.data : {};
        let codeTitle = !_.isEmpty(props.data) ? props.data['en_US']['title'] : '';
        setShow(showModal);
        setPage(pageData);
        setCode(codeTitle);
    }, [props.data]);

    const [loading, setLoading] =useState(false);  
    const [code, setCode] = useState('');    
    const [error, setError] = useState('');

    const handleEditor = (event, lang) => {		
		if(!page[lang]){
			page[lang]={}
		}
        page[lang]['description'] =  event.editor.getData();
        setPage(page);       
		
    }
    
    const handleUserInput = (e) => {
		let lang = e.target.dataset["lang"];		
		if(!page[lang]){
			page[lang]={}
		}		
        const name = e.target.name;
        const value = e.target.value;
        const id = e.target.id;
		validateField(id, value);
        page[lang][name] = value;
        setPage(page);
        if(lang == 'en_US' && name == 'title'){
            setCode(value);
        }
    }

    const validateField = (fieldID, value) =>{        
       
        switch(fieldID) {
            case 'title-en_US':              
                let errorMsg = value.length >= 1 ? '' : 'English Title Should not empty';
                setError(errorMsg);
                break;
          
            default:
                break;
        }
        
	}
    
    const errorClass = (error) =>  {
        return(error.length === 0 ? '' : 'is-invalid');
    }

    const getTabList = () => {
	    return languageList.map(function(item, index) {
            return (
            <li className="nav-item" key={index}>
                <a className={"nav-link " + (item.locale == 'en_US' ? 'active' : '')} id={'tab-'+item.locale} data-toggle="tab" href={`#${item.locale}`} role="tab" aria-controls={item.locale}>{item.displayName}</a>
            </li>
            )
        })
  	}

    const getTabConents = () => {
        return languageList.map(function(value, index) {
            return (
                <div className={"tab-pane " + (value.locale == 'en_US' ? 'active' : '')} key={index} id={value.locale} role="tabpanel">
                    <div className="form-group">
                        <label className="control-label">Title</label>
                        <input className={`form-control ${errorClass(error)}`} name="title" id={'title-'+value.locale} type="text" data-lang={value.locale}											
                            onChange={handleUserInput}
                            value={page[value.locale] ? page[value.locale]['title'] : ''}
                            placeholder="Enter a title ..." />                            
                            <em className="error invalid-feedback">{error}</em>
                    </div>
                    <div className="form-group">
                        <label className="control-label" >Description</label>
                        <CKEditor activeClass="editor"
                          content={page[value.locale] ? page[value.locale]['description'] : ''}
                          events={{																								
                            "change": (e) => handleEditor(e, value.locale)
                          }}												 											 
                          />                        
                    </div>	
                </div>								
            )
        });
    }

    const handleShow = () => {
        setPage({});
        setShow(true);
    }

    const onModalClose = () => {        
        setShow(false);
    }

    const formSubmit = (e) => {
        e.preventDefault();	
        validateField('title-en_US', document.getElementById('title-en_US').value);
        if(error.length === 0){
            setLoading(true);
            let communityBO = JSON.parse(localStorage.getItem('community'));
            let requestOptions = {}, communityPages = {}, faqIndex;
            if(!_.isEmpty(communityBO.communityFAQBOs))  {
                communityPages = _.find(communityBO.communityFAQBOs, (value, index) => {
                    if(value.communityPreferences.code === code){
                        faqIndex = index;
                        return value;
                    }
                });
            }
            
            
            if(!_.isEmpty(communityPages))  {
                requestOptions = communityPages;
                requestOptions['communityPreferences']['summary'] = JSON.stringify(page);
                requestOptions['communityPreferences']['code'] = code;
            }else{
				requestOptions = { 
					communityPreferences: {
						type:"Faq",
						code:code,
						active:"Y",
						summary:JSON.stringify(page)
					} 
				};
            }
            apiServices.createPreferences(communityBO.community.uuid, requestOptions).then(function(response){
                setLoading(false);
                setShow(false);
                if(response.errors){
                  // that.setState({activeTab: 'getknowlegeable-tab'});
                }  
                if(response.status === "SUCCESS"){				
                      if(_.isEmpty(communityPages)){
                          communityBO.communityFAQBOs.push(response);
                      } else{
                          communityBO.communityFAQBOs[faqIndex] = response;
                      }
                      localStorage.setItem('community', JSON.stringify(communityBO));    
                      props.loadPages();                  
                    
                }          
              });
        }
        
    }

    
    
    return(
        <div className="mb-2">
            <button className="btn btn-light survey-btn" color="primary" onClick={handleShow}>Add Page</button>
            <Modal isOpen={show} className="modal-lg">
                <ModalHeader >Pages</ModalHeader>
                <ModalBody>                      
                <form onSubmit={formSubmit}>
                    <ul className="nav nav-tabs" role="tablist">
                        {getTabList()}
                    </ul>
                    <div className="tab-content">
                        {getTabConents()}
                    </div>     
                    <button type="submit" className="mt-3 btn btn-primary btn-sm"><i className="fa fa-plus"></i> Add </button>
                    <button type="button" className="mt-3 ml-3 btn btn-danger btn-sm" onClick={onModalClose} ><i className="fa fa-close "></i> Close</button>
                </form>                    
                </ModalBody>               
        </Modal>       
        </div>
    );
}

export default PageModal;