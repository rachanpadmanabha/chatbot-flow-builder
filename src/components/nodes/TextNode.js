import React from "react";
import { Handle } from "react-flow-renderer";
import whatsappIcon from "../../assets/whatsapp.png";

// TextNode component receives `data` prop containing label information
const TextNode = ({ data }) => {
    return (
        <div className="text-node">
            <div className="header">
                <div>
                    <span className="icon">💬</span>
                    <span className="title">Send Message</span>
                </div>
                <img src={whatsappIcon} alt="WhatsApp" className="whatsapp-icon" />
            </div>
            <div className="content">{data.label}</div>
            <Handle type="target" position="left" style={{ background: "#555" }} />
            <Handle type="source" position="right" style={{ background: "#555" }} />
        </div>
    );
};

export default TextNode; 
