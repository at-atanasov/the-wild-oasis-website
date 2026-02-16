import Link from "next/link";
import Navigation from "./components/navigation";

export default function Page() {
  return (
    <div>
      <Navigation />
      <h1>Twe Wild Oasis. Welcome to paradise</h1>
      <Link href="/cabins">Explore luxury cabins</Link>
    </div>
  );
}
