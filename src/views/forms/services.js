import React,{Component} from 'react';
import ServicesModal from '../../components/modals/servicesModal';
/*import { Card, CardBody, CardHeader } from 'reactstrap';*/
import ListGroup from '../../components/custom/ListGroup';
import QuestionForm from '../../components/custom/QuestionForm'
import EditableList from '../../components/custom/EditableList'

class Services extends Component{

	state = {
		services:[],
		oWholeData : [],
		nCurrentActiveService: 0,
		nCurrentActiveQuestion: 0,
		nCurrentLinkedService : -1,
		bIsCurServiceLinked : false, 
		
	}

	addService = (p_oData,p_type,p_bEdit) => {
		
		if(!p_bEdit){
			let oService = {};
			oService.data = p_oData['en_US'];
			oService.questions = [];
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
				let aWhole = this.makeWholeData(p_oData,aLinkedservices);
				/*  */
				this.storeServiceData(oService,aWhole,oService.linked);
			}else{
				this.storeServiceData(oService,p_oData,oService.linked);
			}
		}else{
			console.log('====console====');
		}

	}

	updateSeletedService = ({index, islinked, linkedindex}) => {

		let bislinked = islinked === 'true';
		this.setState({
			nCurrentActiveService: index,
			bIsCurServiceLinked : bislinked,
			nCurrentLinkedService: linkedindex === undefined ? 0 : linkedindex 
		});

	}

	makeWholeData = (p_data,p_arr) => {
		let i,aWholeData = [];

		for(i in p_arr){
			let oTemp ={};
			for(let j in p_data){
				p_data[j]['linked-service'] = p_data[j]['linked-service'] ? p_data[j]['linked-service'] : 'Unknown';
				oTemp[j] = {name : p_data[j]['linked-service'].split(',')[i]}
			}
			aWholeData.push(oTemp);			
		}
		return aWholeData;
	}

	addQuestion = (p_data) => {
		let {bIsCurServiceLinked , nCurrentActiveService, nCurrentLinkedService} = this.state,
			oQuestionObj = {en_data:p_data['en_US'],whole_data:p_data};
		
		this.setState( prevState =>  {
			let aPrev = prevState.services;

			if(bIsCurServiceLinked){
				aPrev[nCurrentActiveService].linkedServices[nCurrentLinkedService].questions.push(oQuestionObj);
			}else{
				aPrev[nCurrentActiveService].questions.push(oQuestionObj);
			}
			return {
				services:aPrev
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
				bIsCurServiceLinked : p_bIslinked
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
				aPrevWhole[nInd].splice(linkedindex,1);
				if(aPrevWhole[nInd].length === 0){
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
				bIsCurServiceLinked : isLinked
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

	onListItemEdit = ({index,islinked,linkedindex}) => {

		let oCurrent = Object.assign({},this.state.oWholeData[index]),
			bLinked = islinked === 'true';
		this.refs.Modal.onListEdit(oCurrent);
		this.setState({
			nCurrentActiveService: index,
			nCurrentActiveQuestion: 0,
			bIsCurServiceLinked : bLinked,
			nCurrentLinkedService : linkedindex
		});

	}

	updateActivequestion = ({index}) => {
		this.setState({
			nCurrentActiveQuestion:index
		});
	}

	onQuestionDelete = ({index}) =>{

		let {services,bIsCurServiceLinked , nCurrentActiveService, nCurrentLinkedService} = this.state;
		
		
		if(bIsCurServiceLinked){
			services[nCurrentActiveService].linkedServices[nCurrentLinkedService].questions.splice(index ,1);
		}else{
			services[nCurrentActiveService].questions.splice(index, 1);
		}

		this.setState({services});
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
			<div>
				<div className="row">
		          	<div className="col-12">
			            <ServicesModal 
		            		ref="Modal"
			            	getFormData = {this.addService}
		            	/>
		          	</div>
		        </div>
	        	{
	        		this.state.services.length ? 
        			(
        				<div className="row">
	        				<div className='col-sm-12 col-md-4 col-lg-4 p-0'>
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
				          	<div className="col-sm-12 col-md-4 col-lg-4 p-0">
		              			<div className="card">
					               <div className="card-header"> 
				              			<div className="float-right">
		                  					<QuestionForm 
		                  						getQuestionData = {this.addQuestion} 
		              						/>	
					                  	</div>
				              		</div>
				              	</div>
				            </div>
			            </div>
        			)
	        		:null
	        	}
			</div>
		);
	}
}

export default Services;