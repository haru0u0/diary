/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function NavbarItem(props) {
  return (
    <Link to={props.path}>
      <div className="text-center lg:flex lg:items-center lg:justify-end">
        <div className="flex justify-center lg:inline-block">
          <img src={props.img} className="object-contain h-12 w-12" />
        </div>
        {props.label}
      </div>
    </Link>
  );
}

export default NavbarItem;
