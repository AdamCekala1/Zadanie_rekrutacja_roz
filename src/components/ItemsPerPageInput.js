import React from "react";

const ItemsPerPageInput =(props) =>{
    return(
        <section className="setItemsPerPage container">
            <h4> Proszę wpisać ilość rekordów na stronie </h4>
            <input type="text" onChange={(e)=>props.setItemsPerPage(e)} placeholder="Ilość rekordów na stronę" ></input>
        </section>
    );
}
export default ItemsPerPageInput;