import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { TodoApp } from './TodoApp'
import { ListaProductos } from './ListaProductos'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Table } from './Table';
import ProductosApp from '../app/ProductosApp';

export const App: React.FC = () => {
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Lista de tareas</Nav.Link>
              <Nav.Link href="/crear-producto">Crear producto</Nav.Link>
              <Nav.Link href="/lista-productos">lista de productos</Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<TodoApp />} />
        {/* <Route path="/crear-producto"element={<CrearProducto/>}/> */}
        <Route path="/lista-productos" element={<ProductosApp />} />
      </Routes>
    </div>
  )
}