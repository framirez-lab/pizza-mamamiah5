import { Container, Row, Col, Button, Card, Image } from 'react-bootstrap';
import { pizzaCart } from '../data/pizzas';
import { useState } from 'react';

const Cart = () => {
    const [cart, setCart] = useState(pizzaCart);
  
    const increaseQuantity = (id) => {
      setCart(cart.map(pizza =>
        pizza.id === id ? { ...pizza, count: pizza.count + 1 } : pizza
      ));
    };
  
    const decreaseQuantity = (id) => {
      setCart(cart
        .map(pizza => pizza.id === id ? { ...pizza, count: pizza.count - 1 } : pizza)
        .filter(pizza => pizza.count > 0)
      );
    };
  
    const totalPrice = cart.reduce((total, pizza) => total + pizza.price * pizza.count, 0);
  
    return (
      <Container>
        <h2 className="my-4">Tu Carrito</h2>
        {cart.length === 0 ? (
          <p>El carrito está vacío.</p>
        ) : (
          <>
            {cart.map(pizza => (
              <Card key={pizza.id} className="mb-3">
                <Row className="no-gutters">
                  <Col md={4}>
                    <Image src={pizza.img} alt={pizza.name} fluid />
                  </Col>
                  <Col md={8}>
                    <Card.Body>
                      <Card.Title>{pizza.name}</Card.Title>
                      <Card.Text>
                        Precio: ${pizza.price}
                        <br />
                        Cantidad: {pizza.count}
                      </Card.Text>
                      <Button variant="danger" onClick={() => decreaseQuantity(pizza.id)} className="me-2">-</Button>
                      <Button variant="success" onClick={() => increaseQuantity(pizza.id)}>+</Button>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            ))}
            <h3>Total: ${totalPrice}</h3>
            <Button variant="primary">Pagar</Button>
          </>
        )}
      </Container>
    );
  };
  
  export default Cart;