import Head from "next/head";
import styles from "./styles.module.scss";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { PayPalButtons } from "@paypal/react-paypal-js";
import firebase from "./../../services/firebaseConnection";
import { useState } from "react";
import Image from "next/image";
import rocketImg from "../../../public/images/rocket.svg";

interface DonateProps {
  user: {
    nome: string;
    id: string;
    image: string;
  };
}

export default function Donate({ user }: DonateProps) {
  const [vip, setVip] = useState(false);

  async function handleSaveDonate() {
    await firebase
      .firestore()
      .collection("usuarios")
      .doc(user.id)
      .set({
        donate: true,
        lastDonate: new Date(),
        image: user.image,
      })
      .then(() => {
        setVip(true);
      });
  }

  return (
    <>
      <Head>
        <title>Ajude a plataforma Board a permanecer online</title>
      </Head>
      <main className={styles.container}>
        <Image src={rocketImg} alt="Seja um Apoiador" />

        {vip && (
          <div className={styles.vip}>
            <Image
              width={50}
              height={50}
              src={user.image}
              alt="Foto do perfil do apoiador"
            />
            <span>Parabéns! Você é um novo apoiador.</span>
          </div>
        )}

        <h1>Seja um apoiador do projeto 🏆</h1>
        <h3>
          Contribua com apenas <span>R$ 5,00</span>
        </h3>
        <strong>
          Apareça na nossa Home e tenha funcionalidades exclusivas.
        </strong>

        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: "5",
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then(function (details) {
              console.log("Compra aprovada: " + details.payer.name.given_name);
              handleSaveDonate();
            });
          }}
          // No meu Firefox está dando o erro "Error: Detected popup close"
          // ao fechar o popup sem realizar a transação (em modo de produção).
          // Então, adicionei tratamento de erro básico para evitar que o site
          // mostre uma janela descrevendo o erro, o que dificulta a visualização
          // até que o usuário atualize a página:
          onError={function (err) {
            console.log("Erro: ", err);
          }}
        />
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
