import styles from './Header.module.scss';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import useModal from 'hooks/useModal';
import StartMenu from 'components/StartMenu/StartMenu';

export default function Header(): React.JSX.Element {
  const [isModalOpen, setModalOpen] = useModal();

  return (
    <div id="header">
      <div className={styles.wrapper}>
        <header>
          <div id="top-div" className={styles['main-nav']}>
            <h1 className={styles.myName}>Naeem Gitonga</h1>
            <div className={styles.startButtonWrapper}>
              <Button cb={setModalOpen} className={styles.startButton}>
                START
              </Button>
            </div>
          </div>
        </header>
      </div>
      <Modal isOpen={isModalOpen} setModalOpen={setModalOpen} hideClose={false}>
        <StartMenu onClose={setModalOpen} />
      </Modal>
    </div>
  );
}
