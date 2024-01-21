import "./SideBar.css";

const SideBar = ({ isLoading }) => {
  return (
    <div className="sidebar">
      {isLoading && <h2>Loading...</h2>}
      {!isLoading && (
        <>
          <h2>Berlin Open Data Map</h2>
          <p>
            This project is a web application that displays a map of Berlin with
            markers for locations where items are being given away for free. The
            data is currently fetched from the{" "}
            <a href="https://daten.berlin.de/datensaetze/verschenken-statt-wegwerfen">
              Verschenken statt Wegwerfen database
            </a>{" "}
            and the locations are geocoded using the Google Geocoding API. More
            data sources will be added in the future.
          </p>
        </>
      )}
    </div>
  );
};

export default SideBar;
