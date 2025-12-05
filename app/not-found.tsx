import Link from "next/link";

import css from "./not-found.module.css";

const NotFound = () => {
  return (
    <div className={css.notFoundWrapper}>
      <div className={css.notFoundCard}>
        <h1 className={css.notFoundTitle}>404 - Page Not Found</h1>
        <p className={css.notFoundMessage}>
          Sorry, the page you&#39;re looking for doesn&#39;t exist.
        </p>
        <Link className="basicBtn" href="/">
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
