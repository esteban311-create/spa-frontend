import React from "react";

function Sidebar() {
    return (
        <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
            <h2 className="text-lg font-bold mb-4">Menú</h2>
            <ul>
                <li className="mb-2">
                    <a href="/dashboard" className="block p-2 rounded hover:bg-gray-700">
                        Dashboard
                    </a>
                </li>
                <li className="mb-2">
                    <a href="/agenda" className="block p-2 rounded hover:bg-gray-700">
                        Agenda
                    </a>
                </li>
                <li className="mb-2">
                    <a href="/configuracion" className="block p-2 rounded hover:bg-gray-700">
                        Configuración
                    </a>
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar; // 👈 Asegúrate de exportarlo correctamente
