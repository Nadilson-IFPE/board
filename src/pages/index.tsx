import Head from "next/head";
import styles from "../styles/styles.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>Board - Organizando suas tarefas.</title>
      </Head>
      <main className={styles.contentContainer}>
        <img src="/images/board-user.svg" alt="Ferramenta board" />
        <section className={styles.callToAction}>
          <h1>Uma ferramenta para o seu dia. Escreva, planeje e organize-se.</h1>
          <p>
            <span>100% gratuito</span> e online.
          </p>
        </section>

        <div className={styles.donaters}>
        <img src="https://avatars.githubusercontent.com/u/11899797?s=96&v=4" alt="Usuário 1" />
        </div>
      </main>
    </>
  );
}
