// eslint-disable-next-line react/prop-types
const Card = ({ name }) => {
  return (
    <div className="relative w-64 h-full group  scrollbar-hide">
      <img src={name} className="w-64 h-[400px] object-cover  object-top " />
      <div className="absolute bg-gradient-to-t p-2 from-black bottom-0 flex flex-col justify-start w-full opacity-0 group-hover:opacity-100 transition-opacity">
        <h1>Title</h1>
        <h1>Genre</h1>
        <div className="flex justify-between">
          <h1>rating</h1>
          <h1>duration</h1>
        </div>
      </div>
    </div>
  );
};

export default Card;
