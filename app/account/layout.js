import Navbar from "@/components/Navbar";

export default function AccountLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
