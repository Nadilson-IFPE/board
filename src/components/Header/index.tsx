import Link from "next/link";
import styles from "./styles.module.scss";
import { SigninButton } from "../SigninButton";

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/">
          <img src="/images/logo.svg" alt="Logo do Meu Board" />
        </Link>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/board">
            <a>Meu Board</a>
          </Link>
        </nav>

        <SigninButton />
        
      </div>
    </header>
  );
}
