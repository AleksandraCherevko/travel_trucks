"use client";

import { useState } from "react";
import { Camper } from "@/lib/api";

type BookingFormProps = {
  camper: Camper;
};

const BookingForm = ({ camper }: BookingFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bookingDate: "",
    comment: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking submitted:", formData, "Camper ID:", camper.id);
    setSubmitted(true);
    // Здесь можно добавить вызов API для бронирования
  };

  return (
    <div>
      <h3>Book your campervan now</h3>
      <p>Stay connected! We are always ready to help you.</p>
      {submitted ? (
        <p>Thank you! Your booking request has been submitted.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Booking Date:</label>
            <input
              type="date"
              name="bookingDate"
              value={formData.bookingDate}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Comment:</label>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
            />
          </div>

          <button type="submit">Sent</button>
        </form>
      )}
    </div>
  );
};

export default BookingForm;
