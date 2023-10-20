import { account1, account2 } from "../assets"
import Navbar from "../components/Navbar"

const Profile = () => {
    return (
        <div className="w-full min-h-screen flex bg-black">
            <Navbar />
            <div className="bg-black w-[100vw] text-white p-12 pl-40 gap-2 flex flex-col">
                {/* <div className="bg-black w-full h-full text-white p-12 pl-40 gap-16 flex flex-col items-center"> */}
                <h1 className="text-[36px] font-bold mb-10">Akun</h1>
                <div className="flex gap-10 mb-24">
                    <div className="flex flex-col items-center justify-start">
                        <img src={account1} alt="" className=" mb-4"/>
                        <p>Audeyy</p>
                    </div>
                    <div className="flex flex-col items-center justify-start">
                        <img src={account2} alt="" className=" mb-4"/>
                        <p className="text-primary">Ernnnn</p>
                    </div>
                </div>
                <div>
                    <h1 className="text-[36px] font-bold mb-10">Berlangganan</h1>
                    <div className="relative flex items-center justify-center py-5 bg- rounded border border-primary w-1/3">
                        <div className="absolute bg-primary opacity-40 w-full h-full"></div>
                        <p className="text-24 font-bold z-10">Paket Basic</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile