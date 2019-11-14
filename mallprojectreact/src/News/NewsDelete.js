import React from 'react'
import DB from '../db'
import { Redirect } from "react-router-dom"
import Button from 'react-bootstrap/Button'

export default class NewsDelete extends React.Component {

    state = {
        New: null,
        isDeleted: false
    }

    async componentDidMount() {
        const json = await DB.News.findOne(this.props.match.params.id)
        this.setState({ New: json })
    }

    handleDelete = async () => {
        if (await DB.News.remove(this.state.New.Id)) {
            this.setState({ isDeleted: true })
        }
    }

    render() {
        return (
            this.state.isDeleted
                ?
                <Redirect to="/news" />
                :
                (this.state.New
                    ?
                    <div>
                        <h2>Delete</h2>
                        <h4>New</h4>
                        <hr />
                        <dl>
                            <dt>Renter Email</dt>
                            <dd>{this.state.New.RenterEmail}</dd>
                        </dl>
                        <dl>
                            <dt>Topic</dt>
                            <dd>{this.state.New.Topic}</dd>
                        </dl>
                        <dl>
                            <dt>Content</dt>
                            <dd>{this.state.New.Content}</dd>
                        </dl>
                        <p>
                            <Button onClick={this.handleDelete}>Delete</Button>
                        </p>
                    </div>
                    :
                    <div>Loading...</div>
                )
        )
    }
}