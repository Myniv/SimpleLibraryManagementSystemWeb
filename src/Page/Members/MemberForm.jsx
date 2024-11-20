/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import LoadingAddEdit from "../../Component/Elements/LoadingAddEdit";
import MemberService from "../../service/member/MemberService";

const MemberForm = () => {
  const { member } = useOutletContext();

  const [onSubmit, setOnSubmit] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const [formData, setFormData] = useState({
    userId: "",
    fName: "",
    lName: "",
    userPosition: "",
    userPrivilage: "",
    userNotes: "",
    libraryCardNumber: "",
    libraryCardExpiredDate: "",
  });

  const focusNameInput = useRef(null);

  useEffect(() => {
    if (params.id) {
      const getMember = member.find(
        (m) => Number(m.userId) === Number(params.id)
      );
      if (getMember) {
        setFormData(getMember);
      } else {
        console.warn(`No member found with ID: ${params.id}`);
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
    MemberService.createUser(formData)
      .then(() => {
        LoadingAddEdit({
          loadingMessage: "The new project is being added...",
          nextPage: () => navigate("/members"),
        });
      })
      .catch((err) => console.log(err));
  };

  const onUpdateMember = () => {
    MemberService.updateUser(params.id, formData)
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
      userId: "",
      fName: "",
      lName: "",
      userPosition: "",
      userPrivilage: "",
      userNotes: "",
      libraryCardNumber: "",
      libraryCardExpiredDate: "",
    });
    navigate("/members");
  };

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
              <label htmlFor="userId" className="form-label">
                ID
              </label>
              <input
                type="number"
                className="form-control"
                id="userId"
                name="userId"
                value={formData.userId}
                placeholder={memberId}
                disabled
              />
            </div>
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
              <label htmlFor="userPosition" className="form-label">
                User Position
              </label>
              <input
                type="text"
                id="userPosition"
                name="userPosition"
                className={`form-control ${
                  errors.username ? "is-invalid" : ""
                }`}
                value={formData.userPosition}
                onChange={handleChange}
                required
                placeholder="User Position"
              />
              {errors.username && (
                <div className="invalid-feedback">{errors.username}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="userPrivilage" className="form-label">
                User Privilage
              </label>
              <input
                type="text"
                id="userPrivilage"
                name="userPrivilage"
                className={`form-control ${
                  errors.username ? "is-invalid" : ""
                }`}
                value={formData.userPrivilage}
                onChange={handleChange}
                required
                placeholder="User Position"
              />
              {errors.username && (
                <div className="invalid-feedback">{errors.username}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="userNotes" className="form-label">
                User Notes
              </label>
              <input
                type="text"
                id="userNotes"
                name="userNotes"
                className={`form-control ${
                  errors.username ? "is-invalid" : ""
                }`}
                value={formData.userNotes}
                onChange={handleChange}
                required
                placeholder="User Notes"
              />
              {errors.username && (
                <div className="invalid-feedback">{errors.username}</div>
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
