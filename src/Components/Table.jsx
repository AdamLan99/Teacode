import { Pagination } from 'rsuite'
import React, { Component } from 'react'
import User from './User'
import "rsuite/dist/styles/rsuite-default.css";
import { Input } from "antd"
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

const { Search } = Input

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
            .catch(err => console.error(err))
    }

    async searchUser(e) {
        this.setState({
            currentPage: 1,
            search: e.target.value
        })
    }

    search() {
        return (
            <div className="row shadow py-2">
                <div className="col-lg-12">
                    <Search placeholder="Search user" allowClear onChange={e => this.searchUser(e)} style={{ width: "100%" }} />
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
                    id={x.id}
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
            <div>
                <table className="table mt-2" style={{ textAlign: "center", width: "100%" }}>
                    <thead>
                        <tr>
                            <th style={{ width: "33.3%" }}>Avatar</th>
                            <th style={{ width: "33.3%" }}>Name</th>
                            <th style={{ width: "33.3%" }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers}
                    </tbody>
                </table>
                {<div className="row">
                    <div className="col-lg-4"></div>
                    <div className="col-lg-4">
                        {pageNumbers.length > 1 ? (
                            <Pagination
                                prev
                                last
                                next
                                first
                                size="md"
                                maxButtons={5}
                                pages={pageNumbers.length}
                                activePage={this.state.currentPage}
                                onSelect={e => this.setState({ currentPage: e })}
                            />
                        ) : null}

                    </div>
                    <div className="col-lg-4"></div>
                </div>}
            </div>
        )
    }

    render() {
        if (!this.state.loading) {
            return (
                <div>
                    {this.search()}
                    <div className="row">
                        <div className="col-lg-1"></div>
                        <div className="col-lg-10">
                            {this.table()}
                        </div>
                        <div className="col-lg-1"></div>
                    </div>
                </div >
            )
        } else {
            return (
                <p className="p-3">Loading users, please wait... :)</p>
            )
        }
    }
}
