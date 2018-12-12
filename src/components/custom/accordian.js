import React, { Component } from 'react';

class Accordian extends Component {

    constructor(props){
        super(props);
        this.state = {
           innerContent:[],
           level:0
        }

        this.incrementLevel = this.incrementLevel.bind(this);
        
    }

    incrementLevel(e){
        let level = e.target.dataset["level"];
        this.props.onChildClick(level);
    }

    firstLevelAccordian(data){
        let that = this;
        const firstAccrd = data.map(function(item, index){
            
            let secondLevel = '';
            if(item.data){
                secondLevel = that.secondLevelAccordian(item.data);
            }
            return (                
                <div className="card">
                    <div className="accordHeader" id={"heading"+index} role="tab">
                    <h5 className="mb-0">
                        <span className="accordTitle">{item['en_US'].title}</span>
                        <button className="btn btn-light float-left" type="button" data-toggle="collapse" href={"#collapse"+index} aria-expanded="false" aria-controls={"collapse"+index}>
                            <span className="fa fa-angle-down"></span>
                        </button>  
                        <button className="btn btn-light float-right" type="button" onClick={ that.incrementLevel }  data-level={index} data-toggle="modal" data-target="#myModal">
                        <span className="fa fa-plus" data-level={index}></span>
                        </button>
                    </h5>
                    </div>
                    <div className="collapse" id={"collapse"+index} role="tabpanel" aria-labelledby={"heading"+index} data-parent="#accordion">
                    <div className="card-body">{item['en_US'].description}</div>
                        <div id="accordion1" className="accordDiv" role="tablist">
                            {secondLevel}
                        </div>
                    </div>
                </div>                  
            )
        })

        return firstAccrd;
        
    }

    secondLevelAccordian(data){
        let that = this;
        const secondAccrd = data.map(function(item, index){
            return (                
                <div className="card">
                <div className="accordHeader" id={"heading"+index} role="tab">
                <h5 className="mb-0">
                    <span className="accordTitle">{item['en_US'].title}</span>
                    <button className="btn btn-light float-left" type="button" data-toggle="collapse" href={"#collapse"+index} aria-expanded="false" aria-controls={"collapse"+index}>
                        <span className="fa fa-angle-down"></span>
                    </button>  
                    <button className="btn btn-light float-right" type="button" onClick={ that.incrementLevel }  data-level={index} data-toggle="modal" data-target="#myModal">
                    <span className="fa fa-plus"></span>
                    </button>
                </h5>
                </div>
                <div className="collapse" id={"collapse"+index} role="tabpanel" aria-labelledby={"heading"+index} data-parent="#accordion1">
                <div className="card-body">{item['en_US'].description}</div>
                    {/* <div id="accordion" className="accordDiv" role="tablist">
                        {secondLevel}
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