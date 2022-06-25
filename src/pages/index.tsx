import { GetStaticProps } from "next";
import Head from "next/head";
import styles from "../styles/styles.module.scss";
import firebase from "../services/firebaseConnection";
import { useState } from "react";
import Image from "next/image";
import boardUser from "../../public/images/board-user.svg";

type Data = {
  id: string;
  doar: boolean;
  lastDonate: Date;
  image: string;
};
interface HomeProps {
  data: string;
}

export default function Home({ data }: HomeProps) {
  const [doadores, setDoadores] = useState<Data[]>(JSON.parse(data));

  return (
    <>
      <Head>
        <title>Board - Organizando suas tarefas.</title>
      </Head>
      <main className={styles.contentContainer}>
        <Image src={boardUser} alt="Ferramenta Board" />
        <section className={styles.callToAction}>
          <h1>
            Uma ferramenta para o seu dia. Escreva, planeje e organize-se.
          </h1>
          <p>
            <span>100% gratuito</span> e online.
          </p>
        </section>

        {doadores.length !== 0 && <h3>Apoiadores:</h3>}
        <div className={styles.donaters}>
          {doadores.map((item) => (
            <Image
              width={65}
              height={65}
              key={item.image}
              src={item.image}
              alt="Foto do apoiador."
            />
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const doadores = await firebase.firestore().collection("usuarios").get();

  const data = JSON.stringify(
    doadores.docs.map((u) => {
      return {
        id: u.id,
        ...u.data(),
      };
    })
  );

  return {
    props: {
      data,
    },
    revalidate: 60 * 60, // Atualiza a cada 60 minutos
  };
};
