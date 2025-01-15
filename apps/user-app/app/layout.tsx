import { Providers } from "../provider";
import "./globals.css";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}):JSX.Element {
  return (
    <html lang="en">
      <Providers>
        <body>
          {children}
        </body>
      </Providers>
    </html>
  );
}
