import React/*,{Component}*/ from 'react';
import {Card, CardHeader, CardBody} from 'reactstrap'

const ListGroup = (props) => {
	
	const createListItem = (name,ind,p_bool,p_linkedIndex = -1) => {
		let {active, activeLinked} = props.selected;

		return(
			<li 
				className= {`list-group-item ${(active == ind && p_linkedIndex == activeLinked) ? 'active' : ''}`} 
				key={p_bool ?  (ind +'~'+p_linkedIndex) : ind } data-index={ind}
				data-islinked = {p_bool}
				data-linkedindex = {p_linkedIndex} 
				onClick={e => onClickHandle(e)}>
				<span className='service-name'>{name}</span>
				<button className="btn btn-sm btn-custom float-right fa fa-trash" 
						type="button"
						onClick={e => HandleDelete(e)} 
						title="Delete Content">
						
				</button>
				{
					!p_bool && 
					<button className="btn btn-sm btn-custom float-right fa fa-pencil" 
						type="button" 
						title="Edit Content" 
						onClick={e => HandleEdit(e)}>
					</button>
				}
				{
					!p_bool && 
					<button className="btn btn-sm btn-custom float-right fa fa-long-arrow-up" 
						type="button" 
						name="up"
						title="Move up" 
						onClick={e => handleShuffle(e)}>
					</button>
				}
				{
					!p_bool && 
					<button className="btn btn-sm btn-custom float-right fa fa-long-arrow-down" 
						type="button"
						name="down" 
						title="Move down" 
						onClick={e => handleShuffle(e)}>
					</button>
				}
			</li>
		)
	}
	
	const aList = props.listItems,
		aListItems = aList.map((ele, ind) => {
			let aLinkedItems = [];
			
			if(ele.linked){
				aLinkedItems = ele.linkedServices.map((serv,i) => {
					return(
						createListItem(serv.name,ind,true,i)
					)
				});
				return (
					<li className="list-group-item p-0" key={ind} onClick={e => onClickHandle(e)} 
						data-index={ind} data-islinked={ele.linked} >
						<div className="m-2" data-index={ind} data-islinked={ele.linked}>
							<span className="linked-service-name">
								{ele.data.name}
							</span>
							
							<button className="btn btn-sm btn-custom float-right fa fa-pencil" 
								type="button" 
								title="Edit Content" 
								onClick={e => HandleEdit(e)}>
							</button>

							<button className="btn btn-sm btn-custom float-right fa fa-long-arrow-up" 
								type="button" 
								name="up"
								title="Move Up" 
								onClick={e => handleShuffle(e)}>
							</button>

							<button className="btn btn-sm btn-custom float-right fa fa-long-arrow-down" 
								type="button"
								name="down" 
								title="Move Down" 
								onClick={e => handleShuffle(e)}>
							</button>

							

						</div>
						<ul className="list-group-item p-0">
							{aLinkedItems}
						</ul>
					</li>
				)
			}else{
				return (
					createListItem(ele.data.name,ind,false)
				);
			}
		});


	const HandleEdit = (e) => {
		e.preventDefault();
		e.stopPropagation();
		let oDataSet = e.target.parentElement.dataset;
		props.onEdit(oDataSet);
	}

	const HandleDelete = (e) => {
		e.preventDefault();
		e.stopPropagation();
		let oDataSet = e.target.parentElement.dataset;
		props.onDelete(oDataSet);
	}

	const onClickHandle = (e) => {
		e.preventDefault();
		e.stopPropagation();
		/* current active service */
		props.onSelect(e.target.dataset);
		/* */
	}

	const handleShuffle = (e) => {
		e.preventDefault();
		e.stopPropagation();
		
		let {name} = e.target,
			{index} = e.target.parentElement.dataset;

		props.onShuffle(index,name)
	}

	return(
		<div>
			<Card>
      			<CardHeader>
      				<strong>{props.name}</strong>
      			</CardHeader>
      			<CardBody className="p-0">
		 			<ul className="list-group">
		 				{aListItems}
		 			</ul>
      			</CardBody>
      		</Card>
		</div>
	);

} 

export default ListGroup;