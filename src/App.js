import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./components/Home";
import About from "./components/About";
import ReduxTodo from "./components/ReduxTodo";
import CrudApi from "./components/CrudApi";
import PhotoGallery from "./components/PhotoGallery";
import ContactForm from "./components/ContactForm";

export default function App() {
  return (
    <div className="min-vh-100 bg-light">
      <Navbar />

      <div className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/redux" element={<ReduxTodo />} />
          <Route path="/crud" element={<CrudApi />} />
          <Route path="/gallery" element={<PhotoGallery />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <footer className="mt-5 pt-4 border-top text-muted small">
          <div className="d-flex flex-wrap justify-content-between gap-2">
            <span>CSCI 6333 • Final Portfolio</span>
            <span>Built with React Router + Redux Toolkit + Axios + Bootstrap</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
