import React, {Component} from 'react';

// Bootstrap for react
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import ListGroup from 'react-bootstrap/ListGroup';
import { BsFillTrashFill } from "react-icons/bs";
//import moment from 'react-moment';
class App extends Component {
constructor(props) {
	super(props);

	// Setting up state
	this.state = {
	userInput : "",
	list:[],
	currentDateTime: "",
	isComplete: false
	}
}

componentDidMount(prevProps,prevState){
	
		const json = localStorage.getItem("list");
		const list = JSON.parse(json);
		if(list){
			this.setState(()=>({list}));
		}
	
}
componentDidUpdate(prevProps,prevState){
	if(prevState.list.length !== this.state.list.length){
		const json = JSON.stringify(this.state.list);
		localStorage.setItem("list",json);
	}
}
// Set a user input value
updateInput(value){
	this.setState({
	userInput: value
	});
}

// Add item if user input in not empty
addItem(){
	if(this.state.userInput !== '' ){
		var today=new Date();
		const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
];
	const userInput = {
		
		// Add a random id which is used to delete
		id : Math.random(),

		// Add a user value to list
		value : this.state.userInput,
		currentDateTime : today.getDate()+' '+monthNames[today.getMonth()]+' '+today.getFullYear(),
		currentTime : today.getHours()+':'+today.getMinutes()
	};

	// Update list
	const list = [...this.state.list];
	list.push(userInput);

	// reset state
	this.setState({
		list,
		userInput:""
	});
	}
}


// Function to delete item from list use id to delete
deleteItem(key){
	const list = [...this.state.list];

	// Filter values and leave value which we need to delete
	const updateList = list.filter(item => item.id !== key);

	// Update list in state
	this.setState({
	list:updateList,
	});

}

render(){
	console.log(this.state.isComplete);
	return(<Container>
		
		<Row style={{
				display: "flex",
				justifyContent: "right",
				alignItems: "center",
				fontSize: '72px',
				fontWeight: 'normal',
				backgroundColor: '#8BD4D4',
				fontFamily: 'Open-sans',
				height: '100px',
				color: '#135B5B',
				}}
				><div style={{marginLeft: '36px',}}>TO-DO LIST</div>
			</Row>
		<Row>
		<Col md={{ span: 5, offset: 4 }}>

		<InputGroup className="mb-3">
		<FormControl
			placeholder="Add new task . . . "
			size="lg"
			value = {this.state.userInput}
			onChange = {item => this.updateInput(item.target.value)}
			aria-label="Large" aria-describedby="inputGroup-sizing-sm"
		style={{background: "#FFFFFF",
				border: "2px solid #135B5B",
				boxsizing: "border-box",
				boxshadow: "1px 4px 4px",
				width: "754px",
				height: "40px",
				marginLeft: "36px",
				marginTop: "50px"
				}}
		/>
	
			<Button
			variant="dark"
			size="lg"
			onClick = {()=>this.addItem()}
			style={{
					background: "#FFFFFF",
					border: "0px solid #135B5B",
					fontSize: "60px",
					color: '#135B5B',
					marginTop: "5px"
				}}
			>
			+
			</Button>
	
		</InputGroup>

	</Col>
</Row>
<Row style={{height:"50px"}}></Row>
<Row style={{width:"1220px"}}>
	<Col md={{ span: 12, offset: 12 }}  >
		<ListGroup>
		{/* map over and print items */}
		
		{this.state.list.map(item => {return(
			<div>
			<div style={{float:'left',
			width: "120px",
					height: "65px",
			}}>
			 {item.currentDateTime}<br/>
			 {item.currentTime}</div>
		    <div style={{float:'left',width: "400px",
					height: "65px",}}> {item.value} <hr style={{width: "400px"}}/></div>
			
			<div style={{float:'left',width: "700px",
					height: "65px",}}>
			<ListGroup.Item variant="dark" action
			onClick = { () => this.deleteItem(item.id) }
			style={{backgroundColor:"#FFFFFF", border:"0px"}}>
			<BsFillTrashFill style={{color:"#135B5B"}}/>
			</ListGroup.Item>
			</div>
			</div>			
		)})}
		
		</ListGroup>
	</Col>
</Row>
	</Container>
	);
}
}

export default App;
