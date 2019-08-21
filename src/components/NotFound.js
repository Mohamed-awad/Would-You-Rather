import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class NotFound extends Component{
    render(){
        return( <div>
            <img src={process.env.PUBLIC_URL + '/404_Error.jpg'}  />
            <p style={{textAlign:"center"}}>
              <Link to="/">Go to Home </Link>
            </p>
          </div>)
    }
}
export default NotFound;
