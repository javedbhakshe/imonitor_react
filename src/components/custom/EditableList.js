import React from 'react';

const EditableList = (props) => {
	

	const createList = () => {
		const aList = props.listItems,
			nIndex = props.selected * 1;
		return (
			aList.map(({en_data},ind) =>{
				return (
					<li className={`list-group-item ${nIndex === ind ? 'active' : ''}`} 
						key={ind} 
						onClick={e => handleClick(e)}
						data-index={ind}
						>
						{en_data.name ? en_data.name : 'Unknown'}
						<button className="btn btn-sm btn-custom float-right fa fa-trash" 
								type="button"
								onClick={e => handleDelete(e)} 
								title="Delete Content">
								
						</button>
					</li>
				);
				
			})
		);
	}

	const handleClick = (e) => {
		e.preventDefault();
		e.stopPropagation();
		
		let oData = e.target.dataset;
		console.log(oData);
		props.updateActivequestion(oData);
	}

	const handleDelete = (e) =>{
		e.preventDefault();
		e.stopPropagation();
		props.ondelete(e.target.parentElement.dataset);	
	}

	return(

		<ul className='list-group'> 
			{createList()}
		</ul>
	);
}

export default EditableList;