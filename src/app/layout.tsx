"use client"; // Certifique-se de que este é um componente client-side

import React, { useState } from 'react';
import Link from 'next/link';
import 'moment/locale/pt-br';
import 'antd/dist/reset.css'; // Reset dos estilos
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <html lang="pt-br">
      <body className="flex h-screen bg-[bg-[FFFFFF]]">
        {/* Menu */}
        <aside
          className={`${
            isCollapsed ? 'w-16' : 'w-64'
          } bg-[#6A6A6A] text-white p-4 transition-all duration-300`}
        >
          {/* Cabeçalho com o icone de ação */}
          <div className="flex justify-between items-center mb-8">
            <h2 className={`text-2xl font-bold ${isCollapsed ? 'hidden' : 'block'}`}>Dashboard</h2>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isCollapsed
                      ? 'M19 9l-7 7-7-7'
                      : 'M9 5l7 7-7 7'
                  }
                ></path>
              </svg>
            </button>
          </div>

          <nav>
            <ul>
              {/* <li className="mb-4">
                <Link href="/" className="block py-2 px-4 rounded hover:bg-[#EBEBEB] hover:text-black">
                  <span className={`${isCollapsed ? 'hidden' : 'inline'}`}>Home</span>
                </Link>
              </li> */}
              {/* <li className="mb-4">
                <Link href="/dashboard" className="block py-2 px-4 rounded hover:bg-[#EBEBEB] hover:text-black">
                  <span className={`${isCollapsed ? 'hidden' : 'inline'}`}>Dashboard</span>
                </Link>
              </li> */}
              <li className="mb-4">
                <Link href="/calendar" className="block py-2 px-4 rounded hover:bg-[#EBEBEB] hover:text-black">
                  <span className={`${isCollapsed ? 'hidden' : 'inline'}`}>Calendar</span>
                </Link>
              </li>
              {/* <li className="mb-4">
                <Link href="/settings" className="block py-2 px-4 rounded hover:bg-[#EBEBEB] hover:text-black">
                  <span className={`${isCollapsed ? 'hidden' : 'inline'}`}>Settings</span>
                </Link>
              </li> */}
            </ul>
          </nav>
        </aside>
        <main className="flex-1 justify-center items-center overflow-y-auto">{children}</main>
      </body>
    </html>
  );
}
