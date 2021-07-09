import React  from 'react';
import { 
	Card, 
	CardImg, 
	CardText, 
	CardBody,
    CardTitle,
	Breadcrumb,
	BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';


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

	function RenderComments({comments}){
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
			</div>
		)
	}

	const DishDetail = (props) =>{
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
						<RenderComments comments={props.comments}/>
					</div>
				}
			</div>
		)
	}

export default DishDetail;
