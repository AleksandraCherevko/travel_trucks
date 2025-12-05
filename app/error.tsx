"use client";

import css from "./error.module.css";

type Props = {
  error: Error;
  reset: () => void;
};

const ErrorMessage = ({ error, reset }: Props) => {
  return (
    <div className={css.errorWrapper}>
      <div className={css.errorMessageCard}>
        <h2 className={css.errorMessageTitle}>Loading error</h2>
        <p className={css.errorMessage}>{error.message}</p>
        <button className="basicBtn" onClick={reset}>
          Try again
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;
