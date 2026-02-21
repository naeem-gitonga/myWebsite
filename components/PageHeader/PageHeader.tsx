'use client';

import sharedStyles from 'components/SharedCss/SharedCss.module.scss';
import styles from './PageHeader.module.scss';
import Modal from 'components/Modal/Modal';
import useModal from 'hooks/useModal';
import StartMenu from 'components/StartMenu/StartMenu';

type PageHeaderProps = { headerName: string; hideLinks: boolean };
export default function PageHeader(props: PageHeaderProps): React.JSX.Element {
  const { headerName, hideLinks } = props;
  const { iconWrapper, menuButton } = styles;
  const { sectionHeader2, headerWrapper } = sharedStyles;
  const [isModalOpen, setModalOpen] = useModal();

  return (
    <>
      <div className={headerWrapper}>
        <h2 className={sectionHeader2}>{headerName}</h2>
        {!hideLinks && (
          <div className={iconWrapper}>
            <button
              type="button"
              onClick={setModalOpen}
              className={menuButton}
              aria-label="Open menu"
            >
              menu
            </button>
          </div>
        )}
      </div>
      <Modal isOpen={isModalOpen} setModalOpen={setModalOpen} hideClose={false}>
        <StartMenu onClose={setModalOpen} />
      </Modal>
    </>
  );
}
