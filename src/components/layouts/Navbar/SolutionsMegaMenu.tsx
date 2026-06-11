import NavDropdownMenu from "./NavDropdownMenu";
import { SOLUTIONS_MENU } from "./solutionsMegaMenuData";

export default function SolutionsMegaMenu() {
  return <NavDropdownMenu label="Solutions" items={SOLUTIONS_MENU} />;
}
