import { Pagination } from 'rsuite'
import React, { Component } from 'react'
import User from './User'
import "rsuite/dist/styles/rsuite-default.css";

export default class Table extends Component {

    state = {
        users: [],
        loading: true,
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
            .then(x => this.setState({
                users: x,
                loading: false
            }))
    }

    search() {
        return (
            <div className="row shadow py-2">
                <div className="col-lg-6">
                    <span>Adam Łangowski for Teacode.</span>
                </div>
                <div className="col-lg-6">
                    <input className="input-group p-2" type="search" name="search" id="" placeholder="Search user" onChange={e => this.onChange(e)} />
                </div>
            </div>
        )
    }

    table() {
        //Importing lodash
        let _ = require("lodash")

        //Initiating user component
        let users = this.state.users.map(
            x => (
                <User
                    key={x.id}
                    name={`${x.first_name} ${x.last_name}`}
                    lastName={x.last_name}
                    email={x.email}
                    gender={x.gender}
                    avatar={x.avatar}
                />
            )
        )

        //Adding sorting by last name
        users = _.sortBy(users, function (o) {
            return o.props.lastName
        })

        //Filtering users by search value
        let filteredUsers = users.filter(
            x => {
                return x.props.name
                    .toLowerCase()
                    .includes(this.state.search.toLowerCase())
            }
        )

        //Working on pagination - users shown
        let { currentPage, usersPerPage } = this.state

        let indexOfLastUser = currentPage * usersPerPage
        let indexOfFirstUser = indexOfLastUser - usersPerPage
        let currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)

        //Working on pagination - pagination component
        let pageNumbers = []

        for (let i = 1; i <= Math.ceil(filteredUsers.length / usersPerPage); i++) {
            pageNumbers.push(i)
        }

        return (
            <table className="table mt-2" style={{ textAlign: "center", width: "100%" }}>
                <thead>
                    <tr>
                        <th>Avatar</th>
                        <th>Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers}
                </tbody>
                <div className="row">
                    <div className="col-lg-4"></div>
                    <div className="col-lg-4">
                        <Pagination
                            style={{ width: "100%" }}
                            {...this.state}
                            pages={pageNumbers.length}
                            maxButtons={5}
                            currentPage={this.state.currentPage}
                            onSelect={e => this.setState({ currentPage: e })}
                        />
                    </div>
                    <div className="col-lg-4"></div>
                </div>
            </table>
        )
    }

    render() {
        if (!this.state.loading) {
            return (
                <div>
                    {this.search()}
                    <div className="row">
                        <div className="col-lg-3"></div>
                        <div className="col-lg-6">
                            {this.table()}
                        </div>
                        <div className="col-lg-3"></div>
                    </div>
                </div >
            )
        } else {
            return (
                <p>Loading users, please wait...</p>
            )
        }
    }
}
