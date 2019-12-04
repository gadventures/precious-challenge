import React from 'react'

const Footer =(props) =>{

    return(
        <footer className="site-footer" style={{paddingTop: "2em"}}>
            <div className="col-md-12 text-center" style={{background: "#e8e8e8", width: "100%", height: "3em"}}>
              <p style={{margin: "10px"}}>
                  Designed by <a href="https://yonkov.github.io">Atanas Yonkov </a>
                  ||
                © 2019 
                Precious Challenge
              </p>
        </div>
      </footer>
    );
};
export default Footer;