import { Providers } from "./Providers";

export const metadata = {
  title: "ハノイの塔",
  description: "ハノイの塔を解くゲームです。",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
