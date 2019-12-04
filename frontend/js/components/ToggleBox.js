import React, { Component } from "react";
import styles from './Components.module.css'
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
			<div className="box"  style={{textAlign: 'center'}}>
				<div className={`${styles.boxTitle} fa fa-angle-double-down btn btn-primary`} onClick={this.toggleBox}>
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

export default ToggleBox;