import * as Yup from "yup";

const signupValidation = Yup.object().shape({
    restaurantName: Yup.string().required("Restaurant name is required").max(80, "Restaurent name should be less than 80 characters"),
    ownerName: Yup.string().required("Restaurant owner name is required").max(50, "Owner name should be less than 50 characters"),
    email: Yup.string().email("Please enter valid email").required("Email is required"),
    contactNumber: Yup.string().matches(/^[0-9]{10}$/, "Enter a valid 10-digit contact number").required("Contact number is required"),
    restaurantAddress: Yup.string().required("Restaurant address is required").min(10, "Address is too  short").max(500, "Address is too long"),
    password:Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .test("has-upper", "Password must contain at least one uppercase letter", value => /[A-Z]/.test(value || ""))
        .test("has-lower", "Password must contain at least one lowercase letter", value => /[a-z]/.test(value || ""))
        .test("has-number", "Password must contain at least one number", value => /\d/.test(value || ""))
        .test("has-special", "Password must contain at least one special character", value => /[@$!%*?&]/.test(value || ""))
        .test("no-spaces", "Password cannot contain spaces", value => !/\s/.test(value || "")),
    confirmPassword:Yup
        .string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
})
export default signupValidation;