import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../../Contexts/authContext";
import * as Yup from "yup";
import { useFormik } from "formik";
import ApiManager from "../../Utilies/ApiManager";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import Heading from "../../Components/Ui/Heading/Heading";
import FloatingInput from "../../Components/Ui/FloatingInput/FloatingInput";
import SelectElement from "../../Components/Ui/SelectElement/SelectElement";

const Profile = () => {
    const [responseFlag, setResponseFlag] = useState(false);
    const [passwordChangeFlag, setPasswordChangeFlag] = useState(false);
    const { user, token, setUser } = useContext(authContext);
    const [loadingImageUpdate, setLoadingImageUpdate] = useState(false);
    const [profileImage, setProfileImage] = useState(
        user?.image ? user.image : null
    );

    // Profile form validation schema
    const profileValidationSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(3, "Must be 3 characters or more")
            .required("Required"),
        lastName: Yup.string()
            .min(3, "Must be 3 characters or more")
            .required("Required"),
        phone: Yup.string()
            .matches(/^[0-9]+$/, "Phone number is not valid")
            .required("Required"),
        birthDate: Yup.date().required("Required"),
        gender: Yup.string().required("Required"),
        address: Yup.string().required("Required"),
    });

    // Password form validation schema
    const passwordValidationSchema = Yup.object().shape({
        currentPassword: Yup.string().required("Current password is required"),
        newPassword: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("New password is required"),
        confirmNewPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
            .required("Please confirm your new password"),
    });

    // Initialize profile form values
    useEffect(() => {
        if (user) {
            profileFormik.setValues({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                phone: user.phoneNumber?.replace(/^\+\d+\s/, "") || "",
                birthDate: user.birthDate || "",
                gender: user.gender === "male" ? "true" : "false",
                address: user.address || "",
            });
        }
    }, [user]);

    // Profile update function
    const updateProfile = async (values) => {
        setResponseFlag(true);
        try {
            const userData = JSON.stringify({
                firstName: values.firstName,
                lastName: values.lastName,
                phone: values.phone,
                address: values.address,
                birthDate: values.birthDate,
                gender: values.gender === "true",
            });

            const response = await ApiManager.updateProfile(userData, token);
            const res = response.data;

            if (res.code === 200) {
                setUser(res.profile);
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Profile updated successfully",
                    confirmButtonText: "Ok",
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: res.errors?.[0] || "Failed to update profile",
                });
            }
        } catch (error) {
            console.error("Update error:", error);
            const data = error.response?.data;
            Swal.fire({
                icon: "error",
                title: "Error",
                text: data?.errors?.[0] || "Something went wrong, please try again later",
            });
        } finally {
            setResponseFlag(false);
        }
    };

    // Password update function
    const updatePassword = async (values) => {
        setPasswordChangeFlag(true);
        try {
            const passwordData = JSON.stringify({
                currentPassword: values.currentPassword,
                newPassword: values.newPassword,
            });

            const response = await ApiManager.updatePassword(passwordData, token);
            const res = response.data;

            if (res.code === 200) {
                passwordFormik.resetForm();
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Password updated successfully",
                    confirmButtonText: "Ok",
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: res.errors?.[0] || "Failed to update password",
                });
            }
        } catch (error) {
            console.error("Password update error:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Something went wrong, please try again later",
            });
        } finally {
            setPasswordChangeFlag(false);
        }
    };

    // Image upload validation
    function validateImage(file) {
        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        const sizeLimit = 5 * 1024 * 1024;
        if (!file) return false;
        if (!allowedTypes.includes(file.type)) {
            Swal.fire({
                icon: "error",
                title: "Invalid file type. Only JPEG, PNG, and GIF are allowed.",
            });
            return false;
        }
        if (file.size > sizeLimit) {
            Swal.fire({
                icon: "error",
                title: "File size exceeds the 5MB limit.",
            });
            return false;
        }
        return true;
    }

    // Image upload function
    const uploadImage = async (file) => {
        if (validateImage(file)) {
            setLoadingImageUpdate(true);
            try {
                const { data } = await ApiManager.updateImage(token, file);
                if (data?.code === 200) {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => setProfileImage(reader.result);
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Image changed successfully",
                        confirmButtonText: "Ok",
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    text: "Something went wrong, please try again later",
                });
            } finally {
                setLoadingImageUpdate(false);
            }
        }
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        await uploadImage(file);
    };

    // Profile formik
    const profileFormik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            phone: "",
            birthDate: "",
            gender: "true",
            address: "",
        },
        validationSchema: profileValidationSchema,
        onSubmit: updateProfile,
    });

    // Password formik
    const passwordFormik = useFormik({
        initialValues: {
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        },
        validationSchema: passwordValidationSchema,
        onSubmit: updatePassword,
    });

    return (
        <div className="min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
            <Heading heading={"Profile"} />

            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-9">
                        {/* Personal Information Section */}
                        <div className="card shadow-sm mb-4">
                            <div className="card-body p-4">
                                <h5 className="card-title text-danger fw-bold mb-4">Personal Information</h5>

                                <form onSubmit={profileFormik.handleSubmit}>
                                    <div className="row">
                                        {/* Profile Image */}
                                        <div className="col-12 text-center mb-4">
                                            <div
                                                className="position-relative d-inline-block"
                                                style={{
                                                    width: '120px',
                                                    height: '120px',
                                                    borderRadius: '50%',
                                                    overflow: 'hidden',
                                                    backgroundColor: '#e9ecef',
                                                    border: '3px solid #dee2e6'
                                                }}
                                            >
                                                {loadingImageUpdate ? (
                                                    <div className="d-flex align-items-center justify-content-center h-100">
                                                        <div className="spinner-border text-warning" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        {profileImage ? (
                                                            <img
                                                                src={profileImage}
                                                                alt="Profile"
                                                                className="w-100 h-100 object-fit-cover"
                                                            />
                                                        ) : (
                                                            <div className="d-flex align-items-center justify-content-center h-100">
                                                                <i className="fas fa-user fa-3x text-muted"></i>
                                                            </div>
                                                        )}
                                                        <div
                                                            className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center opacity-0"
                                                            style={{
                                                                transition: 'opacity 0.3s',
                                                                cursor: 'pointer'
                                                            }}
                                                            onMouseEnter={(e) => e.target.style.opacity = '1'}
                                                            onMouseLeave={(e) => e.target.style.opacity = '0'}
                                                        >
                                                            <i className="fas fa-camera text-white fa-2x"></i>
                                                        </div>
                                                        <input
                                                            type="file"
                                                            className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
                                                            style={{ cursor: 'pointer' }}
                                                            accept="image/*"
                                                            onChange={handleFileChange}
                                                        />
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {/* First Name */}
                                        <div className="col-md-6 mb-3">
                                            <FloatingInput
                                                inputType="text"
                                                inputName="firstName"
                                                inputText="First Name"
                                                defaultValue={profileFormik.values.firstName}
                                                icon="fa-user"
                                                onChange={profileFormik.handleChange}
                                                error={profileFormik.errors.firstName}
                                                touched={profileFormik.touched.firstName}
                                                idx={0}
                                            />
                                        </div>

                                        {/* Last Name */}
                                        <div className="col-md-6 mb-3">
                                            <FloatingInput
                                                inputType="text"
                                                inputName="lastName"
                                                inputText="Last Name"
                                                defaultValue={profileFormik.values.lastName}
                                                icon="fa-user"
                                                onChange={profileFormik.handleChange}
                                                error={profileFormik.errors.lastName}
                                                touched={profileFormik.touched.lastName}
                                                idx={1}
                                            />
                                        </div>

                                        {/* Email (Read Only) */}
                                        <div className="col-md-6 mb-3">
                                            <FloatingInput
                                                inputType="email"
                                                inputName="email"
                                                inputText="Email"
                                                defaultValue={user?.email || ""}
                                                icon="fa-envelope"
                                                disabled={true}
                                                idx={2}
                                            />
                                        </div>

                                        {/* Phone */}
                                        <div className="col-md-6 mb-3">
                                            <FloatingInput
                                                inputType="tel"
                                                inputName="phone"
                                                inputText="Phone"
                                                defaultValue={profileFormik.values.phone}
                                                icon="fa-phone"
                                                onChange={profileFormik.handleChange}
                                                error={profileFormik.errors.phone}
                                                touched={profileFormik.touched.phone}
                                                idx={3}
                                            />
                                        </div>

                                        {/* Date of Birth */}
                                        <div className="col-md-6 mb-3">
                                            <FloatingInput
                                                inputType="date"
                                                inputName="birthDate"
                                                inputText="Date of Birth"
                                                defaultValue={profileFormik.values.birthDate}
                                                icon="fa-calendar"
                                                onChange={profileFormik.handleChange}
                                                error={profileFormik.errors.birthDate}
                                                touched={profileFormik.touched.birthDate}
                                                idx={4}
                                            />
                                        </div>

                                        {/* Gender - Custom select field */}
                                        <div className="col-md-6 mb-3">

                                            <SelectElement
                                                idx={5}
                                                myFormik={profileFormik}
                                                selectName="gender"
                                                selectTransition="Gender"
                                                options={[
                                                    {
                                                        key: "Male",
                                                        value: "M",
                                                    },
                                                    {
                                                        key: "Female",
                                                        value: "F",
                                                    },
                                                ]}
                                                icon="fa-children"

                                            />
                                        </div>

                                        {/* Address */}
                                        <div className="col-12 mb-4">
                                            <FloatingInput
                                                inputType="text"
                                                inputName="address"
                                                inputText="Address"
                                                defaultValue={profileFormik.values.address}
                                                icon="fa-map-marker-alt"
                                                onChange={profileFormik.handleChange}
                                                error={profileFormik.errors.address}
                                                touched={profileFormik.touched.address}
                                                idx={6}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Update Password Section */}
                        <div className="card shadow-sm mb-4">
                            <div className="card-body p-4">
                                <h5 className="card-title text-danger fw-bold mb-4">Update Password</h5>

                                <form onSubmit={passwordFormik.handleSubmit}>
                                    <div className="row">
                                        {/* Current Password */}
                                        <div className="col-12 mb-3">
                                            <FloatingInput
                                                inputType="password"
                                                inputName="currentPassword"
                                                inputText="Current Password"
                                                defaultValue={passwordFormik.values.currentPassword}
                                                icon="fa-lock"
                                                onChange={passwordFormik.handleChange}
                                                error={passwordFormik.errors.currentPassword}
                                                touched={passwordFormik.touched.currentPassword}
                                                idx={7}
                                            />
                                        </div>

                                        {/* New Password */}
                                        <div className="col-md-6 mb-3">
                                            <FloatingInput
                                                inputType="password"
                                                inputName="newPassword"
                                                inputText="New Password"
                                                defaultValue={passwordFormik.values.newPassword}
                                                icon="fa-key"
                                                onChange={passwordFormik.handleChange}
                                                error={passwordFormik.errors.newPassword}
                                                touched={passwordFormik.touched.newPassword}
                                                idx={8}
                                            />
                                        </div>

                                        {/* Confirm New Password */}
                                        <div className="col-md-6 mb-3">
                                            <FloatingInput
                                                inputType="password"
                                                inputName="confirmNewPassword"
                                                inputText="Confirm New Password"
                                                defaultValue={passwordFormik.values.confirmNewPassword}
                                                icon="fa-key"
                                                onChange={passwordFormik.handleChange}
                                                error={passwordFormik.errors.confirmNewPassword}
                                                touched={passwordFormik.touched.confirmNewPassword}
                                                idx={9}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Update Profile Button */}
                        <div className="text-center">
                            <motion.button
                                type="button"
                                onClick={profileFormik.handleSubmit}
                                disabled={responseFlag}
                                className="btn-web btn-web-primary btn-lg px-5 py-2 me-3"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {responseFlag ? (
                                    <div className="spinner-border text-light" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                ) : (
                                    "Update Profile"
                                )}
                            </motion.button>

                            <motion.button
                                type="button"
                                onClick={passwordFormik.handleSubmit}
                                disabled={passwordChangeFlag}
                                className="btn-web btn-web-outline-primary btn-lg px-5 py-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {passwordChangeFlag ? (
                                    <div className="spinner-border text-danger" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                ) : (
                                    "Update Password"
                                )}
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;