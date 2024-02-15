import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';

const ContactForm = () => {
  const [state, handleSubmit] = useForm("xkndrzzd");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    message: ''
  });

  const handleFormSubmit = async (event) => {
    // Prevent default form submission
    event.preventDefault();

    // Call Formspree handleSubmit function
    await handleSubmit(event);
  };

  // Update the form data when input values change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  if (state.succeeded) {
    return (
      <div className="max-w-lg mx-auto text-center">
        <h2 className="text-3xl font-semibold text-center mb-8 animate__animated animate__fadeIn">Message Sent Successfully!</h2>
        <p className="text-lg text-white-700 mb-8 animate__animated animate__fadeIn">Thank you for reaching out. Our team will contact you as soon as possible.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto w-90">
      <br />
      <h2 className="text-3xl font-semibold text-center mb-8 animate__animated animate__fadeIn">Contact Us</h2>
      <div className="mt-8 text-center">
        <p className="text-lg text-gray-700 mb-2">Contact us via email:</p>
        <marquee className="flex justify-center">
          <a className="mr-4 text-blue-500 hover:text-blue-700 focus:outline-none" href="mailto:aauryagk12@gmail.com"> aauryagk12@gmail.com </a>
          <a className="mr-4 text-blue-500 hover:text-blue-700 focus:outline-none" href="mailto:bachelorstudent19@gmail.com"> bachelorstudent19@gmail.com </a>
          <a className="mr-4 text-blue-500 hover:text-blue-700 focus:outline-none" href="mailto:rohitkashyapbagpat27@gmail.com"> rohitkashyapbagpat27@gmail.com </a>
        </marquee>
      </div>
      <form onSubmit={handleFormSubmit} className="animate__animated animate__fadeInUp">
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            id="name"
            type="text" 
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
            className={`mt-1 p-3 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:scale-105 ${formData.message.trim() !== '' ? 'text-black' : 'text-gray-400'}`}
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            id="email"
            type="email" 
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className={`mt-1 p-3 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:scale-105 ${formData.message.trim() !== '' ? 'text-black' : 'text-gray-400'}`}
            placeholder="Enter your email address"
          />
          <ValidationError 
            prefix="Email" 
            field="email"
            errors={state.errors}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">Contact Number (with country code)</label>
          <input
            id="contactNumber"
            type="tel" 
            name="contactNumber"
            required
            value={formData.contactNumber}
            onChange={handleInputChange}
            className={`mt-1 p-3 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:scale-105 ${formData.message.trim() !== '' ? 'text-black' : 'text-gray-400'}`}
            placeholder="Enter your contact number with country code"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            required
            value={formData.message}
            onChange={handleInputChange}
            className={`mt-1 p-3 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:scale-105 ${formData.message.trim() !== '' ? 'text-black' : 'text-gray-400'}`}
            placeholder="Enter your message"
          ></textarea>
          <ValidationError 
            prefix="Message" 
            field="message"
            errors={state.errors}
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            disabled={state.submitting}
            className="bg-indigo-500 text-white py-3 px-6 rounded-md hover:bg-indigo-600 transition-colors duration-300 transform hover:scale-105"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
