import { memo, useEffect, useState } from "react";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ReactExpandText from "react-expand-text";
import ReactStars from "react-rating-stars-component";

function Home() {
  const [lstProducts, setProducts] = useState([]);
  let ui = 1;
  const [isActive, SetIsactive] = useState(false);
  const [singleProduct, setSingleProduct] = useState();
  const [isModalState, setModalState] = useState(false);



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

  const [show, setShow] = useState(false);
  const handleClose = (event) => setShow(false);
  const handleShow = (event) => {
    console.log(event.target.value);
    let id = event.target.value;
    let a = lstProducts.find((a) => a.id == id);
    setSingleProduct(a);
    // console.log("single product: " + JSON.parse(JSON.stringify(lstProducts)));
    //  console.log("single rating: " + a.rating[0].rate);

    setModalState(true);
    setShow(true);
  };



  return (
    <>
      <div>
        <header>
          <nav>
            <div className="logo">
              <img
                src=" https://www.freeiconspng.com/uploads/retail-store-icon-18.png"
                alt="logo"
              />
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
                <div className="destination-card" key={ui++}>
                  <img src={i.image} alt="Destination 1" />
                  <h2>{i.title}</h2>
                  <span>{i.category}</span>
                  <p>PKR {i.price}</p>
                  <ReactExpandText
                    maxLength={50}
                    text={i.description}
                    className="my-css-class"
                  />
                  <br></br>
                  <Button
                    variant="warning"
                    onClick={handleShow}
                    id={"md" + i.id}
                    value={i.id}
                  >
                    View Details
                  </Button>
                </div>
              ))
            )}
          </section>
        </main>
      </div>
      {isModalState ? (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{singleProduct.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div key={singleProduct.id}>
              <p>{singleProduct.description}</p>
              {/* <p>
               Rating: {singleProduct.rating.rate} (Count: {singleProduct.rating.count})
              </p> */}
              <p>
                Rating :{" "}
                <ReactStars
                  count={singleProduct.rating.rate}
                  size={15}
                  edit={false}
                  half={true}
                  color2="#b50303"
                />{" "}
                (Count: {singleProduct.rating.count}){" "}
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
}

export default Home;
