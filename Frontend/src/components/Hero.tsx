import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="h-[75vh] flex flex-col md:flex-row irems-center justify-center">
      <div className="w-full mb-12 md:mb-0 lg:w-3/6 flex flex-col items-center lg:items-start justify-center">
        <h1 className="text-4xl lg:text-6xl font-semibold text-pink-100 text-center lg:text-left">
          Yeni Kitabını Seç ve Oku
        </h1>
        <p className="mt-4 text-xl text-white text-center lg:text-left">
          İstediğin türde bir kitap seç ve kendini geliştir.
        </p>
        <div className="mt-8 ">
          <Link to="/all-books" className="text-pink-100 text-xl lg:text-2xl font-semibold border border-pink-100 px-10 py-3 hover:bg-purple-500 rounded-full">
            Kitapları Keşfet
          </Link>
        </div>
      </div>
      <div className="w-full lg:w-3/6 hidden lg:flex items-center justify-center">
        <img
          src="src/assets/modern-book-concept.svg"
          alt=""
          className="w-4/5 h-auto animate-float"
        />
      </div>
    </div>
  );
};

export default Hero;
