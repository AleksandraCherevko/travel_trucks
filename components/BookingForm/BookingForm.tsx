"use client";

import { useState } from "react";
import { Camper } from "@/lib/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import css from "./BookingForm.module.css";
import { enGB } from "date-fns/locale";

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
  const [bookingDate, setBookingDate] = useState<Date | null>(null);

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
    <div className={css.booking}>
      <h3 className={css.bookingTitle}>Book your campervan now</h3>
      <p className={css.bookingAfterTitle}>
        Stay connected! We are always ready to help you.
      </p>
      {submitted ? (
        <p>Thank you! Your booking request has been submitted.</p>
      ) : (
        <form className={css.bookingForm} onSubmit={handleSubmit}>
          <div>
            <label className={css.bookingLabel}></label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Name*"
              className={css.bookingInput}
            />
          </div>

          <div>
            <label className={css.bookingLabel}></label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email*"
              required
              className={css.bookingInput}
            />
          </div>

          <DatePicker
            id="date"
            selected={bookingDate}
            onChange={(date) => setBookingDate(date)}
            locale={enGB}
            placeholderText="Booking date*"
            className={css.bookingInput}
            calendarClassName={css.bookingCalendar}
          />

          <div>
            <label className={css.bookingLabel}></label>
            <textarea
              id="user-text"
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              placeholder="Comment"
              className={`${css.bookingInput} ${css.bookingComment}`}
            />
          </div>
          <button type="submit" className={`${css.bookingBtn} basicBtn`}>
            Sent
          </button>
        </form>
      )}
    </div>
  );
};

export default BookingForm;
