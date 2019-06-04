import React,{Component} from 'react';
import Dropdown from './Dropdown';
import Pagination from './Pagination';
import ReactExport from 'react-export-excel';
import './style.css';

class DataTable extends Component{

	aPageSize = [
		{value:5,label:5},
		{value:10,label:10},
		{value:25,label:25}
	];


	state = {	
		activePage:1,noOfPages:5,pageSize:this.aPageSize[0].value,
		activeCol:null,ascSort:false,dataRows:this.props.rows,
		searchTerm:null
	};
	tableRef = React.createRef();

	pageSizeHandler = (e,selected) =>{
		let pageSize = selected * 1,
		 	nRecords = Array.isArray(this.state.dataRows) ? this.state.dataRows.length : 0,
		 	noOfPages = nRecords !== 0 ? Math.ceil(nRecords / pageSize) : 0;

		this.setState(prevState => {
			let {activePage} = prevState;
			activePage = activePage > noOfPages ? noOfPages : activePage; 
			return{
				pageSize,
				noOfPages,
				activePage
			}
		});
	}

	paginationHandler = (e) =>{
		this.setState(prevState => {
			let {activePage} = prevState;
			if(e === 'Previous'){
				activePage -= 1; 
			}else if(e === 'Next'){
				activePage += 1;
			}else{
				activePage = e * 1;
			}
			return{
				activePage
			}
		});
	}

	getTableHeader = () =>{
      	let aColumns = Array.isArray(this.props.columns) ? this.props.columns : [],
      		{ascSort,activeCol} = this.state; 
      	return aColumns.map((ele,ind) => {
      		return (
  				<th scope="col" key={`th${ind}`} onClick={this.handleHeaderClick} data-index={ind}>
  					{ele}
  					<span className="sortable-icons">
  						<i className={`cui-arrow-top ${ascSort && activeCol === ind ? 'active':''}`}></i>
  						<i className={`cui-arrow-bottom ${!ascSort && activeCol === ind ? 'active':''}`}></i>
  					</span>
  				</th>
  			)
      	});
	}

	getTableBody = () => {
		/**/
	    let aRows = Array.isArray(this.state.dataRows) ? this.state.dataRows : [],
	    	aBody = [],aCurElements = [];

    	if(this.state.searchTerm){
    		let {searchTerm} = this.state;
	    	searchTerm = searchTerm.toLowerCase().trim();
    		if(!!searchTerm){
    			let i , nLen = aRows.length , aSerchedArray = [];
    			for(i = 0; i < nLen;i++){
    				for(let j in aRows[i]){
    					let sVal = aRows[i][j].toLowerCase();
    					if(sVal.indexOf(searchTerm) > -1){
    						aSerchedArray.push(aRows[i]);
    						break;
    					}
    				}
    			}
    			aRows = aSerchedArray;
    		}
		}

    	if(aRows.length > 0){
    		let {activePage,pageSize} = this.state,
    			nEnd = activePage * pageSize,
    			nStart = activePage * pageSize - pageSize;
    		aCurElements = aRows.slice(nStart ,nEnd);
    	}


		aBody =  aCurElements.map((elems,ind) => {
			return (
				<tr key={ind}>
		      		{
	      				elems.map((tdata,tInd) => {
	      					return(
  								<td key={`td${tInd}`}>{tdata}</td>
      						)
	      				})
		      		}
			    </tr>
			);
		});
		return aBody;  	
	}

	handleHeaderClick = (e) =>{

		e.preventDefault();
		e.stopPropagation();
		let oEle = e.target,
			activeCol = oEle.dataset.index * 1;

		this.setState( prevState => {
			let {ascSort,dataRows} = prevState;
			ascSort = !ascSort;
			dataRows.sort((a,b) => {
				if(ascSort){
					return (a[activeCol] < b[activeCol]) ? 1 : -1;
				}else{
					return (b[activeCol] < a[activeCol]) ? 1 : -1;
				}
				return 0;			
			});

			return{
				activeCol,
				ascSort,
				dataRows				
			}
		});
	}

	handleSerchChange = (e)=> {
		let searchTerm = e.target.value;
		this.setState({
			searchTerm,
			activePage:1
		});
	}

	render(){
		/*
			table exports 
		*/
		const multiDataSet = [
		    {
		        columns: this.props.columns,
		        data: this.state.dataRows
		    }
		],ExcelFile = ReactExport.ExcelFile,
		{ExcelSheet} = ExcelFile;
		/*

		*/
		let nContent = Array.isArray(this.state.dataRows) ? this.state.dataRows.length : 0,
			{activePage,noOfPages,pageSize} = this.state, 
			nPages = nContent !== 0 ? Math.ceil(nContent / pageSize) : 0,
			nFrom = ((activePage - 1) * pageSize) + 1,
			nTo = activePage * pageSize;

		nTo = nTo < nContent ? nTo : nContent; 

		return(
			<div>
				<div className="row">
					<div className="col-2">
				 		<Dropdown 
				 			options={this.aPageSize}
				 			onChange = {this.pageSizeHandler}
				 			defaultValue={this.aPageSize[0].value}
				 			value={this.state.pageSize}
				 		/>
					</div>
					<div className="col-8">
						<ExcelFile element={<button className='btn btn-primary'>Excel</button>}>
			                <ExcelSheet dataSet={multiDataSet} name="Sheet1"></ExcelSheet>
			            </ExcelFile>
					</div>
					<div className="col-2">
						<input 
							className = "form-control" type = "text" placeholder = "Search"
							onChange = {this.handleSerchChange} 
						/>
					</div>
				</div>
				<div className="row my-4">
					<div className="col-12">
						<table className="table" ref={this.tableRef}>
							  	<thead>
								    <tr>
								      	{this.getTableHeader()}
								    </tr>
							  	</thead>
							  	<tbody>
								    {this.getTableBody()}
							  	</tbody>
							</table>
					</div>
				</div>
				<div className="row">
					<div className="col-md-5 col-sm-12">
						{`Showing ${nFrom} to ${nTo} of ${nContent}`}
					</div>
					<div className="col-md-7 col-sm-12">
						<Pagination 
				 			className="justify-content-end"
				 			noOfPages = {nPages}
				 			active={this.state.activePage}
				 			onChange={this.paginationHandler}
			 			/>
					</div>
				</div>
			</div>
		);
	}
}

export default DataTable;