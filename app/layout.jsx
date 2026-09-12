import "./globals.css";

export const metadata = {
  title: "Setta w Settein Admin",
  description: "Setta w Settein business management system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}