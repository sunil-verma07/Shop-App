import './carousel.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 3000, min: 1000 },
      items: 2
    },
    tablet: {
      breakpoint: { max: 1000, min:800 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 664, min: 0 },
      items: 1
    }
  };

const ImageCarousel = ({images}) => {
   
  return (
    <div className="image-carousel">
    <Carousel responsive={responsive}>
  <div><img src={images[0].url} alt="" /></div>
  <div><img src={images[1].url} alt="" /></div>
  <div><img src={images[2].url} alt="" /></div>
</Carousel>
</div>
  )
}

export default ImageCarousel