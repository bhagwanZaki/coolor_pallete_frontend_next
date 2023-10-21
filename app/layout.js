import { ReduxProvider } from "@/redux/provider";
import "../css/globals.css";

export const metadata = {
  title: "Coolor pallete saver",
  description: "Save your coolor pallete so that they dont disappear",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <h1 className="logo">Crome</h1>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
