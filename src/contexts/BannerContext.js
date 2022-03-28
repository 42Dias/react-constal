import { createContext, useState, useEffect, useContext } from "react";
import bannerCreate from "../services/banner/bannerCreate"; 
import bannerLoad from "../services/banner/bannerLoad"; 
import bannerUpdate from "../services/banner/bannerUpdate";  
import bannerDelete from "../services/banner/bannerDelete";  
// import bannerFind from "../services/banner/bannerFind";  


export const BannerContext = createContext({});

export default function BannerProvider({ children }) {

  const [allBanners, setAllBanners] = useState(getBanners);

  async function getBanners(){
    try {
      

      let categorias = await bannerLoad()


      setAllBanners(categorias);

      return categorias
    }
    catch (error) {
      console.log(error);
    }
  };

  async function createBanners(data) {
    try {
      
      const response = await bannerCreate(data);
      
      await getBanners()
      
      return response;
    }
    catch (error) {
      console.log(error);
    }
  };

  async function updateBanner(id, data) {
    try {
      const response = await bannerUpdate(data, id);
      
      await getBanners()
      
      return response;
    }
    catch (error) {
      console.log(error);
    }
  };

  async function  deleteBanner(id){
    try {
      const response = await bannerDelete(id);
      
      await getBanners()

      return response;
    }
    catch (error) {
      console.log(error);
    }
  };



  // useEffect(() => {
  //   getBanners();
  // }, []);

  return (
    <BannerContext.Provider
      value={{
        allBanners,
        setAllBanners,
        getBanners,
        createBanners,
        updateBanner,
        deleteBanner,
      }}
    >
      {children}
    </BannerContext.Provider>
  );
}

export function useBanner() {
  const context = useContext(BannerContext);
  const { allBanners, setAllBanners, getBanners, createBanners ,updateBanner, deleteBanner, } = context;

  return {
    allBanners,
    setAllBanners,
    getBanners,
    createBanners ,
    updateBanner,
    deleteBanner,
  };
}
