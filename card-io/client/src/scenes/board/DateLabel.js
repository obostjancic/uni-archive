import React, { Component } from 'react';
import { Form, Icon, Label, Popup } from 'semantic-ui-react';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as cardsActions from '../../redux/card/card';

class DateLabel extends Component {
    constructor(props) {
        super(props);
        this.state = { newDate: this.props.card.date.format('DD.MM.YYYY.') };
        this.onDateChange = this.onDateChange.bind(this);
        this.onCheck = this.onCheck.bind(this);
    }
    onDateChange(event, { value }) {
        this.setState({ newDate: value });
    }
    onCheck(event, { checked }) {
        event.stopPropagation();
        this.props.actions.card.toggleCompleted(this.props.cardId);
    }
    render() {
        const { enableClick, className } = this.props;
        const { date, completed } = this.props.card;
        const now = moment();
        let color = 'grey';
        if (!completed && date && moment.duration(moment(date).diff(now)).days() < 1 && now < date) {
            color = 'yellow';
        } else if (!completed && date && now > date) {
            color = 'red';
        } else if (completed) {
            color = 'green';
        }
        return enableClick ? (
            <Popup
                trigger={
                    <Label className={className} color={color}>
                        <div className="dateLabelText">
                            {moment(date).format('DD.MM.')}
                        </div>
                    </Label>
                }
                content={
                    <PopupForm
                        completed={completed}
                        cardId={this.props.cardId}
                        onChange={this.onDateChange}
                        newValue={this.state.newDate}
                        change={this.props.actions.card.changeDate}
                        remove={this.props.actions.card.removeDate}
                    />
                }
                on="click"
                position="bottom center"
                hideOnScroll
            />
        ) : (
            <Label className={className} color={color}>
                <Icon name="hourglass outline" />
                {moment(date).format('DD.MM.')}
            </Label>
        );
    }
}

const PopupForm = ({
    onChange, newValue, change, remove, cardId, completed
}) => (
    <Form>

        <Form.Input fluid label="Date: " onChange={onChange} value={newValue} size="small" maxLength="15" />
        <Form.Checkbox checked={completed} onChange={this.onCheck} label="Complete" />
        <Form.Group widths="equal" className="zeroBottomMargin">
            <Form.Button fluid positive onClick={() => change(cardId, moment(newValue, 'DD.MM.YYYY.'))}>
                Save
            </Form.Button>
            <Form.Button fluid negative onClick={() => remove(cardId)}>
                Remove
            </Form.Button>
        </Form.Group>
    </Form>
);

function mapStateToProps(store, ownProps) {
    return {
        card: { ...store.cards[ownProps.cardId] },
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            card: bindActionCreators(cardsActions, dispatch),
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DateLabel);
