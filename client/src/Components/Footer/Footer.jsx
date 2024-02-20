import React from "react";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  GitHubIcon,
} from "../../Icons/Icons";

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-800 text-gray-300 py-6">
        <div className="container mx-auto flex flex-col items-center">
          {/* Social Media Icons */}
          <div className="flex space-x-4 mb-4">
            <a href="#" className="text-gray-300 hover:text-gray-400">
              <FacebookIcon className="text-2xl" />
            </a>
            <a href="#" className="text-gray-300 hover:text-gray-400">
              <TwitterIcon className="text-2xl" />
            </a>
            <a href="#" className="text-gray-300 hover:text-gray-400">
              <InstagramIcon className="text-2xl" />
            </a>
            <a href="#" className="text-gray-300 hover:text-gray-400">
              <GitHubIcon className="text-2xl" />
            </a>
          </div>

          {/* Contact Information */}
          <div className="text-center">
            <p className="mb-2">Contact Us:</p>
            <p className="mb-2">
              Email:{" "}
              <a
                href="ydv.rahul3108@gmail.com"
                className="text-gray-300 hover:text-gray-400"
              >
                ydv.rahul3108@gmail.com
              </a>
            </p>
            <p>
              Phone: <span className="text-gray-300">+91-6377607010</span>
            </p>
          </div>

          {/* Copyright */}
          <div className="mt-4">
            <p>&copy; 2023 Your Clothing Brand. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
