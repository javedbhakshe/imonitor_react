import React, { Component } from 'react';
import {
  /*Badge,
  Button,
  ButtonDropdown,*/
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  /*Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,*/
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';
class Services extends Component{
	render(){
		return(
			
                <div className="card-body">
                <div className="row">
                <div className="col-4">
               
                         <div className="btn-group">
                         <button className="btn btn-light" type="button">
							         		<span className="fa fa-plus"></span> 
                           							         	</button>
                      <button className="btn btn-light" type="button">
							      		<span className="fa fa-trash-o"></span>
							      	</button>
                      <button className="btn btn-light" type="button">
							      		<span className="fa fa-pencil-square-o"></span>
							      	</button>
                      </div>
                
               <div class="list-group" id="list-tab" role="tablist">
            <a class="list-group-item list-group-item-action active show" id="list-home-list" data-toggle="tab" href="#list-home" role="tab" aria-controls="list-home" aria-selected="true">Water Supply</a>
            <a class="list-group-item list-group-item-action" id="list-profile-list" data-toggle="tab" href="#list-profile" role="tab" aria-controls="list-profile" aria-selected="false">Domestic violence</a>
            <a class="list-group-item list-group-item-action" id="list-messages-list" data-toggle="tab" href="#list-messages" role="tab" aria-controls="list-messages" aria-selected="false">Transport</a>
            <a class="list-group-item list-group-item-action" id="list-settings-list" data-toggle="tab" href="#list-settings" role="tab" aria-controls="list-settings" aria-selected="false">Electricity</a>
            </div>

                </div>
                <div className="col-8">
                <div className="btn-group">
                         <button className="btn btn-light" type="button">
							         		<span className="fa fa-plus"></span> 
                           							         	</button>
                      <button className="btn btn-light" type="button">
							      		<span className="fa fa-trash-o"></span>
							      	</button>
                      <button className="btn btn-light" type="button">
							      		<span className="fa fa-pencil-square-o"></span>
							      	</button>
                      </div>
                <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade active show" id="list-home" role="tabpanel" aria-labelledby="list-home-list">
                <p>Velit aute mollit ipsum ad dolor consectetur nulla officia culpa adipisicing exercitation fugiat tempor. Voluptate deserunt sit sunt nisi aliqua fugiat proident ea ut. Mollit voluptate reprehenderit occaecat nisi ad non minim tempor
                sunt voluptate consectetur exercitation id ut nulla. Ea et fugiat aliquip nostrud sunt incididunt consectetur culpa aliquip eiusmod dolor. Anim ad Lorem aliqua in cupidatat nisi enim eu nostrud do aliquip veniam minim.</p>
                </div>
                <div className="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">
                <p>Cupidatat quis ad sint excepteur laborum in esse qui. Et excepteur consectetur ex nisi eu do cillum ad laborum. Mollit et eu officia dolore sunt Lorem culpa qui commodo velit ex amet id ex. Officia anim incididunt laboris deserunt anim
                aute dolor incididunt veniam aute dolore do exercitation. Dolor nisi culpa ex ad irure in elit eu dolore. Ad laboris ipsum reprehenderit irure non commodo enim culpa commodo veniam incididunt veniam ad.</p>
                </div>
                <div className="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">
                <p>Ut ut do pariatur aliquip aliqua aliquip exercitation do nostrud commodo reprehenderit aute ipsum voluptate. Irure Lorem et laboris nostrud amet cupidatat cupidatat anim do ut velit mollit consequat enim tempor. Consectetur est minim
                nostrud nostrud consectetur irure labore voluptate irure. Ipsum id Lorem sit sint voluptate est pariatur eu ad cupidatat et deserunt culpa sit eiusmod deserunt. Consectetur et fugiat anim do eiusmod aliquip nulla laborum elit adipisicing
                pariatur cillum.</p>
                </div>
                <div className="tab-pane fade " id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">
                <p>Irure enim occaecat labore sit qui aliquip reprehenderit amet velit. Deserunt ullamco ex elit nostrud ut dolore nisi officia magna sit occaecat laboris sunt dolor. Nisi eu minim cillum occaecat aute est cupidatat aliqua labore aute occaecat
                ea aliquip sunt amet. Aute mollit dolor ut exercitation irure commodo non amet consectetur quis amet culpa. Quis ullamco nisi amet qui aute irure eu. Magna labore dolor quis ex labore id nostrud deserunt dolor eiusmod eu pariatur culpa
                mollit in irure.</p>
                </div>
                </div>
                </div>
                </div>
                </div>
           
		);
	}
}

export default Services;