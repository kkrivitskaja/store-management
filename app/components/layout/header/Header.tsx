import NavLink from '~ui/NavLink/NavLink';

const Header = () => {
  return (
    <header className="bg-[#1d3557] p-4 flex flex-col items-center gap-y-10">
      <h1 className="text-white text-xl font-bold">Inventory management</h1>
      <nav>
        <ul className="flex space-x-4 text-white">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/inventory">Inventory</NavLink>
          <NavLink href="/product">Product</NavLink>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
