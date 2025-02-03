import Logo from "../assets/logo.png";
import AccountCircle from "/AccountCircle.png";
import Switch from "./Switch";
import { FC, useState } from "react";

/**
 * Header: Functional component that displays application logo and title.
 * @returns A JSX element representing header of the application
 */
const Header: FC = () => {
  const [isDark, setIsDark] = useState<boolean>(false);

  const toggleDark = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <header className="flex justify-between items-center bg-dark-bg-secondary px-4 py-2">
      <div className="flex items-center justify-between gap-2">
        <img className="w-8" src={Logo} alt="Streamify" />
        <h1 className="text-2xl font-bold">Streamify</h1>
      </div>
      <div className="flex justify-between items-center gap-2">
        <Switch isOn={isDark} onClick={toggleDark} />
        <button>
          <img className="w-10" src={AccountCircle} alt="" />
        </button>
      </div>
    </header>
  );
};

export default Header;
