import { useEffect, useRef, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import LoadingAddEdit from "../../Component/Elements/LoadingAddEdit";
import axios from "axios";

const MemberForm = () => {
  const { member } = useOutletContext();

  const [onSubmit, setOnSubmit] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const [formData, setFormData] = useState({
    userid: "",
    username: "",
    phonenumber: "",
  });

  const focusNameInput = useRef(null);

  useEffect(() => {
    if (params.id) {
      const findMember = member.find(
        (member) => member.userid === Number(params.id)
      );
      if (findMember) {
        setFormData(findMember);
      }
    }

    if (focusNameInput.current) {
      focusNameInput.current.focus();
    }
  }, [params, member]);

  useEffect(() => {
    if (onSubmit) {
      if (params.id) {
        onUpdateMember();
      } else {
        onAddMember();
      }
      setOnSubmit(false);
    }
  }, [onSubmit]);

  const onAddMember = () => {
    axios
      .post("http://localhost:5265/api/Users", formData)
      .then(() => {
        LoadingAddEdit({
          loadingMessage: "The new project is being added...",
          nextPage: () => navigate("/members"),
        });
      })
      .catch((err) => console.log(err));
  };

  const onUpdateMember = () => {
    axios
      .put(`http://localhost:5265/api/Users/${formData.userid}`, formData)
      .then(() => {
        LoadingAddEdit({
          loadingMessage: "The member is being edited...",
          nextPage: () => navigate("/members"),
        });
      })
      .catch((err) => console.log(err));
  };

  const onCancel = () => {
    setFormData({
      userid: "",
      username: "",
      phonenumber: "",
    });
    navigate("/members");
  };

  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};
    if (
      !formData.username ||
      formData.username.length < 2 ||
      formData.username.length > 100
    ) {
      newErrors.username = "Name must be between 2 and 100 characters";
    }

    const phoneRegex = /^(\+62|62)8[1-9][0-9]{6,9}$/;
    if (!formData.phonenumber || !phoneRegex.test(formData.phonenumber)) {
      newErrors.phonenumber =
        "Phone number must start with +62 and be 10-13 digits.";
    }
    return newErrors;
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
      setOnSubmit(true);
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const memberId = member.length > 0 ? member[member.length - 1].userid + 1 : 1;

  return (
    <>
      <div className="mb-5">
        <h2 className="ms-5">
          {params.id
            ? "Form Edit Member with id " + params.id
            : "Form Add Member"}
        </h2>
        <div className="container border">
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="mb-3">
              <label htmlFor="userid" className="form-label">
                    ID
                  </label>
              <input
                type="number"
                className="form-control"
                id="userid"
                name="userid"
                value={formData.userid}
                placeholder={memberId}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className={`form-control ${
                  errors.username ? "is-invalid" : ""
                }`}
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Full Name"
                ref={focusNameInput}
              />
              {errors.username && (
                <div className="invalid-feedback">{errors.username}</div>
              )}
            </div>
            <div className="mb-3"></div>
            <div className="mb-3">
              <label htmlFor="phonenumber" className="form-label">
                Phone Number
              </label>
              <input
                type="number"
                id="phonenumber"
                name="phonenumber"
                className={`form-control ${
                  errors.phonenumber ? "is-invalid" : ""
                }`}
                value={formData.phonenumber}
                onChange={handleChange}
                required
                placeholder="+628XXXXXXXXX"
              />
              {errors.phonenumber && (
                <div className="invalid-feedback">{errors.phonenumber}</div>
              )}
            </div>
            <button type="submit" className="btn btn-primary m-1">
              {params.id ? "Edit Member" : "Add Member"}
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="btn btn-danger m-1"
            >
              {params.id ? "Cancel Edit" : "Cancel Add"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default MemberForm;
