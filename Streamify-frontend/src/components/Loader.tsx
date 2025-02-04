import loader from "/loader.gif";

const Loader = () => {
  return (
    <div className={`flex items-center justify-center`}>
      <img src={loader} alt="Loading..." />
    </div>
  );
};

export default Loader;
