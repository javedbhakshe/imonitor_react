import React,{Component} from 'react';

class OptionItem extends Component{

	state = {
		value : this.props.value
	}

	handleChange = (e) => {
		let {value} = e.target;
		this.setState({value});
		this.props.changeHandler(value,this.props.index);
	}

	handleBlur = (e) => {
		let {value} = e.target,
			nIndex = this.props.index + 1;
		if(!value){
			value = "Option "+nIndex;
		}
		this.props.changeHandler(value,this.props.index);
		this.setState({value});
	}

	handleDelete = (e) => {
		e.preventDefault();
		e.stopPropagation();
		this.props.deleteOption(this.props.index)
	}

	componentWillReceiveProps = (nextProps) => {
        if(nextProps.value !== this.props.value){
            this.setState({value:nextProps.value});
        }
    }

	render(){
		return(
			<div className="input-group">
				<input type="text" 
		            className="form-control"
		            onBlur={this.handleBlur}
		            onFocus = {e => e.target.select()}
		            onChange = {this.handleChange}
		            value = {this.state.value}
		        />
		        <span className="input-group-prepend">
		        	{
		                !this.props.isOnly && 
		                <button className="input-group-text" 
		                	onClick={this.handleDelete}
		                	>
		                    <i className="fa fa-trash"></i>
		                </button>
		        	}
	        	</span>
			</div>
		);
	}
}

export default OptionItem;