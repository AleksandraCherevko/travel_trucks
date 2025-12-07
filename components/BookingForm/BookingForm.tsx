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

type FormData = {
  name: string;
  email: string;
  bookingDate: Date | null;
  comment: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  bookingDate?: string;
};

const BookingForm = ({ camper }: BookingFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    bookingDate: null,
    comment: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.bookingDate) {
      newErrors.bookingDate = "Booking date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    console.log("Booking submitted:", formData, "Camper ID:", camper.id);
    setSubmitted(true);
  };

  return (
    <div className={css.booking}>
      <h3 className={css.bookingTitle}>Book your campervan now</h3>
      <p className={css.bookingAfterTitle}>
        Stay connected! We are always ready to help you.
      </p>

      {submitted ? (
        <p className={css.bookingAfterTitle}>
          Thank you! Your booking request has been submitted.
        </p>
      ) : (
        <form className={css.bookingForm} onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name*"
              className={css.bookingInput}
            />
            {errors.name && <p className={css.error}>{errors.name}</p>}
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email*"
              className={css.bookingInput}
            />
            {errors.email && <p className={css.error}>{errors.email}</p>}
          </div>

          <DatePicker
            selected={formData.bookingDate}
            onChange={(date) =>
              setFormData((prev) => ({
                ...prev,
                bookingDate: date,
              }))
            }
            locale={enGB}
            placeholderText="Booking date*"
            className={css.bookingInput}
            calendarClassName={css.bookingCalendar}
          />
          {errors.bookingDate && (
            <p className={css.error}>{errors.bookingDate}</p>
          )}

          <div>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              placeholder="Comment"
              className={`${css.bookingInput} ${css.bookingComment}`}
            />
          </div>

          <button type="submit" className={`${css.bookingBtn} basicBtn`}>
            Send
          </button>
        </form>
      )}
    </div>
  );
};

export default BookingForm;
