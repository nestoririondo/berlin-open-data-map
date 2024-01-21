import "./SideBar.css";

const handleCollapse = () => {
  const sidebar = document.querySelector(".sidebar__inside__content");
  sidebar.classList.toggle("collapsed");
};

const SideBar = ({ isLoading }) => {
  return (
    <div className="sidebar">
      {isLoading && <h2>Loading...</h2>}
      {!isLoading && (
        <div className="sidebar__inside">
          <div className="sidebar__inside__hamburger">
            <button
              class="nav-toggle"
              aria-expanded="false"
              aria-controls="menu"
              onClick={handleCollapse}
            >
              <span aria-hidden="true">☰</span>
            </button>
          </div>
          <div className="sidebar__inside__content">
            <h2>Berlin Open Data Map</h2>
            <p>
              This web app displays a map of Berlin with markers for organizations
              that accept reusable goods to distribute to those in need. The data
              is currently fetched from the{" "}
              <a href="https://daten.berlin.de/datensaetze/verschenken-statt-wegwerfen">
                Verschenken statt Wegwerfen database
              </a>{" "}
              and the locations are geocoded using the Google Geocoding API.
              More data sources will be added in the future.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
