import "./header.css";

const Header = () => {
  return (
    <div className="hr">
      <div className="hr-titles">
        <span className="hr-title-sm">Just blog it.</span>
        <span className="hr-title-lg">Blaug</span>
      </div>
      <img
        src="https://images.pexels.com/photos/2356059/pexels-photo-2356059.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        alt=""
        className="hr-img"
      />
    </div>
  );
};

export default Header;
