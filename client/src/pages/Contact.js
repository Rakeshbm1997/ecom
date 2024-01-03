import React from "react";
import Layout from "../Components/Layouts/Layout";
import { IoIosMailUnread } from "react-icons/io";
import { PiPhoneCallFill } from "react-icons/pi";
import { MdOutlineSupportAgent } from "react-icons/md";
const Contact = () => {
  return (
    <Layout>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAEHqRdQ-syz9_3ZxZK0PkidRTrDS9Wf8_Tg&usqp=CAU"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            any query and info about prodduct feel free to call anytime we 24X7
            vaialible
          </p>
          <p className="mt-3">
          <IoIosMailUnread /> : www.help@ecommerceapp.com
          </p>
          <p className="mt-3">
            <PiPhoneCallFill /> : 012-3456789
          </p>
          <p className="mt-3">
            <MdOutlineSupportAgent /> : 1800-0000-0000 (toll free)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;