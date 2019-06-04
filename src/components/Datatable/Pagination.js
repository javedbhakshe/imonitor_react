import React,{Component} from 'react';


class Pagination extends Component{

	onIndexClick = (e) =>{
		e.preventDefault();
		e.stopPropagation();
		let {name} = e.target;
		if(this.props.onChange){
			this.props.onChange(name);
		}
	}

	getButtons = () => {
	    let aList  = ["Previous","Next"],
	    	nPages = this.props.noOfPages,i;
	    for(i = 1; i <= nPages; i++){
	    	aList.splice(i,0,i);
	    }

	    return aList.map((ele,ind) => {
    		if(ele === 'Previous'){
    			return(
		    		<li className={`page-item ${this.props.active === 1 ? "disabled" : ""}`} key={ind}>
			      		<a className="page-link" href="#" onClick={this.onIndexClick} name={ele}>{ele}</a>
				    </li>
	    		)
    		}else if(ele === 'Next'){
		    	return(
		    		<li className={`page-item ${this.props.active === nPages ? "disabled" : ""}`} key={ind}>
			      		<a className="page-link" href="#" onClick={this.onIndexClick} name={ele}>{ele}</a>
				    </li>
	    		)
    		}else{
    			return(
		    		<li className={`page-item ${ind === this.props.active ? "active" : ""}`} key={ind}>
			      		<a className="page-link" href="#" onClick={this.onIndexClick} name={ele}>{ele}</a>
				    </li>
	    		)
    		}
	    });
	}

	render(){
		return(
			<nav className='pagination-nav'>
			  	<ul className={`pagination ${this.props.className}`}>
				    {this.getButtons()}
			  	</ul>
			</nav>
		);
	}
}

export default Pagination;