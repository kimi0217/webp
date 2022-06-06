import React from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

class TodoList extends React.Component {
  constructor(props) {
		super(props);
      this.state = {
      list: [],
    };
	}

	addItem = (text) => {
		const { list } = this.state;

        if (text !== '') {

			const tempArr = list.concat({
				id: list.length + 1,
				text,
				status: false,
			});
			this.setState({
				list: tempArr,
			});
		}
	}

	toggleStatus = (id) => {
		const { list } = this.state;
		const tempArr = list.map(item => {

			if(item.id.toString() === id.toString()) {
				return ({
					id: item.id,
					text: item.text,
					status: !item.status,
				});
			}
			return item;
		});
		this.setState({
			list: tempArr,
		});
	}

	render() {
		const { list } = this.state;
		const divStyle = {
			width: '250px',
			margin: "auto",
			textAlign: 'center',
		}; 
		return(
			<div style={divStyle}>
				<TodoForm onAddItem={this.addItem}  />
				<ul>
					{list.map(item => (
						<TodoItem
							key={item.id}
							id={item.id}
							status={item.status}
							onItemClick={this.toggleStatus}
						>
							{item.text}
						</TodoItem>
					))}
				</ul>
			</div>
		);
	}
}

export default TodoList;