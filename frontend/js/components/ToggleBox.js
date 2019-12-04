import React, { Component } from "react";

class ToggleBox extends React.Component {

	constructor() {
		super();
		this.state = {
			opened: false,
		};
		this.toggleBox = this.toggleBox.bind(this);
	}
  
	toggleBox() {
		const { opened } = this.state;
		this.setState({
			opened: !opened,
		});
	}

	render() {
		var { title, children } = this.props;
        const { opened } = this.state;
        
		if (opened){
			title ='Hide Form';
        }

		return (
			<div className="box">
				<div className="boxTitle" onClick={this.toggleBox}>
					{title}
				</div>
				{opened && (					
					<div className="boxContent">
						{children}
					</div>
				)}
			</div>
		);
	}
}

export default ToggleBox;