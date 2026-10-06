import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Nav } from "@/components/Nav";
import { Stack } from "@/components/Stack";
import { Work } from "@/components/Work";
import { education, profile, site, stack } from "@/data/portfolio";

// Structured data: tells Google this page is the profile of a specific person and
// links it to the same person's LinkedIn and GitHub (helps name searches).
// The WebSite entry sets the site name Google shows above the search result.
const website = {
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  name: profile.name,
  alternateName: [`${profile.name} Portfolio`, `${profile.name} — ${profile.role}`, ...profile.alsoKnownAs],
  url: `${site.url}/`,
};

const profilePage = {
  "@type": "ProfilePage",
  url: `${site.url}/`,
  isPartOf: { "@id": `${site.url}/#website` },
  mainEntity: {
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: profile.name,
    alternateName: profile.alsoKnownAs,
    givenName: profile.name.split(" ")[0],
    familyName: profile.name.split(" ").slice(1).join(" "),
    url: site.url,
    image: `${site.url}${profile.photo}`,
    jobTitle: profile.role,
    description: profile.tagline,
    email: `mailto:${profile.email}`,
    sameAs: [profile.links.linkedin, profile.links.github.replace(/\/$/, "")],
    alumniOf: { "@type": "CollegeOrUniversity", name: education.school },
    knowsAbout: stack.flatMap((s) => s.items).slice(0, 25),
  },
};

const jsonLd = { "@context": "https://schema.org", "@graph": [website, profilePage] };

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Stack />
        <Work />
        <Contact />
      </main>
    </>
  );
}
