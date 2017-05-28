import React from "react";

//display 5 buttons -> x-2,x-1,x,x+1,x+2 wich are our pages
const paginationColumn=(
    data,
    currentPage,
    itemsPerPage,
    setCurrentPageFunction,
    )=>{
        if(data){
            return Array.from(new Array(5), (x,i) => {
                let number = currentPage + i-2;
                if(number > 0 && number < data.length/itemsPerPage+1){
                    //if it is our page change css class
                    if(number === currentPage){
                        return( 
                             <li key={number} className="disabled activeButtonPaginate" onClick={()=>setCurrentPageFunction(number)}>{number}</li>
                            );
                    //otherwise set standard
                    }else{
                        return (
                            <li key={number} onClick={()=>setCurrentPageFunction(number)}>{number}</li>
                            );
                    }
                }
            
            })
        }
    }

//set button which can set first page
const firstPartPagination=(currentPage,setCurrentPageFunction)=>{
        //if we are not on first page show our button, otherwise it is unnecessery
        if(currentPage!==1){
            return (
                <ul>
                    <li onClick={()=>setCurrentPageFunction(1)}>Pierwsza</li>
                    <li className="disabled">...</li>
                </ul>
            );
        }
    }
    
//like firstPartPagination, show last button
const    LastPartPagination=(
    data,
    currentPage,
    itemsPerPage,
    setCurrentPageFunction
        )=>{
        if(data){
            if(currentPage!==Math.ceil(data.length/itemsPerPage)){
                return (
                    <ul>
                        <li className="disabled">...</li>
                        <li onClick={()=>setCurrentPageFunction(Math.ceil(data.length/itemsPerPage))}>
                            Ostatnia
                        </li>
                    </ul>
                );
            }
        }
    }
   
//export
export {paginationColumn,firstPartPagination,LastPartPagination}