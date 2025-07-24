import React, { useState } from 'react';
import './LunchInvitationForm.css';
import { Mail, Send, Calendar, MapPin, Clock, Heart } from 'lucide-react';

export default function LunchInvitation() {
  const [isOpen, setIsOpen] = useState(false);
  const [responseData, setResponseData] = useState({
    guestName: '',
    availability: '',
    preferredTime: '',
    foodAllergies: ''
  });

  const invitationData = {
    eventName: "Lunch Gathering",
    date: "2025-08-2",
    time: "13:00",
    location: "Farmito Arigato, Rabbit House 333",
    hostName: "Teresa & Pann",
    description: "I'd love to have lunch with you! Just a cozy get-together — nothing fancy."
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric', minute: '2-digit', hour12: true
    });
  };

  const handleChange = (e) => {
    setResponseData({ ...responseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!responseData.guestName) {
      alert('Please enter your name.');
      return;
    }
    if (!responseData.availability) {
      alert('Please indicate your availability.');
      return;
    }
    const stored = JSON.parse(localStorage.getItem('lunchResponses') || '[]');
    stored.push(responseData);
    localStorage.setItem('lunchResponses', JSON.stringify(stored));
    alert('Thanks for your response!');
  };

  return (
    <div className="container">
      <div className="card-wrapper">
        <div className="invitation-card">
          <div 
            className={`envelope ${isOpen ? 'open' : ''}`} 
            onClick={() => setIsOpen(!isOpen)}>
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
                <p><Calendar size={16} /> {formatDate(invitationData.date)}</p>
                <p><Clock size={16} /> {formatTime(invitationData.time)}</p>
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

              <label>Are you available at the scheduled time?</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="availability"
                    value="available"
                    checked={responseData.availability === 'available'}
                    onChange={handleChange}
                  /> Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="availability"
                    value="not-available"
                    checked={responseData.availability === 'not-available'}
                    onChange={handleChange}
                  /> No
                </label>
              </div>

              {responseData.availability === 'not-available' && (
                <input
                  name="preferredTime"
                  placeholder="When would work better?"
                  value={responseData.preferredTime}
                  onChange={handleChange}
                />
              )}

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

        {!isOpen && <p className="click-hint">Click the envelope to open your invitation</p>}
      </div>
    </div>
  );
}
