import React from 'react';
import { Link } from 'react-router-dom';

function Page404() {
    return (
        <div>
            <div class="message">
             <h1>Page 404</h1>
              <p>Uh oh, sorry page not found</p>
           </div>
            <p><Link to='/'>Back to Home</Link></p>
        </div>
    )
}

export default Page404
