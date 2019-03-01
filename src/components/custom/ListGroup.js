import React/*,{Component}*/ from 'react';
import {Card, CardHeader, CardBody} from 'reactstrap'

const ListGroup = (props) => {
	console.clear();
	console.log(props)
	const aList = props.listItems,
		aListItems = aList.map((ele, ind) => {
			return (
				<li className= "list-group-item" key={ind} data-index={ind}>
					{ele.name}
					<button className="btn btn-sm btn-custom float-right fa fa-trash" 
							type="button"
							onClick={e => HandleDelete(e)} 
							title="Delete Content">
							
					</button>
					<button className="btn btn-sm btn-custom float-right fa fa-pencil" 
						type="button" 
						title="Edit Content" 
						onClick={e => HandleEdit(e)}>
					</button>
				</li>
			);
		});


	const HandleEdit = (e) => {
		let nIndex = e.target.parentElement.dataset.index;
		props.onEdit(nIndex);
	}

	const HandleDelete = (e) => {
		let nIndex = e.target.parentElement.dataset.index;
		props.onDelete(nIndex);
	}

	const onClickHandle = (e) => {
		let aList = e.target.parentElement.children,
			nLen = aList.length,i;

		for(i = 0; i < nLen;i++){
			aList[i].classList.remove('active');
		}
		e.target.classList.add('active');
	}

	return(
		<div>
			<Card>
      			<CardHeader>
      				<strong>{props.name}</strong>
      			</CardHeader>
      			<CardBody className="p-0" onClick={e => onClickHandle(e)}>
		 			<ul className="list-group">
		 				{aListItems}
		 			</ul>
      			</CardBody>
      		</Card>
		</div>
	);

} 

export default ListGroup;