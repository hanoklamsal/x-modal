import React, { useState, useEffect } from 'react'

const App = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    phone: '',
    dob: ''
  })

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.phone.length !== 10) {
      alert('Invalid phone number. Please enter a 10-digit phone number.')
      return;
    }
    if (new Date(user.dob) > new Date()) {
      alert('Invalid date of birth. Date of birth cannot be in the future.')
      return;
    }

    setUser({
      username: '',
      email: '',
      phone: '',
      dob: ''
    })
    setIsModalOpen(false);
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <h1>User details Modal</h1>
      <button onClick={openModal}>Open Form</button>
      {isModalOpen && (
        <div className="notmodal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Fill details</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Username</label>
              <input type="text" name='username' required value={user.username} onChange={handleChange} id='username' />
              <label htmlFor="email">Email Address</label>
              <input type="text" name='email' required value={user.email} onChange={handleChange} id='email' />
              <label htmlFor="phone">Phone number</label>
              <input type="text" name='phone' required value={user.phone} onChange={handleChange} id='phone' />
              <label htmlFor="dob">Date of Birth</label>
              <input type="date" name='dob' required value={user.dob} onChange={handleChange} id='dob' />
              <button type='submit' className='submit-button'>Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
