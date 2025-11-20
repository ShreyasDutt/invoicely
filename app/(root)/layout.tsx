import Nav from "@/components/shared/Nav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <Nav/>
            {children}
      </div>
  
  );
}
