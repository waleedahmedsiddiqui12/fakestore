
import { memo, useEffect, useState } from "react";

function Home() {

    const [lstProducts, setProducts] = useState([]);
    let ui = 1;
    const [isActive, SetIsactive] = useState(false);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(json => {
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
                {!isActive ? <img src='https://cdn.dribbble.com/users/3742211/screenshots/9195657/media/6796a544d6f9ef1293d8d8d9e60d38d5.gif' width="200" /> : lstProducts.map(i => (
                    <div key={ui++}>
                        <h1>{i.title}</h1>
                        <span>{i.description}</span>
                        <img src={i.image} width="200px" />

                    </div>
                ))}
            </div>
        </>


    );

}



export default Home;