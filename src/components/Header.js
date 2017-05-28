import React from "react";

const Header = () =>{
    return(
        <header className="container headerSection">
            <div className="imageContainer">
                <img src="img/logo.jpg" alt="logo"/>
            </div>
            <div className="content">
                <h2>Top strzelcy Serie A</h2>
                <h4>sezon 2016/2016</h4>
            </div>
        </header>
    );
}

export default Header;