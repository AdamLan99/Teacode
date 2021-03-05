import React, { Component } from 'react'
import User from './User'
//import User from "./User"

export default class Table extends Component {

    state = {
        users: [],
        search: "",
        sortBy: "lastName",
        usersPerPage: 10,
        currentPage: 1
    }

    onChange(e) {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
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
        })
        .then(x => x.json())
        .then(x => this.setState({ users: x }))
    }

    search() {
        return (
            <div className="row">
                <div className="col-lg-8"></div>
                <div className="col-lg-4">
                    <input type="search" name="search" id="" onChange={e => this.onChange(e)} />
                </div>
            </div>
        )
    }

    table() {
        //Initiating user component
        let users = this.state.users.map(
            x => (
                <User
                    key={x.id}
                    name={`${x.first_name} ${x.last_name}`}
                    email={x.email}
                    gender={x.gender}
                    avatar={x.avatar}
                />
            )
        )

        //Filtering users by search value
        let filteredUsers = users.filter(
            x => {
                return x.props.name
                    .toLowerCase()
                    .includes(this.state.search.toLowerCase())
            }
        )

        return (
            <table className="table" style={{ textAlign: "center" }}>
                <thead>
                    <tr>
                        <th>Avatar</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers}
                </tbody>
            </table>
        )
    }

    render() {
        return (
            <div>
                { this.search()}
                { this.table()}
            </div >
        )
    }
}
