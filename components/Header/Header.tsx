import Link from "next/link";
const Header = () => {
  return (
    <header>
      <a href="">TravelTracks</a>
      <nav aria-label="Web navigation">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/catalog">Catalog</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
