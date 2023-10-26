import { useFormik } from "formik";
import * as Y from "yup";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../services/user.service";
import { setLocalStorage } from "../../utils";
import { ACCESS_TOKEN, EMAIL } from "../../constants";
import './login-style.scss';

const loginSchema = Y.object({
  email: Y.string()
    .email()
    .required("Bắt buộc nhập vào email")
    .email("email không hợp lệ"),
  password: Y.string()
    .min(5, "Password phải lớn hơn 5 ký tự.")
    .max(20, "Password phải nhỏ hơn 20 ký tự.")
    .required("Bắt buộc nhập vào password."),
});

export type TParamsLogin = {
  email: string | undefined;
  password: string | undefined;
};

function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },

    validationSchema: loginSchema,

    onSubmit: function (values) {
      const data: TParamsLogin = {
        email: values.email,
        password: values.password,
      };
      userLogin(data)
        .then((response) => {
          setLocalStorage(ACCESS_TOKEN, response.content.accessToken);
          setLocalStorage(EMAIL, data.email);
          navigate("/home");
        })
        .catch((error) => {
          console.error(error);
        });
    },
  });

  const handleRegisterClick = () => {
    // Đợi 1 giây trước khi chuyển hướng đến trang "Register"
    setTimeout(() => {
      window.location.href = '/register';
    }, 1000); // 1000 milliseconds = 1 giây
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="section">
        <div className="img-bg">
          <div className='box-img'></div>
        </div>
        <div className="noi-dung">
          <div className="form">
            <h2>Trang Đăng Nhập</h2>
            <div>
              <div className="input-form">
                <span>Email đăng nhập</span>
                <input
                  className='email'
                  placeholder="Email đăng nhập"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-danger">{formik.errors.email}</p>
                )}
              </div>

              <div className="input-form">
                <span>Mật khẩu</span>
                <input
                  className='password'
                  placeholder="Nhập Mật Khẩu"
                  type="password" // Thêm type để ẩn mật khẩu
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-danger">{formik.errors.password}</p>
                )}
              </div>
              <div className="nho-dang-nhap">
                <label>
                  <input type="checkbox" placeholder="Nhập Lại Mật Khẩu" /> Nhớ Đăng Nhập
                </label>
              </div>
              <div className="input-form">
                <button className='btn btn-primary mt-5' type="submit">
                  Login
                </button>
              </div>
              <div className="input-form text-content">
                <p>Don’t have an account? <a style={{
                  textDecoration: 'underline',
                  cursor: 'pointer'
                }} onClick={handleRegisterClick}>Register</a> </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default Login;
