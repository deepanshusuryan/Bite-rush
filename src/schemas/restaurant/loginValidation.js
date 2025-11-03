import * as Yup from "yup";

const loginValidation = Yup.object().shape({
    email: Yup.string().email("Please enter valid email").required("Email is required"),
    password:Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .test("has-upper", "Password must contain at least one uppercase letter", value => /[A-Z]/.test(value || ""))
        .test("has-lower", "Password must contain at least one lowercase letter", value => /[a-z]/.test(value || ""))
        .test("has-number", "Password must contain at least one number", value => /\d/.test(value || ""))
        .test("has-special", "Password must contain at least one special character", value => /[@$!%*?&]/.test(value || ""))
        .test("no-spaces", "Password cannot contain spaces", value => !/\s/.test(value || ""))
})
export default loginValidation;