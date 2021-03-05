import React, { Component } from 'react'
import User from './User'
//import User from "./User"

export default class Table extends Component {

    state = {
        users: [],
        filter: "",
        sortBy: "lastName",
        usersPerPage: 10,
        currentPage: 10
    }

    componentDidMount() {
        this.fetchUsers()
    }

    async fetchUsers() {
        await fetch('https://teacode-recruitment-challenge.s3.eu-central-1.amazonaws.com/users.json', {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        }).then(x => x.json()).then(x => this.setState({ users: x }))
    }

    search() {
        return (
            <div className="row">
                <div className="col-lg-8"></div>
                <div className="col-lg-4">
                    <input type="search" name="" id="" />
                </div>
            </div>
        )
    }

    table() {
        let users = this.state.users.map(
            x => (
                <User
                    key={x.id}
                    firstName={x.first_name}
                    lastName={x.last_name}
                    email={x.email}
                    gender={x.gender}
                    avatar={x.avatar}
                />)
        )

        return (
            <table className="table" style={{textAlign: "center"}}>
                <thead>
                    <tr>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Avatar</th>
                    </tr>
                </thead>
                <tbody>
                    {users}
                </tbody>
            </table>
        )
    }

    render() {
        return (
            <div>
                {this.search()}
                {this.table()}
            </div>
        )
    }
}
