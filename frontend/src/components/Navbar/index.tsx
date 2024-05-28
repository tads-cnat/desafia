function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start"></div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">desafia</a>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <i className="fa-regular fa-bell"></i>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
