import React, { useState } from 'react';
import './Dashbar.css';


const Dashbar = () => {

    return (
        <div className = "grid-side">
            <div className = "badge">Current badge</div>
            <div className = "info">
                <p>Email</p>
                <p>email@usedtolog@in</p>
            </div>
            <div>
                <button className = "bar-buttons">Sign Out</button>
                <br></br>
                <button className = "bar-buttons">Delete Account</button>
            </div>
        </div>
    )
    }

export default Dashbar