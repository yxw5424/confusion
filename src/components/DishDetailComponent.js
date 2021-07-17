import React ,{Component}from 'react';
import { 
	Card, 
	CardImg, 
	CardText, 
	CardBody,
    CardTitle,
	Breadcrumb,
	Button,
	BreadcrumbItem,
	Modal, 
	ModalHeader, 
	ModalBody, 
	Label, 
	Col, 
	Row} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent'

import { Control, LocalForm, Errors } from 'react-redux-form';
import { baseUrl } from '../shared/baseUrl'
import { FadeTransform, Fade, Stagger } from 'react-animation-components';


	const required = (val) => val&& val.length;
	const maxLength = (len) => (val)=> !(val)||(val.length <= len);
	const minLength = (len) => (val)=> (val)&&(val.length >= len);

	class CommentForm extends Component{
		constructor(props){
		super(props)
			this.state={
				isModalOpen:false
			}
			this.toggleModal=this.toggleModal.bind(this);
			this.handleLogin = this.handleSubmit.bind(this);
		}
		toggleModal(){
			this.setState({
				isModalOpen:!this.state.isModalOpen
			});

		}
		handleSubmit(values) {
			this.toggleModal();
			this.props.postComment(this.props.dishId, values.rating, values.author, values.comment)
		}
		render(){
		return(
			<div>
				<Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
				<ModalHeader toggle={this.toggleModal}>
						Submit Comment
				</ModalHeader>
				<ModalBody>
					<LocalForm onSubmit={(values) => this.handleSubmit(values)}>
						<Row className="form-group">
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
						</Row>
						<Row className="form-group">
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
						</Row>
						
						
						<Row className="form-group">
							<Label htmlFor="comment" md={2}>Comment</Label>
							<Col >
								<Control.textarea model=".comment" id="comment" name="comment"
									rows="12"
									className="form-control" />
							</Col>
						</Row>
						<Row className="form-group">
							<Col >
								<Button type="submit" color="primary" >
								Submit
								</Button>
							</Col>
						</Row>
					</LocalForm>
				</ModalBody>
			</Modal>
			</div>
		)
		}
	}

	function RenderDish({dish}) {
		return(
			<div className="col-12 col-md-5 m-1">
				<FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
					<Card>
						<CardImg top src={baseUrl + dish.image} alt={dish.name} />
						<CardBody>
							<CardTitle>{dish.name}</CardTitle>
							<CardText>{dish.description}</CardText>
						</CardBody>
					</Card>
				</FadeTransform>
			</div>
		)
	}

	function RenderComments({comments, postComment, dishId}){
		
		if (comments != null )
		return(
			<div className="col-12 col-md-5 m-1">
				<h4 align="left">Comments</h4>
				<ul className="list-unstyled">
				<Stagger in>
                        {comments.map((comment) => {
                            return (
                                <Fade in>
                                <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                </li>
                                </Fade>
                            );
                        })}
                        </Stagger>
				</ul>
				<CommentForm dishId={dishId} postComment={postComment} />

			</div>
		)
	}

 	const DishDetail = (props) => {
		if (props.isLoading) {
			return(
				<div className="container">
					<div className="row">
						<Loading/>

					</div>

				</div>
			)
		}
		else if (props.errMess){
			return(
				<div className="container">
					<div className="row">
						<h4> {props.errMess}</h4>

					</div>

				</div>
			)
		}
		if (props.dish != null)
		return(
			<div className="container">
				<div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/home">Home</Link>
                        </BreadcrumbItem>
						<BreadcrumbItem>
                            <Link to="/menu">Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            {props.dish.name}
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3 align="left" >{props.dish.name}</h3>
                        <hr/>
                    </div>
                </div>
				{props.dish === undefined ? <div></div> :
					<div className="row">
						<RenderDish dish={props.dish}/>
						<RenderComments comments={props.comments}
							postComment={props.postComment}
							dishId={props.dish.id}
						/>
					</div>
				}
			</div>
			
		);
		else 
			return(
				<div></div>
			)
	}

export default DishDetail;
