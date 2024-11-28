import MainHeader from "./MainHeader";
import NoteHeader from "./NoteHeader";
import TopHeader from "./TopHeader";

function Header() {
  return (
    <header style={{width: "100%"}}>
      <TopHeader />
      <MainHeader />
      <NoteHeader />
    </header>
  );
}

export default Header;
