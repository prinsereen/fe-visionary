import Navbar from "../components/Navbar";

const Social = () => {
    return (
        <div className="w-full h-full flex bg-black">
            <Navbar />
            <div className="bg-black w-full h-full text-white p-12 pl-40 gap-16 flex flex-col items-center">
                <div className="flex ">
                    <input
                        className="rounded-[50px] bg-[#D9D9D9]  text-black text-[20px] placeholder-[#939FB1] py-3 px-10 pl-24 w-[700px]"
                        placeholder="Cari Film, Series, atau lainnya"
                    />
                    halo
                </div>
                <div className="flex flex-wrap justify-center gap-8 w-[80%] ">
                    halo
                </div>
            </div>
        </div>
    )
}

export default Social