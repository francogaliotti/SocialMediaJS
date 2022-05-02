import React from 'react'
import { Link } from "react-router-dom";
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

function PageNotFound() {
  return (
    <div style={{marginTop: "100px", color:"#ddd"}}>
        <h1> Page not found <SentimentVeryDissatisfiedIcon style={{fontSize: "120%"}}/> </h1>
        <h3>
        Go to the Home Page: <Link to="/"> Home Page</Link>
      </h3>
    </div>
  )
}

export default PageNotFound