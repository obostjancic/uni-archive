import React from 'react';
import { Grid, Label } from 'semantic-ui-react';
import colors from './../../../common/colors';
import './card-detail.css';


const findLabel = (color, labels) => {
    const found = labels.find(e => e.color === color);
    return found ? found.text : undefined;
};

const AllLabels = ({
    labels, addLabel, removeLabel, cardId
}) => (
    <Grid textAlign="center" >
        {colors.map(color => {
            const found = findLabel(color, labels);
            return (
                <Grid.Row className="labelRow">
                    {found ?
                        <Label
                            key={color}
                            onClick={() => removeLabel(cardId, color)}
                            size="large"
                            className="popupLabel hand"
                            color={color}
                        >
                            {found}
                        </Label> :
                        <Label
                            key={color}
                            onClick={() => addLabel(cardId, color)}
                            size="large"
                            className="popupLabel hand"
                            color={color}
                        >
                            {color.charAt(0).toUpperCase() + color.slice(1)}
                        </Label>
                    }
                </Grid.Row>);
        })}
    </Grid>
);

export default AllLabels;
