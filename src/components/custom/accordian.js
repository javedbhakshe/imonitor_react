import React, { Component } from 'react';
import swal from 'sweetalert';
import _ from 'lodash';

const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });

class Accordian extends Component {

    constructor(props){
        super(props);
        this.state = {
           innerContent:[],
           level:0
        }

        this.incrementLevel = this.incrementLevel.bind(this);
        this.editContent = this.editContent.bind(this);
        this.deleteContent = this.deleteContent.bind(this);
        this.upDownContent = this.upDownContent.bind(this);        
    }

    incrementLevel(e){
        let level = e.target.dataset["level"];
        this.props.onChildClick(level);
    }

    editContent(e){
        let level = e.target.dataset["level"];
        this.props.onContentEdit(level);
    }

    deleteContent(e){
        let level = e.target.dataset["level"];
        
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                this.props.onContentDelete(level);
                swal("Poof! Your content has been deleted!", {
                    icon: "success",
                });
            } 
          });
    }
    upDownContent(e){
        let level = e.target.dataset["level"];
        let direction = e.target.dataset["direction"];
        this.props.onContentUpDown(level, direction);
    }

    firstLevelAccordian(data){
        if(_.isArray(data)){
        let that = this;
        const firstAccrd = data.map(function(item, index){
            
            let secondLevel = '';
            if(item.data){
                secondLevel = that.secondLevelAccordian(item.data, index);
            }
            return (                
                <div className="card">
                    <div className="accordHeader" id={"heading"+index} role="tab">
                    <h5 className="mb-0">
                        <span className="accordTitle">{item['en_US'].title}</span>
                        <button className="btn btn-sm btn-custom btn-light float-left" type="button" data-toggle="collapse" href={"#collapse"+index} aria-expanded="false" aria-controls={"collapse"+index}>
                            <span className="fa fa-angle-down"></span>
                        </button>  
                        <button className="btn btn-sm btn-custom btn-light float-right" type="button" title="Down Content" onClick={ that.upDownContent }  data-level={index} data-direction='down' >
                            <span className="fa fa-long-arrow-down" data-level={index} data-direction='down'></span>
                        </button>
                        <button className="btn btn-sm btn-custom btn-light float-right" type="button" title="Up Content" onClick={ that.upDownContent }  data-level={index} data-direction='up' >
                            <span className="fa fa-long-arrow-up" data-level={index} data-direction='up'></span>
                        </button>
                        <button className="btn btn-sm btn-custom btn-light float-right" type="button" title="Delete Content" onClick={ that.deleteContent }  data-level={index} >
                        <span className="fa fa-trash" data-level={index}></span>
                        </button>                        
                        <button className="btn btn-sm btn-custom btn-light float-right" type="button" title="Edit Content" onClick={ that.editContent }  data-level={index} data-toggle="modal" data-target="#myModal">
                        <span className="fa fa-pencil" data-level={index}></span>
                        </button>
                        <button className="btn btn-sm btn-custom btn-light float-right" type="button" title="Add Content" onClick={ that.incrementLevel }  data-level={index} data-toggle="modal" data-target="#myModal">
                        <span className="fa fa-plus" data-level={index}></span>
                        </button>
                       
                    </h5>
                    </div>
                    <div className="collapse" id={"collapse"+index} role="tabpanel" aria-labelledby={"heading"+index} data-parent="#accordion">
                    <div className="card-body">{renderHTML(item['en_US'].description)}</div>
                        <div id="accordion1" className="accordDiv" role="tablist">
                            {secondLevel}
                        </div>
                    </div>
                </div>                  
            )
        })

        return firstAccrd;
    }
        
    }

    secondLevelAccordian(data, inx){
        let that = this;
        const secondAccrd = data.map(function(item, index){

            let nextLevel = '';
            if(item.data){
                nextLevel = that.thirdLevelAccordian(item.data, inx, index);
            }

            return (                
                <div className="card">
                <div className="accordHeader" id={"heading"+inx+index} role="tab">
                <h5 className="mb-0">
                    <span className="accordTitle">{item['en_US'].title}</span>
                    <button className="btn btn-sm btn-custom btn-light float-left" type="button" data-toggle="collapse" href={"#collapse"+inx+index} aria-expanded="false" aria-controls={"collapse"+inx+index}>
                        <span className="fa fa-angle-down"></span>
                    </button>            
                    <button className="btn btn-sm btn-custom btn-light float-right" type="button" title="Down Content" onClick={ that.upDownContent }  data-level={inx+'-'+index} data-direction='down' >
                        <span className="fa fa-long-arrow-down" data-level={inx+'-'+index} data-direction='down'></span>
                    </button>
                    <button className="btn btn-sm btn-custom btn-light float-right" type="button" title="Up Content" onClick={ that.upDownContent }  data-level={inx+'-'+index} data-direction='up' >
                        <span className="fa fa-long-arrow-up" data-level={inx+'-'+index} data-direction='up'></span>
                    </button>        
                    <button className="btn btn-sm btn-custom btn-light float-right" type="button" title="Delete Content" onClick={ that.deleteContent }  data-level={inx+'-'+index} >
                        <span className="fa fa-trash" data-level={inx+'-'+index}></span>
                    </button> 
                    <button className="btn btn-sm btn-custom btn-light float-right" type="button" title="Edit Content" onClick={ that.editContent }  data-level={inx+'-'+index} data-toggle="modal" data-target="#myModal">
                        <span className="fa fa-pencil" data-level={inx+'-'+index}></span>
                    </button>
                    <button className="btn btn-sm btn-custom btn-light float-right" type="button" title="Add Content" onClick={ that.incrementLevel }  data-level={inx+'-'+index} data-toggle="modal" data-target="#myModal">
                    <span className="fa fa-plus" data-level={inx+'-'+index}></span>
                    </button>
                    
                </h5>
                </div>
                <div className="collapse" id={"collapse"+inx+index} role="tabpanel" aria-labelledby={"heading"+inx+index} data-parent="#accordion1">
                <div className="card-body">{renderHTML(item['en_US'].description)}</div>
                    <div id="accordion2" className="accordDiv" role="tablist">
                        {nextLevel}
                    </div>
                </div>
            </div>                  
            )
        })
        return secondAccrd;
    }

    thirdLevelAccordian(data, inx1, inx2){
        let that = this;
        const secondAccrd = data.map(function(item, index){           
            return (                
                <div className="card">
                <div className="accordHeader" id={"heading"+inx1+inx2+index} role="tab">
                <h5 className="mb-0">
                    <span className="accordTitle">{item['en_US'].title}</span>
                    <button className="btn btn-sm btn-custom btn-light float-left" type="button" data-toggle="collapse" href={"#collapse"+inx1+inx2+index} aria-expanded="false" aria-controls={"collapse"+inx1+inx2+index}>
                        <span className="fa fa-angle-down"></span>
                    </button>  
                    {/* <button className="btn btn-sm btn-custom btn-light float-right" type="button" onClick={ that.incrementLevel }  data-level={index} data-toggle="modal" data-target="#myModal">
                    <span className="fa fa-plus" data-level={index}></span>
                    </button> */}
                     <button className="btn btn-sm btn-custom btn-light float-right" type="button" title="Down Content" onClick={ that.upDownContent }  data-level={inx1+'-'+inx2+'-'+index} data-direction='down' >
                        <span className="fa fa-long-arrow-down" data-level={inx1+'-'+inx2+'-'+index} data-direction='down'></span>
                    </button>
                    <button className="btn btn-sm btn-custom btn-light float-right" type="button" title="Up Content" onClick={ that.upDownContent }  data-level={inx1+'-'+inx2+'-'+index} data-direction='up' >
                        <span className="fa fa-long-arrow-up" data-level={inx1+'-'+inx2+'-'+index} data-direction='up'></span>
                    </button>
                    <button className="btn btn-sm btn-custom btn-light float-right" type="button" title="Delete Content" onClick={ that.deleteContent }  data-level={inx1+'-'+inx2+'-'+index} >
                        <span className="fa fa-trash" data-level={inx1+'-'+inx2+'-'+index}></span>
                    </button>
                     <button className="btn btn-sm btn-custom btn-light float-right" type="button" title="Edit Content" onClick={ that.editContent }  data-level={inx1+'-'+inx2+'-'+index} data-toggle="modal" data-target="#myModal">
                        <span className="fa fa-pencil" data-level={inx1+'-'+inx2+'-'+index}></span>
                    </button>
                    
                </h5>
                </div>
                <div className="collapse" id={"collapse"+inx1+inx2+index} role="tabpanel" aria-labelledby={"heading"+inx1+inx2+index} data-parent="#accordion2">
                <div className="card-body">{renderHTML(item['en_US'].description)}</div>
                    {/* <div id="accordion3" className="accordDiv" role="tablist">
                        {nextLevel}
                    </div> */}
                </div>
            </div>                  
            )
        })
        return secondAccrd;
    }


    render() {
              
        return (
        <div id="accordion" className="accordDiv" role="tablist">
            {this.firstLevelAccordian(this.props.data)}
          </div>
        )
    }
}

export default Accordian;