import React, { Component } from 'react'
import Table from "./Table"
import 'antd/dist/antd.css'

export default class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Table />
      </div>
    )
  }
}
