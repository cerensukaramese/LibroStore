import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { username, password } = values;
      if (!username || !password ) {
        alert("Bütün alanları doldurun.");
        return;
      }
      const response = await axios.post("/api/v1/login", values);
      dispatch(authActions.login());
      dispatch(authActions.changeRole(response.data.role));
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role)
      console.log(response)
      navigate("/profile");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || "An Axios error occurred.");
      } else if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred.");
      }
    }
  };

  return (
    <div className="h-screen bg-purple-400 px-12 py-8 flex flex-col items-center justify-center">
    <form 
     onSubmit={handleSubmit}
      className="bg-purple-500 rounded-lg px-8 py-5 w-full flex-col md:w-3/6 lg:w-2/6">
      <p className="text-pink-100 text-center font-semibold text-xl">Giriş yap</p>
      <div className="mt-4">
        <div>
          <label htmlFor="username" className="text-pink-100">
            Username
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-purple-600 text-pink-100 p-2 outline-none"
            placeholder="username"
            name="username"
            required
            value={values.username}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="password" className="text-pink-100">
            Şifre
          </label>
          <input
            type="password"
            className="w-full mt-2 bg-purple-600 text-pink-100 p-2 outline-none"
            placeholder="password"
            name="password"
            required
            value={values.password}
            onChange={handleChange}
          />
        </div>
        <div className="mt-6 flex flex-col items-center">
          <button
            type="submit"
            className="bg-purple-700 font-semibold text-pink-100 mt-3 px-6 py-3 rounded-lg hover:bg-purple-800 transition-colors"
          >
            Giriş yap
          </button>
      </div>
      </div>
    </form>
  </div>
  )
}

export default Login