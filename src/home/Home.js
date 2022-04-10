import Search from "./components/search/Search";
import ShowAll from "./components/showall/ShowAll";
import Showroom from "./components/showroom/Showroom";
import Category from "./components/category/Category";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function Home () {
  const data = useSelector((state) => state.data.carParts);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
      <>
          <Search/>
          <Category/>
          <Showroom data={data.filter(d => d.isBestSeller)} filter={{bestSeller: true}} label="Best Sellers" id="best-seller"/>
          <Showroom data={data.filter(d => d.discountedPrice)} filter={{onSale: true}} label="On Sale" id="on-sale"/>
          <Showroom data={data.filter(d => d.brand.includes("Toyota"))} filter={{brand: "Toyota"}} label="Toyota Parts" id="toyota"/>
          <Showroom data={data.filter(d => d.brand.includes("Hyundai"))} filter={{brand: "Hyundai"}} label="Hyundai Parts" id="hyundai"/>
          <ShowAll/>
      </>
  );
}

export default Home;