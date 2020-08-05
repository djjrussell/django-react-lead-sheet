import React from 'react'
import {render} from "react-dom";

const SaleScreen = (props) => {

    const {
        leadId
    } = props;

    const init = () => {
        fetch("/api/sales", {
            method: 'POST',
            body: JSON.stringify({
                lead_id: leadId,
            })
        }).then(response => {
            if (response.status > 400) {
                alert('failure')
            }else{
                debugger;
            }
        })
    };

    init();

    return (
        <React.Fragment>

        </React.Fragment>
    )
};

const container = document.getElementById("sale");
if ( container !==  null) {
    render(<SaleScreen leadId={container.dataset.leadId}/>, container);
}