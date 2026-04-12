import React from 'react';
import { FaPhone } from 'react-icons/fa';
import './MachineCard.css';
const MachineCard = ({ machine }) => { return ( <div className="machine-card"> <img src={machine.image} alt={machine.name} className="machine-image" /> <div className="machine-details"> <h3>{machine.name}</h3> <p>Owner: {machine.owner}</p> <p className="price">{machine.price}</p> </div> <a href={`tel:${machine.contact}`} className="contact-btn"> <FaPhone /> Contact </a> </div> ); };
export default MachineCard;