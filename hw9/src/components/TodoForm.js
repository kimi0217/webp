import React from 'react';

class TodoForm extends React.Component {
	constructor(props) {
		super(props);
		this.inputRef = React.createRef();
	}

	formSubmit = (e) => {
		const { onAddItem } = this.props;
		e.preventDefault();
		onAddItem(this.inputRef.current.value);
		this.inputRef.current.value = '';
	}

	render() {
		return(
			<form onSubmit={this.formSubmit}>
				<h2>CGU Todo List</h2>
				<input placeholder='add a new todo...' type="text" name="todoItem" ref={this.inputRef} autoComplete="off" />
				<button type="submit" value="submit">add</button>
			</form>
		);
	}
}

export default TodoForm;