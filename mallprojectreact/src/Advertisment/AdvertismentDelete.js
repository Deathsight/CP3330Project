import React from 'react'
import DB from '../db'
import { Redirect } from "react-router-dom"
import Button from 'react-bootstrap/Button'

export default class NewsDelete extends React.Component {

    state = {
        advertisements: null,
        isDeleted: false
    }

    async componentDidMount() {
        const json = await DB.Advertisements.findOne(this.props.match.params.id)
        this.setState({ advertisements: json })
    }

    handleDelete = async () => {
        if (await DB.Advertisements.remove(this.state.advertisements.Id)) {
            this.setState({ isDeleted: true })
        }
    }
    render() {
        return (
            this.state.isDeleted ?
                <Redirect to="/profile/" />
            :
        <div>
            <h2>Are you sure ?</h2>
            <Button onClick={this.handleDelete}>Yes</Button><Button onClick={<Redirect to="/profile/" />}>No</Button>
        </div>
        )
    }
}