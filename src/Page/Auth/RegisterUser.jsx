import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../Redux/authSlice";
import LoadingState from "../../Component/Elements/LoadingState";
import LoadingAddEdit from "../../Component/Elements/LoadingAddEdit";
import { useNavigate } from "react-router-dom";
import LoadingWithErrorMessage from "../../Component/Elements/LoadingWithErrorMessage";

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    role: "",
    email: "",
    fName: "",
    lName: "",
    userPrivilage: "No Previlage",
    userNotes: "No Notes",
  });

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const focusNameInput = useRef(null);

  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};
    if (
      !formData.fName ||
      formData.fName.length < 2 ||
      formData.fName.length > 100
    ) {
      newErrors.fName = "Front Name must be between 2 and 100 characters";
    }
    if (
      !formData.lName ||
      formData.lName.length < 2 ||
      formData.lName.length > 100
    ) {
      newErrors.lName = "Last Name must be between 2 and 100 characters";
    }

    return newErrors;
  };

  useEffect(() => {
    if (isError) {
      // alert(message);
      LoadingWithErrorMessage({
        loadingMessage: "Registering...",
        errorMessage: message,
      });
    }
    if (isSuccess) {
      LoadingAddEdit({
        loadingMessage: "Logging in...",
        nextPage: () => navigate("/login"),
      });
    }
  });

  const onCancel = () => {
    setFormData({
      userName: "",
      password: "",
      role: "",
      email: "",
      fName: "",
      lName: "",
      userPrivilage: "",
      userNotes: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      dispatch(register(formData));
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const role = ["Librarian", "Library Manager", "Library User"];

  return (
    <>
      {isLoading ? (
        <LoadingState />
      ) : (
        <div className="mb-5">
          <h2 className="ms-5">Register</h2>
          <div className="container border">
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="mb-3">
                <label htmlFor="fName" className="form-label">
                  Front Name
                </label>
                <input
                  type="text"
                  id="fName"
                  name="fName"
                  className={`form-control ${errors.fName ? "is-invalid" : ""}`}
                  value={formData.fName}
                  onChange={handleChange}
                  required
                  placeholder="First Name"
                  ref={focusNameInput}
                />
                {errors.fName && (
                  <div className="invalid-feedback">{errors.fName}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="lName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lName"
                  name="lName"
                  className={`form-control ${errors.lName ? "is-invalid" : ""}`}
                  value={formData.lName}
                  onChange={handleChange}
                  required
                  placeholder="Last Name"
                />
                {errors.lName && (
                  <div className="invalid-feedback">{errors.lName}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Email"
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="userName" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  className={`form-control ${
                    errors.username ? "is-invalid" : ""
                  }`}
                  value={formData.userName}
                  onChange={handleChange}
                  required
                  placeholder="Username"
                />
                {errors.userName && (
                  <div className="invalid-feedback">{errors.userName}</div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className={`form-control ${
                    errors.username ? "is-invalid" : ""
                  }`}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Password"
                />
                {errors.username && (
                  <div className="invalid-feedback">{errors.username}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="role" className="form-label">
                  Select Role
                </label>
                <select
                  id="role"
                  name="role"
                  className={`form-control ${errors.role ? "is-invalid" : ""}`}
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="" disabled selected>
                    Select Role
                  </option>

                  {role.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                {errors.role && (
                  <div className="invalid-feedback">{errors.mgrempno}</div>
                )}
              </div>

              <button type="submit" className="btn btn-primary m-1">
                Register
              </button>

              <button
                type="button"
                onClick={onCancel}
                className="btn btn-danger m-1"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterUser;
