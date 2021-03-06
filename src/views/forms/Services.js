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
			let firstServiceType = dataObj.services[0] ? dataObj.services[0].linked : false;
			let nCurrentLinkedService = firstServiceType ? 0 : -1;
			this.setState({oWholeData:dataObj.oWholeData, services:dataObj.services, bIsCurServiceLinked:firstServiceType, nCurrentLinkedService});			
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
				sLinkedservices = oService.data['linked-service'] = ['Unknown'];
			}
			// aLinkedservices = sLinkedservices.split(',');
			aLinkedservices = sLinkedservices;
			oService.linkedServices = this.makeLinkedService(aLinkedservices);
			/* Whole Data  */	
			let aWhole = this.makeWholeData(p_oData,aLinkedservices),
				oWhole = {
					data : aWhole,linked:oService.linked,
					serviceType:p_type,/*linkedServices:sLinkedservices,*/
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
				aPrevLinked = services[nCurrentActiveService].linkedServices,
				s,nPrenLen;
			if(!sLinkedservices){
				sLinkedservices = oService.data['linked-service'] = ['Unknown'];
			}
			// aLinkedservices = sLinkedservices.split(',');
			aLinkedservices = sLinkedservices;
			oService.linkedServices = this.makeLinkedService(aLinkedservices);
			nPrenLen = oService.linkedServices.length;
			for(s = 0; s < nPrenLen; s++){
				if(aPrevLinked[s]){
					oService.linkedServices[s].questions = aPrevLinked[s].questions;
				}
			}
			/* Whole Data  */	
			let aWhole = this.makeWholeData(p_oData,aLinkedservices),
				oWhole,j,nLen = aWhole.length;

			for(j = 0;j < nLen;j++){
				if(aPrevWholedata[j]){
					aWhole[j].questions = aPrevWholedata[j].questions;
				}
			}

			oWhole = {
				data : aWhole,linked:bIsCurServiceLinked,
				serviceType:p_type,/*linkedServices:sLinkedservices,*/
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
				let sName = p_data[j]['linked-service'][i] ? p_data[j]['linked-service'][i] : '';
				oTemp[j] = {name : sName}
			}
			oTemp.questions = [];
			aWholeData.push(oTemp);			
		}
		return aWholeData;
	}

	addQuestion = (p_data,{isMandatory,userType,dependantIndex,dependantAnswer}) => {
		let {bIsCurServiceLinked , nCurrentActiveService, nCurrentLinkedService,nCurrentActiveQuestion} = this.state,
			oQuestionObj = {
				en_data:p_data['en_US'],whole_data:p_data,
				isMandatory,userType,
				dependantIndex,dependantAnswer
			};
		/*  
			Addition of dependantIndex,dependantAnswer in oWholeData
		*/

		let oWholeQuestion = {data: p_data, dependantIndex, dependantAnswer,isMandatory};

		this.setState( prevState =>  {
			let aPrev = prevState.services,
				aWholeData = prevState.oWholeData;

			if(bIsCurServiceLinked){
				aPrev[nCurrentActiveService].linkedServices[nCurrentLinkedService].questions.push(oQuestionObj);
				// aWholeData[nCurrentActiveService].data[nCurrentLinkedService].questions.push(p_data);
				aWholeData[nCurrentActiveService].data[nCurrentLinkedService].questions.push(oWholeQuestion);
			}else{
				aPrev[nCurrentActiveService].questions.push(oQuestionObj);
				// aWholeData[nCurrentActiveService].questions.push(p_data)
				aWholeData[nCurrentActiveService].questions.push(oWholeQuestion)
			}
			return {
				services:aPrev,
				oWholeData:aWholeData,
				nCurrentActiveQuestion:-1
			}
		});
	}

	editQuestion = (p_data,{isMandatory,userType,dependantIndex,dependantAnswer}) => {
		let {bIsCurServiceLinked , nCurrentActiveService, nCurrentLinkedService,nCurrentActiveQuestion} = this.state,
			oQuestionObj = {
				en_data:p_data['en_US'],whole_data:p_data,
				isMandatory,userType,
				dependantIndex,dependantAnswer
			};

		/*  
			Addition of dependantIndex,dependantAnswer in oWholeData
		*/
		let oWholeQuestion = {data: p_data, dependantIndex, dependantAnswer,isMandatory};
	
		this.setState( prevState =>  {
			let aPrev = prevState.services,
				aWholeData = prevState.oWholeData;

			if(bIsCurServiceLinked){
				aPrev[nCurrentActiveService].linkedServices[nCurrentLinkedService].questions[nCurrentActiveQuestion] = oQuestionObj;
				// aWholeData[nCurrentActiveService].data[nCurrentLinkedService].questions[nCurrentActiveQuestion] = p_data;
				aWholeData[nCurrentActiveService].data[nCurrentLinkedService].questions[nCurrentActiveQuestion] = oWholeQuestion;
			}else{
				aPrev[nCurrentActiveService].questions[nCurrentActiveQuestion] = oQuestionObj;
				// aWholeData[nCurrentActiveService].questions[nCurrentActiveQuestion] = p_data;
				aWholeData[nCurrentActiveService].questions[nCurrentActiveQuestion] = oWholeQuestion;
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
				nIndex , bLinked = (islinked === 'true'),nLinknedService;
			
			if(bLinked){

				let nInd = index.split('~')[0] * 1;
				aPrev[nInd].linkedServices.splice(linkedindex,1);
				
				if(aPrev[nInd].linkedServices.length === 0){
					aPrev.splice(nInd,1);
				}
				/*  */
				aPrevWhole[nInd].data.splice(linkedindex,1);
				/*  Editable options */
				let x , oEditableLinks = aPrevWhole[nInd].editable;
				for(x in oEditableLinks){
					let aTemp = oEditableLinks[x]['linked-service'];
					aTemp.splice(linkedindex,1);
					oEditableLinks[x]['linked-service'] = aTemp;
				}
				/*  */
				
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
			bIsCurServiceLinked : bLinked,
			nCurrentLinkedService : linkedindex,
			nCurrentActiveQuestion:-1
		});

	}

	updateActivequestion = ({index}) => {

		this.setState({
			nCurrentActiveQuestion:index * 1
		},() => {
			let oCurrent,{ services ,oWholeData,bIsCurServiceLinked,nCurrentActiveService, nCurrentLinkedService} = this.state;
			
			if(bIsCurServiceLinked){
				oCurrent = services[nCurrentActiveService].linkedServices[nCurrentLinkedService].questions[index];
			}else{
				oCurrent = services[nCurrentActiveService].questions[index];
			}

			// this.refs.EditableForm.showForm(oCurrent.whole_data,oCurrent.isMandatory,oCurrent.userType,oCurrent.dependantIndex,oCurrent.dependantAnswer);
			this.refs.EditableForm.showForm(oCurrent);
		});
	}

	onQuestionDelete = ({index}) =>{
		
		let {oWholeData,services,bIsCurServiceLinked , nCurrentActiveService, nCurrentLinkedService} = this.state,
			aservQ = [],aWholeQ = [];
		
		
		if(bIsCurServiceLinked){
			aservQ = services[nCurrentActiveService].linkedServices[nCurrentLinkedService].questions;
			aWholeQ = oWholeData[nCurrentActiveService].data[nCurrentLinkedService].questions;

			/*aservQ.splice(index ,1);
			aWholeQ.splice(index ,1);*/

		}else{
			aservQ = services[nCurrentActiveService].questions;
			aWholeQ = oWholeData[nCurrentActiveService].questions;
			
			/*aservQ.splice(index ,1);
			aWholeQ.splice(index ,1);*/
		}
		aservQ = this.resetDependant(aservQ,index);
		aservQ.splice(index ,1);
		aWholeQ.splice(index ,1);


		this.setState({
			services:services,
			oWholeData : oWholeData,
			nCurrentActiveQuestion:-1
		});
		/* */
		this.refs.EditableForm.initializeState(true);
		/*if(index * 1 === this.state.nCurrentActiveQuestion * 1){
		}*/
		/* */
	}

	resetDependant = (p_arr,p_ind) => {
		let i, nLength = p_arr.length;
		for(i = 0;i < nLength; i++){
			if(p_arr[i].dependantIndex * 1 === p_ind * 1){
				p_arr[i].dependantIndex = -1;
			}

			if(p_arr[i].dependantIndex * 1 !== -1 && i > p_ind * 1){
				p_arr[i].dependantIndex  = p_arr[i].dependantIndex *1 - 1;
			}
		}
		return p_arr;
	}

	resetActiveQuestion = () => {
		this.setState({
			nCurrentActiveQuestion: -1
		});
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

	getDependant = () => {
		let aDep = [],
			{nCurrentActiveService , bIsCurServiceLinked , nCurrentLinkedService, nCurrentActiveQuestion,services} = this.state;
		
		if(bIsCurServiceLinked){
			if(nCurrentActiveQuestion !== -1){
				aDep = services[nCurrentActiveService].linkedServices[nCurrentLinkedService].questions.slice(0,nCurrentActiveQuestion);				
			}else{
				aDep = services[nCurrentActiveService].linkedServices[nCurrentLinkedService].questions;
			}
		}else{
			if(nCurrentActiveQuestion !== -1 ){
				aDep = services[nCurrentActiveService].questions.slice(0,nCurrentActiveQuestion);
			}else{
				aDep = services[nCurrentActiveService].questions;
			}
		}

		let i , nLen = aDep.length,aFinal = [];
		for(i = 0; i < nLen ;i++){	
			let oTemp = aDep[i].en_data;
			if(oTemp.type.value === 'Dropdown' ||oTemp.type.value === 'Radio' || oTemp.type.value === 'Checkbox'){
				
				let oques = {value:oTemp.name, label:oTemp.name , index : i, nominals: oTemp.nominal};
				aFinal.push(oques);
			}
		}
		return aFinal;
	}

	handleShuffle = (p_index,p_dir) => {

		this.setState(prevState => {
			let aPrev = prevState.services,
				aWhole = prevState.oWholeData


			let oEle = aPrev.splice(p_index,1)[0],
				oWho = aWhole.splice(p_index,1)[0],
				nLength = aPrev.length,
				bLinked = oEle.linked;

			p_index = p_dir === 'up' ? p_index *1 - 1 : p_index *1 + 1;
			p_index = (p_index < 0) ? nLength : (p_index > nLength) ? 0 :p_index;

			aPrev.splice(p_index,0,oEle);
			aWhole.splice(p_index,0,oWho);

			return{
				nCurrentActiveService:p_index,
				bIsCurServiceLinked:bLinked,
				nCurrentLinkedService:bLinked ? 0 : -1,
				nCurrentActiveQuestion: -1,
				services:aPrev,
				oWholeData:aWhole

			}
		});

		this.refs.EditableForm.initializeState(true);
	}

	formSubmit = () => {
		var that = this;  
		let communityBO = JSON.parse(localStorage.getItem('community'));
			let typeValue = this.props.serviceType;
			let commuityReferenceBO = typeValue == 'Service' ? communityBO.communityPreferenceBOs : communityBO.communitySurveyBOs;
			let uuid = communityBO.community.uuid;
		if(this.state.oWholeData.length > 0 || commuityReferenceBO.length > 0){
			this.setState({isLoading : true});  
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
				// let confTab = typeValue == 'Service' ? 'survey-tab' : 'nearme-tab' ;
				that.props.configTab('nearme-tab');
				  
			  }          
			});
		  }else{
			swal("No Services Section!", {
				icon: "error",
			});
		  }
	}

	render(){
		console.clear();
		console.log(this.state.services);
		console.log(this.state.oWholeData);
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
			          			<ListGroup name={this.props.serviceType}
			          				listItems = {this.state.services}
			          				onDelete = {this.onListItemDelete}
			          				onEdit = {this.onListItemEdit}
			          				onSelect = {this.updateSeletedService}
			          				selected = {oSelectedList}
			          				onShuffle = {this.handleShuffle}
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
	                  						getDependant = {this.getDependant} 
	                  						reset = {this.resetActiveQuestion}
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