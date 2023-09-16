import { memo, useEffect, useState } from "react";
import "./style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ReactExpandText from 'react-expand-text';

function Home() {
  const [lstProducts, setProducts] = useState([]);
  let ui = 1;
  const [isActive, SetIsactive] = useState(false);
  const [singleProduct, setSingleProduct] = useState();
  const [ismodalstate, setmodalstate] = useState(false);

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

    const a = lstProducts.find(a => a.id == id);
    setSingleProduct(a);
    console.log("single product: " + a.category);
    setmodalstate(true);
    setShow(true);

  }


  return (
    <>
      <div>
        <header>
          <nav>
            <div className="logo">

              <img src="" alt="logo" />
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
                  <ReactExpandText maxLength={50} text={i.description} className='my-css-class' />
                  <br></br>
                  <Button variant="warning" onClick={handleShow} id={"md" + i.id} value={i.id}>
                    View Details
                  </Button>
                </div>

              ))
            )}
          </section>
        </main>
      </div>
      {ismodalstate ? (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{singleProduct.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div key={singleProduct.id}> {/* Make sure to provide a unique key */}
              <p>{singleProduct.description}</p> {/* Assuming 'name' is a property of your product */}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )
        : ""
      }
    </>
  );
}

export default Home;
