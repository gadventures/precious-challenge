import React, { Component } from "react";
import styles from './Services.module.css'
class ToggleForm extends Component {

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
			<div className="box"  style={{textAlign: 'center'}}>
				<div 
				className={opened ? 'fa fa-angle-double-up btn btn-primary': "fa fa-angle-double-down btn btn-primary"} 
				style={{minWidth: "32%", 
					padding: "12px", 
					fontSize: "18px", 
					margin: "15px 0"
				}} 
				onClick={this.toggleBox}>
					  <span className={styles.span}>{title}</span>
				</div>
				{opened && (					
					<div className={styles.boxContent}>
						{children}
					</div>
				)}
			</div>
		);
	}
}

export default ToggleForm;