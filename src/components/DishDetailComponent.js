import React ,{Component}from 'react';
import { 
	Card, 
	CardImg, 
	CardText, 
	CardBody,
    CardTitle,
	Breadcrumb,
	Button,
	BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';



	function RenderDish({dish}) {
		return(
			<div className="col-12 col-md-5 m-1">
				<Card>
					<CardImg width="100%" src={dish.image} alt={dish.name} />
					<CardBody>
						<CardTitle align="left">{dish.name}</CardTitle>
						<CardText align="left">{dish.description}</CardText>
					</CardBody>
				</Card>
			</div>
		)
	}

	function RenderComments({comments, toggleModal, isModalOpen}){

		if (comments != null )
		return(
			<div className="col-12 col-md-5 m-1">
				<h4 align="left">Comments</h4>
				<ul className="list-unstyled">
				{
					comments.map((comment) => {
						return(
							<li key={comment.id}> 
								<p>{comment.comment}</p>
								<p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
							</li>
						)
					})
				}
				</ul>
				<Button outline onClick={toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
				<CommentForm isModalOpen={isModalOpen} toggleModal={toggleModal}/>
			</div>
		)
	}

class DishDetail extends Component{
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
	handleSubmit(event) {
        this.toggleModal();
        alert("Username: " + this.username.value + " Password: " + this.password.value
            + " Remember: " + this.remember.checked);
        event.preventDefault();

    }

	render(){
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
                            {this.props.dish.name}
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3 align="left" >{this.props.dish.name}</h3>
                        <hr/>
                    </div>
                </div>
				{this.props.dish === undefined ? <div></div> :
					<div className="row">
						<RenderDish dish={this.props.dish}/>
						<RenderComments comments={this.props.comments} toggleModal={this.toggleModal} isModalOpen={this.state.isModalOpen}/>
					</div>
				}
			</div>
		)
	}
}
export default DishDetail;
