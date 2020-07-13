import React from 'react'

const RemoveLeadButton = (props) => {

    const {
        removeLeadFunction
    } = props;

    return <button onClick={removeLeadFunction}>Remove</button>;

};

export default RemoveLeadButton;