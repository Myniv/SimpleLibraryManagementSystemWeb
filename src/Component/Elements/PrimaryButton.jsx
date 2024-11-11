/* eslint-disable react/prop-types */
const PrimaryButton = ({ onClick, buttonName }) => {
  return (
    <button
      type="button"
      className="btn btn-primary btn-sm"
      onClick={onClick}
    >
      {buttonName}
    </button>
  );
};

export default PrimaryButton;