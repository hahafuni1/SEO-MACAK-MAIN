// translations.js — all user-facing strings for Serbian (SR) and English (EN).
// SR is the default/canonical language. EN routes live under /en/.

export const translationsSR = {
  // ========== NAVIGATION ==========
  nav: {
    home: 'Početna',
    webDevelopment: 'Izrada sajtova',
    seo: 'SEO',
    blog: 'Blog',
    about: 'O nama',
    contact: 'Kontakt'
  },

  // ========== HOMEPAGE ==========
  home: {
    hero: {
      title: 'Gradimo sajtove koji zapravo donose rezultate',
      subtitle: 'Moderni web development + SEO optimizacija = Vaš rast na Google-u',
      cta: 'Zatražite Besplatnu Ponudu',
      refreshButton: 'Osveži Kartice'
    },
    meta: {
      title: 'SEO Mačak — SEO i Izrada Sajtova | Beograd',
      description: 'Profesionalna SEO optimizacija i izrada sajtova u Beogradu, Srbija. Stignite na #1 na Google-u sa dokazanim strategijama i modernim web rešenjima.'
    },
    whatWeDo: {
      title: 'Šta Radimo?',
      cards: [
        {
          title: 'SEO Optimizacija',
          desc: 'Dovedimo vaš sajt na vrh Google pretrage sa dokazanim SEO strategijama',
          cta: 'Saznaj Više'
        },
        {
          title: 'Web Razvoj',
          desc: 'Brzi, moderni sajtovi koji rade besprekorno na svim uređajima',
          cta: 'Pogledaj Usluge'
        },
        {
          title: 'Web Dizajn',
          desc: 'Unikatni dizajn koji privlači pažnju i pretvara posetioce u kupce',
          cta: 'Pogledaj Portfolio'
        }
      ]
    },
    howWeWork: {
      title: 'Kako Radimo?',
      steps: [
        {
          title: 'Otkrij',
          desc: 'Razgovaramo sa vama da razumemo vaš biznis, ciljeve i publiku'
        },
        {
          title: 'Strategija',
          desc: 'Kreiramo custom plan koji kombinuje dizajn, development i SEO'
        },
        {
          title: 'Rezultati',
          desc: 'Isporučujemo sajt koji donosi merljive rezultate i rast'
        },
        {
          title: 'Monitoring',
          desc: 'Kontinuirano praćenje performansi i optimizacija za još bolje rezultate'
        }
      ]
    },
    expertQuestion: {
      text: 'Imate',
      highlight: 'stručnija',
      textEnd: 'pitanja?'
    },
    services: {
      title: 'Naše',
      titleHighlight: 'SEO Usluge',
      items: [
        {
          title: 'Tehnički SEO',
          desc: 'Optimizujemo tehničku strukturu vašeg sajta za brže učitavanje, bolje indeksiranje i više rangiranje.',
          features: ['Optimizacija brzine', 'Mobile-First indeksiranje', 'Strukturirani podaci', 'XML Sitemap', 'Robots.txt optimizacija']
        },
        {
          title: 'On-Page SEO',
          desc: 'Optimizujemo sadržaj, meta tagove, naslove i interne linkove za maksimalnu SEO efikasnost.',
          features: ['Istraživanje ključnih reči', 'Optimizacija sadržaja', 'Meta tagovi', 'Interno linkovanje', 'Optimizacija slika']
        },
        {
          title: 'Off-Page SEO',
          desc: 'Gradimo autoritet sajta kroz kvalitetne backlinkove i pomenove brenda.',
          features: ['Link Building', 'Gostujući tekstovi', 'Pomenovi brenda', 'Socijalni signali', 'Lokalne citacije']
        },
        {
          title: 'Lokalni SEO',
          desc: 'Optimizujemo vaš sajt za lokalne pretrage i Google My Business profil.',
          features: ['Google My Business', 'Lokalne ključne reči', 'NAP konzistentnost', 'Lokalne citacije', 'Upravljanje recenzijama']
        }
      ]
    },
    process: {
      title: 'Naš',
      titleHighlight: 'SEO Proces',
      steps: [
        { step: '01', title: 'SEO Audit', desc: 'Kompletna analiza sajta, istraživanje konkurencije i ključnih reči' },
        { step: '02', title: 'Strategija', desc: 'Kreiramo custom SEO plan prema vašim ciljevima' },
        { step: '03', title: 'Implementacija', desc: 'Radimo tehničku, on-page i off-page optimizaciju' },
        { step: '04', title: 'Sadržaj', desc: 'Kreiramo SEO-optimizovan sadržaj koji rangira' },
        { step: '05', title: 'Link Building', desc: 'Gradimo kvalitetne backlinkove za povećanje autoriteta' },
        { step: '06', title: 'Monitoring', desc: 'Pratimo performanse i konstantno optimizujemo strategiju' }
      ]
    },
    faq: {
      title: 'Česta',
      titleHighlight: 'Pitanja',
      items: [
        {
          question: 'Šta je SEO optimizacija?',
          answer: 'SEO (Search Engine Optimization) je proces poboljšanja vidljivosti vašeg sajta u pretražnim rezultatima. Koristi se kombinacija tehnika za povećanje organskog prometa.'
        },
        {
          question: 'Koliko dugo traje da vidim rezultate?',
          answer: 'Rezultati se obično počinju viđati između 3-6 meseci, u zavisnosti od konkurencije i vremenske linije. Dugoročni rezultati mogu biti i bolji nakon 6-12 meseci.'
        },
        {
          question: 'Da li radite lokalno ili nacionalno?',
          answer: 'Radimo na svim nivoima - lokalno, nacionalno i međunarodno. Prilagođavamo strategije prema vašim ciljevima i gde vašim kupcima trebate biti vidljivi.'
        },
        {
          question: 'Koja je razlika između SEO i PPC?',
          answer: 'SEO je organsko rangiranje koje se gradi tokom vremena, dok je PPC (plaćena pretraga) trenutna vidljivost. SEO je dugoročno rešenje, a PPC je brz rezultat.'
        },
        {
          question: 'Kako će moj sajt izgledati?',
          answer: 'Kreiramo moderne, brze i mobilno-optimizovane sajte. Svaki sajt je prilagođen vašem brendu sa intuitivnom navigacijom i boljom konverzijom korisnika.'
        }
      ]
    },
    cta: {
      title: 'Spremni Za Vrhunski Ranking?',
      desc: 'Zatražite besplatan SEO audit i saznajte šta možete poboljšati.',
      button: 'Zatražite Besplatan SEO Audit'
    }
  },

  // ========== WEB DEVELOPMENT PAGE ==========
  webDevelopment: {
    meta: {
      title: 'Izrada Sajtova | SEO Mačak',
      description: 'Nudimo profesionalnu izradu sajtova sa fokusom na brzinu, moderan dizajn i SEO optimizaciju. Kreiramo rešenja koja donose rezultate.'
    },
    hero: {
      title: 'Profesionalna Izrada Sajtova',
      desc: 'Kreiraj snažnu online prisutnost sa modernim, brzim i SEO-optimizovanim sajtovima koji konvertuju posjetioce u klijente. U svetu gde prvi utisak traje samo nekoliko sekundi, mi gradimo platforme koje odmah ulivaju poverenje, dominiraju pretragom i pretvaraju tvoj digitalni prostor u najefikasniji prodajni alat koji radi za tebe 24/7.',
      cta: 'Zatražite Besplatnu Ponudu'
    },
    whyChooseUs: {
      title: 'Zašto Izabrati Nas?',
      reasons: [
        { title: 'Brzi Sajtovi', desc: 'Optimizovani za brže učitavanje - veća konverzija i bolja SEO rangiranja' },
        { title: 'Moderni Dizajn', desc: 'Unikatni, profesionalni dizajn koji se ističe i privlači pažnju' },
        { title: 'SEO-Ready', desc: 'Svaki sajt izgrađen sa SEO optimizacijom od prvog dana' },
        { title: 'Mobilno Prilagođeno', desc: 'Perfektno iskustvo na svim uređajima - telefon, tablet, desktop' },
        { title: 'Bezbednost', desc: 'SSL certifikat, zaštita podataka i redovni backup-i' },
        { title: 'Podrška', desc: 'Dostupni smo i nakon završetka projekta za sva pitanja' }
      ]
    },
    process: {
      title: 'Naš',
      titleHighlight: 'Proces',
      steps: [
        { step: '01', title: 'Otkrivanje', desc: 'Razgovaramo o vašim ciljevima, targetiranoj publici i potrebama projekta' },
        { step: '02', title: 'Planiranje', desc: 'Kreiramo strukturu sajta, wireframe-ove i strategiju za development' },
        { step: '03', title: 'Dizajn', desc: 'Dizajniramo moderan, atraktivan i brend-aligned interfejs' },
        { step: '04', title: 'Development', desc: 'Gradimo sajt sa čistim kodom, brzinom i SEO optimizacijom' },
        { step: '05', title: 'Testiranje', desc: 'Testiramo na svim uređajima i pregledačima - sve mora raditi savršeno' },
        { step: '06', title: 'Launch', desc: 'Objavljujemo sajt, podešavamo analitiku i pratimo performanse' }
      ]
    },
    pricing: {
      title: 'Početne',
      titleHighlight: 'Cene',
      desc: 'Svaki projekat je jedinstven. Ispod su orijentacione cene za različite tipove sajtova.',
      plans: [
        {
          name: 'Landing Page',
          price: 'Od €300',
          desc: 'Jednostrana stranica optimizovana za konverzije',
          features: ['Responsive dizajn', 'SEO optimizacija', 'Kontakt forma', 'Google Analytics', 'Osnovna animacija']
        },
        {
          name: 'Biznis Sajt',
          price: 'Od €800',
          desc: 'Kompletan multi-page sajt za vaš biznis',
          features: ['Do 10 stranica', 'Custom dizajn', 'SEO optimizacija', 'Blog sekcija', 'Kontakt forme', 'Google Maps integracija', '3 meseca podrške'],
          popular: true
        },
        {
          name: 'E-Commerce',
          price: 'Od €2000',
          desc: 'Online prodavnica sa kompleksnim funkcionalnostima',
          features: ['Neograničeni proizvodi', 'Korisnički nalozi', 'Payment gateway', 'Inventory management', 'Advanced SEO', 'Email marketing integracija', '6 meseci podrške']
        }
      ],
      note: 'Cene se prilagođavaju na osnovu specifičnih potreba projekta. Kontaktirajte nas za detaljnu ponudu.'
    },
    cta: {
      title: 'Spremni Za Vaš Novi Sajt?',
      desc: 'Zatražite besplatnu konsultaciju i ponudu danas.',
      button: 'Kontaktirajte Nas'
    }
  },

  // ========== ABOUT PAGE ==========
  about: {
    meta: {
      title: 'O nama | SEO Mačak',
      description: 'Upoznajte SEO Mačka — agenciju koja kombinuje SEO, web development i dizajn da bi vaš biznis bio vidljiv i konkurentan online.'
    },
    hero: {
      subtitle: 'Više od agencije. Manja od korporacije. Tačno pravi partner za vaš digitalni rast.'
    }
  },

  // ========== SEO PAGE ==========
  seo: {
    meta: {
      title: 'SEO Optimizacija | SEO Mačak',
      description: 'Stignite na vrh Google pretrage sa našim SEO uslugama. Nudimo tehnički SEO, link building i content strategiju za dominaciju u niši.'
    }
  },

  // ========== BLOG PAGE ==========
  blog: {
    meta: {
      title: 'Blog | SEO Mačak',
      description: 'Blog o SEO optimizaciji, web development-u i digitalnom marketingu. Čitajte naše tekstove i naučite kako poboljšati vašu online prisutnost.'
    },
    hero: {
      overline: '📚 ZNANJE I UVIDI',
      title: 'SEO Blog: Pravi Savjeti,',
      titleHighlight: 'Bez Bullshita',
      subtitle: 'Artikli o SEO, razvoju, i strategiji pisani od osobe koja je zaista radila (i neuspjela) tisuće puta.'
    },
    categories: {
      all: 'Sve Članke',
      seo: 'SEO Strategija',
      technical: 'Tehnički SEO',
      content: 'Sadržaj'
    },
    readMore: 'Pročitaj Više',
    readTime: 'min čitanja'
  },

  // ========== CONTACT PAGE ==========
  contact: {
    meta: {
      title: 'Kontakt | SEO Mačak',
      description: 'Kontaktirajte nas za besplatnu konsultaciju. Tu smo da odgovorimo na vaša pitanja o izradi sajtova, SEO optimizaciji i digitalnom marketingu.'
    },
    hero: {
      overline: '💬 KONTAKT',
      title: 'Započnimo Vaš',
      titleHighlight: 'Digitalni Uspjeh',
      subtitle: 'Popunite formu ispod i javićemo vam se u roku od 24 sata.'
    },
    form: {
      name: 'Vaše Ime',
      namePlaceholder: 'Marko Marković',
      email: 'Email Adresa',
      emailPlaceholder: 'marko@primer.com',
      phone: 'Telefon (opcionalno)',
      phonePlaceholder: '+381 60 123 4567',
      message: 'Vaša Poruka',
      messagePlaceholder: 'Opišite vaš projekat ili pitanje...',
      submit: 'Pošaljite Poruku',
      submitting: 'Šaljem...',
      success: '✅ Poruka uspješno poslata! Javićemo se uskoro.',
      error: '❌ Greška prilikom slanja. Pokušajte ponovo.'
    },
    info: {
      title: 'Ili Nas Kontaktirajte Direktno',
      email: 'Email',
      emailValue: 'kontakt@seomacak.com',
      phone: 'Telefon',
      phoneValue: '+381 60 123 4567',
      location: 'Lokacija',
      locationValue: 'Beograd, Srbija'
    }
  },

  // ========== 404 PAGE ==========
  notFound: {
    title: 'Stranica nije pronađena',
    description: 'Izgleda da stranica koju tražite ne postoji.',
    button: 'Vrati se na početnu'
  }
}

export const translationsEN = {
  // ========== NAVIGATION ==========
  nav: {
    home: 'Home',
    webDevelopment: 'Web Development',
    seo: 'SEO',
    blog: 'Blog',
    about: 'About',
    contact: 'Contact'
  },

  // ========== HOMEPAGE ==========
  home: {
    hero: {
      title: 'We Build Websites That Actually Deliver Results',
      subtitle: 'Modern web development + SEO optimization = Your growth on Google',
      cta: 'Get Your Free Quote',
      refreshButton: 'Refresh Cards'
    },
    meta: {
      title: 'SEO Mačak — SEO & Web Development | Belgrade',
      description: 'Professional SEO optimization and web development services in Belgrade, Serbia. Get to #1 on Google with proven strategies and modern web solutions.'
    },
    whatWeDo: {
      title: 'What We Do',
      cards: [
        {
          title: 'SEO Optimization',
          desc: 'Bring your website to the top of Google search with proven SEO strategies',
          cta: 'Learn More'
        },
        {
          title: 'Web Development',
          desc: 'Fast, modern websites that work seamlessly on all devices',
          cta: 'View Services'
        },
        {
          title: 'Web Design',
          desc: 'Unique design that attracts attention and converts visitors into customers',
          cta: 'View Portfolio'
        }
      ]
    },
    howWeWork: {
      title: 'How We Work',
      steps: [
        {
          title: 'Discover',
          desc: 'We talk with you to understand your business, goals, and audience'
        },
        {
          title: 'Strategy',
          desc: 'We create a custom plan combining design, development, and SEO'
        },
        {
          title: 'Results',
          desc: 'We deliver a website that brings measurable results and growth'
        },
        {
          title: 'Monitoring',
          desc: 'Ongoing performance tracking and optimization for even better results'
        }
      ]
    },
    expertQuestion: {
      text: 'Have',
      highlight: 'expert',
      textEnd: 'questions?'
    },
    services: {
      title: 'Our',
      titleHighlight: 'SEO Services',
      items: [
        {
          title: 'Technical SEO',
          desc: 'We optimize the technical structure of your site for faster loading, better indexing, and higher ranking.',
          features: ['Site Speed Optimization', 'Mobile-First Indexing', 'Structured Data', 'XML Sitemap', 'Robots.txt Optimization']
        },
        {
          title: 'On-Page SEO',
          desc: 'We optimize content, meta tags, headings, and internal links for maximum SEO efficiency.',
          features: ['Keyword Research', 'Content Optimization', 'Meta Tags', 'Internal Linking', 'Image Optimization']
        },
        {
          title: 'Off-Page SEO',
          desc: 'We build site authority through quality backlinks and brand mentions.',
          features: ['Link Building', 'Guest Posting', 'Brand Mentions', 'Social Signals', 'Local Citations']
        },
        {
          title: 'Local SEO',
          desc: 'We optimize your site for local searches and Google My Business profile.',
          features: ['Google My Business', 'Local Keywords', 'NAP Consistency', 'Local Citations', 'Review Management']
        }
      ]
    },
    process: {
      title: 'Our',
      titleHighlight: 'SEO Process',
      steps: [
        { step: '01', title: 'SEO Audit', desc: 'Complete site analysis, competitor research, and keyword research' },
        { step: '02', title: 'Strategy', desc: 'We create a custom SEO plan based on your goals' },
        { step: '03', title: 'Implementation', desc: 'We do technical, on-page, and off-page optimization' },
        { step: '04', title: 'Content', desc: 'We create SEO-optimized content that ranks' },
        { step: '05', title: 'Link Building', desc: 'We build quality backlinks to increase authority' },
        { step: '06', title: 'Monitoring', desc: 'We track performance and constantly optimize strategy' }
      ]
    },
    faq: {
      title: 'Frequently Asked',
      titleHighlight: 'Questions',
      items: [
        {
          question: 'What is SEO optimization?',
          answer: 'SEO (Search Engine Optimization) is the process of improving your website\'s visibility in search results. A combination of techniques is used to increase organic traffic.'
        },
        {
          question: 'How long does it take to see results?',
          answer: 'Results typically start to appear within 3-6 months, depending on competition and the timeline. Long-term results can be even better after 6-12 months.'
        },
        {
          question: 'Do you work locally or nationally?',
          answer: 'We work at all levels — local, national, and international. We tailor strategies to your goals and where you need to be visible to your customers.'
        },
        {
          question: 'What is the difference between SEO and PPC?',
          answer: 'SEO is organic ranking built over time, while PPC (paid search) is immediate visibility. SEO is a long-term solution, while PPC delivers fast results.'
        },
        {
          question: 'What will my website look like?',
          answer: 'We create modern, fast, and mobile-optimized websites. Every site is tailored to your brand with intuitive navigation and better user conversion.'
        }
      ]
    },
    cta: {
      title: 'Ready for Top Rankings?',
      desc: 'Request a free SEO audit and find out what you can improve.',
      button: 'Request Free SEO Audit'
    }
  },

  // ========== WEB DEVELOPMENT PAGE ==========
  webDevelopment: {
    meta: {
      title: 'Website Development | SEO Mačak',
      description: 'Professional website development with a focus on speed, modern design, and SEO optimization. We create solutions that deliver results.'
    },
    hero: {
      title: 'Professional Website Development',
      desc: 'Build a strong online presence with modern, fast, and SEO-optimized websites that convert visitors into clients. We build platforms that immediately inspire trust, dominate search, and turn your digital space into your most effective sales tool — working for you 24/7.',
      cta: 'Get Your Free Quote'
    },
    whyChooseUs: {
      title: 'Why Choose Us?',
      reasons: [
        { title: 'Fast Websites', desc: 'Optimized for faster loading — higher conversion and better SEO rankings' },
        { title: 'Modern Design', desc: 'Unique, professional design that stands out and attracts attention' },
        { title: 'SEO-Ready', desc: 'Every site built with SEO optimization from day one' },
        { title: 'Mobile-First', desc: 'Perfect experience on all devices — phone, tablet, desktop' },
        { title: 'Security', desc: 'SSL certificate, data protection, and regular backups' },
        { title: 'Support', desc: 'We\'re available even after project completion for all questions' }
      ]
    },
    process: {
      title: 'Our',
      titleHighlight: 'Process',
      steps: [
        { step: '01', title: 'Discovery', desc: 'We discuss your goals, target audience, and project requirements' },
        { step: '02', title: 'Planning', desc: 'We create the site structure, wireframes, and development strategy' },
        { step: '03', title: 'Design', desc: 'We design a modern, attractive, and brand-aligned interface' },
        { step: '04', title: 'Development', desc: 'We build the site with clean code, speed, and SEO optimization' },
        { step: '05', title: 'Testing', desc: 'We test on all devices and browsers — everything must work perfectly' },
        { step: '06', title: 'Launch', desc: 'We publish the site, set up analytics, and monitor performance' }
      ]
    },
    pricing: {
      title: 'Starting',
      titleHighlight: 'Prices',
      desc: 'Every project is unique. Below are indicative prices for different types of websites.',
      plans: [
        {
          name: 'Landing Page',
          price: 'From €300',
          desc: 'Single-page site optimized for conversions',
          features: ['Responsive design', 'SEO optimization', 'Contact form', 'Google Analytics', 'Basic animations']
        },
        {
          name: 'Business Website',
          price: 'From €800',
          desc: 'Complete multi-page site for your business',
          features: ['Up to 10 pages', 'Custom design', 'SEO optimization', 'Blog section', 'Contact forms', 'Google Maps integration', '3 months support'],
          popular: true
        },
        {
          name: 'E-Commerce',
          price: 'From €2000',
          desc: 'Online store with complex functionality',
          features: ['Unlimited products', 'User accounts', 'Payment gateway', 'Inventory management', 'Advanced SEO', 'Email marketing integration', '6 months support']
        }
      ],
      note: 'Prices are adjusted based on specific project requirements. Contact us for a detailed quote.'
    },
    cta: {
      title: 'Ready for Your New Website?',
      desc: 'Request a free consultation and quote today.',
      button: 'Contact Us'
    }
  },

  // ========== ABOUT PAGE ==========
  about: {
    meta: {
      title: 'About | SEO Mačak',
      description: 'Meet the person behind SEO Mačak — combining SEO, web development, and design to make your business visible and competitive online.'
    },
    hero: {
      subtitle: 'More than an agency. Smaller than a corporation. Exactly the right partner for your digital growth.'
    }
  },

  // ========== SEO PAGE ==========
  seo: {
    meta: {
      title: 'SEO Optimization | SEO Mačak',
      description: 'Reach the top of Google search with our SEO optimization services. We offer technical SEO, link building, and content strategy to dominate your niche.'
    },
    hero: {
      overline: '🚀 SEO OPTIMIZATION',
      title: 'SEO That',
      titleHighlight: 'Actually Works',
      subtitle: 'Get your website to the top of Google search. No tricks. No false promises. Just results that grow long-term.',
      cta: 'Start With Free SEO Audit'
    },
    whySeo: {
      title: 'Why',
      titleHighlight: 'SEO',
      subtitle: 'More than half of traffic comes from organic search. Here\'s why you need SEO NOW:',
      refreshButton: 'Refresh Cards'
    },
    services: {
      title: 'Our',
      titleHighlight: 'SEO Services',
      items: [
        {
          title: 'Technical SEO',
          desc: 'We optimize the technical structure of your site for faster loading, better indexing, and higher ranking.',
          features: ['Site Speed Optimization', 'Mobile-First Indexing', 'Structured Data', 'XML Sitemap', 'Robots.txt Optimization']
        },
        {
          title: 'On-Page SEO',
          desc: 'We optimize content, meta tags, headings, and internal links for maximum SEO efficiency.',
          features: ['Keyword Research', 'Content Optimization', 'Meta Tags', 'Internal Linking', 'Image Optimization']
        },
        {
          title: 'Off-Page SEO',
          desc: 'We build site authority through quality backlinks and brand mentions.',
          features: ['Link Building', 'Guest Posting', 'Brand Mentions', 'Social Signals', 'Local Citations']
        },
        {
          title: 'Local SEO',
          desc: 'We optimize your site for local searches and Google My Business profile.',
          features: ['Google My Business', 'Local Keywords', 'NAP Consistency', 'Local Citations', 'Review Management']
        }
      ]
    },
    process: {
      title: 'Our',
      titleHighlight: 'SEO Process',
      steps: [
        { step: '01', title: 'SEO Audit', desc: 'Complete site analysis, competitor research, and keyword research' },
        { step: '02', title: 'Strategy', desc: 'We create a custom SEO plan based on your goals' },
        { step: '03', title: 'Implementation', desc: 'We do technical, on-page, and off-page optimization' },
        { step: '04', title: 'Content', desc: 'We create SEO-optimized content that ranks' },
        { step: '05', title: 'Link Building', desc: 'We build quality backlinks to increase authority' },
        { step: '06', title: 'Monitoring', desc: 'We track performance and constantly optimize strategy' }
      ]
    },
    faq: {
      title: 'Frequently Asked',
      titleHighlight: 'Questions',
      items: [
        {
          question: 'What is SEO optimization?',
          answer: 'SEO (Search Engine Optimization) is the process of improving your website\'s visibility in search results. A combination of techniques is used to increase organic traffic.'
        },
        {
          question: 'How long does it take to see results?',
          answer: 'Results typically start to appear within 3-6 months, depending on competition and the timeline. Long-term results can be even better after 6-12 months.'
        },
        {
          question: 'Do you work locally or nationally?',
          answer: 'We work at all levels — local, national, and international. We tailor strategies to your goals and where you need to be visible to your customers.'
        },
        {
          question: 'What is the difference between SEO and PPC?',
          answer: 'SEO is organic ranking built over time, while PPC (paid search) is immediate visibility. SEO is a long-term solution, while PPC delivers fast results.'
        },
        {
          question: 'What will my website look like?',
          answer: 'We create modern, fast, and mobile-optimized websites. Every site is tailored to your brand with intuitive navigation and better user conversion.'
        }
      ]
    },
    cta: {
      title: 'Ready for Top Rankings?',
      desc: 'Request a free SEO audit and find out what you can improve.',
      button: 'Request Free SEO Audit'
    }
  },

  // ========== BLOG PAGE ==========
  blog: {
    meta: {
      title: 'Blog | SEO Mačak',
      description: 'SEO and web development insights from the team at SEO Mačak. Read articles to improve your online presence.'
    },
    hero: {
      overline: '📚 KNOWLEDGE & INSIGHTS',
      title: 'SEO Blog: Real Advice,',
      titleHighlight: 'No Bullshit',
      subtitle: 'Articles on SEO, development, and strategy written by someone who\'s actually done (and failed) thousands of times.'
    },
    categories: {
      all: 'All Posts',
      seo: 'SEO Strategy',
      technical: 'Technical SEO',
      content: 'Content'
    },
    readMore: 'Read More',
    readTime: 'min read'
  },

  // ========== CONTACT PAGE ==========
  contact: {
    meta: {
      title: 'Contact | SEO Mačak',
      description: 'Contact us for a free consultation. We\'re here to answer your questions about web development, SEO optimization, and digital marketing.'
    },
    hero: {
      overline: '💬 CONTACT',
      title: 'Let\'s Start Your',
      titleHighlight: 'Digital Success',
      subtitle: 'Fill out the form below and we\'ll get back to you within 24 hours.'
    },
    form: {
      name: 'Your Name',
      namePlaceholder: 'John Smith',
      email: 'Email Address',
      emailPlaceholder: 'john@example.com',
      phone: 'Phone (optional)',
      phonePlaceholder: '+381 60 123 4567',
      message: 'Your Message',
      messagePlaceholder: 'Describe your project or question...',
      submit: 'Send Message',
      submitting: 'Sending...',
      success: '✅ Message sent successfully! We\'ll be in touch soon.',
      error: '❌ Error sending message. Please try again.'
    },
    info: {
      title: 'Or Contact Us Directly',
      email: 'Email',
      emailValue: 'kontakt@seomacak.com',
      phone: 'Phone',
      phoneValue: '+381 60 123 4567',
      location: 'Location',
      locationValue: 'Belgrade, Serbia'
    }
  },

  // ========== 404 PAGE ==========
  notFound: {
    title: 'Page not found',
    description: 'The page you\'re looking for doesn\'t exist.',
    button: 'Back to home'
  }
}
