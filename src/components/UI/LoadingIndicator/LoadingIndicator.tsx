import classes from "./LoadingIndicator.module.scss";

export default () => {
  return (
    <div className={classes["loading-root"]}>
      <div className={classes["loading-ripple"]}>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
