import { memo, useEffect, useState } from "react";
import "./style.css";

function Home() {
  const [lstProducts, setProducts] = useState([]);
  let ui = 1;
  const [isActive, SetIsactive] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((json) => {
        SetIsactive(true);
        setProducts(json);
        //console.log(json);
      })
      .catch(function (ex) {
        console.log("Error: " + ex.message);
      });
  }, []);

  return (
    <>
      <div>
        <header>
          <nav>
            <div className="logo">

            <img src="https://alfamall.com/pub/media/logo/stores/16/logo.png" alt="logo"/>
            </div>
       
          </nav>
        </header>
        <main>

        <section className="product-listing">
        {!isActive ? (
          <img
            src="https://cdn.dribbble.com/users/3742211/screenshots/9195657/media/6796a544d6f9ef1293d8d8d9e60d38d5.gif"
            width="200"
          />
        ) : (
          lstProducts.map((i) => (
            // <div key={ui++}>
            //   <h1>{i.title}</h1>
            //   <span>{i.description}</span>
            //   <img src={i.image} width="200px" />
            // </div>
        
            <div className="destination-card" key={ui++}>
            <img src={i.image} alt="Destination 1"/>
            <h2>{i.title}</h2>
            <span>{i.category}</span>
            <p>{i.description}</p>
          
            <a href="#">View Details</a>
             </div>

          ))
        )}
               </section>
           </main>
      </div>
    </>
  );
}

export default Home;
