import React, { Component } from 'react'

export default class User extends Component {
    render() {
        return (
            <tr>
                <td><img src={this.props.avatar} alt="" width={25}/></td>
                <td>{this.props.firstName}</td>
                <td>{this.props.lastName}</td>
                <td>{this.props.email}</td>
                <td>{this.props.gender}</td>
            </tr>
        )
    }
}
