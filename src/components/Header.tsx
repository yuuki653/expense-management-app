import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="bg-gray-100 mb-5 py-5 shadow-lg">
        <div className="w-[90%] mx-auto text-center">
          <h1 className="text-xl font-bold mb-4">💰 Expense Management</h1>
        </div>

        <div className="w-[90%] mx-auto flex justify-center gap-3">
          <Link
            to="/"
            className="flex items-center bg-gray-100 border border-blue-500 hover:bg-blue-500 hover:text-gray-100 rounded-md px-1 transition-colors"
          >
            <span>record</span>
          </Link>
          <Link
            to="/calendar"
            className="flex items-center bg-gray-100 border border-blue-500 hover:bg-blue-500 hover:text-gray-100 rounded-md px-1 transition-colors"
          >
            <span>5week</span>
          </Link>
          <Link
            to="/report"
            className="flex items-center bg-gray-100 border border-blue-500 hover:bg-blue-500 hover:text-gray-100 rounded-md px-1 transition-colors"
          >
            <span>1week</span>
          </Link>
          <Link
            to="/chart"
            className="flex items-center bg-gray-100 border border-blue-500 hover:bg-blue-500 hover:text-gray-100 rounded-md px-1 transition-colors"
          >
            <span>chart</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
