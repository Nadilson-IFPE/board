import styles from './styles.module.scss';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

export function SigninButton() {

    const session = true;

    return session ? (
        <button
        type="button"
        className={styles.signInButton}
        onClick={ () => {} }
        >
          <img src="https://avatars.githubusercontent.com/u/11899797?s=96&v=4" alt="Foto do usuário" />
          Olá, Nadilson!
          <FaGithub color="##737380" className={styles.closeIcon}/>  
        </button>
    ) : (
        <button
        type="button"
        className={styles.signInButton}
        onClick={ () => {} }
        >
          <FaGithub color="#FFB800"/>  
          Entrar com Github
        </button>
    )
}