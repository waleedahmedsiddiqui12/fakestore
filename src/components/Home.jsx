import { memo, useEffect, useState } from "react";
import "./style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

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

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


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
         
        
            <div className="destination-card" key={ui++}>
            <img src={i.image} alt="Destination 1"/>
            <h2>{i.title}</h2>
            <span>{i.category}</span>
            <p>{i.description}</p>
            <input type="hidden" value={i.id}/>
          
            <Button variant="warning" onClick={handleShow} id={"md"+i.id} value={i.id}>
            View Details
            </Button>
             </div>

          ))
        )}
               </section>
           </main>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body><h2>waleed</h2></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>


    </>
  );
}

export default Home;
