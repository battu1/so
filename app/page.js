import Image from 'next/image';
import {
  ArrowRight, BadgeCheck, BarChart3, Check, Code2, ExternalLink,
  Gauge, Instagram, Linkedin, Mail, MapPin, Menu, MessageCircle,
  MonitorSmartphone, Search, ShieldCheck, Sparkles, TrendingUp,
} from 'lucide-react';

const services = [
  { n: '01', icon: MonitorSmartphone, title: 'Website design', text: 'Distinctive, brand-led interfaces that make a confident first impression and guide visitors toward action.' },
  { n: '02', icon: Code2, title: 'Custom development', text: 'Purpose-built Next.js websites—clean, scalable and shaped around how your business actually works.' },
  { n: '03', icon: Search, title: 'Search visibility', text: 'SEO-ready structure, metadata and content foundations that help nearby customers discover you.' },
  { n: '04', icon: Gauge, title: 'Speed optimisation', text: 'Lean pages, optimised media and modern performance practices for a quick experience on every device.' },
  { n: '05', icon: ShieldCheck, title: 'Secure & reliable', text: 'Dependable builds with sensible security, accessible interactions and stress-free deployment.' },
  { n: '06', icon: TrendingUp, title: 'Growth support', text: 'Analytics-ready experiences and ongoing improvements that turn your website into a business asset.' },
];

const projects = [
  { type: 'Local bakery', name: 'Crumb & Co.', result: '+42% online enquiries', className: 'projectBakery' },
  { type: 'Wellness studio', name: 'Rooted', result: '2.1× more bookings', className: 'projectWellness' },
  { type: 'Home services', name: 'North & Neat', result: '3× faster experience', className: 'projectHome' },
];

const process = [
  ['01', 'Discover', 'We learn your offer, audience and goals—then define what the site needs to achieve.'],
  ['02', 'Design', 'We shape the content, visual direction and user journey into a polished experience.'],
  ['03', 'Build', 'We develop, optimise and test every detail across screens and devices.'],
  ['04', 'Launch', 'Your website goes live with support, guidance and a clear path for growth.'],
];

export default function Home() {
  return (
    <main>
      <nav className="nav shell" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="LocalSync home">
          <Image src="/localsync-logo.jpg" alt="" width={52} height={52} priority />
          <span>LOCAL<span>SYNC</span></span>
        </a>
        <div className="navLinks">
          <a href="#services">Services</a><a href="#work">Work</a><a href="#process">Process</a><a href="#about">About</a>
        </div>
        <a className="button buttonSm" href="#contact">Start a project <ArrowRight size={16} /></a>
        <details className="mobileNav">
          <summary aria-label="Open navigation"><Menu /></summary>
          <div><a href="#services">Services</a><a href="#work">Work</a><a href="#process">Process</a><a href="#about">About</a><a href="#contact">Start a project</a></div>
        </details>
      </nav>

      <section className="hero shell" id="top">
        <div className="heroCopy">
          <div className="eyebrow"><span /> Websites for ambitious local businesses</div>
          <h1>Your business<br />deserves to be<br /><em>found & chosen.</em></h1>
          <p>LocalSync creates fast, refined websites that turn local attention into real enquiries, bookings and growth.</p>
          <div className="heroActions">
            <a className="button" href="#contact">Build your website <ArrowRight size={18} /></a>
            <a className="textLink" href="#work">See our work <span>↘</span></a>
          </div>
          <div className="heroProof">
            <div className="avatars"><span>R</span><span>A</span><span>K</span></div>
            <p><strong>Trusted by 3+ growing businesses</strong><br />Built with care. Delivered with clarity.</p>
          </div>
        </div>

        <div className="heroVisual" aria-label="Website dashboard preview">
          <div className="glow" />
          <div className="browserCard">
            <div className="browserTop"><i /><i /><i /><span>localsync.design</span></div>
            <div className="mockNav"><b>GOOD / GROUND</b><span>STORY&nbsp;&nbsp; MENU&nbsp;&nbsp; VISIT</span></div>
            <div className="mockHero"><small>YOUR NEIGHBOURHOOD COFFEE HOUSE</small><h2>Slow mornings.<br /><i>Good coffee.</i></h2><button>EXPLORE OUR MENU →</button></div>
            <div className="mockStats"><span><b>4.9</b> customer rating</span><span><b>8–8</b> open daily</span></div>
          </div>
          <div className="floatCard floatOne"><TrendingUp size={18} /><span><b>+42%</b> more enquiries</span></div>
          <div className="floatCard floatTwo"><BadgeCheck size={18} /><span><b>Fast & responsive</b> every screen</span></div>
          <div className="rating"><span>★★★★★</span><b>Small-business focused</b></div>
        </div>
      </section>

      <div className="ticker" aria-hidden="true"><div>STRATEGY <span>✦</span> DESIGN <span>✦</span> DEVELOPMENT <span>✦</span> SEO <span>✦</span> PERFORMANCE <span>✦</span> LOCAL GROWTH <span>✦</span></div></div>

      <section className="section shell" id="services">
        <div className="sectionHead">
          <div><div className="kicker">WHAT WE DO</div><h2>Everything your business<br />needs to show up <em>strong.</em></h2></div>
          <p>Strategy, design and technology—carefully connected to give small businesses a sharper digital presence.</p>
        </div>
        <div className="servicesGrid">
          {services.map(({ n, icon: Icon, title, text }) => <article className="service" key={title}><span className="serviceNum">{n}</span><Icon /><h3>{title}</h3><p>{text}</p><a href="#contact" aria-label={`Learn about ${title}`}><ArrowRight size={18} /></a></article>)}
        </div>
      </section>

      <section className="darkSection" id="about">
        <div className="shell aboutGrid">
          <div className="aboutVisual">
            <div className="orbit one"/><div className="orbit two"/>
            <Image src="/localsync-logo.jpg" alt="LocalSync symbol" width={220} height={220} />
          </div>
          <div className="aboutCopy"><div className="kicker light">WHY LOCALSYNC</div><h2>Local insight.<br /><em>Modern execution.</em></h2><p>We understand the leap it takes to invest in your business. That’s why we keep the process direct, collaborative and focused on work that earns its place.</p>
            <div className="checks"><span><Check /> Tailored, never templated</span><span><Check /> Clear pricing and communication</span><span><Check /> Built for speed and mobile</span><span><Check /> Support beyond launch</span></div>
            <a className="button buttonLight" href="#contact">Let’s work together <ArrowRight size={18} /></a>
          </div>
          <div className="numbers"><div><strong>6</strong><span>months of focused<br />web experience</span></div><div><strong>3+</strong><span>client projects<br />completed</span></div><div><strong>100%</strong><span>custom-built<br />experiences</span></div></div>
        </div>
      </section>

      <section className="section shell" id="work">
        <div className="sectionHead"><div><div className="kicker">SELECTED CONCEPTS</div><h2>Built to look good.<br /><em>Made to work hard.</em></h2></div><p>Every LocalSync build connects thoughtful design to a clear business goal.</p></div>
        <div className="projects">{projects.map((project) => <article className={`project ${project.className}`} key={project.name}><div className="projectTag">{project.type}</div><div className="projectScreen"><div className="miniBar"/><h3>{project.name}</h3><p>{project.type === 'Local bakery' ? 'Baked here. Loved here.' : project.type === 'Wellness studio' ? 'Move with intention.' : 'A cleaner kind of clean.'}</p><span>Discover more</span></div><div className="projectMeta"><h3>{project.name}</h3><span>{project.result}</span><ExternalLink size={18}/></div></article>)}</div>
        <p className="conceptNote">Concept showcases created to demonstrate our design direction and capabilities.</p>
      </section>

      <section className="process section" id="process"><div className="shell"><div className="sectionHead"><div><div className="kicker">HOW IT WORKS</div><h2>A clear path from<br />idea to <em>online.</em></h2></div><p>No mystery, no agency runaround. A simple process with steady collaboration at every stage.</p></div><div className="processGrid">{process.map(([n,t,d]) => <div className="processItem" key={n}><span>{n}</span><Sparkles size={20}/><h3>{t}</h3><p>{d}</p></div>)}</div></div></section>

      <section className="quote shell"><div className="quoteMark">“</div><blockquote>LocalSync understood that we didn’t just need a prettier website—we needed a clearer way for customers to trust us and take the next step.</blockquote><div className="quoteBy"><div>AS</div><p><b>Ananya S.</b><br />Small business owner</p><span>★★★★★</span></div></section>

      <section className="contact" id="contact"><div className="shell contactGrid"><div><div className="kicker light">READY WHEN YOU ARE</div><h2>Let’s build something<br />your business can<br /><em>grow into.</em></h2><p>Tell us what you’re working on. We’ll reply with thoughtful next steps—usually within one business day.</p><div className="availability"><i/> Currently accepting new projects</div></div><div className="contactCard"><h3>Start a conversation</h3><a href="mailto:hello@localsync.in"><Mail/><span><small>Email us</small>hello@localsync.in</span><ArrowRight/></a><a href="https://wa.me/919876543210"><MessageCircle/><span><small>WhatsApp</small>+91 98765 43210</span><ArrowRight/></a><div className="location"><MapPin/><span><small>Based in India</small>Working with businesses everywhere</span></div><hr/><p>Prefer social?</p><div className="socials"><a href="https://instagram.com/localsync" aria-label="Instagram"><Instagram/></a><a href="https://linkedin.com/company/localsync" aria-label="LinkedIn"><Linkedin/></a><a href="mailto:hello@localsync.in" aria-label="Email"><Mail/></a></div></div></div></section>

      <footer><div className="shell footerTop"><a className="brand brandLight" href="#top"><Image src="/localsync-logo.jpg" alt="" width={46} height={46}/><span>LOCAL<span>SYNC</span></span></a><p>Connecting your business<br />to the modern world.</p><div><a href="#services">Services</a><a href="#work">Work</a><a href="#about">About</a><a href="#contact">Contact</a></div></div><div className="shell footerBottom"><span>© 2026 LocalSync. All rights reserved.</span><span>Designed for local growth <BarChart3 size={14}/></span></div></footer>
    </main>
  );
}
