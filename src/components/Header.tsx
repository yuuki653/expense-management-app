import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="bg-gray-100 h-20 flex items-center mb-10">
        <div className="flex justify-between w-[90%] mx-auto">
          <div>
            <h1 className="text-xl">💰 Expense Management</h1>
          </div>
          <div className="flex gap-3">
            <Link
              to="/"
              className="bg-blue-300 hover:bg-blue-500 rounded-md px-1 flex items-center transition-colors"
            >
              <span>record</span>
            </Link>
            <Link
              to="/calendar"
              className="bg-blue-300 hover:bg-blue-500 rounded-md px-1 flex items-center transition-colors"
            >
              <span>calendar</span>
            </Link>
            <Link
              to="/report"
              className="bg-blue-300 hover:bg-blue-500 rounded-md px-1 flex items-center transition-colors"
            >
              <span>report</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
