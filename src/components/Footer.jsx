import github_icon from "../../public/assets/github.svg";
import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inside">
        <p>© {year} Berlin Open Data Map</p>
        <div className="footer__inside__right">
          <p>
            Developed by{" "}
            <a href="http://www.nestoririondo.com">Néstor Iriondo</a>
          </p>
          <a href="https://github.com/nestoririondo/berlin-open-data-map">
            <img className="github-icon" src={github_icon} alt="github icon" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
