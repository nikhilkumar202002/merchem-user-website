import ContactBanner from "../component/sections/contact-us/ContactBanner";
import ContactForm from "../component/sections/contact-us/ContactForm";
import ContactMap from "../component/sections/contact-us/ContactMap";

const Page = () => {
  return (
    <main className="flex-1">
      <ContactBanner />
      <ContactForm />
      <ContactMap />
    </main>
  );
};

export default Page;
