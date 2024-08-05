import NavbarItem from "./NavbarItem";

function Navbar() {
  return (
    <div className="fixed bottom-0 w-full">
      <div className="font-vt flex justify-around">
        <NavbarItem
          path="/wordbank"
          img="../public/images/book.png"
          label="Word Bank"
        />
        <NavbarItem
          path="/calendar"
          img="../public/images/calendar.png"
          label="Calendar"
        />
        <NavbarItem path="/new" img="../public/images/pen.png" label="New" />
        <NavbarItem
          path="/collection"
          img="../public/images/collection.png"
          label="Collection"
        />
        <NavbarItem
          path="/setting"
          img="../public/images/setting.png"
          label="Setting"
        />
      </div>
    </div>
  );
}

export default Navbar;
