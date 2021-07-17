import React, { Component } from 'react';
import { 
    Button, 
	Modal, 
	ModalHeader, 
	ModalBody, 
	Label, 
	Col, 
	Row, } 
from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
const required = (val) => val&& val.length;
const maxLength = (len) => (val)=> !(val)||(val.length <= len);
const minLength = (len) => (val)=> (val)&&(val.length >= len);


class CommentForm extends Component {
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(values) {
        console.log(this.props);
        alert(this.props);
		this.props.addComment(this.props.dishId, values.rating, values.author, values.comment)

    }

	render(){
		return(
			<Modal isOpen={this.props.isModalOpen} toggle={this.props.toggleModal}>
				<ModalHeader toggle={this.props.toggleModal}>
						Submit Comment
				</ModalHeader>
				<ModalBody>
					<LocalForm onSubmit={(values) => this.handleSubmit(values)}>
						<Col className="form-group">
							<Label htmlFor="rating" md={2}>Rating</Label>
							<Col >
								<Control.select model=".rating" name="rating"
									className="form-control">
									<option>1</option>
									<option>2</option>
									<option>3</option>
									<option>4</option>
									<option>5</option>
								</Control.select>
							</Col>
						</Col>
						<Col className="form-group">
							<Label htmlFor="yourname" md={2}>Your Name</Label>
							<Col >
								<Control.text model=".yourname" id="yourname" name="yourname"
									placeholder="Your Name"
									className="form-control"
									validators={{
										required, minLength: minLength(3), maxLength: maxLength(15)
									}}
									/>
								<Errors
									className="text-danger"
									model=".yourname"
									show="touched"
									messages={{
										required: 'Required',
										minLength: 'Must be greater than 2 characters',
										maxLength: 'Must be 15 characters or less'
									}}
								/>
							</Col>
						</Col>
						
						
						<Col className="form-group">
							<Label htmlFor="comment" md={2}>Comment</Label>
							<Col >
								<Control.textarea model=".comment" id="comment" name="comment"
									rows="12"
									className="form-control" />
							</Col>
						</Col>
						<Col className="form-group">
							<Col >
								<Button type="submit" color="primary" onSubmit={this.handleSubmit, this.props.toggleModal}>
								Submit
								</Button>
							</Col>
						</Col>
					</LocalForm>
				</ModalBody>
			</Modal>
		)
	}
}

export default CommentForm;