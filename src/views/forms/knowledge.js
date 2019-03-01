import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { apiServices } from '../../services/apiServices';
import Accordian from '../../components/custom/accordian';
import KnowledgeModal from '../../components/modals/knowledgeModel';

class Knowledge extends Component{
	
	constructor(props){
		super(props);

		
		
		this.state = {						
			content:[],
			dataObj:[],					
			isLoading:false,
			reload:false,			
			editForm: false, 
			level:''		         
		  }
		
		this.item = {};
		this.addItems = this.addItems.bind(this);
		this.onChildClickAction  = this.onChildClickAction.bind(this);
		this.onContentEditAction  = this.onContentEditAction.bind(this);
		this.onContentDeleteAction  = this.onContentDeleteAction.bind(this);
		this.onContentUpDownAction  = this.onContentUpDownAction.bind(this);
		this.updateAccordian = this.updateAccordian.bind(this);
	}
	
	

	addItems(){
		
		let levelInx = this.state.level;

		if(this.state.editForm){
			levelInx = this.state.level;
			let LevelInxArr = levelInx.split("-");	
			var levelInx1, levelInx2, levelInx3;
			levelInx1 = LevelInxArr[0];	
			if(LevelInxArr[1]){
				levelInx2 = LevelInxArr[1];	
			}
			if(LevelInxArr[2]){
				levelInx3 = LevelInxArr[2];	
			}

			if(levelInx3){
				this.state.dataObj[levelInx1]['data'][levelInx2]['data'][levelInx3] = this.item;	
			}else if(levelInx2){
				this.state.dataObj[levelInx1]['data'][levelInx2] = this.item;	
			}else{
				this.state.dataObj[levelInx1] = this.item;
			}
			
		}else{
			levelInx = this.state.level;
			if(levelInx == ''){
				this.state.dataObj.push(this.item);
			}else{
				let LevelInxArr = levelInx.split("-");			
				let innerData = this.state.dataObj[LevelInxArr[0]];	
				if(LevelInxArr[1]){
					innerData = this.state.dataObj[LevelInxArr[0]]['data'][LevelInxArr[1]];	
				}
				if(!innerData['data']){
					innerData['data']=[]
				}
				innerData['data'].push(this.item);
				
			}
		}
		
		
		this.item = {};	
		// this.updateAccordian();
		// document.getElementById("closeModel").click();	
		// document.getElementById('addItems').reset();
		// this.setState({reload : true, level:'' });	
	}

	onChildClickAction(d){		
		this.state.editForm = false;
		this.item = {};	
		this.setState({level:d, editForm:false, formErrors: {title: '', description: ''},    
			titleValid: false,
			formValid: false
		});
		document.getElementById('addItems').reset();
		// document.getElementById("tab-en_US").onclick();
	}
	onContentEditAction(d){
		let that = this;	
		this.setState({level:d, editForm:true});
		let levelInx = d;
		let LevelInxArr = levelInx.split("-");			
		let innerData = this.state.dataObj[LevelInxArr[0]];	
		if(LevelInxArr[1]){
			innerData = this.state.dataObj[LevelInxArr[0]]['data'][LevelInxArr[1]];	
		}
		if(LevelInxArr[2]){
			innerData = this.state.dataObj[LevelInxArr[0]]['data'][LevelInxArr[1]]['data'][LevelInxArr[2]];	
		}
		this.item = innerData;
		this.languageList.map(function(value, index) {
			
			if(that.item[value.locale] && that.item[value.locale]['title']){
				document.getElementById('title-'+value.locale).value = that.item[value.locale]['title'];
			}
			
			if(that.item[value.locale] && that.item[value.locale]['description']){
				document.getElementById('description-'+value.locale).value = that.item[value.locale]['description'];
			}

			if(that.item[value.locale] && that.item[value.locale]['video']){
				document.getElementById('video-'+value.locale).value = that.item[value.locale]['video'];
			}
		});		
	}

	onContentDeleteAction(d){
		this.setState({level:d});
		let levelInx = d;
		let LevelInxArr = levelInx.split("-");	
		var levelInx1, levelInx2, levelInx3;
		levelInx1 = LevelInxArr[0];	
		if(LevelInxArr[1]){
			levelInx2 = LevelInxArr[1];	
		}
		if(LevelInxArr[2]){
			levelInx3 = LevelInxArr[2];	
		}

		if(levelInx3){
			this.state.dataObj[levelInx1]['data'][levelInx2]['data'].splice(levelInx3, 1);	
		}else if(levelInx2){
			this.state.dataObj[levelInx1]['data'].splice(levelInx2, 1);	
		}else{
			this.state.dataObj.splice(levelInx1, 1);
		}			
		this.updateAccordian();

	}

	onContentUpDownAction(d, direction){
		this.setState({level:d});
		let levelInx = d;
		let LevelInxArr = levelInx.split("-");	
		var levelInx1, levelInx2, levelInx3;
		levelInx1 = LevelInxArr[0];	
		if(LevelInxArr[1]){
			levelInx2 = LevelInxArr[1];	
		}
		if(LevelInxArr[2]){
			levelInx3 = LevelInxArr[2];	
		}

		if(levelInx3){					
			var newInx;
			let dataArr = this.state.dataObj[levelInx1]['data'][levelInx2]['data'];
			if(direction == 'up' && Number(levelInx3) != 0){
				newInx = Number(levelInx3) - 1;
				let temp = dataArr[newInx];
				dataArr[newInx] = dataArr[levelInx3];
				dataArr[levelInx3] = temp;
			}
			if(direction == 'down' && Number(levelInx3) != (dataArr.length -1)){
				newInx = Number(levelInx3) + 1;
				let temp = dataArr[newInx];
				dataArr[newInx] = dataArr[levelInx3];
				dataArr[levelInx3] = temp;
			}
		
		}else if(levelInx2){		
			var newInx;
			let dataArr = this.state.dataObj[levelInx1]['data'];
			if(direction == 'up' && Number(levelInx2) != 0){
				newInx = Number(levelInx2) - 1;
				let temp = dataArr[newInx];
				dataArr[newInx] = dataArr[levelInx2];
				dataArr[levelInx2] = temp;
			}
			if(direction == 'down' && Number(levelInx2) != (dataArr.length -1)){
				newInx = Number(levelInx2) + 1;
				let temp = dataArr[newInx];
				dataArr[newInx] = dataArr[levelInx2];
				dataArr[levelInx2] = temp;
			}
			
		}else if(levelInx1){				
			var newInx;
			let dataArr = this.state.dataObj;
			if(direction == 'up' && Number(levelInx1) != 0){
				newInx = Number(levelInx1) - 1;
				let temp = dataArr[newInx];
				dataArr[newInx] = dataArr[levelInx1];
				dataArr[levelInx1] = temp;
			}
			if(direction == 'down' && Number(levelInx1) != (dataArr.length -1)){
				newInx = Number(levelInx1) + 1;
				let temp = dataArr[newInx];
				dataArr[newInx] = dataArr[levelInx1];
				dataArr[levelInx1] = temp;
			}
			
		}			
		this.updateAccordian();
	}

	updateAccordian(){
		if(!_.isEmpty(this.item)){
			const oAccord = <Accordian key={this.state.dataObj.length} data={this.state.dataObj} onChildClick = {this.onChildClickAction} onContentEdit = {this.onContentEditAction} onContentDelete = {this.onContentDeleteAction} onContentUpDown = {this.onContentUpDownAction} />
			// this.setState({content:oAccord});
		}		
	}

	render(){		
		this.item = this.props.knowledgeData;
		var oAccord = [];
		if(!_.isEmpty(this.item)){
			this.addItems();
			oAccord = <Accordian key={this.state.dataObj.length} data={this.state.dataObj} onChildClick = {this.onChildClickAction} onContentEdit = {this.onContentEditAction} onContentDelete = {this.onContentDeleteAction} onContentUpDown = {this.onContentUpDownAction} />
			// this.setState({content:oAccord});
		}	
		return(
			
			<div className="card">
				<button className="btn btn-light" type="button" data-toggle="modal" data-target="#myModal" onClick={ e => (this.onChildClickAction(''))} >
						<span className="fa fa-plus"></span> Add Information
				</button>
				<div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
					<div className="modal-dialog modal-lg" role="document">
					<KnowledgeModal />					
					</div>
				</div>
				
				{oAccord}

				<div className="text-center card-footer">
					<button type="submit" className="mr-3 btn btn-primary btn-sm"><i className="fa fa-dot-circle-o"></i> Save and Continue </button>
					<button type="reset" className="btn btn-danger btn-sm"><i className="fa fa-ban "></i> Reset</button>
				</div>
			</div>				
		)
	}
}

const mapStateToProps = state => {		
	return { knowledgeData: state.knowledgeData };
}

export default connect(
	mapStateToProps
  )(Knowledge);