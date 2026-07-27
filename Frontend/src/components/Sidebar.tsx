import { FaArrowRightFromBracket } from "react-icons/fa6"
import { Link, useNavigate } from "react-router-dom"

const Sidebar = ({ profileData }: { profileData: any }) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");}
  return (
    
    <div className="bg-purple-700 text-pink-50 rounded flex flex-col justify-between items-between h-[85vh] p-11">
        <div className="flex items-center flex-col justify-center">
            {" "}
            <img src={profileData.avatar} alt="" className="rounded-full h-[10vh]"/>
            <p className="mt-3 text-xl text-pink-50 font-semibold">
            {profileData.username}
        </p>
        <p className="mt-1 text-normal text-pink-100">{profileData.email}</p>
        <div className="w-full mt-4 h-[1px] bg-purple-300 hidden lg:block"></div>
        </div>
        <div className="w-full flex-col items-center justify-center hidden lg:flex">
            <Link
            to="/profile"
            className="text-pink-100 font-semibold w-full py-2 text-center hover:bg-purple-500 rounded transition-all">
                Favori Kitaplar
            </Link>
            <Link
            to= "/profile/orderhistory"
            className="text-pink-100 font-semibold w-full py-2 mt-4 text-center hover:bg-purple-500 rounded transition-all">
                Sipariş Geçmişi
            </Link>
            <Link
            to="/profile/settings"
            className="text-pink-100 font-semibold w-full py-2 mt-4 text-center hover:bg-purple-500 rounded transition-all">
                Ayarlar
            </Link>
            <Link
            to="/profile/wishlist"
            className="text-pink-100 font-semibold w-full py-2 mt-4 text-center hover:bg-purple-500 rounded transition-all">
                İstek Listesi
            </Link>
        </div>
        <div className="flex justify-center items-center">
        <button className="bg-purple-700 w-3/6 lg:full mt-4 lg:mt-0 text-white font-semibold flex items-center justify-center py-2 rounded hover:bg-pink-50 hover:text-purple-500 transition-all duration-300"
        onClick={handleLogout}>
            
            Çıkış Yap <FaArrowRightFromBracket className="ms-4"/>
        </button>
        </div>

    </div>
  )
}

export default Sidebar