import React from 'react'
import DB from '../db'
import { Redirect } from "react-router-dom"
import Button from 'react-bootstrap/Button'

export default class CleaningsDelete extends React.Component {

    state = {
        Cleaning: null,
        isDeleted: false
    }

    async componentDidMount() {
        const json = await DB.Cleanings.findOne(this.props.match.params.id)
        this.setState({ Cleaning: json })
    }

    handleDelete = async () => {
        console.log(this.state.Cleaning.Id)
        if (await DB.Cleanings.remove(this.state.Cleaning.Id)) {
            this.setState({ isDeleted: true })
        }
    }

    render() {
        return (
            this.state.isDeleted
                ?
                <Redirect to="/cleanings" />
                :
                (this.state.Cleaning
                    ?
                    <div>
                        <h2>Delete</h2>
                        <h4>cleaning
                        </h4>
                        <hr />
                        <dl>
                            <dt>Renteing ID</dt>
                            <dd>{this.state.Cleaning.RentingId}</dd>
                        </dl>
                        <dl>
                            <dt>CleanerEmail</dt>
                            <dd>{this.state.Cleaning.CleanerEmail}</dd>
                        </dl>
                        <dl>
                            <dt>Status</dt>
                            <dd>{this.state.Cleaning.Status}</dd>
                        </dl>
                        <p>
                            <Button onClick={this.handleDelete}>Complete</Button>
                        </p>
                    </div>
                    :
                    <div>Loading...</div>
                )
        )
    }
}