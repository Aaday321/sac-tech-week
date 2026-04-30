import Link from "next/link";
import { RegistrationForm } from "../components/registration-form";

export default function SponsorsPage() {
  return (
    <main>
      <p>
        <Link href="/">Home</Link>
      </p>
      <h1>Sponsor form</h1>
      <RegistrationForm formType="sponsor" />
    </main>
  );
}
