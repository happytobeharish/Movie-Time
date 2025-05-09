import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="flex border space-x-8 items-centre pl-3 py-4">
      <img
        className="w-[50px]"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8QjdKRlguQiYU5tnGUx1DXb6NAkCRbmJRBw&s"
        alt=""
      />

      <Link to="/" className="text-blue-500 text-3xl font-bold">
        Movies
      </Link>
      <Link to="/watchlist" className="text-blue-500 text-3xl font-bold">
        Watchlist
      </Link>
    </div>
  );
};
