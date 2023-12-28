import Navbar from "../../components/Navbar";
import Head from "./Head";
import CardSection from "./CardSection";


const Home = () => {



  return (
    <div className="h-full w-full flex flex-col scrollbar-hide ">
      <Navbar />
      <Head />
      <CardSection />
    </div>
  );
};

export default Home;
