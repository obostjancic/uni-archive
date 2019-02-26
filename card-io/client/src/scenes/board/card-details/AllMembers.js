import React from 'react';
import { Grid, Label } from 'semantic-ui-react';
import './card-detail.css';

const findMember = (userId, members) => members.find(e => e.user.id === userId);

const AllMembers = ({
    boardMembers, cardMembers, addMember, removeMember, cardId
}) => (
    <Grid textAlign="center" columns={1} >
        {boardMembers.map(member => (
            <Grid.Row className="labelRow">
                <Label
                    key={member.user.id}
                    onClick={() => (findMember(member.user.id, cardMembers) ? removeMember(cardId, member) : addMember(cardId, member))}
                    size="large"
                    className="popupLabel hand"
                    color={member.color}
                >
                    {member.user.firstName + ' ' + member.user.lastName}
                </Label>
            </Grid.Row>))}
    </Grid>
);

export default AllMembers;
