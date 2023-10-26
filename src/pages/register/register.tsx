import { useFormik } from "formik";
import * as Y from "yup";
import './register-style.scss'
import { useNavigate } from "react-router-dom";
import { signup } from "../../services/user.service";

const registerSchema = Y.object({
  email: Y.string()
    .email()
    .required("Bắt buộc nhập vào email")
    .email("email không hợp lệ"),
  userName: Y.string()
    .min(5, "User name phải lớn hơn 5 ký tự.")
    .max(20, "User name phải nhỏ hơn 20 ký tự.")
    .required("Bắt buộc nhập vào user name."),
  password: Y.string()
    .min(5, "Password phải lớn hơn 5 ký tự.")
    .max(20, "Password phải nhỏ hơn 20 ký tự.")
    .required("Bắt buộc nhập vào password."),
  confirmPassword: Y.string()
    .oneOf([Y.ref("password")], "Confirm password must match")
    .required("Bắt buộc nhập vào confirm password."),
});

export type TParamsRegister = {
  email: string | undefined;
  password: string | undefined;
  name: string | undefined;
};

function Register() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
      confirmPassword: "",
      email: "",
    },

    validationSchema: registerSchema,

    onSubmit: (value) => {
      const data: TParamsRegister = {
        email: value.email,
        password: value.password,
        name: value.userName,
      };

      signup(data)
        .then((resp) => {
          alert("Bạn đã đăng ký tài khoản thành công!");
          navigate("/");
        })
        .catch(() => {
          alert("error");
        });
    },
  });

  return (

<form onSubmit={formik.handleSubmit}>
      <div className="section">
        <div className="img-bg">
          <div className='box-img'></div>
        </div>
        <div className="noi-dung">
          <div className="form">
            <h2>Trang Đăng Ký</h2>
            <div>
              <div className="input-form">
                <span>Tên Người Dùng</span>
                <input
                className="user-name"
                placeholder="User name"
                {...formik.getFieldProps("userName")}
              />
              {formik.touched.userName && formik.errors.userName && (
                <p className="text-danger">{formik.errors.userName}</p>
              )}
              </div>
              <div className="input-form">
                <span>Email</span>
                <input
                className="email"
                placeholder="Email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-danger">{formik.errors.email}</p>
              )}
              </div>
              <div className="input-form">
                <span>Mật Khẩu</span>
                <input
                className="password"
                placeholder="Password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-danger">{formik.errors.password}</p>
              )}
              </div>

              <div className="input-form">
                <span>Nhập Lại Mật Khẩu</span>
                <input
                className="confirm-password"
                placeholder="Confirm Password"
                {...formik.getFieldProps("confirmPassword")}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <p className="text-danger">{formik.errors.confirmPassword}</p>
              )}
              </div>

              <div className="input-form">
              <button type="submit" className='btn btn-primary mt-5'>
                  SIGN UP
              </button>
              </div>
            </div>
          </div>
        </div>
        </div>
</form>
  );
}

export default Register;
