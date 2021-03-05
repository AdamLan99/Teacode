import React, { Component } from 'react'
import { Checkbox } from "antd"

export default class User extends Component {
    render() {
        return (
            <tr>
                <td><img src={this.props.avatar} alt="" width={25} /></td>
                <td>{this.props.name}</td>
                <td><Checkbox /></td>
            </tr>
        )
    }
}
