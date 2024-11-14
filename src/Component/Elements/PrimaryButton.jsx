/* eslint-disable react/prop-types */
const PrimaryButton = ({ onClick, buttonName, disabled }) => {
  return (
    <button
      type="button"
      className="btn btn-primary btn-sm"
      disabled={disabled? disabled : false}
      onClick={onClick}
    >
      {buttonName}
    </button>
  );
};

export default PrimaryButton;
