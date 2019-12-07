import React from "react";
import { Modal, Button, Tabs, DatePicker, Steps, message, List, Avatar, Icon } from "antd";

const { TabPane } = Tabs;
const { Step } = Steps;
const { RangePicker } = DatePicker;

class AdditionalWindows extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        var hotels = [];
        var transports = [];

        if (this.props.selected != null && this.props.selected) {
            hotels = this.props.selected["hotel"];
            transports = this.props.selected["transportation"];
        }

        const steps = [
            // Select hotel
            {
                title: "Select Hotel",
                content:
                    <List
                        itemLayout="horizontal"
                        dataSource={hotels}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src="https://cdn1.vectorstock.com/i/1000x1000/95/55/hotel-icon-summer-vacation-vector-13839555.jpg" />}
                                    title={item["name"]}
                                    description={item["cost"] + " USD / night"}
                                />
                                <Button type="primary" onClick={() => this.props.setHotel({ title: item.name, cost: item.cost })}>Select</Button>
                            </List.Item>
                        )}
                    />
            },
            //   Select transportation
            {
                title: "Select transportation",
                content:
                    <List
                        itemLayout="horizontal"
                        dataSource={transports}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src="https://image.flaticon.com/icons/svg/164/164955.svg" />}
                                    title={item["name"]}
                                    description={item["cost"] + " USD"}
                                />
                                <Button type="primary" onClick={() => this.props.setTransport({ type: item.name, cost: item.cost })}>Select</Button>
                            </List.Item>
                        )}
                    />
            },
            {
                title: "Chouse dates",
                content:
                    <div className="container">
                        <div className="row">
                            <div className="col text-center my-4">
                                <RangePicker onChange={this.props.GetSelectedTime} />
                            </div>
                        </div>
                    </div>
            }
        ];


        const current = this.props.current;

        return (
            <div>
                <Modal
                    title="Trip Details"
                    visible={this.props.visible}
                    onOk={this.props.handleOk}
                    // onCancel={this.props.handleCancel}
                    maskClosable={false}
                    footer=""
                    closeIcon={<Icon></Icon>}
                    closable={false}
                >
                    <div>
                        <Steps current={current}>
                            {steps.map(item => (
                                <Step key={item.title} title={item.title} />
                            ))}
                        </Steps>
                        <div className="steps-content">{steps[current].content}</div>
                        <div className="steps-action">
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default AdditionalWindows;
