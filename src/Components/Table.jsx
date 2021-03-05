import React, { Component } from 'react'
//import Users from "./User"

export default class Table extends Component {

    state = {
        user: []
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
        }).then(x => x.json()).then(x => console.log(x))
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}
