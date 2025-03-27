import React, { useState } from "react";

const productos = [
  {
    id: 1,
    nombre: "Masaje Relajante",
    descripcion: "Una experiencia única para aliviar el estrés.",
    precio: 50,
    imagen: "/img/masaje.jpg",
  },
  {
    id: 2,
    nombre: "Facial Hidratante",
    descripcion: "Tratamiento para revitalizar y nutrir la piel.",
    precio: 40,
    imagen: "/img/facial.jpg",
  },
  {
    id: 3,
    nombre: "Manicure y Pedicure",
    descripcion: "Dale un cuidado especial a tus manos y pies.",
    precio: 35,
    imagen: "/img/manicure.jpg",
  },{
    id: 4,
    nombre: "Relajante",
    descripcion: "Una experiencia única para aliviar el estrés.",
    precio: 50,
    imagen: "/img/masaje.jpg",
  },
];

function Home() {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  const eliminarDelCarrito = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(index, 1);
    setCarrito(nuevoCarrito);
  };

  const enviarWhatsApp = () => {
    if (carrito.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    const numeroWhatsApp = "+573234807386"; // Número del spa
    const mensaje = encodeURIComponent(
      `Hola, quiero comprar los siguientes productos:\n\n` +
        carrito
          .map(
            (item, index) =>
              `${index + 1}. ${item.nombre} - $${item.precio} USD`
          )
          .join("\n") +
        `\n\nTotal: $${carrito.reduce((total, item) => total + item.precio, 0)} USD`
    );

    window.open(`https://wa.me/${numeroWhatsApp}?text=${mensaje}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Encabezado */}
      <div className="flex justify-between items-center p-6">
        <img src="/logo.png" alt="SPA Me lo Merezco" className="w-24" />
        <div className="flex space-x-4">
          <a
            href="/agenda"
            className="px-6 py-2 bg-[#d4af37] text-white text-lg font-semibold rounded-full shadow-md hover:shadow-lg hover:bg-[#b58e2b] transition-all duration-300"
          >
            Ver Agenda
          </a>
          <a
            href="/login"
            className="px-6 py-2 border-2 border-[#d4af37] text-[#d4af37] text-lg font-semibold rounded-full hover:bg-[#d4af37] hover:text-white transition-all duration-300"
          >
            Iniciar Sesión
          </a>
        </div>
      </div>

      {/* Bienvenida */}
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold text-[#d4af37] mb-4">
          Bienvenido a <span className="italic">SPA Me lo Merezco</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Relájate, rejuvenece y disfruta de nuestros servicios de lujo. Nos encargamos de cuidar de ti porque te lo mereces.
        </p>
      </div>

      {/* Sección de Productos */}
      <div className="p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          ✨ Nuestros Productos ✨
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="bg-white p-6 rounded-lg shadow-lg text-center transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-40 h-40 mx-auto rounded-full mb-4 object-cover border-4 border-[#d4af37]"
              />
              <h2 className="text-lg font-bold text-gray-800">{producto.nombre}</h2>
              <p className="text-gray-600 text-sm">{producto.descripcion}</p>
              <p className="text-xl font-bold text-[#d4af37] mt-2">${producto.precio} USD</p>
              <button
                className="mt-3 bg-[#d4af37] text-white px-5 py-2 rounded-full shadow-md hover:bg-[#b58e2b] transition-all duration-300"
                onClick={() => agregarAlCarrito(producto)}
              >
                Agregar al carrito
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Sección del Carrito */}
      <div className="mt-10 bg-white p-6 rounded-lg shadow-lg mx-auto max-w-3xl">
        <h2 className="text-2xl font-semibold text-gray-800">🛒 Carrito</h2>
        {carrito.length === 0 ? (
          <p className="text-gray-500 mt-2">El carrito está vacío.</p>
        ) : (
          <ul className="mt-4">
            {carrito.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b py-2"
              >
                <span>{item.nombre} - ${item.precio} USD</span>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-md"
                  onClick={() => eliminarDelCarrito(index)}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 flex justify-between items-center">
          <p className="text-xl font-bold">
            Total: ${carrito.reduce((total, item) => total + item.precio, 0)} USD
          </p>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md"
            onClick={enviarWhatsApp}
          >
            Enviar a WhatsApp 📲
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
