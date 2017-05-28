import React from "react";

const DataRow = (props) =>{
    return(
        <tr onClick={()=>props.takeMoreInformation(props.result)}>
            <td>{props.i+1}</td>
            <td>{props.result.fullname}</td>
            <td>{props.result.goals}</td>
        </tr>
    );
}

export default DataRow;