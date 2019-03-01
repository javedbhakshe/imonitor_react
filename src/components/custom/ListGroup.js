import React,{Component} from 'react';
import {Card, CardHeader, CardBody} from 'reactstrap'

const ListGroup = (props) => {
	console.clear();
	console.log(props)
	const aList = props.listItems,
		aListItems = aList.map((ele, ind) => {
			return (
				<li className= "list-group-item" >
					{ele.name}
					<button className="btn btn-sm btn-custom float-right" 
							type="button" 
							title="Delete Content" data-level="0">
							<span className="fa fa-trash" data-level="0">
								
							</span>
					</button>
					<button className="btn btn-sm btn-custom float-right" 
						type="button" 
						title="Edit Content" 
						data-level="0">
						<span className="fa fa-pencil" data-level="0">
						</span>
					</button>
				</li>
			);
		});


	const onClickHandle = (e) => {
		console.log(e.target.parentElement.children,props);
		let aList = e.target.parentElement.children;
		console.log(aList);

		for(let i = 0; i < aList.length;i++){
			console.log(aList[i])
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