import css from "./loading.module.css";
const Loading = () => {
  return (
    <div className={css.loadingWrapper}>
      <div className={css.loadingCard}>
        <p className={css.loadingMessage}>Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
