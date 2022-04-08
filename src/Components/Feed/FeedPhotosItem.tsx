import { Photo } from '../../Hooks/FeedModalPhotosFetch';
import Image from '../Helper/Image';
import styles from './FeedPhotosItem.module.css';

export interface IFeedPhotosItem {
  setModalPhoto: (photo: Photo | null) => void;
  photo: Photo;
}

const FeedPhotosItem = ({ photo, setModalPhoto }: IFeedPhotosItem) => {
  const handleClick = () => {
    setModalPhoto(photo);
  };

  return (
    <li className={styles.photo} onClick={handleClick}>
      <Image src={photo.src} alt={photo.title} />
      <span className={styles.visualizacao}>{photo.acessos}</span>
    </li>
  );
};

export default FeedPhotosItem;
