import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ProjectHub - Gestión de Proyectos",
  description: "Sistema de gestión y validación de formularios de proyectos.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}
