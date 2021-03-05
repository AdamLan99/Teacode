import React, { Component } from 'react'
import { Checkbox } from "antd"

export default class User extends Component {

    state = {
        checked: false
    }

    checkCheckbox() {
        console.log(this.props.id)
        this.setState({
            checked: !this.state.checked
        })
    }

    render() {
        return (
            <tr style={{ width: "100%" }}>
                <td><img src={this.props.avatar} alt="" width={23} /></td>
                <td>{this.props.name}</td>
                <td><Checkbox checked={this.state.checked} onClick={() => this.checkCheckbox()} /></td>
            </tr>
        )
    }
}
