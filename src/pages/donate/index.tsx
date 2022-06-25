import Head from "next/head";
import styles from "./styles.module.scss";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";

interface DonateProps {
  user: {
    nome: string;
    id: string;
    image: string;
  };
}

export default function Donate({ user }: DonateProps) {
  return (
    <>
      <Head>
        <title>Ajude a plataforma Board a permanecer online</title>
      </Head>
      <main className={styles.container}>
        <img src="/images/rocket.svg" alt="Seja Apoiador" />

        <div className={styles.vip}>
          <img src={user.image} alt="Foto do perfil do apoiador" />
          <span>Parabéns! Você é um novo apoiador.</span>
        </div>

        <h1>Seja um apoiador do projeto 🏆</h1>
        <h3>
          Contribua com apenas <span>R$ 1,00</span>
        </h3>
        <strong>
          Apareça na nossa Home e tenha funcionalidades exclusivas.
        </strong>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session?.id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const user = {
    nome: session?.user.name,
    id: session?.id,
    image: session?.user.image,
  };

  return {
    props: {
      user,
    },
  };
};
