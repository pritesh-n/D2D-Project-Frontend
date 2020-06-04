const Section = ({ title, classes = "", children }) => {
  return (
    <div className={`section__wrapper ${classes}`} style={styles.wrapper}>
      {title ? (
        <h2 className="section__title" style={styles.title}>
          {title}
        </h2>
      ) : null}
      {children}
    </div>
  );
};

const styles = {
  wrapper: {
    maxWidth: "100%",
    paddingTop: 15,
    paddingBottom: 15,
  },
  title: {
    fontSize: "1.5rem",
  },
};

export default Section;
