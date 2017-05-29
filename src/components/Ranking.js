import React,{Component} from 'react';
import Loading from "./Loading";
import DataRow from "./DataRow";
import Header from "./Header";
import Footer from "./Footer";
import ItemsPerPageInput from "./ItemsPerPageInput";

import {displayData,displayMainRow,displayMoreInformation,displayButtonCloseMoreInf} from "../actions/displayActions"
import {fetchData} from "../actions/fetchDataActions"
import {paginationColumn,firstPartPagination,LastPartPagination} from "../actions/paginationActions"

class Ranking extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:true,
            data:[],
            searchName:'',
            searchNumber:'',
            searchGoals:'',
            currentPage:1,
            itemsPerPage:10,
            searching:false,
            displayPlayer: [],
        };
        //it \/ will be not changeing - dont need in state(rednering)
        //main row - green one
        this.mainRowContent=["Pozycja","Zwodnik","Gole"];
        //url to fetch data
        this.url = "https://sportsop-soccer-sports-open-data-v1.p.mashape.com/v1/leagues/serie-a/seasons/15-16/topscorers";
        //header needed to request
        this.header = {
                "X-Mashape-Key":"kxSXmUymofmshFHhhKxWOSJpqJsJp1I3zNnjsnqKwhITAiC1zw"
            };
        
    }
    //fetch data when component did mount
    componentDidMount() {
        //fetch data 
        fetchData(this.url,this.header).then(
            (result)=>{
                this.setState({
                    data:result,
                    loading:false
                });
            },(error)=>{
                console.log("fetch error:");
                console.log(error);
                this.setState({
                    loading:false
                });
            }
        );

    };
    //take player object to display more infromation about him
    takeMoreInformation=(player)=>{
        this.setState({
            displayPlayer : player
        });
    };
    closeMoreInformation=()=>{
        this.setState({
            displayPlayer : []
        })
    }
    
    //take value which was writen in input - searching name
    searchName=(e)=>{    
        this.setState({
            searchName:e.target.value,
        });
    };
    //take value which was writen in input - searching number in ranking
    searchNumber=(e)=>{
        this.setState({
            searchNumber:e.target.value,
        });
    };
    //take value which was writen in input - searching goals
    searchGoals=(e)=>{
        this.setState({
            searchGoals:e.target.value,
        });
    };
    //set current page in pagination
    setCurrentPage=(number)=>{
        this.setState({
            currentPage : number,
        });
    };
    //check if we are searching now
    checkIsSearching(searchName,searchNumber,searchGoals){
        if(searchName.length===0 && searchNumber.length===0 && searchGoals.length===0 ){
            return false;
        }else{
            return true;
        }
    }
    //pagination
    pagination=()=>{
    //if we not searching turn on pagination, otherwise turn on it
     if(!this.checkIsSearching(this.state.searchName,this.state.searchNumber,this.state.searchGoals)){
            return(
                <ul>
                    {firstPartPagination(
                        this.state.currentPage,
                        this.setCurrentPage
                    )}
                    {paginationColumn(
                        this.state.data,
                        this.state.currentPage,
                        this.state.itemsPerPage,
                        this.setCurrentPage
                    )}
                    
                    {LastPartPagination(
                        this.state.data,
                        this.state.currentPage,
                        this.state.itemsPerPage,
                        this.setCurrentPage
                    )}
                </ul>
            );
        };
    };
    //change items per page, if not number do nothing, if 0 is change to default 10
    setItemsPerPage=(e)=>{
        let value = e.target.value
        if(Number(value)){
            this.setState({
                itemsPerPage:value,
                currentPage:1
            })
        }
        if(value.length===0){
            this.setState({
                itemsPerPage:10,
                currentPage:1
            })
        }
    }

    //display main table
    displayMainContent=()=>{
        return(
            <section className="container mainTable">
                <h4> Aby dowiedzieć się więcej o zawodniku proszę kliknąć na jego wiersz. </h4>
                <table>
                    <thead>
                        <tr>
                            {displayMainRow(this.mainRowContent)}
                        </tr>
                    </thead>
                        <tbody className="dataRows">
                            <tr className="searchInputs">
                                <td>
                                    <input type="text" placeholder="Szukaj pozycji..." value={this.state.searchNumber}  onChange={(e)=>this.searchNumber(e)}></input>
                                </td>
                                <td>
                                    <input type="text" placeholder="Szukaj zawodnika..." value={this.state.searchName}  onChange={(e)=>this.searchName(e)}></input>
                                </td>
                                <td>
                                    <input type="text" placeholder="Szukaj goli..." value={this.state.searchGoals}  onChange={(e)=>this.searchGoals(e)}></input>
                                </td>
                            </tr>
                          {
                                displayData(
                                    this.state.data,
                                    this.state.searchName,
                                    this.state.searchNumber,
                                    this.state.searchGoals,
                                    this.state.currentPage,
                                    this.state.itemsPerPage,
                                    this.mainRowContent,
                                    this.takeMoreInformation,
                                    DataRow
                                )
                            }
                        </tbody>
                </table>
            </section>
        )
    }
    render(){
        //if loading is finished
        if(!this.state.loading){
            return(
                <div className="">
                    <Header />
                    <ItemsPerPageInput  setItemsPerPage={this.setItemsPerPage}/>
                    {this.displayMainContent()}
                    <section className="pagination">
                        {this.pagination()}
                    </section>
                    <section className="container displayMoreInformation">
                        {displayMoreInformation(this.state.displayPlayer)}
                        {displayButtonCloseMoreInf(this.state.displayPlayer,this.closeMoreInformation)}
                    </section>
                    
                    <Footer />
                </div>  
            );
        }
        //if loading is unfinished show loading animation
        else{
            return <Loading/>
        }
    }
}

export default Ranking;