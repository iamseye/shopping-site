import {useEffect} from "react";
import {Routes,Route} from "react-router-dom";
import { useDispatch } from "react-redux";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import {getCategoriesAndDocuments} from "../../utils/firebase/firebase.utils";
import {setCategories} from "../../store/categories/category.action";

const Shop = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const getCategoriesMap = async () => {
           const categoriesArray = await getCategoriesAndDocuments();
           console.log('123')
           console.log(categoriesArray)
           dispatch(setCategories(categoriesArray));
        };
        getCategoriesMap();
        // the dispatch won't update, just to remove the warning from lint
    }, [dispatch]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
