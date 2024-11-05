import { useEffect, useRef, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

const MemberForm = () => {
  const { member, setMember, isEditing, setIsEditing, selectedMember } =
    useOutletContext();

  const navigate = useNavigate();

  const params = useParams();

  const [formData, setFormData] = useState({
    id: "",
    fullname: "",
    email: "",
    phonenumber: "",
    address: "",
  });

  const focusNameInput = useRef(null);

  useEffect(() => {
    if (isEditing && selectedMember) {
      setFormData(selectedMember);
    }

    if (focusNameInput.current) {
      focusNameInput.current.focus();
    }
  }, [isEditing, selectedMember]);

  const onAddMember = () => {
    const newMemberId = {
      ...formData,
      id: member.length > 0 ? member[member.length - 1].id + 1 : 1,
    };

    const newMember = [...member, newMemberId];

    localStorage.setItem("member", JSON.stringify(newMember));
    navigate("/members");

    setMember(newMember);

    alert("New member has been added!!");
  };

  const onUpdateMember = () => {
    const editingMember = member.map((member) => {
      if (member.id === formData.id) {
        return {
          ...member,
          ...formData,
        };
      } else {
        return member;
      }
    });

    setMember(editingMember);
    localStorage.setItem("member", JSON.stringify(editingMember));
    navigate("/members");

    alert("This Member has been Editted!!");
  };

  const onCancel = () => {
    setFormData({
      id: "",
      fullname: "",
      email: "",
      phonenumber: "",
      address: "",
    });
    setIsEditing(false);

    navigate("/members");
  };

  const [errors, setErrors] = useState({});
  const validateForm = () => {
    const newErrors = {};
    if (
      !formData.fullname ||
      formData.fullname.length < 2 ||
      formData.fullname.length > 100
    ) {
      newErrors.fullname = "Name must be between 2 and 100 characters";
    }

    //email validation like this
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Email must be a valid email format";
    }

    //Phone validation like this
    //Still doesnt work, idk
    const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
    if (
      !formData.phonenumber ||
      (formData.phonenumber && !phoneRegex.test(formData.phonenumber))
    ) {
      newErrors.phonenumber = "Phone number must be between 10 and 15 digits";
    }

    if (!formData.address || formData.address.length > 200) {
      newErrors.address = "Address must not exceed 200 characters";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(() => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validatonErrors = validateForm();
    if (Object.keys(validatonErrors).length === 0) {
      if (isEditing === true) {
        onUpdateMember();
        setIsEditing(false);
      } else {
        onAddMember();
      }

      setFormData({
        id: "",
        fullname: "",
        email: "",
        phonenumber: "",
        address: "",
      });
      setErrors({});

      //Todo navigate("/members");
    } else {
      setErrors(validatonErrors);
    }
  };

  const memberId = member.length > 0 ? member[member.length - 1].id + 1 : 1;

  return (
    <>
      <div className="mb-5">
        <h2 className="ms-5">
          {isEditing
            ? "Form Edit Member with id" + params.id
            : "Form Add Member"}
        </h2>
        <div className="container border">
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="id" className="form-label">
                    ID
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="id"
                    name="id"
                    value={formData.id}
                    placeholder={memberId}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="fullname"
                    name="fullname"
                    className={`form-control ${
                      errors.fullname ? "is-invalid" : ""
                    }`}
                    value={formData.fullname}
                    onChange={handleChange}
                    required
                    placeholder="Full Name"
                    ref={focusNameInput}
                  />
                  {/* If name error, show <div> */}
                  {/* This is the same as the rest*/}
                  {errors.fullname && (
                    <div className="invalid-feedback">{errors.fullname}</div>
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
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Email"
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
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
                    placeholder="Phone Number"
                  />
                  {errors.phonenumber && (
                    <div className="invalid-feedback">{errors.phonenumber}</div>
                  )}
                </div>

                <div className="mb-1">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    className={`form-control ${
                      errors.address ? "is-invalid" : ""
                    }`}
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="Address"
                  />
                  {errors.address && (
                    <div className="invalid-feedback">{errors.address}</div>
                  )}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary m-1 right text-right"
            >
              {isEditing ? "Edit Member" : "Add Member"}
            </button>

            <button
              type="submit"
              onClick={onCancel}
              className="btn btn-danger right text-right"
            >
              {isEditing ? "Cancel Edit" : "Cancel Add"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default MemberForm;
