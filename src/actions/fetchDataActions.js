    //fetch data from url
    const fetchData=(url,Header)=>{
        let settings = { 
            method: 'GET', 
            //add Header
            headers: new Headers(Header)
        }
        //download data
        return fetch(url,settings)
          .then((response)=>{ 
            //json
                return response.json(); 
                },(error)=>{
                    //write error in console
                   console.log("FetchData error:")
                   console.log(error)
                }
            )
          .then((result)=>{
            //download data->topscorers
                return result.data.topscorers;
            
            },(error)=>{
                    //write error in console
                   console.log("FetchData error:")
                   console.log(error)
                }
          ).then((result)=>{
            //return data, in main file we will set it to state
            return result;
          },(error)=>{
                console.log("FetchData error:")
                console.log(error)
            });  
    }
    
    export {fetchData};