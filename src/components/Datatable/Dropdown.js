import React,{Component} from 'react';

class Dropdown extends Component{

	constructor(props){
		super(props);
		this.state = {value:""};
	}

	componentDidMount = () => {
		this.setState({
			value:this.props.defaultValue
		});
	}

	componentWillReceiveProps = (nextProps) =>{
		let {value} = nextProps;
		this.setState({
			value
		});
	}

	onChangeHandler = (e) => {
		let {value} = e.target
		this.setState({
			value
		});
		if(this.props.onChange){
			this.props.onChange(e.target,value);
		}
	}

	getSelectOptions = () => {
		if(Array.isArray(this.props.options)){
			let options = this.props.options.slice(),
				sPlaceholder = this.props.placeHolder;
			if(sPlaceholder){
				options.unshift({value:"",label:sPlaceholder});
			}
			return options.map((option,ind) => {
				return (
					<option value={option.value} key={ind} disabled={ind === 0 && sPlaceholder}>
						{option.label}
					</option>
				);
			});
		}
		return [];
	}

	render(){
		return(
			<select className="custom-select" value={this.state.value} 
				onChange={this.onChangeHandler}>
			  	{this.getSelectOptions()}
			</select>
		);	
	}
}

export default Dropdown;