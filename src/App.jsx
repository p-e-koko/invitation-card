import React, { useState } from 'react';
import './LunchInvitationForm.css';
import { Mail, Send, Calendar, MapPin, Heart } from 'lucide-react';

export default function LunchInvitation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [responseData, setResponseData] = useState({
    guestName: '',
    preferredTime: '',
    foodAllergies: ''
  });

  const invitationData = {
    eventName: "Lunch Gathering",
    location: "Farmito Arigato, Rabbit House 333",
    hostName: "Teresa & Pann",
    description:
      "I'd love to have lunch with you! Just a cozy get-together — nothing fancy. Preferably on any Saturday or Sunday."
  };

  const handleChange = (e) => {
    setResponseData({ ...responseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!responseData.guestName) {
      alert('Please enter your name.');
      return;
    }
    if (!responseData.preferredTime) {
      alert('Please choose a preferred date and time.');
      return;
    }

    const stored = JSON.parse(localStorage.getItem('lunchResponses') || '[]');
    stored.push(responseData);
    localStorage.setItem('lunchResponses', JSON.stringify(stored));
    setShowModal(true);
  };

  return (
    <div className="container">
      <div className="card-wrapper">
        <div className="invitation-card">
          <div
            className={`envelope ${isOpen ? 'open' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="envelope-hover" />
            <div className="envelope-icon">
              <Mail size={32} />
            </div>
            <div className={`heart-circle ${isOpen ? 'hide' : ''}`}>
              <Heart size={20} />
            </div>
          </div>

          <div className={`invitation-content ${isOpen ? 'show' : ''}`}>
            <div className="header">
              <h1>Lunch Invitation</h1>
              <p className="event-name">{invitationData.eventName}</p>
              <div className="event-info">
                <p><Calendar size={16} /> Any Saturday or Sunday</p>
                <p><MapPin size={16} /> {invitationData.location}</p>
              </div>
              <p className="description">{invitationData.description}</p>
            </div>

            <div className="form">
              <input
                name="guestName"
                placeholder="Your Name *"
                value={responseData.guestName}
                onChange={handleChange}
              />

              <label>Preferred Date & Time</label>
              <input
                type="datetime-local"
                name="preferredTime"
                value={responseData.preferredTime}
                onChange={handleChange}
              />
              <small>Please choose a Saturday or Sunday if possible.</small>

              <textarea
                name="foodAllergies"
                placeholder="Any food allergies?"
                value={responseData.foodAllergies}
                onChange={handleChange}
              ></textarea>

              <button onClick={handleSubmit}>
                <Send size={18} /> Send
              </button>
            </div>
          </div>
        </div>

        {!isOpen && (
          <p className="click-hint">Click the envelope to open your invitation</p>
        )}
      </div>

      {/* Popup Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Thank you for submitting! 🎉</h2>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
