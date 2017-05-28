/*eslint-disable react/react-in-jsx-scope*/
import React from "react";



//*******************************************
//display downloaded data in table
const displayData = (
    data,
    searchName,
    searchNumber,
    searchGoals,
    currentPage,
    itemsPerPage,
    mainRow,
    takeMoreInformationFunction,
    DataRow
    )=>{
        let count = 0;
        searchName = searchName.toUpperCase(); 
        if(data && data.length>0){
            return data.map((result,i)=>{
                let fullname = result.fullname.toUpperCase();
                let number = (i+1).toString();
                let goals = result.goals.toString();
                if((fullname.includes(searchName) 
                   && number.includes(searchNumber) 
                   && goals.includes(searchGoals)) 
                ){
                    count = (count +1);
                    if(searchName ||searchNumber ||searchGoals ){
                        return(
                                <DataRow takeMoreInformation={takeMoreInformationFunction} key={result.identifier} id={result.identifier} result={result} i={i}/>
                            );

                    }
                    else if(count<=currentPage*itemsPerPage && count>(currentPage-1)*itemsPerPage){
                        return (
                            <DataRow takeMoreInformation={takeMoreInformationFunction} key={result.identifier} result={result} i={i}/>
                        );
                    }

                }
            })
        }else{
            //if data is empty or cant be download
            return (
                <tr>
                    <td colSpan={mainRow.length} className="fetchError"> 
                        Brak rekordów lub błąd połączenia 
                    </td>
                </tr>);
        }
}
//display main row with descriptions of columns
const displayMainRow=(mainRow)=>{
    return mainRow.map((result,i)=>{
        return(
                <th key={i}><h7>{result}</h7></th>
        ); 
    })
}
//display more information about choosen player
const displayMoreInformation=(
    displayPlayer
    )=>{
    if(displayPlayer){
        return Object.entries(displayPlayer).map((arrays)=>arrays.map((r)=>{
            return(
                <div className="moreInfItem">
                    {r}
                </div>
            );
        }))
    };
};
//display button to close information about choosen player         
 const displayButtonCloseMoreInf=(displayPlayer,closeMoreInformation)=>{
    if(displayPlayer.length===undefined){         
        return(
            <div className="closeMoreInformation" onClick={()=>closeMoreInformation()}> Zamknij </div>
        );
    }
}

export {displayData,displayMainRow,displayMoreInformation,displayButtonCloseMoreInf};