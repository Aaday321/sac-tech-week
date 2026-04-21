import { RegisterChannelLayout } from "../components/register-channel-layout";

export default function SponsorsPage() {
  return (
    <RegisterChannelLayout
      title="Sponsor registration"
      accent="var(--landing-card-gold)"
    >
      <h2>Role</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <h2>Responsibilities</h2>
      <ul>
        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
        <li>
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </li>
        <li>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur.
        </li>
      </ul>
      <h2>Perks</h2>
      <ul>
        <li>Excepteur sint occaecat cupidatat non proident, sunt in culpa.</li>
        <li>
          Qui officia deserunt mollit anim id est laborum sed ut perspiciatis.
        </li>
        <li>
          Omnis iste natus error sit voluptatem accusantium doloremque
          laudantium.
        </li>
      </ul>
      <h2>Example</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere
        erat a ante venenatis dapibus posuere velit aliquet. Aenean lacinia
        bibendum nulla sed consectetur. Curabitur blandit tempus porttitor.
      </p>
    </RegisterChannelLayout>
  );
}
