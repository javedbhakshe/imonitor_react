import React,{Component} from 'react';
import OptionItem from './OptionItem'

class Options extends Component{

	state = {
		options : ["Option 1"],
		isOnly:true
	}

	componentWillReceiveProps = (nextProps) => {
        if(nextProps.value !== this.props.value){
        	let bIsOnly = false;
			if(!Array.isArray(nextProps.value)){
				nextProps.value = ['Option 1'];
			}
			if(nextProps.value.length === 1){
				bIsOnly = true;
			}
            this.setState({
            	isOnly:bIsOnly,
            	options:nextProps.value
            });
        }
    }

	componentDidMount = () =>{
		let bIsOnly = false;
		if(!Array.isArray(this.props.value)){
			this.props.value = ['Option 1'];
		}
		if(this.props.value.length === 1){
			bIsOnly = true;
		}

		this.setState({
			isOnly:bIsOnly,
			options:this.props.value
		})
	}

	handleChange = (p_val,p_ind) => {
		this.setState(prevState => {
			let aTempArr = prevState.options;

			aTempArr[p_ind] = p_val; 
			
			if(this.props.onChange){
			 	this.props.onChange(aTempArr,{name:this.props.name,lang:this.props.lang});
			}

			return{
				options:aTempArr
			}
		});
	}

	handleAddEvent = (e) =>{
		e.preventDefault();
		e.stopPropagation();
		this.setState(prevState => {
			let aTempArr = prevState.options,
				nIndex = aTempArr.length + 1,
				sVal =  "Option "+nIndex;

			aTempArr.push(sVal);
			if(this.props.onChange){
			 	this.props.onChange(aTempArr,{name:this.props.name,lang:this.props.lang});
			}
			return{
				options:aTempArr,
				isOnly: aTempArr.length === 1
			}
		})
	}

	handleDeleteOption = (p_ind) => {
		this.setState(prevState => {
			let aTempArr = prevState.options;
			aTempArr.splice(p_ind , 1);
			
			if(this.props.onChange){
			 	this.props.onChange(aTempArr,{name:this.props.name,lang:this.props.lang});
			}	
			return{
				options:aTempArr,
				isOnly: aTempArr.length === 1
			}
		})
	}

	getOptionsDOM = () => {
		return this.state.options.map((val,ind) => {
			return(
				<OptionItem 
					value={this.state.options[ind]}
					key={ind}
					index={ind}
					deleteOption = {this.handleDeleteOption}
					changeHandler = {this.handleChange}
					isOnly = {this.state.isOnly}
				/>
			)
		});
	}

	render(){
		return(
			<div>
				{this.getOptionsDOM()}
				<button className="btn btn-primary btn-sm" onClick={this.handleAddEvent}
					title="Add Nominals"
				>
                    <i className="fa fa-plus"></i>
                </button>
			</div>
		);
	}
}

export default Options;