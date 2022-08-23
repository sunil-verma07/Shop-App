import React, { useEffect, useState } from "react";
import Product from "../../Components/Product/Product";
import "./productlist.css";
import { useParams,Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import Metadata from "../../Components/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../Redux/Actions/ProductAction.js";
import Loader from "../../Components/Loader/Loader";
import Slider from '@mui/material/Slider'
import {MdOutlineKeyboardArrowDown,MdOutlineKeyboardArrowUp} from 'react-icons/md'


const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([1, 1000]);
  const [category,setCategory] = useState('')
  const [openCat,setOpenCat] = useState(false)
  const [openSlider,setOpenSlider] = useState(false)

  const categories = [
                
                'Casual',
                'Winter',
                'Summer',
                'Bottom',
                'Top'
  ]

  

  const { products, loading, error, productsCount, resultPerPage } = useSelector(

    (state) => state.product
  );
  
  const { keyword } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct(keyword,currentPage,price,category));
    window.scrollTo(0, 0)

  }, [dispatch, keyword,currentPage,price,category]);

  const priceHandler=(event,newprice) => {
    setPrice(newprice)
  }

  function setCurrentPageNo(pagenumber) {
    setCurrentPage(pagenumber);
  }
  return (
    <div>
      <Metadata title={`Latest Products`} />
      <div className="product-page-link"><Link to ="/">Home </Link>&nbsp;/&nbsp;Products </div>

      <div className="container">
        <div className="filters">
          <div className="filter-heading">Filters</div>
          <div className="filter-components">
         <div className="slider">
          <div className="filter-name-header"><div className="filter-name">Price</div><div className="drop-down-btn" onClick={() =>setOpenSlider(!openSlider)}><MdOutlineKeyboardArrowDown size={30}/></div></div>
         { openSlider && <Slider
          value={price}
          onChange={priceHandler}
          valueLabelDisplay='auto'
          
          min={0}
          max={1000}
          sx={{
            color:'black',
            width:250,
            marginTop:2
          }}
          />}
         </div>
         <hr />
         <div className="categories">
         <div className="filter-name-header"><div className="filter-name">Categories</div><div className="drop-down-btn" onClick={() =>setOpenCat(!openCat)}><MdOutlineKeyboardArrowDown size={30}/></div></div>
          { openCat && categories.map(cat=>(
              <div><label for="muhRadio1"><input type="radio" name="muhRadio" value="" key={cat} onClick={() =>setCategory(cat)}/>{cat}</label></div>
            ))
            
          }
         
         </div>
         </div>
        </div>
        <div className="products">
          {loading ? (
            <Loader />
          ) : (
            <div className="list">
              {products.map((product) => (
                <Product
                  key={product._id}
                  name={product.name}
                  price={product.price}
                  seller={product.seller}
                  images={product.images}
                  id={product._id}
                />
              ))}
            </div>
          )}
          {resultPerPage <= productsCount && (
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={productsCount}
              onChange={setCurrentPageNo}
              itemClass="page-item"
              linkClass="page-link"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
