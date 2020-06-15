const Section = ({ title, classes = "", children }) => {
  return (
    <div className={`section__wrapper ${classes}`}>
      {title ? <h2 className="section__title">{title}</h2> : null}
      {children}
    </div>
  );
};

export default Section;
