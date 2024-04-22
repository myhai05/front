import React from 'react';
import axios from 'axios';
import cookie from "js-cookie";
import Button from 'react-bootstrap/Button';

const Logout = () => {
  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };

  const logout = async () => {
    await axios({
      method: "get",
      url: 'http://localhost:3031/api/user/logout',
      withCredentials: true,
    })
      .then(() => removeCookie("jwt"))
      .catch((err) => console.log(err));
    
    window.location = "/login";
  };

  return (
    <>
    <Button variant="primary" onClick={logout}>Quitter</Button>{' '}
    </>
        
    

  );
};

export default Logout;