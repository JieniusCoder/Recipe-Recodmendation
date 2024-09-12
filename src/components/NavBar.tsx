import './NavBar.css';

interface NavBarProps {
  onNavigate: (screen: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ onNavigate }) => {
  return (
    <nav className="navbar">
      <ul>
        <li >
          <button onClick={() => onNavigate("about")}>
            About
          </button>
        </li>
        <li>
          <button onClick={() => onNavigate("upload")}>
            Upload
          </button>
        </li>
        <li>
          <button onClick={() => onNavigate("reports")}>
            Recipes
          </button>
        </li>
        <li>
          <button onClick={() => onNavigate("contact")}>
            Contact
          </button>
        </li>

      </ul>
    </nav>
  );
};

export default NavBar;
