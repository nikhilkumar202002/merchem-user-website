import AboutBanner from "../component/sections/about-us/AboutBanner";
import WhoWeAre from "../component/sections/about-us/WhoWeAre";
import TimeLine from "../component/sections/about-us/TimeLine";
import TechnicalFoundation from "../component/sections/about-us/TechnicalFoundation";
import ISOCertificate from "../component/sections/about-us/ISOCertificate";
import Advantages from "../component/sections/about-us/Advantages";
import AboutLegacy from "../component/sections/about-us/AboutLegacy";
import AboutCta from "../component/sections/about-us/AboutCta";

const Page = () => {
  return (
    <main className="flex-1">
      <AboutBanner />
        <WhoWeAre />
      <TimeLine />
      <TechnicalFoundation />
      <ISOCertificate />
      <Advantages />
      <AboutLegacy />
      <AboutCta />
    </main>
  );
};

export default Page;
