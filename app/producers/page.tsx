import Link from "next/link";
import { RegistrationForm } from "../components/registration-form";

export default function ProducersPage() {
  return (
    <main>
      <p>
        <Link href="/">Home</Link>
      </p>
      <h1>Producer form</h1>
      <RegistrationForm formType="producer" />
    </main>
  );
}
