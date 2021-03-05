import React, { Component } from 'react'
import { Checkbox } from "antd"

export default class User extends Component {
    render() {
        return (
            <tr style={{ width: "100%" }}>
                <td><img src={this.props.avatar} alt="" width={23} /></td>
                <td>{this.props.name}</td>
                <td><Checkbox /></td>
            </tr>
        )
    }
}
