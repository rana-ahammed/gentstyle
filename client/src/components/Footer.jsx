import React from 'react';
import { BsSkype, BsLinkedin, BsWhatsapp } from 'react-icons/bs';

const Footer = () => {
    return (
        <div className="h-auto w-full bg-pink-400 p-8 pb-9 text-center">
            <p className="text-xl font-bold">
                &copy; All Rights Reserved by GentStyle {new Date().getFullYear()}
            </p>
            <div className="mt-4 flex justify-center gap-6 text-2xl">
                <a
                    href="https://linkedin.com/in/rana-ahammed"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="linkedin-profile-link"
                >
                    <BsLinkedin />
                </a>
                <a
                    href="https://wa.me/+8801303173740"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="whatsapp-number-link"
                >
                    <BsWhatsapp />
                </a>
                <a
                    href="https://join.skype.com/invite/uBwzx0mkTMdO"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="skype-account-link"
                >
                    <BsSkype />
                </a>
            </div>
        </div>
    );
};

export default Footer;
