import React from 'react'
import '../../css/footer.css'

function Footer() {
    const year = new Date().getFullYear();

    return (
        <div className="footer">
            <div className="social-links">
                <a href="/"> <i className="fab fa-facebook  " ></i> </a>
                <a href="/"> <i className="fab fa-twitter " ></i> </a>
                <a href="/"> <i className="fab fa-google-plus " ></i> </a>
                <a href="/"> <i className="fab fa-instagram " ></i> </a>
                <a href="/"> <i className="fab fa-youtube " ></i> </a>
            </div>
            <hr/>
            <p> Copyright &copy;{year} All rights reserved  COMPANYNAME </p>
        </div>
    )
}

export default Footer
