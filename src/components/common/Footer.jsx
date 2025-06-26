import React from "react";
import { BsInstagram } from "react-icons/bs";

const Footer = () => {
  return (
    <div className="w-full bg-black text-white pt-14">
      {/* Top Section */}
      <div className="w-full px-5 sm:px-20 flex flex-col sm:flex-row justify-between gap-10">
        {/* Contact Info */}
        <div className="flex flex-col gap-4 sm:w-[60%]">
          <h1 className="text-lg font-semibold">CONTACT INFORMATION</h1>
          <p className="text-sm text-gray-300">Email: giftyshop78@gmail.com</p>
          <p className="text-sm text-gray-300">
            Alternate Email: anjuay10102005@gmail.com
          </p>
          <p className="text-sm text-gray-300">
            Phone / WhatsApp: +91 9022007484
          </p>
          <p className="text-sm text-gray-300 flex items-center gap-1">
            Instagram:{" "}
            <a
              href="https://www.instagram.com/gifty_shop_2"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-400 hover:text-pink-400"
            >
              @gifty_shop_2
            </a>
            <BsInstagram className="text-pink-400" />
          </p>
        </div>

        {/* WhatsApp Payment Note */}
        <div className="flex flex-col gap-3 sm:w-[40%]">
          <h1 className="text-lg font-semibold">IMPORTANT NOTE</h1>
          <p className="text-sm text-gray-300">
            In case you placed an order with your customised things to be
            preserved, please share your payment screenshot on WhatsApp number{" "}
            <strong>9022007484</strong>. The courier address will be shared with
            you after confirmation.
          </p>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="flex flex-col sm:flex-row justify-between sm:px-20 px-5 pt-10 pb-4 text-xs text-gray-400">
        <p>India</p>
        <p>© 2025 gifty_shop_2. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
