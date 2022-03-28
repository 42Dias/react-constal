import { createContext, useState, useEffect, useContext } from "react";
import cadastrarCategory from "../services/categoria/cadastrarCategory";
import deleteCategoria  from "../services/categoria/deleteCategory";
import loadCategorias from "../services/categoria/loadCategorias";
import changeCategorias from "../services/categoria/changeCategorias";

export const CategoryContext = createContext({});

export default function CategoryProvider({ children }) {

  const [allCategorys, setAllCategorys] = useState(getCategorys);

  async function getCategorys(){
    try {
      

      let categorias = await loadCategorias()


      setAllCategorys(categorias);

      return categorias
    }
    catch (error) {
      console.log(error);
    }
  };

  async function createCategorys(data) {
    try {
      
      const response = await cadastrarCategory(data);
      
      await getCategorys()
      
      return response;
    }
    catch (error) {
      console.log(error);
    }
  };

  async function updateCategory(id, data) {
    try {
      const response = await changeCategorias(id, data);
      
      await getCategorys()
      
      return response;
    }
    catch (error) {
      console.log(error);
    }
  };

  async function  deleteCategory(id){
    try {
      const response = await deleteCategoria(id);
      
      await getCategorys()

      return response;
    }
    catch (error) {
      console.log(error);
    }
  };



  // useEffect(() => {
  //   getCategorys();
  // }, []);

  return (
    <CategoryContext.Provider
      value={{
        allCategorys,
        setAllCategorys,
        getCategorys,
        createCategorys,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategory() {
  const context = useContext(CategoryContext);
  const { allCategorys, setAllCategorys, getCategorys, createCategorys ,updateCategory, deleteCategory, } = context;

  return {
    allCategorys,
    setAllCategorys,
    getCategorys,
    createCategorys ,
    updateCategory,
    deleteCategory,
  };
}
