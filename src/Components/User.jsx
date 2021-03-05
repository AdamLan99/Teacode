import React, { Component } from 'react'

export default class User extends Component {
    render() {
        return (
            <tr>
                <td style={{textAlign: "center"}}><img src={this.props.avatar} alt="" width={10}/></td>
                <td style={{textAlign: "center"}}>{this.props.firstName}</td>
                <td style={{textAlign: "center"}}>{this.props.lastName}</td>
                <td style={{textAlign: "center"}}>{this.props.email}</td>
                <td style={{textAlign: "center"}}>{this.props.gender}</td>
            </tr>
        )
    }
}
