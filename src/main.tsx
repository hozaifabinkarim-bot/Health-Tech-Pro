import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

type Product = {
  id: string;
  title: string;
  category: string;
  price: number;
  oldPrice?: number;
  tag: string;
  level: string;
  rating: string;
  learners: string;
  description: string;
  features: string[];
  badge?: string;
};

type JobProgramme = {
  title: string;
  price: number;
  description: string;
  skills: string[];
};

type DigitalCareCourse = {
  title: string;
  category: 'Care Safety' | 'Data & Compliance' | 'Digital Care' | 'Leadership';
  price: number;
  time: string;
};

const popularProducts: Product[] = [
  {
    id: 'health-social-care-l3',
    title: 'Health and Social Care Level 3 Diploma',
    category: 'Health & Social Care',
    price: 25,
    oldPrice: 129,
    tag: 'Top Course',
    level: 'Level 3',
    rating: '4.9',
    learners: '9,276',
    description: 'A practical foundation for learners aiming to enter or progress in UK health and social care roles.',
    features: ['Care values', 'Safeguarding', 'Communication', 'Duty of care'],
    badge: 'Popular'
  },
  {
    id: 'health-social-care-l5',
    title: 'Health and Social Care Level 5 Diploma',
    category: 'Health & Social Care',
    price: 25,
    oldPrice: 149,
    tag: 'Career Step',
    level: 'Level 5',
    rating: '4.8',
    learners: '7,814',
    description: 'For learners preparing for senior care responsibilities, supervision and care management progression.',
    features: ['Leadership', 'Care planning', 'Quality practice', 'Professional growth']
  },
  {
    id: 'medication-administration',
    title: 'Medication Administration Level 4',
    category: 'Health & Social Care',
    price: 25,
    oldPrice: 135,
    tag: 'Care Essential',
    level: 'Level 4',
    rating: '4.9',
    learners: '8,423',
    description: 'Supports safe medicine handling knowledge for care workers, support workers and healthcare assistants.',
    features: ['Safe medicines', 'Recording', 'Storage', 'Risk awareness']
  },
  {
    id: 'care-certificate',
    title: 'Care Certificate Course — 15 Standards',
    category: 'Health & Social Care',
    price: 25,
    oldPrice: 119,
    tag: 'Starter Pathway',
    level: 'Beginner',
    rating: '4.8',
    learners: '10,352',
    description: 'A clear introduction to core care standards for new and aspiring care sector learners.',
    features: ['15 standards', 'Person-centred care', 'Privacy', 'Equality']
  },
  {
    id: 'nursing-assistant',
    title: 'Nursing Assistant Diploma',
    category: 'Healthcare Skills',
    price: 25,
    oldPrice: 129,
    tag: 'Clinical Support',
    level: 'Diploma',
    rating: '4.7',
    learners: '5,881',
    description: 'Build confidence in patient support, clinical observation awareness and professional healthcare practice.',
    features: ['Patient care', 'Clinical basics', 'Hygiene', 'Communication']
  },
  {
    id: 'mental-health-first-aid',
    title: 'Mental Health First Aid Awareness',
    category: 'Mental Health',
    price: 25,
    oldPrice: 119,
    tag: 'High Demand',
    level: 'Awareness',
    rating: '4.9',
    learners: '6,940',
    description: 'Helps learners recognise mental health concerns and provide appropriate first-step support.',
    features: ['Early signs', 'Support skills', 'Crisis awareness', 'Signposting']
  },
  {
    id: 'safeguarding-adults',
    title: 'Safeguarding Adults in Care Settings',
    category: 'Safeguarding',
    price: 25,
    oldPrice: 99,
    tag: 'Compliance',
    level: 'CPD',
    rating: '4.8',
    learners: '7,106',
    description: 'Supports care learners with safeguarding awareness, reporting responsibilities and duty of care.',
    features: ['Abuse types', 'Reporting', 'Care Act', 'Professional duty']
  },
  {
    id: 'phlebotomy',
    title: 'Phlebotomy Assistant Awareness',
    category: 'Healthcare Skills',
    price: 25,
    oldPrice: 145,
    tag: 'Skill Builder',
    level: 'Awareness',
    rating: '4.7',
    learners: '4,779',
    description: 'A supportive introduction to phlebotomy theory, patient preparation and clinical safety awareness.',
    features: ['Venepuncture theory', 'Patient care', 'Safety', 'Infection control']
  }
];

const bundles: Product[] = [
  {
    id: 'healthcare-assistant-care-worker-bundle',
    title: 'Healthcare Assistant & Care Worker CPD Career Bundle',
    category: 'Career Bundle',
    price: 69,
    oldPrice: 235,
    tag: 'Very Strong',
    level: 'Job pathway',
    rating: '4.9',
    learners: '12,400+',
    description: 'A complete starter pathway for care assistant, support worker and healthcare assistant learners.',
    features: ['Care Certificate', 'Medication awareness', 'Safeguarding', 'Infection prevention']
  },
  {
    id: 'nursing-assistant-phlebotomy-bundle',
    title: 'Nursing Assistant & Phlebotomy CPD Career Bundle',
    category: 'Career Bundle',
    price: 79,
    oldPrice: 249,
    tag: 'Very Strong',
    level: 'Clinical support',
    rating: '4.8',
    learners: '8,600+',
    description: 'For learners interested in nursing assistant duties, patient support and phlebotomy awareness.',
    features: ['Nursing assistant', 'Phlebotomy', 'Clinical observation', 'Medical terminology']
  },
  {
    id: 'digital-care-professional-bundle',
    title: 'Digital Care Professional Bundle',
    category: 'Digital Care',
    price: 89,
    oldPrice: 137,
    tag: 'Featured',
    level: '13 courses',
    rating: '4.9',
    learners: 'Modern care teams',
    description: 'A specialist care technology bundle covering GDPR, cyber awareness, safeguarding, eMAR, remote monitoring and AI tools.',
    features: ['13 CPD courses', 'Digital care skills', 'Compliance topics', 'Custom builder available'],
    badge: 'Best value'
  },
  {
    id: 'sen-teaching-assistant-bundle',
    title: 'SEN Teaching Assistant & Child Support Career Bundle',
    category: 'Career Bundle',
    price: 59,
    oldPrice: 199,
    tag: 'Very Strong',
    level: 'School support',
    rating: '4.8',
    learners: '6,800+',
    description: 'Designed for learners who want to support children with SEN, autism, ADHD and behavioural needs.',
    features: ['SEN support', 'Autism', 'ADHD', 'Safeguarding children']
  },
  {
    id: 'dementia-elderly-care-bundle',
    title: 'Dementia, Mental Health & Elderly Care CPD Bundle',
    category: 'Career Bundle',
    price: 64,
    oldPrice: 219,
    tag: 'Very Strong',
    level: 'Care specialism',
    rating: '4.8',
    learners: '7,300+',
    description: 'A strong specialist route for learners working with elderly people, dementia care and mental health support.',
    features: ['Dementia care', 'Elderly care', 'Mental health', 'Person-centred support']
  },
  {
    id: 'quantity-surveyor-bundle',
    title: 'Quantity Surveyor & Construction Cost Estimation CPD Bundle',
    category: 'Career Bundle',
    price: 69,
    oldPrice: 229,
    tag: 'Strong',
    level: 'Construction career',
    rating: '4.7',
    learners: '3,900+',
    description: 'A practical bundle for learners interested in construction costing, estimating and junior QS support roles.',
    features: ['Estimating', 'Cost control', 'Contracts', 'Project basics']
  },
  {
    id: 'risk-compliance-bundle',
    title: 'Governance, Risk & Compliance Management CPD Bundle',
    category: 'Career Bundle',
    price: 74,
    oldPrice: 239,
    tag: 'Strong',
    level: 'Business pathway',
    rating: '4.7',
    learners: '4,200+',
    description: 'A professional route for learners interested in compliance, risk, governance and operational control.',
    features: ['Risk management', 'Compliance', 'Governance', 'Audit awareness']
  },
  {
    id: 'microsoft-365-admin-bundle',
    title: 'Microsoft 365 Administrator Expert Career Bundle',
    category: 'IT & Digital',
    price: 84,
    oldPrice: 249,
    tag: 'Medium-high',
    level: 'IT pathway',
    rating: '4.6',
    learners: '3,500+',
    description: 'A digital workplace route for learners interested in IT support, Microsoft 365 and admin systems.',
    features: ['Microsoft 365', 'Identity basics', 'Security awareness', 'Workplace IT']
  },
  {
    id: 'ai-career-productivity-bundle',
    title: 'AI Career & Productivity Bundle',
    category: 'IT & Digital',
    price: 49,
    oldPrice: 149,
    tag: 'Trending',
    level: 'Future skills',
    rating: '4.9',
    learners: 'Students & professionals',
    description: 'A practical AI bundle for study, work, CV improvement, prompt writing and daily productivity.',
    features: ['ChatGPT', 'Prompt writing', 'CV support', 'AI productivity']
  }
];

const programmes: JobProgramme[] = [
  {
    title: 'Medicine Administration Job Ready Programme',
    price: 499,
    description: 'Designed for learners who want stronger medication administration confidence and career support.',
    skills: ['Safe handling of medicines', 'Medical terminology', 'CV support', 'Mock interview']
  },
  {
    title: 'Healthcare Assistant Job Ready Programme',
    price: 499,
    description: 'A structured route for aspiring healthcare assistants and support workers.',
    skills: ['Care Certificate', 'Safeguarding', 'Infection control', 'Job application guidance']
  },
  {
    title: 'Digital Care & Healthcare Admin Programme',
    price: 499,
    description: 'A modern care admin pathway combining digital care tools with practical career readiness.',
    skills: ['GDPR', 'eMAR', 'Remote monitoring', 'AI tools']
  },
  {
    title: 'Nursing Assistant & Phlebotomy Job Ready Programme',
    price: 499,
    description: 'For learners looking to build a clinical support profile with practical healthcare knowledge.',
    skills: ['Patient care', 'Phlebotomy awareness', 'Clinical observation', 'Interview preparation']
  },
  {
    title: 'SEN Teaching Assistant Job Ready Programme',
    price: 499,
    description: 'A child support pathway for SEN, autism, ADHD and classroom support learners.',
    skills: ['SEN', 'Autism', 'ADHD', 'Safeguarding children']
  },
  {
    title: 'Data, AI & Office Productivity Job Ready Programme',
    price: 499,
    description: 'A future-skills package for learners who want stronger digital employability.',
    skills: ['AI tools', 'Excel basics', 'Data awareness', 'CV optimisation']
  }
];

const digitalCareCourses: DigitalCareCourse[] = [
  { title: 'Cyber Security Awareness for Care Staff', category: 'Digital Care', price: 12, time: '1–2 hrs' },
  { title: 'GDPR & Data Protection in Health and Social Care', category: 'Data & Compliance', price: 12, time: '1.5–2 hrs' },
  { title: 'Safe Use of Patient Data & Confidentiality', category: 'Data & Compliance', price: 10, time: '1 hr' },
  { title: 'Phishing & Social Engineering Awareness', category: 'Digital Care', price: 10, time: '1 hr' },
  { title: 'Safeguarding Adults in Care Settings', category: 'Care Safety', price: 12, time: '1.5 hrs' },
  { title: 'Mental Health First Aid Awareness', category: 'Care Safety', price: 12, time: '1.5 hrs' },
  { title: 'Electronic Medication Administration Records', category: 'Care Safety', price: 14, time: '2 hrs' },
  { title: 'Digital Literacy for Care Workers', category: 'Digital Care', price: 9, time: '2 hrs' },
  { title: 'Video Consultation Skills for Healthcare Staff', category: 'Digital Care', price: 10, time: '1 hr' },
  { title: 'Remote Monitoring Technology in Care', category: 'Digital Care', price: 10, time: '1.5 hrs' },
  { title: 'Introduction to AI Tools for Healthcare Administrators', category: 'Leadership', price: 12, time: '1.5 hrs' },
  { title: 'Digital Tools for Mental Health Practitioners', category: 'Leadership', price: 10, time: '2 hrs' },
  { title: 'Care Management: Digital Planning & Reporting', category: 'Leadership', price: 14, time: '1.5 hrs' }
];

const categories = ['All', 'Health & Social Care', 'Healthcare Skills', 'Mental Health', 'Safeguarding'];
const bundleCategories = ['All', 'Career Bundle', 'Digital Care', 'IT & Digital'];

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <div className="course-image"><span>{product.category.includes('Health') ? '🏥' : product.category.includes('Mental') ? '🧠' : product.category.includes('Safeguarding') ? '🛡️' : '📚'}</span></div>
      <div className="course-body">
        <div className="course-meta"><span>{product.learners}</span><span>⭐ {product.rating}</span></div>
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <div className="price-row"><strong>£{product.price}</strong>{product.oldPrice && <del>£{product.oldPrice}</del>}<a href="#adviser">View More</a></div>
      </div>
    </article>
  );
}

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCourseCategory, setActiveCourseCategory] = useState('All');
  const [activeBundleCategory, setActiveBundleCategory] = useState('All');
  const [selected, setSelected] = useState<string[]>([]);
  const [formSent, setFormSent] = useState(false);

  const visibleCourses = activeCourseCategory === 'All'
    ? popularProducts
    : popularProducts.filter(product => product.category === activeCourseCategory);

  const visibleBundles = activeBundleCategory === 'All'
    ? bundles
    : bundles.filter(bundle => bundle.category === activeBundleCategory);

  const bundleTotal = useMemo(() => {
    const subtotal = digitalCareCourses.filter(course => selected.includes(course.title)).reduce((sum, course) => sum + course.price, 0);
    const count = selected.length;
    const discountRate = count === 13 ? 0.35 : count >= 6 ? 0.2 : count >= 3 ? 0.1 : 0;
    const discount = subtotal * discountRate;
    return { subtotal, count, discountRate, discount, total: subtotal - discount };
  }, [selected]);

  const toggleCourse = (title: string) => {
    setSelected(current => current.includes(title) ? current.filter(item => item !== title) : [...current, title]);
  };

  const enquiryBody = encodeURIComponent(`Hello Student Adviser Team,\n\nI would like guidance on Health Tech Pro courses.\n\nSelected Digital Care courses: ${selected.length ? selected.join(', ') : 'No custom selection yet'}\nEstimated custom bundle total: £${bundleTotal.total.toFixed(2)}\n\nName:\nPhone:\nEmail:\nPreferred course/bundle:`);
  const mailto = `mailto:hello@healthtechpro.co.uk?subject=${encodeURIComponent('Health Tech Pro course enquiry')}&body=${enquiryBody}`;

  return (
    <div className="site">
      <div className="top-strip">
        <span>1 Million Learners Celebration</span>
        <strong>Prime Membership from £99</strong>
        <a href="#membership">View Offer</a>
      </div>

      <header className="header">
        <a href="#home" className="logo" aria-label="Health Tech Pro home">
          <span className="logo-mark">HT</span>
          <span><strong>Health Tech Pro</strong><em>Online Learning Academy</em></span>
        </a>
        <button className="menu-btn" onClick={() => setMobileOpen(!mobileOpen)} aria-expanded={mobileOpen}>☰</button>
        <nav className={mobileOpen ? 'nav open' : 'nav'}>
          {['Home', 'Courses', 'Bundles', 'Job Ready', 'Membership', 'Adviser', 'Why Us'].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} onClick={() => setMobileOpen(false)}>{item}</a>
          ))}
          <a className="nav-cta" href="#adviser" onClick={() => setMobileOpen(false)}>Free Consultation</a>
        </nav>
      </header>

      <main id="home">
        <section className="hero">
          <div className="hero-copy">
            <p className="small-label">Academy for Health, Care & Digital Skills</p>
            <h1>Be skilled, be certified, be successful!</h1>
            <p className="lead">Choose from career-focused online courses, CPD bundles, job-ready programmes and digital care training designed for UK learners and working professionals.</p>
            <div className="search-box">
              <input type="text" aria-label="Search courses" placeholder="Search for a course or bundle" />
              <a href="#courses">Search</a>
            </div>
            <div className="accreditation-row">
              <span>CPD Focused</span><span>Online Access</span><span>Career Bundles</span><span>Student Adviser</span>
            </div>
            <div className="hero-actions"><a className="btn primary" href="#courses">View Courses</a><a className="btn outline" href="#adviser">Speak to Adviser</a></div>
          </div>
          <div className="hero-art" aria-label="Learner success illustration">
            <div className="portrait-card"><span>👩‍⚕️</span><strong>Career Support</strong><em>Flexible online learning</em></div>
            <div className="review-card"><strong>Excellent</strong><span>★★★★★</span><small>4.8 average learner rating</small></div>
            <div className="certificate-card"><strong>CPD</strong><span>Certificate-ready learning</span></div>
          </div>
        </section>

        <section className="membership-band" id="membership">
          <div className="membership-card">
            <span className="tag">Prime Membership</span>
            <h2>Free access to 2 family members</h2>
            <p>Build a simple, high-converting membership offer with a clear annual price, limited-time discount and visible learner value.</p>
            <div className="membership-price"><span>For only</span><strong>£99</strong><del>£137</del></div>
            <a className="btn dark" href="#adviser">Get Access Now</a>
          </div>
          <div className="celebration-card">
            <p className="big-number">1 MILLION</p>
            <h3>Learners Celebration!</h3>
            <div className="people">🎉 👩‍🎓 🧑‍💻 👨‍⚕️ 🎁</div>
          </div>
        </section>

        <section className="section" id="courses">
          <div className="section-title centred"><span>Top Courses</span><h2>Our Most Popular Courses</h2><p>Keep the homepage simple: show the strongest courses first, then guide learners into bundles or Adviser support.</p></div>
          <div className="filter-row">{categories.map(category => <button key={category} className={activeCourseCategory === category ? 'active' : ''} onClick={() => setActiveCourseCategory(category)}>{category}</button>)}</div>
          <div className="product-grid">{visibleCourses.map(product => <ProductCard key={product.id} product={product} />)}</div>
          <div className="centre"><a className="btn secondary" href="#bundles">View All Career Bundles</a></div>
        </section>

        <section className="certificate-section">
          <div className="certificate-visual"><div className="cert cert-a">Certificate</div><div className="cert cert-b">CPD Record</div></div>
          <div><span className="small-label">Certificate Support</span><h2>Earn CPD Accredited Certificates</h2><p className="lead">Support learners with completion evidence, digital certificates, transcripts and clear next-step guidance from the Student Adviser Team.</p><ul className="tick-list"><li>Professional certificate presentation</li><li>Useful for CPD records and career development</li><li>Suitable for learners, staff training and organisations</li></ul><a className="btn primary" href="#adviser">Ask About Certification</a></div>
        </section>

        <section className="section soft" id="bundles">
          <div className="section-title centred"><span>Fall in love with learning</span><h2>Choose the best courses for you</h2><p>This section merges the strongest unique products from both sites into one clean catalogue.</p></div>
          <div className="filter-row">{bundleCategories.map(category => <button key={category} className={activeBundleCategory === category ? 'active' : ''} onClick={() => setActiveBundleCategory(category)}>{category}</button>)}</div>
          <div className="bundle-grid">
            {visibleBundles.map(bundle => (
              <article className={bundle.badge ? 'bundle-card featured' : 'bundle-card'} key={bundle.id}>
                {bundle.badge && <span className="corner-badge">{bundle.badge}</span>}
                <div className="bundle-image"><span>{bundle.category === 'IT & Digital' ? '💻' : bundle.category === 'Digital Care' ? '🏥' : '🎓'}</span></div>
                <div className="bundle-content"><div className="course-meta"><span>{bundle.tag}</span><span>⭐ {bundle.rating}</span></div><h3>{bundle.title}</h3><p>{bundle.description}</p><div className="feature-tags">{bundle.features.map(feature => <span key={feature}>{feature}</span>)}</div><div className="price-row"><strong>£{bundle.price}</strong>{bundle.oldPrice && <del>£{bundle.oldPrice}</del>}<a href={bundle.id === 'digital-care-professional-bundle' ? '#digital-care' : '#adviser'}>{bundle.id === 'digital-care-professional-bundle' ? 'Breakdown' : 'Enquire'}</a></div></div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="digital-care">
          <div className="split-head"><div><span className="small-label">Featured Bundle</span><h2>Digital Care Professional Bundle</h2><p className="lead">This keeps the best Digital Care Pro features: 13-course structure, digital care skills, data protection, eMAR, safeguarding, mental health awareness, pricing comparison and a working custom builder.</p></div><div className="deal-box"><span>Individual total £137</span><strong>Bundle price £89</strong><em>Save 35% when selecting all courses</em></div></div>
          <div className="digital-course-grid">
            {digitalCareCourses.map((course, index) => <button key={course.title} className={selected.includes(course.title) ? 'digital-course selected' : 'digital-course'} onClick={() => toggleCourse(course.title)}><span>{String(index + 1).padStart(2, '0')}</span><strong>{course.title}</strong><em>{course.category} · {course.time}</em><b>£{course.price}</b></button>)}
          </div>
          <div className="builder-summary"><div><h3>Custom Bundle Builder</h3><p>Select any Digital Care courses. Pricing updates automatically and gives 10%, 20% or 35% savings depending on selection size.</p></div><div className="summary-price"><span>{bundleTotal.count} selected</span><strong>£{bundleTotal.total.toFixed(2)}</strong><small>Discount: £{bundleTotal.discount.toFixed(2)}</small></div><a className={bundleTotal.count ? 'btn primary' : 'btn disabled'} href={bundleTotal.count ? mailto : '#digital-care'}>Enquire About Selection</a></div>
        </section>

        <section className="section soft" id="job-ready">
          <div className="section-title centred"><span>Limited Time Offer</span><h2>Job Ready Programmes</h2><p>Use these as premium products for learners who want course access, certification guidance and career support in one package.</p></div>
          <div className="programme-grid">{programmes.map(programme => <article className="programme-card" key={programme.title}><div className="programme-image">JOB READY</div><h3>{programme.title}</h3><p>{programme.description}</p><div className="feature-tags">{programme.skills.map(skill => <span key={skill}>{skill}</span>)}</div><div className="price-row"><strong>£{programme.price}</strong><a href="#adviser">View More</a></div></article>)}</div>
        </section>

        <section className="feature-banner">
          <article><h3>Amazing Free Courses</h3><p>Highlight free or low-cost courses to attract new learners and convert them into bundle buyers.</p><a href="#courses">Browse Now</a></article>
          <article><h3>Apply Now for Free Student Adviser Call</h3><p>Capture learner phone numbers earlier and move them into your outbound follow-up process.</p><a href="#adviser">Apply Now</a></article>
          <article><h3>Team Training</h3><p>Position team and organisation licences for care homes, agencies and training managers.</p><a href="#adviser">Learn More</a></article>
          <article><h3>Read Our Blog</h3><p>Use helpful content to build trust, support SEO and educate learners before they buy.</p><a href="#why-us">Read More</a></article>
        </section>

        <section className="section belief" id="why-us">
          <div className="belief-image">👨‍💻</div>
          <div><span className="small-label">We believe in excellence</span><h2>Simple, bright and conversion-focused.</h2><p className="lead">This version is intentionally more normal and learner-friendly: light colours, orange CTAs, green accents, simple course cards and clear selling sections like the reference design.</p><a className="btn primary" href="#adviser">Ask About Your Next Step</a></div>
        </section>

        <section className="logos-band"><h3>Over 1,000 organisations have chosen online training for employee development</h3><div className="logos"><span>Care Homes</span><span>Recruiters</span><span>Healthcare Teams</span><span>Training Providers</span><span>Private Learners</span></div></section>

        <section className="section why-grid-section">
          <div className="why-copy"><span className="small-label">Why Us?</span><h2>Built for learner conversion and sales follow-up.</h2><p>Health Tech Pro is structured to support direct course sales, certification enquiries, course bundles, job-ready programme upsells and Student Adviser calls.</p><a className="btn secondary" href="#adviser">Start a Call</a></div>
          <div className="why-grid"><div><strong>Learning on the go</strong><p>Responsive design for mobile, tablet and desktop learners.</p></div><div><strong>Learn from experts</strong><p>Clear course outcomes and practical career positioning.</p></div><div><strong>Study at your schedule</strong><p>Self-paced online learning with flexible access.</p></div><div><strong>Earn certificate guidance</strong><p>Support learners with CPD, transcript and next-step questions.</p></div></div>
        </section>

        <section className="section soft" id="adviser">
          <div className="adviser-panel"><div><span className="small-label">Free Student Adviser Support</span><h2>Need help choosing the right course?</h2><p className="lead">This is designed for your outbound process: collect learner details, understand the career goal and recommend the right course, bundle or job-ready programme.</p><ul className="tick-list"><li>Course and bundle recommendation</li><li>Certification and transcript guidance</li><li>Career-pathway support</li><li>Team training and organisation enquiries</li></ul></div><form onSubmit={(event) => { event.preventDefault(); setFormSent(true); }}>{formSent ? <div className="success"><strong>Thank you.</strong><span>Connect this form to Formspree, HubSpot, Netlify Forms or your CRM before launch.</span></div> : <><label>Full Name<input required placeholder="e.g. Sarah Ahmed" /></label><label>Email Address<input type="email" required placeholder="name@example.com" /></label><label>Phone Number<input type="tel" required placeholder="07700 900000" /></label><label>Course Interest<textarea placeholder="Tell us what course, bundle or job goal you are interested in." /></label><button className="btn primary full" type="submit">Request Free Guidance</button><a className="email-link" href={mailto}>Open enquiry email instead</a></>}</form></div>
        </section>
      </main>

      <footer className="footer"><div className="logo"><span className="logo-mark">HT</span><span><strong>Health Tech Pro</strong><em>Online Learning Academy</em></span></div><p>© 2026 Health Tech Pro. Replace email, checkout links, privacy policy, terms and official accreditation wording before final launch.</p></footer>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
