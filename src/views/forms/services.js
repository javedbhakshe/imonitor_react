import React,{Component} from 'react';
import ServicesModal from '../../components/modals/servicesModal';
import QuestionForm from '../../components/custom/questionForm'

class Services extends Component{

  constructor(props){
    super(props);
    
		let communityBO = localStorage.getItem('community');
		let community = JSON.parse(communityBO);
		let uuid = community.community.uuid;
		let languageList = [];
		languageList = community.uuidLocales[uuid];

    this.state = {				
      serviceList:[],
      questionList:[],
      questionData:[],
			dataObj:[],
			language:languageList,			
      isLoading:false,	      	
      showSurvey:false         
		  }

    /* Events handlers */
    /*this.handleAddServiceEvent = this.handleAddServiceEvent.bind(this);*/
    this.activeIndex='';
    this.getServiceTitle = this.getServiceTitle.bind(this);
    this.getServiceListData = this.getServiceListData.bind(this);
    this.getQuestionList = this.getQuestionList.bind(this);
    this.onServiceClickAction = this.onServiceClickAction.bind(this);
    this.addQuestion = this.addQuestion.bind(this);
  }

  /*handleAddServiceEvent(e){
    console.log('Add services clicked');
  }*/

  getServiceTitle(e){
    // console.log(e);
    this.state.dataObj.push(e);    
    this.getServiceListData();
    let activeInx = this.state.dataObj.length - 1;
    this.activeIndex = activeInx.toString();
    this.setState({ showSurvey: true});
  }

  getServiceListData(){
    var that = this;
    const serviceListData = this.state.dataObj.map(function(item, index){
      return(        
          <a className={"list-group-item list-group-item-action " + (index == 0 ? 'active show' : '')}  id={"list-"+index+"-list"} data-toggle="tab" href={"#list-"+index} role="tab" aria-controls={"list-"+index} key={index} data-index={index} onClick={ that.onServiceClickAction }>{item['en_US'].name}  <i className="fa fa-trash-o float-right"></i></a>
         )    
    });

    this.setState({serviceList:serviceListData});
  }

  getQuestionList(){

    var questionListData = [];
    if(this.activeIndex && this.state.dataObj[this.activeIndex]['data']){
      questionListData = this.state.dataObj[this.activeIndex]['data'].map(function(item, index){    
        return(
          <a className={"list-group-item list-group-item-action flex-column align-items-start " + (index == 0 ? 'active' : '')} href="javascript:void(0)">
          <p className="mb-1">{item['en_US'].name}</p>           
          </a>
          )       
      });       
    }
    this.setState({questionList:questionListData});    
    
  }

  onServiceClickAction(e){
    let level = e.target.dataset["index"];
    this.activeIndex = level;
    // this.setState({ activeIndex: level});
    this.getQuestionList();
  }

  addQuestion(e){  
   if(!this.state.dataObj[this.activeIndex]['data']){
    this.state.dataObj[this.activeIndex]['data'] = [];
   }
   this.state.dataObj[this.activeIndex]['data'].push(e);
   this.getQuestionList()
  }

  showQuestionForm(e){
    e.preventDefault();
    document.getElementById("questionForm").classList.remove('hideQuestion');
  }

  render(){
    return(
      <div>
        <div className="row">
          <div className="col-12">
            <ServicesModal getFormData = {this.getServiceTitle} />
          </div>
        </div>
        <div className="card-body">
          <div className="row" style={{ display: this.state.showSurvey ? 'flex': 'none'}}>
              
            <div className="col-3 no-padding">
                <div className="card">
                  <div className="card-header">
                    Services                
                  </div>   
                  <div className="list-group" id="list-tab" role="tablist">
                    {this.state.serviceList}
                  </div>             
                </div>
            </div>
            <div className="col-4 no-padding">
              <div className="card">
                <div className="card-header">
                  Questions     
                  <div className="float-right">
                  <button type="button" className="btn btn-primary btn-sm" onClick={this.showQuestionForm}><i className="fa fa-plus"></i> Add </button>
                  </div>          
                </div>    
                <div className="list-group">
                  {this.state.questionList}
                </div>
              </div>
            </div>

            <div id="questionForm" className="col-5 no-padding hideQuestion" >
              <QuestionForm getQuestionData = {this.addQuestion} />
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Services;