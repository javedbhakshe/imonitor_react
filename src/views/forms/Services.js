import React,{Component} from 'react';
import ServicesModal from '../../components/modals/servicesModal';
/*import { Card, CardBody, CardHeader } from 'reactstrap';*/
import ListGroup from '../../components/custom/ListGroup';
import QuestionForm from '../../components/custom/QuestionForm';
import EditableList from '../../components/custom/EditableList';
import { apiServices } from '../../services/apiServices';
import Loader from '../../components/loaders/loader';
import _ from 'lodash';
import swal from 'sweetalert';

class Services extends Component{

	state = {
		services:[],
		oWholeData : [],
		nCurrentActiveService: 0,
		nCurrentActiveQuestion: -1,
		nCurrentLinkedService : -1,
		bIsCurServiceLinked : false, 
		isLoading : false
		
	}

	componentDidMount(){
		let communityBO = localStorage.getItem('community');
		let community = JSON.parse(communityBO);
		let typeValue = this.props.serviceType;
		let communityPreferenceBOs = typeValue == 'Service' ? community.communityPreferenceBOs : community.communitySurveyBOs;		
		if(!_.isEmpty(communityPreferenceBOs)){
			let dataObj = JSON.parse(communityPreferenceBOs[0].communityPreferences.summary);
			this.setState({oWholeData:dataObj.oWholeData, services:dataObj.services});			
		}
	}

	addService = (p_oData,p_type) => {
		let oService = {};
		oService.data = p_oData['en_US'];
		oService.linked = p_type.value === 'Linked';
		if(oService.linked){
			let sLinkedservices = oService.data['linked-service'],
				aLinkedservices = [];
			if(!sLinkedservices){
				sLinkedservices = oService.data['linked-service'] = 'Unknown';
			}
			aLinkedservices = sLinkedservices.split(',');
			oService.linkedServices = this.makeLinkedService(aLinkedservices);
			/* Whole Data  */	
			let aWhole = this.makeWholeData(p_oData,aLinkedservices),
				oWhole = {
					data : aWhole,linked:oService.linked,
					serviceType:p_type,linkedServices:sLinkedservices,
					editable:p_oData
				};

			/*  */
			this.storeServiceData(oService,oWhole,oService.linked);
		}else{
			oService.questions = [];
			let oWhole = {data:p_oData,linked:oService.linked,questions:[],serviceType:p_type};
			this.storeServiceData(oService,oWhole,oService.linked);
		}


		if(this.refs.EditableForm){
			this.refs.EditableForm.initializeState(true);
		}
	}

	editService = (p_oData,p_type) =>{
		let oService = {},
			{services, oWholeData ,bIsCurServiceLinked , nCurrentActiveService, 
				nCurrentLinkedService, nCurrentActiveQuestion } = this.state;
		oService.data = p_oData['en_US'];
		oService.linked = bIsCurServiceLinked;
		if(bIsCurServiceLinked){
			/*    */
			let sLinkedservices = oService.data['linked-service'],
				aLinkedservices = [],aPrevWholedata = oWholeData[nCurrentActiveService].data,
				aPrevLinked = services[nCurrentActiveService].linkedServices;
			if(!sLinkedservices){
				sLinkedservices = oService.data['linked-service'] = 'Unknown';
			}
			aLinkedservices = sLinkedservices.split(',');
			oService.linkedServices = this.makeLinkedService(aLinkedservices);
			for(let s = 0; s < aPrevLinked.length; s++){
				oService.linkedServices[s].questions = aPrevLinked[s].questions;
			}
			/* Whole Data  */	
			let aWhole = this.makeWholeData(p_oData,aLinkedservices),
				oWhole,j,nLen = aPrevWholedata.length;

			for(j = 0;j < nLen;j++){
				aWhole[j].questions = aPrevWholedata[j].questions;
			}

			oWhole = {
				data : aWhole,linked:bIsCurServiceLinked,
				serviceType:p_type,linkedServices:sLinkedservices,
				editable:p_oData
			}

			this.setState( prevState => {
				let aPrev = prevState.services,
					aPrevWhole = prevState.oWholeData;

				aPrev[nCurrentActiveService] = oService;
				aPrevWhole[nCurrentActiveService] = oWhole;
				return {
					services:aPrev,
					oWholeData:aPrevWhole,
					nCurrentLinkedService:0,
					nCurrentActiveQuestion:-1
				}
			});

		}else {
			oService.questions = services[nCurrentActiveService].questions;
			let oWhole = {data:p_oData,linked:oService.linked,questions:oWholeData[nCurrentActiveService].questions,serviceType:p_type};
			this.setState( prevState => {
				let aPrev = prevState.services,
					aPrevWhole = prevState.oWholeData;

				aPrev[nCurrentActiveService] = oService;
				aPrevWhole[nCurrentActiveService] = oWhole;
				return {
					services:aPrev,
					oWholeData:aPrevWhole,
					nCurrentLinkedService:-1,
					nCurrentActiveQuestion:-1
				}
			});
		}
		this.refs.EditableForm.initializeState(true);
	}

	updateSeletedService = ({index, islinked, linkedindex}) => {

		let bislinked = islinked === 'true';
		this.setState({
			nCurrentActiveService: index,
			bIsCurServiceLinked : bislinked,
			nCurrentLinkedService: linkedindex === undefined ? 0 : linkedindex,
		 	nCurrentActiveQuestion : -1
		});

		this.refs.EditableForm.initializeState(true);
	}

	makeWholeData = (p_data,p_arr) => {
		let i,aWholeData = [];
		for(i in p_arr){
			let oTemp ={};
			for(let j in p_data){
				let sName = p_data[j]['linked-service'].split(',')[i] ? p_data[j]['linked-service'].split(',')[i] : '';
				oTemp[j] = {name : sName}
			}
			oTemp.questions = [];
			aWholeData.push(oTemp);			
		}
		return aWholeData;
	}

	addQuestion = (p_data,{isMandatory,userType}) => {
		let {bIsCurServiceLinked , nCurrentActiveService, nCurrentLinkedService,nCurrentActiveQuestion} = this.state,
			oQuestionObj = {en_data:p_data['en_US'],whole_data:p_data,isMandatory:isMandatory,userType:userType};
		

		this.setState( prevState =>  {
			let aPrev = prevState.services,
				aWholeData = prevState.oWholeData;

			if(bIsCurServiceLinked){
				aPrev[nCurrentActiveService].linkedServices[nCurrentLinkedService].questions.push(oQuestionObj);
				aWholeData[nCurrentActiveService].data[nCurrentLinkedService].questions.push(p_data);
			}else{
				aPrev[nCurrentActiveService].questions.push(oQuestionObj);
				aWholeData[nCurrentActiveService].questions.push(p_data)
			}
			return {
				services:aPrev,
				oWholeData:aWholeData,
				nCurrentActiveQuestion:-1
			}
		});
	}

	editQuestion = (p_data,{isMandatory,userType}) => {
		let {bIsCurServiceLinked , nCurrentActiveService, nCurrentLinkedService,nCurrentActiveQuestion} = this.state,
			oQuestionObj = {en_data:p_data['en_US'],whole_data:p_data,isMandatory:isMandatory,userType:userType};
		

		this.setState( prevState =>  {
			let aPrev = prevState.services,
				aWholeData = prevState.oWholeData;

			if(bIsCurServiceLinked){
				aPrev[nCurrentActiveService].linkedServices[nCurrentLinkedService].questions[nCurrentActiveQuestion] = oQuestionObj;
				aWholeData[nCurrentActiveService].data[nCurrentLinkedService].questions[nCurrentActiveQuestion] = p_data;
			}else{
				aPrev[nCurrentActiveService].questions[nCurrentActiveQuestion] = oQuestionObj;
				aWholeData[nCurrentActiveService].questions[nCurrentActiveQuestion] = p_data;
			}
			return {
				services:aPrev,
				oWholeData:aWholeData,
				nCurrentActiveQuestion:-1
			}
		});
	}

	makeLinkedService = (p_array) =>{
		let i, aLinked = [];
		for(i in p_array){
			let oTemp = {
				name: p_array[i],
				description:'Linked Sevices',
				questions:[]
			};
			aLinked.push(oTemp);
		}
		return aLinked; 
	}

	storeServiceData = (oService,p_oData,p_bIslinked) => {

		this.setState( prevState => {
			let aPrev = prevState.services,
				aPrevWhole = prevState.oWholeData,
				nLen = aPrev.length ;
			aPrev.push(oService);
			aPrevWhole.push(p_oData);
			return {
				services:aPrev,
				oWholeData:aPrevWhole,
				nCurrentActiveService: nLen,
				nCurrentLinkedService:p_bIslinked ? 0 : -1,
				bIsCurServiceLinked : p_bIslinked,
				nCurrentActiveQuestion:-1
			}
		});
	}

	onListItemDelete = ({index,islinked,linkedindex}) =>{
		
		this.setState( prevState => {
			let aPrev = prevState.services,
				aPrevWhole = prevState.oWholeData,
				nIndex , bLinked = false,nLinknedService;
			
			if(islinked === 'true'){

				let nInd = index.split('~')[0] * 1;
				aPrev[nInd].linkedServices.splice(linkedindex,1);
				
				if(aPrev[nInd].linkedServices.length === 0){
					aPrev.splice(nInd,1);
				}
				/*  */
				aPrevWhole[nInd].data.splice(linkedindex,1);
				if(aPrevWhole[nInd].data.length === 0){
					aPrevWhole.splice(nInd,1);
				}
				/*  */
			}else{
				aPrev.splice(index,1);
				aPrevWhole.splice(index,1);
				
			}
			let { currentindex,linked,isLinked } = this.getCurrentParams(aPrev);
			return {
				services:aPrev,
				oWholeData:aPrevWhole,
				nCurrentActiveService:currentindex,
				nCurrentLinkedService:linked,
				bIsCurServiceLinked : isLinked,
				nCurrentActiveQuestion:-1
			}
		});

	}

	getCurrentParams = (p_arr) => {
		let nIndex = p_arr.length - 1, nLinked = 0, bLinked = false;
		if(nIndex < 0){
			nLinked = -1;
		}else{
			bLinked = p_arr[nIndex].linked;	
		 	nLinked = bLinked ? 0 : -1; 
		}


		return{
			currentindex : nIndex,
			linked : nLinked,
			isLinked: bLinked 
		}
	}

	onListItemEdit = ({index,islinked,linkedindex = 0}) => {

		let oCurrent = Object.assign({},this.state.oWholeData[index]),
			bLinked = islinked === 'true';
		
		this.refs.Modal.onListEdit(oCurrent);
		

		this.setState({
			nCurrentActiveService: index,
			nCurrentActiveQuestion: 0,
			bIsCurServiceLinked : bLinked,
			nCurrentLinkedService : linkedindex,
			nCurrentActiveQuestion:-1
		});

	}

	updateActivequestion = ({index}) => {

		this.setState({
			nCurrentActiveQuestion:index
		});
		/* update form data */
		let oCurrent,{ services ,oWholeData,bIsCurServiceLinked,nCurrentActiveService, nCurrentLinkedService} = this.state;
		
		if(bIsCurServiceLinked){
			oCurrent = services[nCurrentActiveService].linkedServices[nCurrentLinkedService].questions[index];
		}else{
			oCurrent = services[nCurrentActiveService].questions[index];
		}

		this.refs.EditableForm.showForm(oCurrent.whole_data,oCurrent.isMandatory,oCurrent.userType);
		/*  */
	}

	onQuestionDelete = ({index}) =>{

		let {oWholeData,services,bIsCurServiceLinked , nCurrentActiveService, nCurrentLinkedService} = this.state;
		
		
		if(bIsCurServiceLinked){
			services[nCurrentActiveService].linkedServices[nCurrentLinkedService].questions.splice(index ,1);
			oWholeData[nCurrentActiveService].data[nCurrentLinkedService].questions.splice(index,1);
			
		}else{
			services[nCurrentActiveService].questions.splice(index, 1);
			oWholeData[nCurrentActiveService].questions.splice(index,1);
		}

		this.setState({
			services:services,
			nCurrentActiveQuestion:-1
		});
		/* */
		this.refs.EditableForm.initializeState(true);
		/*if(index * 1 === this.state.nCurrentActiveQuestion * 1){
		}*/
		/* */
	}

	updateQuestionList = () => {
		console.log('Add Question in service');
	}

	getCurrentServiceQuestions = () => {
		
		let aCurrent = [],
			{services,bIsCurServiceLinked , nCurrentActiveService, nCurrentLinkedService} = this.state;
		
		if(bIsCurServiceLinked){
			aCurrent = services[nCurrentActiveService].linkedServices[nCurrentLinkedService].questions; 
		}else{
			aCurrent = services[nCurrentActiveService].questions;
		}
		return aCurrent;
	}

	formSubmit = () => {
		var that = this;  
		if(this.state.oWholeData.length > 0){
			this.setState({isLoading : true});   
			let communityBO = JSON.parse(localStorage.getItem('community'));
			let typeValue = this.props.serviceType;
			let commuityReferenceBO = typeValue == 'Service' ? communityBO.communityPreferenceBOs : communityBO.communitySurveyBOs;
			let uuid = communityBO.community.uuid;
			let requestOptions = {};
			let dataObj = {
				'services':this.state.services,
				'oWholeData':this.state.oWholeData
			}
			if(!_.isEmpty(commuityReferenceBO))  {
				commuityReferenceBO[0]['communityPreferences']['summary'] = JSON.stringify(dataObj);
				requestOptions = commuityReferenceBO[0];
			}else{				
				requestOptions = { 
					communityPreferences: {
						type:typeValue,
						code:typeValue,
						active:"Y",
						summary:JSON.stringify(dataObj)
					} 
				};
			}
			
			apiServices.createPreferences(uuid, requestOptions).then(function(response){
			  that.setState({isLoading: false});
			  if(response.errors){
				// that.setState({activeTab: 'getknowlegeable-tab'});
			  }  
			  if(response.status === "SUCCESS"){
				//   that.props.community(response.community);
				if(_.isEmpty(commuityReferenceBO)){
					commuityReferenceBO.push(response);
				} else{
					commuityReferenceBO[0] = response;
				}
				localStorage.setItem('community', JSON.stringify(communityBO));
				let confTab = typeValue == 'Service' ? 'survey-tab' : 'nearme-tab' ;
				that.props.configTab(confTab);
				  
			  }          
			});
		  }else{
			swal("No Services Section!", {
				icon: "error",
			});
		  }
	}

	render(){
		/*console.clear();
		console.log(this.state.services);
		console.log(this.state.oWholeData);*/
		const oSelectedList = {
			linked:this.state.bIsCurServiceLinked,
			active:this.state.nCurrentActiveService,
			activeLinked:this.state.nCurrentLinkedService
		}

		return(
			<div className="card">
			<Loader isLoading={this.state.isLoading}/>
				<div className="row">
		          	<div className="col-12">
			            <ServicesModal 
		            		ref="Modal"
			            	addServicedata = {this.addService}
							editservicedata = {this.editService}
							serviceType = {this.props.serviceType}
		            	/>
		          	</div>
		        </div>
	        	{
	        		this.state.services.length ? 
        			(
        				<div className="card-body">	
						<div className="row">
	        				<div className='col-sm-12 col-md-3 col-lg-3 p-0'>
			          			<ListGroup name="Services"
			          				listItems = {this.state.services}
			          				onDelete = {this.onListItemDelete}
			          				onEdit = {this.onListItemEdit}
			          				onSelect = {this.updateSeletedService}
			          				selected = {oSelectedList}
			          			/>
				          	</div>
				          	<div className='col-sm-12 col-md-4 col-lg-4 p-0'>
			          		 	<div className="card">
					               <div className="card-header"> 
					               		Questions
           							  	{/*<div className="float-right">
  								  			<button type="button" className="btn btn-primary btn-sm" 
  								  				onClick = {this.updateQuestionList}
  							  				>
  								  				<i className="fa fa-plus"></i> Add Question
  								  			</button>
  									  	</div>*/}          

				              		</div>
				              		<div className="card-body"> 
					               		<EditableList 
					               			listItems = {this.getCurrentServiceQuestions()}
					               			currentActive = {this.state.nCurrentActiveQuestion}
					               			updateActivequestion ={ this.updateActivequestion }
					               			ondelete = {this.onQuestionDelete}
					               			selected = { this.state.nCurrentActiveQuestion }
					               		/>
				              		</div>
				              	</div>
				          	</div>
				          	<div className="col-sm-12 col-md-5 col-lg-5 p-0">
		              			<div className="card">
					               	<div className="card-header"> 
				              			Question Form
				              		</div>
				              		<div className="card-body">
										  <QuestionForm ref='EditableForm'
										  	listItems = {this.getCurrentServiceQuestions()}
	                  						addQuestionData = {this.addQuestion}
	                  						editQuestionData = {this.editQuestion} 
	              						/>	
				              		</div>
				              	</div>
				            </div>
			            </div>
						</div>
        			)
	        		:null
				}
			 	<div className="text-center card-footer">
					<button type="Button" className="mr-3 btn btn-primary btn-sm" onClick={this.formSubmit}><i className="fa fa-dot-circle-o"></i> Save and Continue </button>
					<button type="Button" className="btn btn-danger btn-sm"><i className="fa fa-ban "></i> Skip</button>
				</div>
			</div>
		);
	}
}

export default Services;