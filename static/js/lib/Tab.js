import React from 'react';
import classnames from 'classnames';
import Nav from './Nav';

class Tab extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tabIndex: props.tabIndex || 0
        }

        this.handleTabClick = this.handleTabClick.bind(this);
    }

    handleTabClick (tabIndex) {
        this.setState({ tabIndex })
    }

    render() {
        return (
            <React.Fragment>
                <Nav tabs>
                    {React.Children.map(this.props.children, (child, index) => {
                        return (
                            <Nav.Item onClick={() => this.handleTabClick(index)}>
                                <Nav.Link active={index === this.state.tabIndex} to="#">
                                    {child.props.label}
                                </Nav.Link>
                            </Nav.Item>
                        )
                    })}
                </Nav>
                <Tab.Content>
                    {React.cloneElement(this.props.children[this.state.tabIndex], {
                        show: true,
                        active: true
                    })}
                </Tab.Content>
            </React.Fragment>
        );
    }
}

Tab.Content = ({ children }) => {
    return (
        <div className="tab-content">
            {children}
        </div>
    );
}

Tab.Pane = ({ fade, show, active, children, label, ...other }) => {
    return (
        <div className={classnames('tab-pane', {
            'fade': !!fade,
            'show': !!show,
            'active': !!active
        })} data-label={label} {...other}>
            {children}
        </div>
    );
}

export default Tab;