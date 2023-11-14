import React from "react";
import "./Navbar.css";
import logo from "../../Images/soulspell-logo.png";
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="top_bar">
                <p>Free shiping all over india | earn loyalty points with every order</p>
            </div>
            <div className="middle_bar">
                <div className="centered-container">
                    <div className="middle_bar_logo_image">
                        <img src={logo} alt="" />
                    </div>
                </div>
                <div className="middle_bar_icons">
                    <PersonOutlinedIcon sx={{ fontSize: 30 }} />
                    <SearchOutlinedIcon sx={{ fontSize: 30 }} />
                    <ShoppingBagOutlinedIcon sx={{ fontSize: 30 }} />
                </div>
            </div>
        </div>
    )
}

export default Navbar;