import { useRef, useState } from 'react';
import styles from './Image.module.css';

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

const Image = ({ ...props }: ImageProps) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const [skeleton, setSkeleton] = useState(true);
  const handleLoad = () => {
    setSkeleton(false);

    if (imageRef.current) {
      imageRef.current.style.opacity = '1';
    }
  };

  return (
    <div className={styles.wrapper}>
      {skeleton && <div className={styles.skeleton}></div>}
      <img
        ref={imageRef}
        onLoad={() => handleLoad()}
        className={styles.img}
        {...props}
        alt={props.alt}
      />
    </div>
  );
};

export default Image;
