import NavbarItem from "./NavbarItem";

function Navbar() {
  return (
    <div className="fixed bottom-0 w-full h-20 lg:mt-0 lg:w-60 lg:top-0 lg:left-0 lg:h-full bg-slate-300">
      <div className="font-vt flex justify-around lg:flex-col lg:justify-center h-full items-center">
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
