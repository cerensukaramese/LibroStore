import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    addres: "",
  });
  const navigate = useNavigate();

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
      const { username, email, password, addres } = values;
      if (!username || !email || !password || !addres) {
        alert("Bütün alanları doldurun.");
        return;
      }
      const response = await axios.post("/api/v1/register", values);
      console.log(response.data);
      navigate("/login");
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
    <div className="h-screen bg-purple-400 px-12 py-8 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-purple-500 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6"
      >
        <p className="text-pink-100 text-center font-semibold text-xl">Kayıt ol</p>
        <div className="mt-4">
          <div>
            <label className="text-pink-100">Username</label>
            <input
              type="text"
              className="w-full mt-2 bg-purple-600 text-pink-100 p-2 outline-none"
              placeholder="username"
              name="username"
              value={values.username}
              onChange={handleChange}
            />
          </div>
          <div className="mt-4">
            <label className="text-pink-100">Email</label>
            <input
              type="email"
              className="w-full mt-2 bg-purple-600 text-pink-100 p-2 outline-none"
              placeholder="xyz@example.com"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
          </div>
          <div className="mt-4">
            <label className="text-pink-100">Şifre</label>
            <input
              type="password"
              className="w-full mt-2 bg-purple-600 text-pink-100 p-2 outline-none"
              placeholder="password"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
          </div>
          <div className="mt-4">
            <label className="text-pink-100">Adres</label>
            <textarea
              className="w-full mt-2 bg-purple-600 text-pink-100 p-2 outline-none"
              placeholder="Your address"
              rows={5}
              name="addres"
              value={values.addres}
              onChange={handleChange}
            />
          </div>
          <div className="mt-6 flex flex-col items">
            <button
              type="submit"
              className="bg-purple-700 text-pink-100 px-4 py-2 rounded-lg hover:bg-purple-800 transition-colors"
            >
              Kayıt Ol
            </button>
            <p className="text-pink-100 text-xl p-2 text-center">veya</p>
            <p className="text-pink-100 text-xl text-center">
              Zaten bir hesabınız var mı?{" "}
              <span
                className="text-blue-300 hover:underline cursor-pointer"
                onClick={() => navigate('/login')}
              >
                Giriş Yap
              </span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
