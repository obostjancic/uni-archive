import React, { Component } from 'react';
import { Segment, Form } from 'semantic-ui-react';


class EmptyCard extends Component {
    constructor(props) {
        super(props);
        this.state = { text: '' };
        this.onTextChange = this.onTextChange.bind(this);
    }
    onTextChange(event, { value }) {
        this.setState({ text: value });
    }
    render() {
        return (
            <Segment className="cardSegment hand" raised>
                <Form>
                    <Form.Input fluid label="Card text: " value={this.state.text} size="small" onChange={this.onTextChange} />
                    <Form.Group size="tiny" widths="equal" className="zeroBottomMargin">
                        <Form.Button size="tiny" fluid positive onClick={() => this.props.add(this.props.id, this.state.text)}>
                            Save
                        </Form.Button>
                        <Form.Button size="tiny" fluid negative onClick={() => this.props.remove(this.props.id)}>
                            Remove
                        </Form.Button>
                    </Form.Group>
                </Form>
            </Segment>
        );
    }
}

export default EmptyCard;
