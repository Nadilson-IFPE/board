import Head from "next/head";
import { GetServerSideProps } from "next";
import { FiCalendar, FiClock, FiEdit2, FiPlus, FiTrash } from "react-icons/fi";
import { SupportButton } from "../../components/SupportButton";
import styles from "./styles.module.scss";
import { getSession } from "next-auth/client";
import { useState, FormEvent } from "react";
import firebase from "../../services/firebaseConnection";
import { format } from "date-fns";
import Link from "next/link";

interface BoardProps {
  user: {
    id: string;
    nome: string;
  };
}

export default function Board({ user }: BoardProps) {
  const [input, setInput] = useState("");
  const [taskList, setTaskList] = useState([]);

  async function handleAddTask(e: FormEvent) {
    e.preventDefault();
    if (input === "") {
      alert("Preencha com alguma tarefa!");
      return;
    }

    await firebase
      .firestore()
      .collection("tarefas")
      .add({
        created: new Date(),
        tarefa: input,
        userId: user.id,
        nome: user.nome,
      })
      .then((doc) => {
        console.log("TAREFA CADASTRADA COM SUCESSO!");
        let data = {
          id: doc.id,
          created: new Date(),
          createdFormated: format(new Date(), "dd MMMM yyyy"),
          tarefa: input,
          userId: user.id,
          nome: user.nome,
        };

        setTaskList([...taskList, data]);
        setInput("");
      })
      .catch((err) => {
        console.log("ERRO AO CADASTRAR: ", err);
      });
  }

  return (
    <>
      <Head>
        <title>Minhas tarefas - Board</title>
      </Head>
      <main className={styles.container}>
        <form onSubmit={handleAddTask}>
          <input
            type="text"
            placeholder="Digite sua tarefa..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">
            <FiPlus size={25} color="#17181F" />
          </button>
        </form>
        <h1>Você tem 2 tarefas!</h1>
        <section>
          {taskList.map((task) => (
            <article key={task.userId} className={styles.taskList}>
              <Link href={`/board/${task.id}`} passHref>
                <p>{task.tarefa}</p>
              </Link>

              <div className={styles.actions}>
                <div>
                  <div>
                    <FiCalendar size={20} color="#FFB800" />
                    <time>{task.createdFormated}</time>
                  </div>
                  <button>
                    <FiEdit2 size={20} color="#FFF" />
                    <span>Editar</span>
                  </button>
                </div>

                <button>
                  <FiTrash size={20} color="#FF3636" />
                  <span>Excluir</span>
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>

      <div className={styles.vipContainer}>
        <h3>Obrigado por apoiar este projeto.</h3>
        <div>
          <FiClock size={28} color="#FFF" />
          <time>Última doação foi há 3 dias.</time>
        </div>
      </div>

      <SupportButton />
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
  };

  //  console.log(session);

  return {
    props: { user },
  };
};
