// translations.js - Svi tekstovi za Srpski i Engleski

export const translationsSR = {
  // ========== HEADER / NAVIGATION ==========
  nav: {
    home: 'Početna',
    webDevelopment: 'Izrada sajtova',
    seo: 'SEO',
    blog: 'Blog',
    about: 'O nama',
    contact: 'Kontakt'
  },

  // ========== HOMEPAGE - PINNED HERO SECTION ==========
  home: {
    hero: {
      title: 'Gradimo sajtove koji zapravo donose rezultate',
      subtitle: 'Moderni web development + SEO optimizacija = Vaš rast na Google-u',
      cta: 'Zatražite Besplatnu Ponudu',
      refreshButton: 'Refresh Cards'
    },
    meta: {
      title: 'SEO Mačak - Početna',
      description: 'Moderni web development i SEO optimizacija za rast vašeg biznisa na Google-u. Nudimo izradu sajtova, SEO, i web dizajn usluge.'
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

  // ========== BLOG PAGE ==========
  blog: {
    meta: {
      title: 'Blog | SEO Mačak',
      description: 'Our blog covers topics such as SEO optimization, web development, and digital marketing. Read our articles and learn how to improve your online presence.'
    },
    hero: {
      overline: '📚 KNOWLEDGE & INSIGHTS',
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
      title: 'Contact | SEO Mačak',
      description: 'Contact us for a free consultation. We are here to answer your questions about website development, SEO optimization, and digital marketing.'
    },
    hero: {
      overline: '💬 CONTACT',
      title: 'Započnimo Vaš',
      titleHighlight: 'Digitalni Uspjeh',
      subtitle: 'Popunite formu ispod i javićemo vam se u roku od 24 sata.'
    },
    form: {
      name: 'Vaše Ime',
      namePlaceholder: 'Marko Marković',
      email: 'Email Adresa',
      emailPlaceholder: 'marko@primjer.com',
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
      location: 'Location',
      locationValue: 'Beograd, Serbia'
    }
  },

  // ========== NOT FOUND PAGE ==========
  notFound: {
    title: 'Stranica nije pronađena',
    description: 'Izgleda da stranica koju tražite ne postoji.',
    button: 'Vrati se na početnu'
  }
}

export const translationsEN = {
  // ========== HEADER / NAVIGATION ==========
  nav: {
    home: 'Home',
    webDevelopment: 'Web Development',
    seo: 'SEO',
    blog: 'Blog',
    about: 'About',
    contact: 'Contact'
  },

  // ========== HOMEPAGE - PINNED HERO SECTION ==========
  home: {
    hero: {
      title: 'Gradimo sajtove koji zapravo donose rezultate',
      subtitle: 'Moderni web development + SEO optimizacija = Vaš rast na Google-u',
      cta: 'Zatražite Besplatnu Ponudu'
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
    meta: {
      title: 'O Nama | SEO Mačak',
      description: 'Upoznajte tim koji stoji iza SEO Mačka. Mi smo više od agencije; mi smo vaš partner u digitalnom rastu, posvećeni transparentnosti i rezultatima.'
    }
  },

  // ========== WEB DEVELOPMENT PAGE ==========
  webDevelopment: {
    meta: {
      title: 'Izrada Sajtova | SEO Mačak',
      description: 'Nudimo profesionalnu izradu sajtova sa fokusom na brzinu, moderan dizajn i SEO optimizaciju. Kreiramo rešenja koja donose rezultate.'
    }
  },

  // ========== ABOUT PAGE ==========
  about: {
    hero: {
      overline: 'UPOZNAJTE NAS',
      title: 'Ko je',
      titleHighlight: 'SEO Mačak',
      subtitle: 'Više od agencije. Manja od korporacije. Tačno pravi partner za vaš digitalni rast.'
    },
    founder: {
      title: 'Pokrenut od',
      titleHighlight1: 'Strasti',
      titleMiddle: ', Vođen',
      titleHighlight2: 'Rezultatima',
      paragraph1: 'Ja sam Marko, osnivač SEO Mačka. Prije 7 godina, bio sam obični developer koji je primjetio nešto: sve što gradim ostane nevidljivo bez dobroga SEO-a.',
      paragraph2: 'Tada sam se zaronio u SEO. Godinama eksperimentisanja, stotinama projekata i nebrojenim greškama kasnije, naučio sam šta čini razliku između sajtova koji zarađuju i onih koji ostaju skriveni.',
      paragraph3: 'Kada sam video koliku moć imali ovi principi, znao sam da trebam da ih dijelim - ne kroz velike agencije, već kroz direktnu, iskrenu pomoć razvijaču i vlasnicima biznisa.',
      mission: {
        label: '✨ MISIJA',
        text: 'Pomoći preduzetnicima i agencijama da izgare onaj prvi komad rasta na Google-u, bez tehničkih frikcija, bez praznih obećanja.'
      }
    },
    whyUs: {
      title: 'Zašto',
      titleHighlight: 'SEO Mačak',
      reasons: [
        {
          title: 'Transparentnost Prije Svega',
          desc: 'Bez skrivenih troškova, bez nejasnih termina. Sve je jasno i otvoreno.'
        },
        {
          title: 'SEO-First Pristup',
          desc: 'Svaki sajt, svaki red koda - dizajniran za Google i korisnike.'
        },
        {
          title: 'Dostupna Podrška',
          desc: 'Ne isčezavamo poslije isporuke. Ovdje smo kada vam zatreba.'
        },
        {
          title: 'Merljivi Rezultati',
          desc: 'Pratimo metrike koje zaista bitne - saobraćaj, konverzije, profit.'
        }
      ]
    },
    values: {
      title: 'Naše',
      titleHighlight: 'Vrednosti',
      items: [
        {
          emoji: '🎯',
          title: 'Fokus na Rezultat',
          desc: 'Fokusirani smo na vaš rast, ne na gomilu beskorisnih metrika.'
        },
        {
          emoji: '💡',
          title: 'Prosti Pristup',
          desc: 'Komplikovane stvari pretvaramo u jasne, jednostavne korake.'
        },
        {
          emoji: '🤝',
          title: 'Dugoročan Partner',
          desc: 'Ne radimo brze projekate. Gradimo dugoročne partnerstvo.'
        },
        {
          emoji: '⚡',
          title: 'Brzina & Kvalitet',
          desc: 'Nikada ne žrtvujemo kvalitet zarad brzine, već nalazimo balans.'
        }
      ]
    },
    cta: {
      title: 'Spremni za Rast?',
      desc: 'Kontaktirajte nas danas i započnimo vaš digitalni uspjeh zajedno.',
      button: 'Kontaktirajte Nas'
    }
  },

  // ========== WEB DEVELOPMENT PAGE ==========
  webDevelopment: {
    meta: {
      title: 'Website Development | SEO Mačak',
      description: 'We offer professional website development with a focus on speed, modern design, and SEO optimization. We create solutions that deliver results.'
    },
    hero: {
      title: 'Profesionalna Izrada Sajtova',
      desc: 'Kreiraj snažnu online prisutnost sa modernim, brzim i SEO-optimizovanim sajtovima koji konvertuju posjetioce u klijente. U svetu gde prvi utisak traje samo nekoliko sekundi, mi gradimo platforme koje odmah ulivaju poverenje, dominiraju pretragom i pretvaraju tvoj digitalni prostor u najefikasniji prodajni alat koji radi za tebe 24/7.',
      cta: 'Get Your Free Quote'
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
        {
          step: '01',
          title: 'Otkrivanje',
          desc: 'Razgovaramo o vašim ciljevima, targetiranoj publici i potrebama projekta'
        },
        {
          step: '02',
          title: 'Planiranje',
          desc: 'Kreiramo strukturu sajta, wireframe-ove i strategiju za development'
        },
        {
          step: '03',
          title: 'Dizajn',
          desc: 'Dizajniramo moderan, atraktivan i brend-aligned interfejs'
        },
        {
          step: '04',
          title: 'Development',
          desc: 'Gradimo sajt sa čistim kodom, brzinom i SEO optimizacijom'
        },
        {
          step: '05',
          title: 'Testiranje',
          desc: 'Testiramo na svim uređajima i pregledačima - sve mora raditi savršeno'
        },
        {
          step: '06',
          title: 'Launch',
          desc: 'Objavljujemo sajt, podešavamo analitiku i pratimo performanse'
        }
      ]
    },
    portfolio: {
      title: 'Naši',
      titleHighlight: 'Projekti',
      desc: 'Radili smo na raznovrsnim projektima, od e-commerce platformi do SaaS aplikacija',
      projects: [
        {
          title: 'E-Commerce Platforme',
          desc: 'Kreiramo unikatna e-commerce rešenja prilagođena vašem brendu, spajajući vrhunski dizajn sa besprekornim korisničkim iskustvom.',
          result: '-40% napuštenih korpi',
          tech: 'React, Node.js, Stripe'
        },
        {
          title: 'SaaS Aplikacije',
          desc: 'Custom SaaS rešenja sa složenom backend logikom i intuitivnim frontend interfejsom.',
          result: 'Real-time obrada podataka',
          tech: 'React, PostgreSQL, AWS (po potrebi)'
        },
        {
          title: 'SEO Optimizacija',
          desc: 'Kompletan SEO audit i optimizacija dovodi do sigurnog uspeha u google pretrazivanju.',
          result: 'Visoki Google Rankovi',
          tech: 'Technical SEO, Link Building, Content Strategija'
        },
        {
          title: 'Dizajn & Branding - Rebranding',
          desc: 'Kompletan rebranding uključujući novi logo, boju, tipografiju i jedan od najunikatnijih web dizajna u Srbiji.',
          result: '+200% angažmana dizajna',
          tech: 'Web Dizajn, UX/UI, Brand Strategija'
        }
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
          features: [
            'Responsive dizajn',
            'SEO optimizacija',
            'Kontakt forma',
            'Google Analytics',
            'Osnovna animacija'
          ]
        },
        {
          name: 'Biznis Sajt',
          price: 'Od €800',
          desc: 'Kompletan multi-page sajt za vaš biznis',
          features: [
            'Do 10 stranica',
            'Custom dizajn',
            'SEO optimizacija',
            'Blog sekcija',
            'Kontakt forme',
            'Google Maps integracija',
            '3 meseca podrške'
          ],
          popular: true
        },
        {
          name: 'E-Commerce',
          price: 'Od €2000',
          desc: 'Online prodavnica sa kompleksnim funkcionalnostima',
          features: [
            'Neograničeni proizvodi',
            'Korisnički nalozi',
            'Payment gateway',
            'Inventory management',
            'Advanced SEO',
            'Email marketing integracija',
            '6 meseci podrške'
          ]
        }
      ],
      note: 'Cene se prilagođavaju na osnovu specifičnih potreba projekta. Kontaktirajte nas za detaljnu ponudu.'
    },
    cta: {
      title: 'Spremni Za Vaš Novi Sajt?',
      desc: 'Zatražite besplatnu konsultaciju i ponudu danas.',
      button: 'Kontaktirajte Nas'
    },
    meta: {
      title: 'About Us | SEO Mačak',
      description: 'Meet the team behind SEO Mačak. We are more than an agency; we are your partner in digital growth, committed to transparency and results.'
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
      stickers: [
        '93% of traffic starts from Google',
        'Your competition is already building authority',
        'SEO is a digital asset, not a cost',
        'Be where your customers are looking',
        '3x higher ROI than paid advertising',
        'Your site works 24/7 for you',
        'Free traffic. Forever.',
        'Google needs time to love you',
        '93% of experiences start with search',
        'Top 3 spots = 60% of all clicks',
        '$0 per click',
        'SEO is digital real estate',
        'Ads turn off, SEO doesn\'t',
        'While you wait, competition profits',
        'Google signed your diploma',
        'First page is downtown digital',
        'You\'re invisible on page 2 of Google',
        'Your brand on autopilot',
        '75% never click \'Next\'',
        'Paid ads are rent, SEO is equity',
        'Every day waiting = +10 steps behind rivals',
        'Customers trust the algorithm, not ads',
        'SEO works when budget dries up',
        'Lower customer acquisition cost (CAC)',
        'This is the only marketing that doesn\'t expire',
        'SEO is your cheapest employee',
        'Ads are rent, SEO is your house',
        'Pay per click or own the market',
        'Investment that doesn\'t ask for salary 24/7',
        'Lower marketing cost while sales grow',
        'Love at first click (and first page)',
        'Customers trust Google, Google trusts you',
        'Be an authority, not just an option',
        'First page is proof you\'re the best',
        'Your competition is stealing customers right now',
        'While you hesitate, they build walls',
        'Overtake them while they\'re sleeping',
        'Be the hunter, not prey in the market',
        'Page 2 of Google is a desert',
        'Invisible business is a hobby, not a job',
        'Your site deserves more than zero visits',
        'Google is ignoring you. Change that.',
        'Best time was yesterday, second is NOW',
        'SEO is a marathon starting with your sprint',
        'Today you build foundations for 2027 profit',
        'Every day waiting is one more day for competition'
      ],
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

  // ========== BLOG PAGE ==========
  blog: {
    meta: {
      title: 'Blog | SEO Mačak',
      description: 'Our blog covers topics such as SEO optimization, web development, and digital marketing. Read our articles and learn how to improve your online presence.'
    },
    hero: {
      overline: '📚 KNOWLEDGE & INSIGHTS',
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
      title: 'Contact | SEO Mačak',
      description: 'Contact us for a free consultation. We are here to answer your questions about website development, SEO optimization, and digital marketing.'
    },
    hero: {
      overline: '💬 CONTACT',
      title: 'Započnimo Vaš',
      titleHighlight: 'Digitalni Uspjeh',
      subtitle: 'Popunite formu ispod i javićemo vam se u roku od 24 sata.'
    },
    form: {
      name: 'Vaše Ime',
      namePlaceholder: 'Marko Marković',
      email: 'Email Adresa',
      emailPlaceholder: 'marko@primjer.com',
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
      location: 'Location',
      locationValue: 'Beograd, Serbia'
    }
  },

  // ========== NOT FOUND PAGE ==========
  notFound: {
    title: 'Stranica nije pronađena',
    description: 'Izgleda da stranica koju tražite ne postoji.',
    button: 'Vrati se na početnu'
  }
}

