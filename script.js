/**
 * ==========================================================================
 * THE AFRICA EXPLORERS - INTERACTIVE SCRIPTS
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ------------------------------------------------------------------------
  // 1. Navigation Bar Scroll Effects
  // ------------------------------------------------------------------------
  const navbar = document.getElementById('mainNavbar');
  const backToTopBtn = document.getElementById('backToTopBtn');

  const handleScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset;

    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ------------------------------------------------------------------------
  // 2. Video Autoplay Assurance & Fallback
  // ------------------------------------------------------------------------
  const heroVideo = document.getElementById('heroVideo');
  if (heroVideo) {
    const playPromise = heroVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.info('Auto-play was prevented by browser policy. Video is muted and ready.', error);
        heroVideo.muted = true;
        heroVideo.play().catch(e => console.error(e));
      });
    }
  }

  // ------------------------------------------------------------------------
  // 3. Scroll Reveal Animation (Intersection Observer)
  // ------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback for browsers without IntersectionObserver
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // ------------------------------------------------------------------------
  // 4. Complete Nigerian States Data for "View All States" Modal
  // ------------------------------------------------------------------------
  const nigerianStatesData = [
    { name: 'Abia', capital: 'Umuahia', region: 'South East', status: 'Coming Soon', highlight: 'National War Museum, Arochukwu Cave' },
    { name: 'Adamawa', capital: 'Yola', region: 'North East', status: 'Coming Soon', highlight: 'Sukur Cultural Landscape, Mandara Mountains' },
    { name: 'Akwa Ibom', capital: 'Uyo', region: 'South South', status: 'Coming Soon', highlight: 'Ibom Icon Golf Resort, Marina Beach' },
    { name: 'Anambra', capital: 'Awka', region: 'South East', status: 'Coming Soon', highlight: 'Ogbunike Caves, Rojenny Tourist Village' },
    { name: 'Bauchi', capital: 'Bauchi', region: 'North East', status: 'Coming Soon', highlight: 'Yankari National Park, Wikki Warm Springs' },
    { name: 'Bayelsa', capital: 'Yenagoa', region: 'South South', status: 'Coming Soon', highlight: 'Ox-Bow Lake, Peace Park, Mangrove Creeks' },
    { name: 'Benue', capital: 'Makurdi', region: 'North Central', status: 'Coming Soon', highlight: 'River Benue, Doma Dam, Ikyogen Hills' },
    { name: 'Borno', capital: 'Maiduguri', region: 'North East', status: 'Coming Soon', highlight: 'Lake Chad Basin, Shehu Palace' },
    { name: 'Cross River', capital: 'Calabar', region: 'South South', status: 'Coming Soon', highlight: 'Calabar Carnival, Obudu Mountain Resort' },
    { name: 'Delta', capital: 'Asaba', region: 'South South', status: 'Coming Soon', highlight: 'River Ethiope, Abraka Turf Club' },
    { name: 'Ebonyi', capital: 'Abakaliki', region: 'South East', status: 'Coming Soon', highlight: 'Amanchor Cave, Green Lake, Salt Lakes' },
    { name: 'Edo', capital: 'Benin City', region: 'South South', status: 'Coming Soon', highlight: 'Benin Bronze Kingdom, Okomu National Park' },
    { name: 'Ekiti', capital: 'Ado-Ekiti', region: 'South West', status: 'Coming Soon', highlight: 'Ikogosi Warm & Cold Springs, Arinta Waterfalls' },
    { name: 'Enugu', capital: 'Enugu', region: 'South East', status: 'Coming Soon', highlight: 'Awhum Waterfalls, Ngwo Pine Forest & Caves' },
    { name: 'Gombe', capital: 'Gombe', region: 'North East', status: 'Coming Soon', highlight: 'Tangale Peak, Tomb of Buba Yero' },
    { name: 'Imo', capital: 'Owerri', region: 'South East', status: 'Coming Soon', highlight: 'Oguta Lake, Mbari Cultural Center' },
    { name: 'Jigawa', capital: 'Dutse', region: 'North West', status: 'Coming Soon', highlight: 'Baturiya Bird Sanctuary, Dutse Rock Range' },
    { name: 'Kaduna', capital: 'Kaduna', region: 'North West', status: 'Coming Soon', highlight: 'Matsirga Waterfalls, Kajuru Castle, Nok Settlement' },
    { name: 'Kano', capital: 'Kano', region: 'North West', status: 'Coming Soon', highlight: 'Ancient Kano Dye Pits, Emir Palace, Dala Hill' },
    { name: 'Katsina', capital: 'Katsina', region: 'North West', status: 'Coming Soon', highlight: 'Gobarau Minaret, Kusugu Well, Durbar Festival' },
    { name: 'Kebbi', capital: 'Birnin Kebbi', region: 'North West', status: 'Coming Soon', highlight: 'Argungu International Fishing Festival' },
    { name: 'Kogi', capital: 'Lokoja', region: 'North Central', status: 'Coming Soon', highlight: 'Confluence of Niger and Benue, Mount Patti' },
    { name: 'Kwara', capital: 'Ilorin', region: 'North Central', status: 'Coming Soon', highlight: 'Owu Waterfalls, Esie Stone Images' },
    { name: 'Lagos', capital: 'Ikeja', region: 'South West', status: 'Unlocked', highlight: 'Lekki Bridge, Eko Atlantic, Nike Art Gallery, Beaches' },
    { name: 'Nasarawa', capital: 'Lafia', region: 'North Central', status: 'Coming Soon', highlight: 'Farin Ruwa Waterfalls, Eggon Hills' },
    { name: 'Niger', capital: 'Minna', region: 'North Central', status: 'Coming Soon', highlight: 'Gurara Waterfalls, Zuma Rock, Kainji Dam' },
    { name: 'Ogun', capital: 'Abeokuta', region: 'South West', status: 'Coming Soon', highlight: 'Olumo Rock, Adire Market, Bilikisu Sungbo Shrine' },
    { name: 'Ondo', capital: 'Akure', region: 'South West', status: 'Coming Soon', highlight: 'Idanre Hills UNESCO, Ebomi Lake' },
    { name: 'Osun', capital: 'Osogbo', region: 'South West', status: 'Unlocked', highlight: 'Erin Ijesha Waterfalls, Osun-Osogbo Sacred Grove' },
    { name: 'Oyo', capital: 'Ibadan', region: 'South West', status: 'Coming Soon', highlight: 'Bower Tower, Cocoa House, Ado Awaye Suspended Lake' },
    { name: 'Plateau', capital: 'Jos', region: 'North Central', status: 'Coming Soon', highlight: 'Shere Hills, Assop Falls, Jos Wildlife Park' },
    { name: 'Rivers', capital: 'Port Harcourt', region: 'South South', status: 'Coming Soon', highlight: 'Port Harcourt Pleasure Park, Bonny Island Beach' },
    { name: 'Sokoto', capital: 'Sokoto', region: 'North West', status: 'Coming Soon', highlight: 'Sultan Palace, Hubbaren Shehu, Heritage Museum' },
    { name: 'Taraba', capital: 'Jalingo', region: 'North East', status: 'Coming Soon', highlight: 'Gashaka Gumti National Park, Mambilla Plateau' },
    { name: 'Yobe', capital: 'Damaturu', region: 'North East', status: 'Coming Soon', highlight: 'Dufuna Canoe, Dagona Waterfowl Sanctuary' },
    { name: 'Zamfara', capital: 'Gusau', region: 'North West', status: 'Coming Soon', highlight: 'Kiyawa City Walls, Jangebe Rock Outcrops' },
    { name: 'FCT Abuja', capital: 'Abuja', region: 'North Central', status: 'Coming Soon', highlight: 'Aso Rock, Millennium Park, Jabi Boat Club' }
  ];

  const statesGridContainer = document.getElementById('allStatesGrid');
  const statesSearchInput = document.getElementById('statesSearchInput');
  const regionFilterButtons = document.querySelectorAll('.state-filter-btn');

  function renderStates(filterRegion = 'all', searchQuery = '') {
    if (!statesGridContainer) return;

    let filtered = nigerianStatesData;
    if (filterRegion !== 'all') {
      filtered = filtered.filter(s => s.region.toLowerCase() === filterRegion.toLowerCase());
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(s => s.name.toLowerCase().includes(q) || s.highlight.toLowerCase().includes(q));
    }

    if (filtered.length === 0) {
      statesGridContainer.innerHTML = `
        <div class="col-12 text-center py-5 text-muted">
          <i class="bi bi-search fs-2 d-block mb-2 text-mint"></i>
          No states found matching "${searchQuery}".
        </div>
      `;
      return;
    }

    statesGridContainer.innerHTML = filtered.map(state => {
      const isUnlocked = state.status === 'Unlocked';
      return `
        <div class="col-lg-4 col-md-6 col-12 mb-3">
          <div class="p-3 rounded-3" style="background: rgba(255,255,255,0.04); border: 1px solid ${isUnlocked ? 'rgba(0,210,132,0.4)' : 'rgba(255,255,255,0.08)'}; transition: var(--transition-fast);">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <h6 class="mb-0 fw-bold text-white">${state.name} State</h6>
              <span class="badge ${isUnlocked ? 'bg-success text-white' : 'bg-dark text-muted border border-secondary'} rounded-pill" style="font-size: 0.7rem;">
                ${isUnlocked ? '<i class="bi bi-check-circle-fill me-1"></i> Active' : '<i class="bi bi-lock-fill me-1"></i> Coming Soon'}
              </span>
            </div>
            <div class="small text-muted mb-2"><i class="bi bi-geo-alt me-1 text-mint"></i> Capital: <span class="text-light">${state.capital}</span> &bull; ${state.region}</div>
            <div class="small text-secondary mb-3"><i class="bi bi-compass me-1 text-warning"></i> Key Sites: ${state.highlight}</div>
            <div>
              ${isUnlocked
                ? `<button class="btn btn-mint btn-sm w-100" onclick="selectStateModal('${state.name}')">Explore ${state.name} Experiences</button>`
                : `<button class="btn btn-outline-secondary btn-sm w-100 text-light" onclick="notifyMeState('${state.name}')"><i class="bi bi-bell me-1"></i> Notify When Unlocked</button>`
              }
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Render initially
  renderStates();

  // Search filter
  if (statesSearchInput) {
    statesSearchInput.addEventListener('input', (e) => {
      const activeFilter = document.querySelector('.state-filter-btn.active')?.dataset?.region || 'all';
      renderStates(activeFilter, e.target.value);
    });
  }

  // Region tabs
  regionFilterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      regionFilterButtons.forEach(b => b.classList.remove('active', 'btn-mint'));
      regionFilterButtons.forEach(b => b.classList.add('btn-outline-light'));
      btn.classList.add('active', 'btn-mint');
      btn.classList.remove('btn-outline-light');

      const region = btn.dataset.region;
      const searchVal = statesSearchInput ? statesSearchInput.value : '';
      renderStates(region, searchVal);
    });
  });

  // ------------------------------------------------------------------------
  // 5. Trip Packages Data & Dynamic Modal Details
  // ------------------------------------------------------------------------
  const tripPackages = {
    osun: {
      title: 'Osun Adventure Getaway',
      duration: '3 Days • 2 Nights',
      price: '₦120,000',
      image: 'assets/images/osun_waterfalls.jpg',
      location: 'Osun State, Nigeria',
      tags: ['Nature', 'Culture', 'Hiking'],
      description: 'Immerse yourself in the tranquility of nature with guided treks across the breathtaking seven tiers of Erin-Ijesha Waterfalls, an exclusive cultural walkthrough of the Osun-Osogbo Sacred Grove UNESCO World Heritage site, and authentic traditional culinary sessions.',
      itinerary: [
        { day: 'Day 1', text: 'Arrival in Osogbo, welcome dinner, introduction to Yoruba cultural heritage.' },
        { day: 'Day 2', text: 'Full day adventure at Erin Ijesha (Olumirin) Waterfalls hiking all 7 tiers, fresh spring swim, picnic lunch.' },
        { day: 'Day 3', text: 'Guided private tour through the Osun-Osogbo Sacred Grove, local pottery & textile artisan workshop, departure.' }
      ],
      inclusions: ['4-Star Eco-lodge accommodation', 'All daily meals & refreshments', 'Certified local tour guides & entrance permits', 'Air-conditioned luxury ground transit']
    },
    lagos: {
      title: 'Lagos City Experience',
      duration: '4 Days • 3 Nights',
      price: '₦180,000',
      image: 'assets/images/lagos_bridge.jpg',
      location: 'Lagos State, Nigeria',
      tags: ['Sightseeing', 'Nightlife', 'Luxury'],
      description: 'Experience the pulse of Africa’s most dynamic metropolis. From luxury private boat cruises on Lagos Lagoon overlooking the Lekki-Ikoyi Link Bridge to exclusive art viewings at the Nike Art Gallery and sunset rooftop dining.',
      itinerary: [
        { day: 'Day 1', text: 'VIP pickup, check-in at Victoria Island boutique hotel, sunset welcome cocktails overlooking the lagoon.' },
        { day: 'Day 2', text: 'Private yacht cruise across Lekki lagoon, Lekki Conservation Centre canopy walkway, rooftop dining experience.' },
        { day: 'Day 3', text: 'Contemporary art tour at Nike Art Gallery & Terra Kulture, followed by upscale Victoria Island nightlife.' },
        { day: 'Day 4', text: 'Coastal beach club brunch at Landmark Beach, souvenir market tour, airport / departure transfer.' }
      ],
      inclusions: ['Luxury Victoria Island hotel stay', 'Private yacht cruise & refreshments', 'VIP museum & canopy walkway admissions', '24/7 dedicated security & executive logistics']
    },
    ekoToOsun: {
      title: 'Eko to Osun Explorer Package',
      duration: '5 Days • 4 Nights',
      price: '₦250,000',
      image: 'assets/images/eko_to_osun.jpg',
      location: 'Lagos → Osun, Nigeria',
      tags: ['Culture', 'Adventure', 'Cross-State'],
      description: 'The ultimate dual-state voyage connecting the energetic modern pulse of Lagos to the deep spiritual serenity and lush forests of ancient Osun. Experience luxury coastal life and lush ancient mountains in one seamless journey.',
      itinerary: [
        { day: 'Day 1 - 2', text: 'Lagos highlights: Lekki skyline cruise, beach club, culinary tours, art exhibitions.' },
        { day: 'Day 3', text: 'Scenic road trip through Ogun & Oyo state hills into Osun with cultural stops in Abeokuta.' },
        { day: 'Day 4', text: 'Full-day hike across Erin Ijesha waterfalls and evening riverside camp with traditional storytelling.' },
        { day: 'Day 5', text: 'Osun Grove exploration, commemorative craft workshop, return luxury express transit to Lagos.' }
      ],
      inclusions: ['All hotel and boutique resort stays', 'Full cross-state executive transportation', 'All breakfast, lunch, and culinary banquets', 'Professional photography and video recap']
    }
  };

  window.openPackageModal = function(packageKey) {
    const pkg = tripPackages[packageKey];
    if (!pkg) return;

    const modalTitle = document.getElementById('packageModalTitle');
    const modalImage = document.getElementById('packageModalImage');
    const modalDuration = document.getElementById('packageModalDuration');
    const modalLocation = document.getElementById('packageModalLocation');
    const modalPrice = document.getElementById('packageModalPrice');
    const modalDesc = document.getElementById('packageModalDesc');
    const modalItinerary = document.getElementById('packageModalItinerary');
    const modalInclusions = document.getElementById('packageModalInclusions');

    if (modalTitle) modalTitle.textContent = pkg.title;
    if (modalImage) modalImage.src = pkg.image;
    if (modalDuration) modalDuration.textContent = pkg.duration;
    if (modalLocation) modalLocation.innerHTML = `<i class="bi bi-geo-alt-fill text-mint me-1"></i> ${pkg.location}`;
    if (modalPrice) modalPrice.textContent = pkg.price;
    if (modalDesc) modalDesc.textContent = pkg.description;

    if (modalItinerary) {
      modalItinerary.innerHTML = pkg.itinerary.map(item => `
        <div class="d-flex gap-3 mb-2">
          <span class="badge bg-mint text-dark fw-bold align-self-start">${item.day}</span>
          <span class="text-light small">${item.text}</span>
        </div>
      `).join('');
    }

    if (modalInclusions) {
      modalInclusions.innerHTML = pkg.inclusions.map(inc => `
        <li class="small text-muted mb-1"><i class="bi bi-check2-circle text-mint me-2"></i>${inc}</li>
      `).join('');
    }

    const packageModal = new bootstrap.Modal(document.getElementById('packageDetailsModal'));
    packageModal.show();
  };

  // ------------------------------------------------------------------------
  // 6. Featured Event Modal Details
  // ------------------------------------------------------------------------
  const eventsData = {
    foodFest: {
      title: 'Lagos Food & Culture Festival',
      date: 'Saturday, October 12, 2025 • 10:00 AM – 10:00 PM',
      location: 'Muri Okunola Park, Victoria Island, Lagos',
      image: 'assets/images/lagos_food_fest.jpg',
      tags: ['Food', 'Culture', 'Music', 'Live Performances'],
      desc: 'Celebrate the rich and flavorful gastronomy of Nigeria! Enjoy live cooking duels, masterclasses from top celebrity chefs, over 50 authentic street food vendors (Jollof, Suya, Amala, Bole, Edikang Ikong), cultural dance troupes, and live Afrobeats DJs under the Lagos stars.'
    },
    heritageFest: {
      title: 'Osun Heritage Festival',
      date: 'Sunday, October 20, 2025 • 10:00 AM – 6:00 PM',
      location: 'Osun-Osogbo Sacred Heritage Grounds, Osogbo',
      image: 'assets/images/osun_heritage_fest.jpg',
      tags: ['Culture', 'Heritage', 'Dance', 'Traditional Art'],
      desc: 'Step into centuries of preserved royal Yoruba history and spiritual artistry. Experience the sacred grove rites, energetic bata drumming, colorful masquerades, authentic adire dyeing workshops, and ceremonial blessing rituals.'
    },
    techSummit: {
      title: 'Lagos Tech & Innovation Summit',
      date: 'Saturday, October 26, 2025 • 9:00 AM – 6:00 PM',
      location: 'Landmark Event Centre, Victoria Island, Lagos',
      image: 'assets/images/lagos_tech_summit.jpg',
      tags: ['Tech', 'Networking', 'Career', 'Venture Capital'],
      desc: 'Join 2,500+ tech leaders, software engineers, and founders shaping the future of African tech. Featuring keynotes from global tech founders, interactive hardware showcases, developer hackathons, and pitch sessions.'
    },
    osunCulturalFest: {
      title: 'Osun Cultural Festival',
      date: 'Saturday, October 18, 2025 • 10:00 AM – 6:00 PM',
      location: 'Osogbo, Osun State',
      image: 'assets/images/osun_heritage_fest.jpg',
      tags: ['Culture', 'Music', 'Dance'],
      desc: 'Immerse yourself in centuries of living Yoruba tradition! Experience the sacred processions, the rhythms of sacred bata drums, traditional royal dances, and ancient storytelling at the heart of Osun.'
    },
    osunWaterfallsHike: {
      title: 'Erin Ijesha Waterfalls Hike',
      date: 'Saturday, October 25, 2025 • 7:00 AM – 5:00 PM',
      location: 'Ilesa / Oriade, Osun State',
      image: 'assets/images/osun_waterfalls.jpg',
      tags: ['Nature', 'Adventure', 'Hiking'],
      desc: 'Ascend all seven breathtaking tiers of Olumirin Waterfalls nestled in the lush tropical forests of Erin-Ijesha. Includes guided hiking trails, cooling plunge pools, and birdwatching.'
    },
    osunFoodArtFest: {
      title: 'Osun Food & Arts Festival',
      date: 'Sunday, November 02, 2025 • 11:00 AM – 8:00 PM',
      location: 'Osogbo, Osun State',
      image: 'assets/images/lagos_food_fest.jpg',
      tags: ['Food', 'Art', 'Culture'],
      desc: 'A vibrant celebration of authentic Osun cuisine, palm wine tasting, pounded yam (Iyan) masterclasses, alongside an open-air exhibition of Yoruba bronze casting and tie-dye (Adire) textiles.'
    },
    osunMusicNight: {
      title: 'Osun Heritage Music Night',
      date: 'Saturday, November 15, 2025 • 6:00 PM – 11:00 PM',
      location: 'Osogbo, Osun State',
      image: 'assets/images/lagos_nightlife.jpg',
      tags: ['Music', 'Networking', 'Fun'],
      desc: 'An unforgettable evening under the Osun sky featuring live traditional talking drum ensembles, contemporary fusion artists, and acoustic folk performances celebrating cultural pride.'
    }
  };

  window.openEventModal = function(eventKey) {
    const ev = eventsData[eventKey];
    if (!ev) return;

    document.getElementById('eventModalTitle').textContent = ev.title;
    document.getElementById('eventModalDate').innerHTML = `<i class="bi bi-calendar-event text-mint me-2"></i> ${ev.date}`;
    document.getElementById('eventModalLoc').innerHTML = `<i class="bi bi-geo-alt text-mint me-2"></i> ${ev.location}`;
    document.getElementById('eventModalDesc').textContent = ev.desc;
    document.getElementById('eventModalImg').src = ev.image;

    const eventModal = new bootstrap.Modal(document.getElementById('eventDetailsModal'));
    eventModal.show();
  };

  // ------------------------------------------------------------------------
  // 7. Lightbox for Travel Highlights
  // ------------------------------------------------------------------------
  const galleryItems = [
    { title: 'Osun Cultural Festival', loc: 'Osun State', img: 'assets/images/osun_heritage_fest.jpg', caption: 'Vibrant cultural dancers honoring centuries of Yoruba ancestral traditions during the annual festival in Osogbo.' },
    { title: 'Lagos Skyline', loc: 'Lagos State', img: 'assets/images/lagos_bridge.jpg', caption: 'The iconic Lekki-Ikoyi Link suspension bridge illuminated in golden hues as dusk settles across the Lagos lagoon.' },
    { title: 'Erin Ijesha Waterfalls', loc: 'Osun State', img: 'assets/images/osun_waterfalls.jpg', caption: 'The breathtaking cascading natural tiers of Olumirin waterfalls surrounded by untouched tropical rain forests.' },
    { title: 'Lagos Nightlife', loc: 'Lagos State', img: 'assets/images/lagos_nightlife.jpg', caption: 'Electrifying rooftop lounge scenes overlooking Victoria Island with lively music, cocktails, and city lights.' },
    { title: 'Olumo Rock', loc: 'Abeokuta, Ogun State', img: 'assets/images/olumo_rock.jpg', caption: 'The sacred 137-meter ancient granite fortress that served as a historical sanctuary and panoramic lookout for the Egba people.' }
  ];

  window.openGalleryLightbox = function(index) {
    const item = galleryItems[index];
    if (!item) return;

    document.getElementById('lightboxTitle').textContent = item.title;
    document.getElementById('lightboxLoc').innerHTML = `<i class="bi bi-geo-alt text-mint me-1"></i> ${item.loc}`;
    document.getElementById('lightboxCaption').textContent = item.caption;
    document.getElementById('lightboxImg').src = item.img;

    const lightboxModal = new bootstrap.Modal(document.getElementById('galleryLightboxModal'));
    lightboxModal.show();
  };

  // ------------------------------------------------------------------------
  // 8. Notifications & Toast System
  // ------------------------------------------------------------------------
  const showToast = (message, title = 'The Africa Explorers', isSuccess = true) => {
    const toastEl = document.getElementById('liveToast');
    if (!toastEl) return;

    document.getElementById('toastTitle').textContent = title;
    document.getElementById('toastBody').textContent = message;

    const iconEl = document.getElementById('toastIcon');
    if (iconEl) {
      iconEl.className = isSuccess ? 'bi bi-check-circle-fill text-mint me-2' : 'bi bi-info-circle-fill text-warning me-2';
    }

    const toast = new bootstrap.Toast(toastEl, { delay: 4500 });
    toast.show();
  };

  window.notifyMeState = function(stateName) {
    showToast(`You have joined the priority waitlist for ${stateName} State! We will notify you when trips unlock.`, 'State Notification Saved');
  };

  window.selectStateModal = function(stateName) {
    // Dismiss all states modal if open
    const allStatesModalEl = document.getElementById('allStatesModal');
    const modalInstance = bootstrap.Modal.getInstance(allStatesModalEl);
    if (modalInstance) modalInstance.hide();

    if (stateName.toLowerCase() === 'lagos') {
      window.openPackageModal('lagos');
    } else if (stateName.toLowerCase() === 'osun') {
      window.openPackageModal('osun');
    }
  };

  // ------------------------------------------------------------------------
  // 9. Forms: Join Explorers & Newsletter Handlers
  // ------------------------------------------------------------------------
  const joinExplorersForm = document.getElementById('joinExplorersForm');
  if (joinExplorersForm) {
    joinExplorersForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('joinName')?.value || 'Explorer';
      const email = document.getElementById('joinEmail')?.value;

      // Close modal
      const joinModal = bootstrap.Modal.getInstance(document.getElementById('joinExplorersModal'));
      if (joinModal) joinModal.hide();

      joinExplorersForm.reset();
      showToast(`Welcome aboard, ${name}! Your explorer passport and welcome guide have been sent to ${email}.`, 'Welcome to the Community!');
    });
  }

  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.newsletter-input');
      const email = input ? input.value : '';

      if (email && email.includes('@')) {
        form.reset();
        showToast(`Thank you for subscribing! You are now locked in for exclusive updates, secret events, and special deals.`, 'Subscribed Successfully!');
      } else {
        showToast('Please enter a valid email address.', 'Invalid Email', false);
      }
    });
  });

  const tripBookingForm = document.getElementById('tripBookingForm');
  if (tripBookingForm) {
    tripBookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const packageModal = bootstrap.Modal.getInstance(document.getElementById('packageDetailsModal'));
      if (packageModal) packageModal.hide();
      tripBookingForm.reset();
      showToast('Booking request received! Our travel concierge will reach out within 2 hours with payment details and your itinerary pack.', 'Booking Confirmed!');
    });
  }

  const eventTicketForm = document.getElementById('eventTicketForm');
  if (eventTicketForm) {
    eventTicketForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const eventModal = bootstrap.Modal.getInstance(document.getElementById('eventDetailsModal'));
      if (eventModal) eventModal.hide();
      eventTicketForm.reset();
      showToast('Ticket reserved successfully! Check your email for your digital entry pass and barcode.', 'Ticket Confirmed!');
    });
  }

  // ------------------------------------------------------------------------
  // 11. Lagos Explorers Sub-Page Interactions
  // ------------------------------------------------------------------------
  // Sub-Navigation Tab Active State & ScrollSpy
  const subNavItems = document.querySelectorAll('.sub-nav-item');
  if (subNavItems.length > 0) {
    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY + 160;
      const sections = ['overview', 'events', 'explorers', 'spots', 'shop', 'gallery'];

      sections.forEach(secId => {
        const el = document.getElementById(secId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            subNavItems.forEach(tab => {
              if (tab.getAttribute('href') === `#${secId}`) {
                tab.classList.add('active');
              } else {
                tab.classList.remove('active');
              }
            });
          }
        }
      });
    }, { passive: true });
  }

  // Follow Button Toggle on Member Cards
  window.toggleFollowMember = function(btn, memberName) {
    if (btn.classList.contains('following')) {
      btn.classList.remove('following');
      btn.innerHTML = '<i class="bi bi-person-plus me-1"></i> Follow';
      showToast(`You have unfollowed ${memberName}.`, 'Explorer Updates', false);
    } else {
      btn.classList.add('following');
      btn.innerHTML = '<i class="bi bi-check2 me-1"></i> Following';
      showToast(`You are now following ${memberName}! You will receive their travel logs and tips.`, 'Following Explorer');
    }
  };

  // Spot Details Modal
  const spotsData = {
    lekkiCanopy: {
      title: 'Lekki Conservation Centre',
      location: 'Km 19 Lekki - Epe Expy, Lekki Peninsula II, Lagos',
      rating: '4.8 (1,420 reviews)',
      image: 'assets/images/lekki_canopy.jpg',
      tags: ['Nature Reserve', 'Canopy Walk', 'Wildlife', 'Ecotourism'],
      hours: '8:30 AM – 5:00 PM Daily',
      fee: '₦2,500 (Canopy Walk: ₦1,500)',
      desc: 'Home to the longest canopy walkway in Africa! Spanning 401 meters suspended over a vibrant rainforest reserve teeming with monkeys, exotic birds, peacocks, giant tortoises, and scenic treehouses.'
    },
    nikeArt: {
      title: 'Nike Art Gallery',
      location: 'No. 2 Elegushi Beach Road, Lekki Phase 1, Lagos',
      rating: '4.9 (2,100 reviews)',
      image: 'assets/images/nike_art.jpg',
      tags: ['African Art', 'Sculptures', 'Culture', 'Free Entry'],
      hours: '10:00 AM – 6:00 PM Daily',
      fee: 'Free Admission (Donations welcome)',
      desc: 'The largest art gallery in West Africa, boasting 5 floors and over 25,000 exquisite pieces of Nigerian and African art, wooden sculptures, beadwork, adire textiles, and royal carved thrones by Chief Nike Davies-Okundaye.'
    },
    tarkwaBay: {
      title: 'Tarkwa Bay Beach',
      location: 'Near Lagos Harbour, reachable by 15-min speed boat from CMS/Marina',
      rating: '4.7 (980 reviews)',
      image: 'assets/images/tarkwa_bay.jpg',
      tags: ['Island Beach', 'Surfing', 'Boat Cruise', 'Relaxation'],
      hours: 'Open 24/7 (Boats run 7:00 AM – 7:00 PM)',
      fee: '₦1,000 beach entry + Boat fare (approx ₦2,000 - ₦3,000)',
      desc: 'An idyllic artificial island beach sheltered by the harbour breakwaters, offering calm swimming lagoons, surfing waves, beach horse rides, and fresh coconuts away from mainland traffic.'
    },
    freedomPark: {
      title: 'Freedom Park Lagos',
      location: 'Broad Street, Lagos Island (Old Broad Street Prison)',
      rating: '4.5 (820 reviews)',
      image: 'assets/images/freedom_park.jpg',
      tags: ['History', 'Live Music', 'Heritage', 'Arts & Theater'],
      hours: '10:00 AM – 10:00 PM Daily',
      fee: '₦500 Entry Fee',
      desc: 'A former colonial penitentiary transformed into a lush memorial arts and leisure park. Features historic prison cell museums, open-air amphitheaters, art galleries, and lively evening Afrojazz concerts.'
    },
    roofTopVI: {
      title: 'The Roof Top (VI)',
      location: 'Victoria Island, Lagos overlooking the city skyline & lagoon',
      rating: '4.4 (1,150 reviews)',
      image: 'assets/images/lagos_nightlife.jpg',
      tags: ['Rooftop Lounge', 'Cocktails', 'Nightlife', 'Fine Dining'],
      hours: '4:00 PM – 2:00 AM (Tue – Sun)',
      fee: 'Reservation Recommended',
      desc: 'Premier upscale rooftop lounge offering signature cocktails, international fusion cuisine, resident Afro-house and Amapiano DJs, and unmatched panoramic views of illuminated Victoria Island.'
    },
    osunGrove: {
      title: 'Osun-Osogbo Sacred Grove',
      location: 'Osogbo Sacred Forest, Osun State (UNESCO World Heritage Site)',
      rating: '4.8 (1,840 reviews)',
      image: 'assets/images/osun_grove.jpg',
      tags: ['UNESCO World Heritage', 'Sacred Site', 'Yoruba Art', 'Spirituality'],
      hours: '8:00 AM – 6:00 PM Daily',
      fee: '₦1,000 (Camera permit: ₦1,500)',
      desc: 'A sacred forest along the banks of the Osun River on the outskirts of Osogbo. Dotted with sanctuaries, shrines, sculptures, and art works honoring Osun, the Yoruba goddess of fertility, created in harmony with nature.'
    },
    erinIjesha: {
      title: 'Erin Ijesha Waterfalls (Olumirin)',
      location: 'Erin-Ijesha, Oriade LGA, Osun State',
      rating: '4.7 (2,300 reviews)',
      image: 'assets/images/osun_waterfalls.jpg',
      tags: ['Waterfalls', 'Hiking', 'Nature', 'Adventure'],
      hours: '8:00 AM – 6:00 PM Daily',
      fee: '₦1,000 Entry Fee',
      desc: 'A natural wonder featuring seven distinct ascending tiers of cascading crystalline waters. The 7th floor hosts the historic settlement of Abake village atop the plateau.'
    },
    ilesaShrine: {
      title: 'Ilesa Purification Shrine',
      location: 'Ilesa Ancient Kingdom, Osun State',
      rating: '4.5 (620 reviews)',
      image: 'assets/images/ilesa_shrine.jpg',
      tags: ['Heritage', 'Historic Shrine', 'Sacred Architecture', 'Yoruba Culture'],
      hours: '9:00 AM – 5:00 PM (Mon – Sat)',
      fee: 'Guided Tour: ₦1,500',
      desc: 'A revered traditional monument preserving ancient Ijesha spiritual customs, intricate carved wooden house posts, and ceremonial courtyards reflecting sacred Yoruba architectural heritage.'
    },
    owallaBeach: {
      title: 'Owalla Beach & Reservoir',
      location: 'Ilesa / Osogbo Axis, Osun State',
      rating: '4.3 (410 reviews)',
      image: 'assets/images/owalla_beach.jpg',
      tags: ['Nature', 'Lakeside', 'Picnic', 'Boating'],
      hours: '8:00 AM – 7:00 PM Daily',
      fee: '₦500 Entry Fee',
      desc: 'A scenic inland lakeside oasis with white sandy shores, calm tranquil waters, fishing spots, and breezy picnic pergolas surrounded by rolling green hills.'
    },
    ejigboArt: {
      title: 'Ejigbo Art Centre',
      location: 'Ejigbo Cultural District, Osun State',
      rating: '4.6 (590 reviews)',
      image: 'assets/images/ejigbo_art.jpg',
      tags: ['Art & Culture', 'Contemporary Art', 'Sculptures', 'Beadwork'],
      hours: '9:30 AM – 6:00 PM (Mon – Sat)',
      fee: 'Free Admission',
      desc: 'A thriving hub of Yoruba visual culture featuring vibrant mosaic murals, beadwork, royal crowns, carved wooden sculptures, and rotating exhibitions by leading contemporary African artists.'
    }
  };

  window.openSpotModal = function(spotKey) {
    const spot = spotsData[spotKey];
    if (!spot) return;

    document.getElementById('spotModalTitle').textContent = spot.title;
    document.getElementById('spotModalLocation').innerHTML = `<i class="bi bi-geo-alt-fill text-mint me-1"></i> ${spot.location}`;
    document.getElementById('spotModalRating').innerHTML = `<i class="bi bi-star-fill text-warning me-1"></i> ${spot.rating}`;
    document.getElementById('spotModalHours').textContent = spot.hours;
    document.getElementById('spotModalFee').textContent = spot.fee;
    document.getElementById('spotModalDesc').textContent = spot.desc;
    document.getElementById('spotModalImg').src = spot.image;

    const tagsContainer = document.getElementById('spotModalTags');
    if (tagsContainer) {
      tagsContainer.innerHTML = spot.tags.map(t => `<span class="tag-pill me-1 mb-1">${t}</span>`).join('');
    }

    const modal = new bootstrap.Modal(document.getElementById('spotDetailsModal'));
    modal.show();
  };

  // E-Commerce Shop Add to Cart System
  let cartCount = 0;
  const cartCounterEl = document.getElementById('cartCounter');
  const cartDrawerItems = document.getElementById('cartDrawerItems');
  const cartTotalEl = document.getElementById('cartTotal');
  let cartItemsList = [];

  window.addToCart = function(productName, priceNumber, priceFormatted, imgUrl) {
    cartCount++;
    if (cartCounterEl) {
      cartCounterEl.textContent = cartCount;
      cartCounterEl.style.display = 'flex';
    }

    cartItemsList.push({ name: productName, price: priceNumber, formatted: priceFormatted, img: imgUrl });

    showToast(`${productName} (${priceFormatted}) has been added to your explorer cart!`, 'Item Added to Cart');
  };

  window.openCartModal = function() {
    if (!cartDrawerItems) return;

    if (cartItemsList.length === 0) {
      cartDrawerItems.innerHTML = '<div class="text-center py-4 text-muted"><i class="bi bi-bag-x fs-1 d-block mb-2 text-secondary"></i>Your explorer bag is empty.</div>';
      if (cartTotalEl) cartTotalEl.textContent = '₦0';
    } else {
      let total = 0;
      cartDrawerItems.innerHTML = cartItemsList.map((item, idx) => {
        total += item.price;
        return `
          <div class="d-flex align-items-center justify-content-between p-2 mb-2 rounded" style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);">
            <div class="d-flex align-items-center gap-2">
              <img src="${item.img}" style="width: 40px; height: 40px; object-fit: contain; background: #091a1e; border-radius: 6px; padding: 2px;">
              <div>
                <div class="text-white small fw-bold">${item.name}</div>
                <div class="text-mint small">${item.formatted}</div>
              </div>
            </div>
            <button class="btn btn-sm text-danger" onclick="removeFromCart(${idx})"><i class="bi bi-trash"></i></button>
          </div>
        `;
      }).join('');
      if (cartTotalEl) cartTotalEl.textContent = '₦' + total.toLocaleString();
    }

    const modal = new bootstrap.Modal(document.getElementById('cartModal'));
    modal.show();
  };

  window.removeFromCart = function(index) {
    cartItemsList.splice(index, 1);
    cartCount = cartItemsList.length;
    if (cartCounterEl) {
      cartCounterEl.textContent = cartCount;
      if (cartCount === 0) cartCounterEl.style.display = 'none';
    }
    window.openCartModal();
  };

  window.checkoutCart = function() {
    if (cartItemsList.length === 0) {
      showToast('Your cart is empty. Add items from the shop first.', 'Empty Cart', false);
      return;
    }
    const modal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
    if (modal) modal.hide();
    cartItemsList = [];
    cartCount = 0;
    if (cartCounterEl) cartCounterEl.style.display = 'none';
    showToast('Order received! Your explorer merch package is being prepped for dispatch.', 'Order Confirmed! 🎒');
  };

  // ------------------------------------------------------------------------
  // 12. State Filtering & Search System (Explore States)
  // ------------------------------------------------------------------------
  window.filterStateTab = function(tabType, btnEl) {
    const allCards = document.querySelectorAll('.states-grid .state-card');
    document.querySelectorAll('.state-filter-btn').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');

    allCards.forEach(card => {
      const isUnlocked = card.classList.contains('state-card-unlocked');
      if (tabType === 'all') {
        card.style.display = '';
      } else if (tabType === 'available') {
        card.style.display = isUnlocked ? '' : 'none';
      } else if (tabType === 'coming_soon') {
        card.style.display = !isUnlocked ? '' : 'none';
      }
    });
  };

  window.filterStates = function(query) {
    const q = query.toLowerCase().trim();
    const allCards = document.querySelectorAll('.states-grid .state-card');
    allCards.forEach(card => {
      const title = card.querySelector('.state-unlocked-title, .state-locked-title')?.textContent?.toLowerCase() || '';
      if (title.includes(q)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  };

  // ------------------------------------------------------------------------
  // 13. Comprehensive Spots Discovery System
  // ------------------------------------------------------------------------
  const allSpotsData = {
    // Lagos Spots
    federalPalace: {
      name: 'The Federal Palace Hotel & Casino',
      category: 'Hotel',
      state: 'Lagos',
      location: 'Victoria Island, Lagos',
      rating: '4.7 (1,840 reviews)',
      image: 'assets/images/lagos_nightlife.jpg',
      amenities: ['Oceanfront Pool', 'High-Speed WiFi', '24/7 Power', 'Casino & Lounge', 'Valet Parking'],
      phone: '+234 1 277 9000',
      whatsapp: '+2348012345678',
      desc: 'Historic 5-star luxury hotel in Victoria Island offering panoramic views of the Atlantic ocean, international fine dining, lush tropical gardens, and an elite casino.'
    },
    terraKulture: {
      name: 'Terra Kulture Arts & Restaurant',
      category: 'Restaurant',
      state: 'Lagos',
      location: 'Tiamiyu Savage St, Victoria Island',
      rating: '4.8 (2,400 reviews)',
      image: 'assets/images/lagos_food_fest.jpg',
      amenities: ['Authentic Nigerian Cuisine', 'Art Gallery', 'Theater Stage', 'Bookstore'],
      phone: '+234 809 999 1100',
      whatsapp: '+2348099991100',
      desc: 'The cultural epicenter of Lagos featuring world-class Nigerian gastronomy (famous for Ofada rice & pounded yam), live stage plays, and an extensive African art gallery.'
    },
    lekkiCanopySpot: {
      name: 'Lekki Conservation Centre',
      category: 'Attraction',
      state: 'Lagos',
      location: 'Lekki Peninsula, Lagos',
      rating: '4.8 (3,100 reviews)',
      image: 'assets/images/lekki_canopy.jpg',
      amenities: ['401m Canopy Walk', 'Family Picnic Park', 'Treehouse', 'Wildlife Trails'],
      phone: '+234 812 000 4455',
      whatsapp: '+2348120004455',
      desc: 'Africa longest canopy walkway suspended over lush coastal rainforest, home to Mona monkeys, rare birds, and giant tortoises.'
    },
    rooftopVI: {
      name: 'The Roof Top Victoria Island',
      category: 'Bar',
      state: 'Lagos',
      location: 'Victoria Island, Lagos',
      rating: '4.5 (950 reviews)',
      image: 'assets/images/lagos_nightlife.jpg',
      amenities: ['Lagoon Skyline Views', 'Craft Cocktails', 'Resident DJ', 'VIP Bottle Service'],
      phone: '+234 803 111 2233',
      whatsapp: '+2348031112233',
      desc: 'High-energy rooftop bar and lounge overlooking Victoria Island and Lagos lagoon, premier spot for cocktails, sunset vibes, and weekend Afrobeats parties.'
    },
    ikoyiShortlet: {
      name: 'The Haven Luxury Shortlet Penthouse',
      category: 'Shortlet',
      state: 'Lagos',
      location: 'Old Ikoyi, Lagos',
      rating: '4.9 (320 reviews)',
      image: 'assets/images/lagos_bridge.jpg',
      amenities: ['3 King Bedrooms', 'Private Rooftop Jacuzzi', '24/7 Security & Light', 'Smart Home & Starlink'],
      phone: '+234 814 555 6677',
      whatsapp: '+2348145556677',
      desc: 'Architect-designed 3-bedroom penthouse with private terrace overlooking the Lekki-Ikoyi link bridge. Features dedicated concierge and chef on demand.'
    },
    // Osun Spots
    erinWaterfallsSpot: {
      name: 'Erin Ijesha Waterfalls (Olumirin)',
      category: 'Attraction',
      state: 'Osun',
      location: 'Oriade / Ilesa, Osun State',
      rating: '4.7 (2,300 reviews)',
      image: 'assets/images/osun_waterfalls.jpg',
      amenities: ['7 Cascading Tiers', 'Hiking Guide Service', 'Fresh Spring Pools', 'Historical Abake Village'],
      phone: '+234 802 333 4455',
      whatsapp: '+2348023334455',
      desc: 'Iconic seven-tier natural waterfall nestled in the verdant highlands of Osun. Natural cooling showers and lush tropical flora.'
    },
    osunGroveSpot: {
      name: 'Osun-Osogbo Sacred Heritage Grove',
      category: 'Attraction',
      state: 'Osun',
      location: 'Osogbo Forest Reserve, Osun State',
      rating: '4.8 (1,840 reviews)',
      image: 'assets/images/osun_grove.jpg',
      amenities: ['UNESCO World Heritage', 'Sacred Shrines', 'Sculptures by Suzanne Wenger', 'Guided Cultural Tours'],
      phone: '+234 805 777 8899',
      whatsapp: '+2348057778899',
      desc: 'UNESCO World Heritage site protecting ancient Yoruba sculptures and shrines in sacred communion with the sacred Osun river.'
    },
    ilesaPalaceHotel: {
      name: 'Zenith Grand Hotel & Suites',
      category: 'Hotel',
      state: 'Osun',
      location: 'Ilesa Expressway, Osun State',
      rating: '4.5 (480 reviews)',
      image: 'assets/images/state_locked_bg.jpg',
      amenities: ['Swimming Pool', 'Solar Backup Power', 'On-site Restaurant', 'Conference Hall'],
      phone: '+234 806 888 9900',
      whatsapp: '+2348068889900',
      desc: 'Top-rated hotel in Ilesa situated 15 minutes from Erin Ijesha waterfalls, offering cozy rooms, local delicacies, and serene hospitality.'
    },
    amalaSkyOsogbo: {
      name: 'Amala Heritage Kitchen & Bar',
      category: 'Restaurant',
      state: 'Osun',
      location: 'Station Road, Osogbo',
      rating: '4.9 (1,200 reviews)',
      image: 'assets/images/lagos_food_fest.jpg',
      amenities: ['Steaming Hot Amala & Gbegiri', 'Fresh Bushmeat & Fish', 'Cold Palm Wine', 'Open-Air Seating'],
      phone: '+234 803 999 0011',
      whatsapp: '+2348039990011',
      desc: 'Legendary dining spot in Osogbo serving authentic smooth Yoruba Amala doused in rich Ewedu and Gbegiri with assorted goat meat and fresh palm wine.'
    }
  };

  window.openSpotDetailModal = function(spotId) {
    const spot = allSpotsData[spotId];
    if (!spot) return;

    const modalTitle = document.getElementById('discoverySpotTitle');
    const modalImg = document.getElementById('discoverySpotImg');
    const modalRating = document.getElementById('discoverySpotRating');
    const modalLoc = document.getElementById('discoverySpotLoc');
    const modalDesc = document.getElementById('discoverySpotDesc');
    const modalAmenities = document.getElementById('discoverySpotAmenities');
    const callBtn = document.getElementById('discoverySpotCallBtn');
    const waBtn = document.getElementById('discoverySpotWaBtn');
    const dirBtn = document.getElementById('discoverySpotDirBtn');

    if (modalTitle) modalTitle.textContent = spot.name;
    if (modalImg) modalImg.src = spot.image;
    if (modalRating) modalRating.innerHTML = `<i class="bi bi-star-fill text-warning me-1"></i> ${spot.rating}`;
    if (modalLoc) modalLoc.innerHTML = `<i class="bi bi-geo-alt-fill text-mint me-1"></i> ${spot.location}`;
    if (modalDesc) modalDesc.textContent = spot.desc;

    if (modalAmenities) {
      modalAmenities.innerHTML = spot.amenities.map(a => `<span class="amenity-chip"><i class="bi bi-check2 text-mint me-1"></i>${a}</span>`).join('');
    }

    if (callBtn) callBtn.onclick = () => window.openSpotContact(spot.name, 'phone', spot.phone);
    if (waBtn) waBtn.onclick = () => window.openSpotContact(spot.name, 'whatsapp', spot.whatsapp);
    if (dirBtn) dirBtn.onclick = () => window.openSpotContact(spot.name, 'directions', spot.location);

    const modalEl = document.getElementById('spotDiscoveryModal');
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  };

  window.openSpotContact = function(spotName, type, contact) {
    if (type === 'phone') {
      showToast(`Calling ${spotName} at ${contact}...`, 'Connecting Call');
    } else if (type === 'whatsapp') {
      showToast(`Opening WhatsApp chat with ${spotName}...`, 'WhatsApp Inquiries');
    } else if (type === 'directions') {
      showToast(`Opening GPS navigation route to ${contact}...`, 'Google Maps Directions');
    }
  };

  // ------------------------------------------------------------------------
  // 14. Event Booking & Payment Flow System
  // ------------------------------------------------------------------------
  let currentBookingEvent = null;
  let currentTicketQty = 1;
  let currentTicketPrice = 15000;

  window.openEventBookingModal = function(eventKey) {
    const ev = eventsData[eventKey] || {
      title: 'Osun Cultural Festival',
      date: 'Saturday, October 18, 2025 • 10:00 AM',
      location: 'Osogbo, Osun State',
      price: 15000
    };

    currentBookingEvent = ev;
    currentTicketQty = 1;
    currentTicketPrice = ev.price || 15000;

    const titleEl = document.getElementById('bookEventTitle');
    const dateEl = document.getElementById('bookEventDate');
    const locEl = document.getElementById('bookEventLoc');
    const qtyEl = document.getElementById('ticketQty');
    const totalEl = document.getElementById('bookingTotalPrice');

    if (titleEl) titleEl.textContent = ev.title;
    if (dateEl) dateEl.textContent = ev.date;
    if (locEl) locEl.textContent = ev.location;
    if (qtyEl) qtyEl.textContent = currentTicketQty;
    if (totalEl) totalEl.textContent = '₦' + (currentTicketPrice * currentTicketQty).toLocaleString();

    // Close event details modal if open
    const evModal = bootstrap.Modal.getInstance(document.getElementById('eventDetailsModal'));
    if (evModal) evModal.hide();

    const bookingModal = new bootstrap.Modal(document.getElementById('eventBookingModal'));
    bookingModal.show();
  };

  window.adjustTicketQty = function(delta) {
    currentTicketQty = Math.max(1, Math.min(10, currentTicketQty + delta));
    const qtyEl = document.getElementById('ticketQty');
    const totalEl = document.getElementById('bookingTotalPrice');
    if (qtyEl) qtyEl.textContent = currentTicketQty;
    if (totalEl) totalEl.textContent = '₦' + (currentTicketPrice * currentTicketQty).toLocaleString();
  };

  window.submitEventBooking = function(e) {
    if (e) e.preventDefault();
    const name = document.getElementById('bookAttendeeName')?.value || 'Explorer';
    const email = document.getElementById('bookAttendeeEmail')?.value || 'explorer@africaexplorers.ng';
    const phone = document.getElementById('bookAttendeePhone')?.value || '+234 800 000 0000';
    const ref = 'AE-' + Math.floor(100000 + Math.random() * 900000);

    const booking = {
      id: ref,
      eventName: currentBookingEvent?.title || 'Nigeria Explorer Experience',
      date: currentBookingEvent?.date || 'October 2026',
      location: currentBookingEvent?.location || 'Lagos, Nigeria',
      qty: currentTicketQty,
      total: currentTicketPrice * currentTicketQty,
      attendee: name,
      email: email,
      phone: phone,
      timestamp: new Date().toISOString()
    };

    // Store in localStorage
    try {
      const stored = JSON.parse(localStorage.getItem('ae_user_bookings') || '[]');
      stored.unshift(booking);
      localStorage.setItem('ae_user_bookings', JSON.stringify(stored));
    } catch (err) {
      console.warn('LocalStorage error', err);
    }

    // Hide booking modal
    const bookingModal = bootstrap.Modal.getInstance(document.getElementById('eventBookingModal'));
    if (bookingModal) bookingModal.hide();

    // Show Confirmation Modal
    const refEl = document.getElementById('confirmBookingRef');
    const confirmNameEl = document.getElementById('confirmAttendeeName');
    const confirmEventEl = document.getElementById('confirmEventName');

    if (refEl) refEl.textContent = ref;
    if (confirmNameEl) confirmNameEl.textContent = name;
    if (confirmEventEl) confirmEventEl.textContent = booking.eventName;

    const confirmModal = new bootstrap.Modal(document.getElementById('bookingConfirmedModal'));
    confirmModal.show();
  };

  // ------------------------------------------------------------------------
  // 15. Trip Booking System
  // ------------------------------------------------------------------------
  window.openTripBookingModal = function(tripKey) {
    const pkg = (typeof tripPackages !== 'undefined' ? tripPackages[tripKey] : null) || {
      title: 'Osun Adventure Getaway',
      duration: '3 Days • 2 Nights',
      location: 'Osun State',
      price: '₦120,000 / person'
    };

    const tripModalEl = document.getElementById('tripBookingModal');
    if (tripModalEl) {
      document.getElementById('bookTripTitle').textContent = pkg.title;
      document.getElementById('bookTripDuration').textContent = pkg.duration;
      document.getElementById('bookTripLoc').textContent = pkg.location;
      document.getElementById('bookTripPrice').textContent = pkg.price;

      const pkgModal = bootstrap.Modal.getInstance(document.getElementById('packageDetailsModal'));
      if (pkgModal) pkgModal.hide();

      const modal = new bootstrap.Modal(tripModalEl);
      modal.show();
    }
  };

  window.submitTripBooking = function(e) {
    if (e) e.preventDefault();
    const name = document.getElementById('tripLeadName')?.value || 'Explorer';
    const ref = 'AE-TRIP' + Math.floor(100 + Math.random() * 900);

    const tripBooking = {
      id: ref,
      tripName: document.getElementById('bookTripTitle')?.textContent || 'Curated Nigeria Trip',
      leadName: name,
      date: 'Next Scheduled Departure',
      status: 'Confirmed'
    };

    try {
      const stored = JSON.parse(localStorage.getItem('ae_user_trips') || '[]');
      stored.unshift(tripBooking);
      localStorage.setItem('ae_user_trips', JSON.stringify(stored));
    } catch (err) {}

    const tripModal = bootstrap.Modal.getInstance(document.getElementById('tripBookingModal'));
    if (tripModal) tripModal.hide();

    showToast(`Trip booked successfully! Reference: ${ref}. Our travel team has emailed your full itinerary pack.`, 'Trip Confirmed! 🌴');
  };

  // ------------------------------------------------------------------------
  // 16. Business Listing Wizard & Onboarding
  // ------------------------------------------------------------------------
  let currentWizardStep = 1;
  let selectedListingCategory = 'Hotel';
  let selectedListingPlan = 'Premium Listing';

  window.selectBusinessCategory = function(cat, btnEl) {
    selectedListingCategory = cat;
    document.querySelectorAll('.business-cat-btn').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');

    // Dynamic field update
    const dynamicFields = document.getElementById('categoryDynamicFields');
    if (dynamicFields) {
      if (cat === 'Hotel' || cat === 'Resort') {
        dynamicFields.innerHTML = `
          <div class="row g-3">
            <div class="col-md-6 col-12">
              <label class="form-label small text-light fw-semibold">Room Types Available</label>
              <input type="text" class="form-control form-control-custom" placeholder="e.g. Deluxe, Executive Suite, Penthouse">
            </div>
            <div class="col-md-6 col-12">
              <label class="form-label small text-light fw-semibold">Price Range (per night)</label>
              <input type="text" class="form-control form-control-custom" placeholder="e.g. ₦35,000 - ₦90,000">
            </div>
            <div class="col-12">
              <label class="form-label small text-light fw-semibold">Key Amenities</label>
              <input type="text" class="form-control form-control-custom" placeholder="e.g. Swimming Pool, 24/7 Power, Free Breakfast, High-Speed WiFi">
            </div>
          </div>
        `;
      } else if (cat === 'Restaurant' || cat === 'Café') {
        dynamicFields.innerHTML = `
          <div class="row g-3">
            <div class="col-md-6 col-12">
              <label class="form-label small text-light fw-semibold">Cuisine Type</label>
              <input type="text" class="form-control form-control-custom" placeholder="e.g. Authentic Yoruba, Afro-Fusion, Continental">
            </div>
            <div class="col-md-6 col-12">
              <label class="form-label small text-light fw-semibold">Average Meal Price</label>
              <input type="text" class="form-control form-control-custom" placeholder="e.g. ₦4,000 - ₦12,000">
            </div>
            <div class="col-12">
              <label class="form-label small text-light fw-semibold">Opening Hours</label>
              <input type="text" class="form-control form-control-custom" placeholder="e.g. 10:00 AM – 11:00 PM Daily">
            </div>
          </div>
        `;
      } else if (cat === 'Shortlet') {
        dynamicFields.innerHTML = `
          <div class="row g-3">
            <div class="col-md-6 col-12">
              <label class="form-label small text-light fw-semibold">Number of Bedrooms</label>
              <input type="number" class="form-control form-control-custom" value="2" min="1">
            </div>
            <div class="col-md-6 col-12">
              <label class="form-label small text-light fw-semibold">Nightly Rate (₦)</label>
              <input type="text" class="form-control form-control-custom" placeholder="e.g. ₦65,000 / night">
            </div>
          </div>
        `;
      } else {
        dynamicFields.innerHTML = `
          <div class="col-12">
            <label class="form-label small text-light fw-semibold">Key Features & Highlights</label>
            <input type="text" class="form-control form-control-custom" placeholder="e.g. Guided Tours, Live Entertainment, Private Reservations">
          </div>
        `;
      }
    }
  };

  window.selectListingPlan = function(planName, priceFormatted, cardEl) {
    selectedListingPlan = planName;
    document.querySelectorAll('.listing-plan-card').forEach(c => c.classList.remove('featured-plan'));
    if (cardEl) cardEl.classList.add('featured-plan');
    showToast(`Selected ${planName} (${priceFormatted}).`, 'Plan Selected');
  };

  window.goToWizardStep = function(step) {
    currentWizardStep = step;
    for (let i = 1; i <= 4; i++) {
      const stepSection = document.getElementById(`wizardStep${i}`);
      const stepNode = document.getElementById(`stepNode${i}`);
      if (stepSection) stepSection.style.display = i === step ? 'block' : 'none';
      if (stepNode) {
        if (i === step) {
          stepNode.className = 'wizard-step-node active';
        } else if (i < step) {
          stepNode.className = 'wizard-step-node completed';
        } else {
          stepNode.className = 'wizard-step-node';
        }
      }
    }
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  window.submitBusinessListing = function(e) {
    if (e) e.preventDefault();
    const bizName = document.getElementById('bizName')?.value || 'My Spot';
    const bizState = document.getElementById('bizState')?.value || 'Lagos';
    const bizCity = document.getElementById('bizCity')?.value || 'Victoria Island';
    const bizPhone = document.getElementById('bizPhone')?.value || '+2348000000000';
    const bizDesc = document.getElementById('bizDesc')?.value || 'Top rated explorer spot in Nigeria.';

    const newListing = {
      id: 'BIZ-' + Math.floor(1000 + Math.random() * 9000),
      name: bizName,
      state: bizState,
      city: bizCity,
      category: selectedListingCategory,
      plan: selectedListingPlan,
      phone: bizPhone,
      desc: bizDesc,
      status: 'Active (Approved)',
      views: 142,
      leads: 18,
      timestamp: new Date().toLocaleDateString()
    };

    try {
      const stored = JSON.parse(localStorage.getItem('ae_business_listings') || '[]');
      stored.unshift(newListing);
      localStorage.setItem('ae_business_listings', JSON.stringify(stored));
    } catch (err) {}

    const successModal = new bootstrap.Modal(document.getElementById('businessSuccessModal'));
    successModal.show();
  };

  // ------------------------------------------------------------------------
  // 17. Admin Portal Interactive Actions
  // ------------------------------------------------------------------------
  window.adminToggleState = function(stateName, btn) {
    const isCurrentlyActive = btn.classList.contains('btn-mint');
    if (isCurrentlyActive) {
      btn.className = 'btn btn-sm btn-outline-secondary';
      btn.textContent = 'Coming Soon';
      showToast(`${stateName} State moved to Coming Soon.`, 'State Status Updated');
    } else {
      btn.className = 'btn btn-sm btn-mint fw-bold';
      btn.textContent = 'Active (Live)';
      showToast(`${stateName} State is now LIVE on the platform!`, 'State Chapter Unlocked! 🚀');
    }
  };

  window.adminApproveListing = function(bizId, rowId) {
    const row = document.getElementById(rowId);
    if (row) {
      const badge = row.querySelector('.status-badge-pending');
      if (badge) {
        badge.className = 'status-badge-approved';
        badge.textContent = 'Approved & Live';
      }
      const actions = row.querySelector('.admin-action-btns');
      if (actions) actions.innerHTML = `<span class="text-mint small fw-bold"><i class="bi bi-check-circle-fill me-1"></i> Published</span>`;
    }
    showToast(`Business listing ${bizId} approved and published to Spot Discovery engine!`, 'Listing Approved');
  };

  window.adminRejectListing = function(bizId, rowId) {
    const row = document.getElementById(rowId);
    if (row) {
      const badge = row.querySelector('.status-badge-pending');
      if (badge) {
        badge.className = 'badge bg-danger text-white';
        badge.textContent = 'Revision Requested';
      }
    }
    showToast(`Revision request sent to business owner for listing ${bizId}.`, 'Revision Requested');
  };

  window.switchAdminTab = function(tabName, btn) {
    document.querySelectorAll('.admin-tab-pane').forEach(el => el.classList.add('d-none'));
    document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));

    const target = document.getElementById(tabName);
    if (target) target.classList.remove('d-none');
    if (btn) btn.classList.add('active');
  };

  window.adminToggleMembership = function(email) {
    let isMember = localStorage.getItem('ae_user_is_member') === 'true';
    isMember = !isMember;
    localStorage.setItem('ae_user_is_member', isMember ? 'true' : 'false');

    let profile = {};
    try {
      profile = JSON.parse(localStorage.getItem('ae_user_profile') || '{}');
      if (profile.email === email || !profile.email) {
        profile.tier = isMember ? 'Annual Explorer Pass' : 'Standard Member';
        localStorage.setItem('ae_user_profile', JSON.stringify(profile));
      }
    } catch (e) {}

    showToast(`Membership status updated for ${email || 'explorer'} to: ${isMember ? 'Annual Explorer Pass ($25 / ₦30k)' : 'Standard Explorer'}.`, 'Membership Updated');
    if (typeof window.initAdminPortal === 'function') {
      window.initAdminPortal();
    }
  };

  window.initAdminPortal = function() {
    // 1. Populate Tour Bookings
    const tourBookingsBody = document.getElementById('adminTourBookingsBody');
    if (tourBookingsBody) {
      const storedTours = JSON.parse(localStorage.getItem('ae_user_tours') || '[]');
      const defaultTours = [
        {
          id: 'TR-8921',
          leadName: 'Tunde Adeleke',
          tourName: 'Erin Ijesha 7-Tiers Waterfall Trek',
          state: 'Osun',
          date: 'Nov 14, 2026',
          participants: 2,
          isMemberRate: true,
          totalPrice: 44000,
          currency: 'NGN',
          status: 'Confirmed'
        },
        {
          id: 'TR-7714',
          leadName: 'Amara Nwosu',
          tourName: 'Lekki Canopy Walkway & Coastal Lagoon Cruise',
          state: 'Lagos',
          date: 'Nov 20, 2026',
          participants: 4,
          isMemberRate: false,
          totalPrice: 152000,
          currency: 'NGN',
          status: 'Confirmed'
        },
        {
          id: 'TR-6205',
          leadName: 'Farida Danjuma',
          tourName: 'Osun-Osogbo Sacred Grove & Suzanne Wenger Shrine',
          state: 'Osun',
          date: 'Dec 02, 2026',
          participants: 1,
          isMemberRate: true,
          totalPrice: 15000,
          currency: 'NGN',
          status: 'Confirmed'
        }
      ];

      const allTours = [...storedTours, ...defaultTours];
      tourBookingsBody.innerHTML = allTours.map(t => `
        <tr>
          <td><code class="text-mint fw-bold">${t.id}</code></td>
          <td>
            <strong class="text-white d-block">${t.leadName}</strong>
            <span class="text-muted small">${t.email || 'Registered Explorer'}</span>
          </td>
          <td>
            <strong class="text-white">${t.tourName}</strong>
            <span class="badge bg-dark border border-secondary text-info ms-1">${t.state}</span>
          </td>
          <td class="text-light small">${t.date}</td>
          <td class="text-center"><span class="badge bg-secondary text-white">${t.participants} Pax</span></td>
          <td>
            ${t.isMemberRate ? '<span class="badge bg-success-subtle text-mint border border-success">Member Rate (Saved 20%)</span>' : '<span class="badge bg-secondary-subtle text-muted">Standard Rate</span>'}
          </td>
          <td><strong class="text-warning" data-ngn-price="${t.totalPrice}">${window.formatPrice(t.totalPrice)}</strong></td>
          <td><span class="status-badge-approved"><i class="bi bi-check2-circle me-1"></i>${t.status || 'Confirmed'}</span></td>
        </tr>
      `).join('');
    }

    // 2. Populate Explorers & Membership Registry
    const explorersBody = document.getElementById('adminExplorersBody');
    if (explorersBody) {
      let activeUserProfile = null;
      try {
        activeUserProfile = JSON.parse(localStorage.getItem('ae_user_profile') || 'null');
      } catch (e) {}

      const isMember = localStorage.getItem('ae_user_is_member') === 'true';

      const defaultExplorers = [
        {
          passportNo: 'AE-NG-04189',
          name: 'Olumide Bakare',
          email: 'olumide.b@explorers.ng',
          homeState: 'Lagos',
          tier: 'Annual Explorer Pass',
          joined: 'Oct 2025',
          visited: ['Lagos', 'Osun', 'Ogun']
        },
        {
          passportNo: 'AE-NG-02551',
          name: 'Ngozi Eze',
          email: 'ngozi.eze@outlook.com',
          homeState: 'Enugu',
          tier: 'Annual Explorer Pass',
          joined: 'Jan 2026',
          visited: ['Enugu', 'Lagos']
        },
        {
          passportNo: 'AE-NG-01992',
          name: 'Yusuf Al-Hassan',
          email: 'yusuf.hassan@gmail.com',
          homeState: 'Kano',
          tier: 'Standard Member',
          joined: 'Mar 2026',
          visited: ['Kano']
        },
        {
          passportNo: 'AE-NG-03410',
          name: 'Adewale Adeleke',
          email: 'adewale.a@gmail.com',
          homeState: 'Osun',
          tier: 'Annual Explorer Pass',
          joined: 'Aug 2026',
          visited: ['Osun', 'Lagos']
        }
      ];

      if (activeUserProfile && activeUserProfile.name) {
        defaultExplorers.unshift({
          passportNo: activeUserProfile.passportNo || 'AE-NG-09942',
          name: activeUserProfile.name,
          email: activeUserProfile.email || 'current.user@africaexplorers.ng',
          homeState: activeUserProfile.homeState || 'Lagos',
          tier: isMember ? 'Annual Explorer Pass' : (activeUserProfile.tier || 'Standard Member'),
          joined: activeUserProfile.joinedDate || 'Today (Current Session)',
          visited: [activeUserProfile.homeState || 'Lagos']
        });
      }

      explorersBody.innerHTML = defaultExplorers.map((exp, idx) => {
        const isAnnual = exp.tier && exp.tier.includes('Annual');
        return `
          <tr>
            <td><code class="text-mint">${exp.passportNo}</code></td>
            <td>
              <strong class="text-white d-block">${exp.name}</strong>
              <span class="text-muted small">${exp.email}</span>
            </td>
            <td>
              <span class="badge bg-dark border border-secondary text-mint"><i class="bi bi-geo-alt-fill me-1"></i>${exp.homeState}</span>
            </td>
            <td>
              <span class="small text-light">Explorer in <strong>${exp.homeState}</strong> &bull; Visitor in <strong>Osun</strong></span>
            </td>
            <td>
              ${isAnnual ? '<span class="status-badge-approved"><i class="bi bi-patch-check-fill me-1"></i>Annual Pass ($25 / ₦30k)</span>' : '<span class="badge bg-secondary text-white">Standard Explorer</span>'}
            </td>
            <td class="text-light small">${exp.joined}</td>
            <td>
              <button class="btn btn-sm ${isAnnual ? 'btn-outline-warning' : 'btn-mint'}" onclick="adminToggleMembership('${exp.email}')">
                <i class="bi bi-arrow-repeat me-1"></i> ${isAnnual ? 'Downgrade' : 'Grant Pass'}
              </button>
            </td>
          </tr>
        `;
      }).join('');
    }

    // 3. Populate Business Listings
    const customBiz = JSON.parse(localStorage.getItem('ae_business_listings') || '[]');
    const bizBody = document.getElementById('adminBizBody');
    if (bizBody && customBiz.length > 0) {
      customBiz.forEach((biz, idx) => {
        const rowId = `customBizRow_${idx}`;
        if (!document.getElementById(rowId)) {
          const tr = document.createElement('tr');
          tr.id = rowId;
          tr.innerHTML = `
            <td>
              <strong class="text-white">${biz.name}</strong>
              <div class="small text-muted">${biz.phone || 'Contact provided'} &bull; ${biz.email || ''}</div>
            </td>
            <td><span class="badge bg-dark border border-secondary text-info">${biz.category || 'Spot'}</span></td>
            <td>${biz.state} (${biz.city || 'City Center'})</td>
            <td><span class="text-mint small fw-bold">${biz.plan || 'Featured Partner'}</span></td>
            <td><span class="status-badge-pending">Pending Review</span></td>
            <td class="admin-action-btns">
              <div class="d-flex gap-1">
                <button class="btn btn-sm btn-mint" onclick="adminApproveListing('BIZ-CUST-${idx}', '${rowId}')"><i class="bi bi-check2"></i> Approve</button>
                <button class="btn btn-sm btn-outline-danger" onclick="adminRejectListing('BIZ-CUST-${idx}', '${rowId}')"><i class="bi bi-x"></i> Reject</button>
              </div>
            </td>
          `;
          bizBody.prepend(tr);
        }
      });
    }
  };


  // ------------------------------------------------------------------------
  // 18. Global Dual Currency Manager ($ USD / ₦ NGN) — PRD Section 7 & 41
  // Rate: ₦30,000 = $25 => 1 USD = ₦1,200
  // ------------------------------------------------------------------------
  const USD_RATE = 1200;
  window.currentCurrency = localStorage.getItem('ae_currency') || 'NGN';

  window.formatPrice = function(ngnAmount) {
    if (window.currentCurrency === 'USD') {
      const usd = Math.round(ngnAmount / USD_RATE);
      return `$${usd.toLocaleString()}`;
    }
    return `₦${ngnAmount.toLocaleString()}`;
  };

  window.toggleCurrency = function(curr) {
    window.currentCurrency = curr;
    localStorage.setItem('ae_currency', curr);

    // Update switcher buttons UI
    document.querySelectorAll('.currency-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.curr === curr);
    });

    // Update all elements with data-ngn-price attribute
    document.querySelectorAll('[data-ngn-price]').forEach(el => {
      const ngn = parseInt(el.dataset.ngnPrice, 10);
      if (!isNaN(ngn)) {
        el.textContent = window.formatPrice(ngn);
      }
    });

    showToast(`Display currency changed to ${curr === 'NGN' ? 'Nigerian Naira (₦)' : 'US Dollars ($)'}.`, 'Currency Updated');
  };

  // ------------------------------------------------------------------------
  // 19. Tours & Visits Engine (Separate Content Type from Events) — PRD 17, 18, 19
  // ------------------------------------------------------------------------
  const toursData = {
    lagosHeritage: {
      key: 'lagosHeritage',
      title: 'Lagos Island Historic & Cultural Walk',
      state: 'Lagos',
      duration: '7 Hours (Full Day)',
      regularPrice: 25000,
      memberPrice: 18000,
      image: 'assets/images/lagos_street.jpg',
      meetingPoint: 'Freedom Park Gate, Broad Street, Lagos Island',
      destination: 'Old Lagos Historic Quarters, Brazilian Quarter, Marina',
      activities: [
        'Guided architectural exploration of historic Brazilian Quarters',
        'Walkthrough at the National Museum Lagos and royal artifacts',
        'Street food sampling (Akara, Puff-Puff, Coconut Candy)',
        'Traditional textile and souvenir market walk'
      ],
      included: ['Licensed historian guide', 'All museum entry passes', 'Water & local snacks', 'Official Explorer badge pin'],
      excluded: ['Personal souvenir shopping', 'Hotel pickup outside Lagos Island'],
      guide: 'Babatunde Adeleke (Certified Lagos Historian)',
      relatedSpots: ['Freedom Park Lagos', 'Terra Kulture', 'Nike Art Gallery']
    },
    lekkiCanopyBoat: {
      key: 'lekkiCanopyBoat',
      title: 'Lekki Canopy Walkway & Coastal Lagoon Cruise',
      state: 'Lagos',
      duration: '6 Hours',
      regularPrice: 35000,
      memberPrice: 26000,
      image: 'assets/images/lekki_canopy.jpg',
      meetingPoint: 'Lekki Conservation Centre Entrance Gate',
      destination: 'Lekki Nature Reserve & Lekki-Ikoyi Lagoon Waters',
      activities: [
        'Ascend the longest canopy walkway in Africa (401m) above rainforest',
        'Wildlife spotting (Mona monkeys, peacocks, giant tortoises)',
        'Private speed boat cruise along the Lekki-Ikoyi link bridge waters',
        'Lagoon sunset view with refreshing palm wine cocktails'
      ],
      included: ['LCC admissions and canopy pass', 'Private motorboat charter & lifejackets', 'Refreshment basket', 'Dedicated guide'],
      excluded: ['Heavy luggage transfers'],
      guide: 'Chioma Okeke (Wildlife Ecologist & Guide)',
      relatedSpots: ['Lekki Conservation Centre', 'The Roof Top VI', 'Tarkwa Bay']
    },
    erinWaterfallTrek: {
      key: 'erinWaterfallTrek',
      title: 'Erin Ijesha 7-Tiers Waterfall Guided Expedition',
      state: 'Osun',
      duration: '8 Hours (Full Day)',
      regularPrice: 28000,
      memberPrice: 20000,
      image: 'assets/images/osun_waterfalls.jpg',
      meetingPoint: 'Erin-Ijesha Main Gate, Oriade LGA, Osun',
      destination: 'Olumirin Cascades & Ancient Abake Mountain Village',
      activities: [
        'Guided hike ascending all seven distinct waterfall tiers',
        'Visit to the ancient mountain settlement of Abake village at the summit',
        'Natural plunge pool swims in crystalline spring waters',
        'Traditional mountain picnic with hot roasted plantain (Boli) & groundnuts'
      ],
      included: ['Local forest guide & security escort', 'All waterfall entry fees', 'Bush picnic & fresh coconut water', 'Hiking trekking pole'],
      excluded: ['Change of footwear / waterproof gears'],
      guide: 'Lanre Ojo (Osun Mountain & Forest Specialist)',
      relatedSpots: ['Erin Ijesha Waterfalls', 'Zenith Grand Hotel', 'Amala Heritage Kitchen']
    },
    osunGroveTour: {
      key: 'osunGroveTour',
      title: 'Osun-Osogbo Sacred Grove UNESCO Cultural Walk',
      state: 'Osun',
      duration: '5 Hours',
      regularPrice: 22000,
      memberPrice: 16000,
      image: 'assets/images/osun_grove.jpg',
      meetingPoint: 'Sacred Grove Main Entrance Gate, Osogbo',
      destination: 'Osun-Osogbo Sacred Forest & River Sanctuaries',
      activities: [
        'Historical walkthrough of Suzanne Wenger sculpted shrines and sanctuaries',
        'Adire tie-and-dye artisan interactive demonstration',
        'Sacred prayer ritual view at the holy riverbank',
        'Traditional talking drum & bata rhythms demonstration'
      ],
      included: ['UNESCO certified heritage guide', 'All shrine access & photo permits', 'Authentic handmade Adire keepsake scarf'],
      excluded: ['Personal spiritual offerings'],
      guide: 'Iya Osun Priestess & Heritage Guide',
      relatedSpots: ['Osun-Osogbo Sacred Grove', 'Ejigbo Art Centre', 'Owalla Beach']
    },
    ilesaShrineTour: {
      key: 'ilesaShrineTour',
      title: 'Ilesa Ancient Kingdom & Purification Walk',
      state: 'Osun',
      duration: '4 Hours',
      regularPrice: 18000,
      memberPrice: 12000,
      image: 'assets/images/ilesa_shrine.jpg',
      meetingPoint: 'Owa Obokun Palace Gate, Ilesa',
      destination: 'Ancient Ijesha Palaces, Purification Shrine & Pottery Quarters',
      activities: [
        'Palace courtyard tour and meeting with palace elders',
        'Sacred purification shrine architectural walkthrough',
        'Traditional bronze and brass casting studio demonstration',
        'Sample authentic pounded yam and egusi feast'
      ],
      included: ['Local heritage guide', 'Shrine access permits', 'Traditional lunch feast'],
      excluded: ['Private transport to Ilesa'],
      guide: 'Adeyemi Famoriyo (Ijesha Heritage Specialist)',
      relatedSpots: ['Ilesa Purification Shrine', 'Erin Ijesha Waterfalls', 'Owalla Beach']
    }
  };

  window.openTourModal = function(tourKey) {
    const tour = toursData[tourKey];
    if (!tour) return;

    const modalTitle = document.getElementById('tourModalTitle');
    const modalImg = document.getElementById('tourModalImg');
    const modalDuration = document.getElementById('tourModalDuration');
    const modalDest = document.getElementById('tourModalDest');
    const modalMeeting = document.getElementById('tourModalMeeting');
    const modalActivities = document.getElementById('tourModalActivities');
    const modalIncluded = document.getElementById('tourModalIncluded');
    const modalExcluded = document.getElementById('tourModalExcluded');
    const modalGuide = document.getElementById('tourModalGuide');
    const modalRegularPrice = document.getElementById('tourModalRegularPrice');
    const modalMemberPrice = document.getElementById('tourModalMemberPrice');
    const bookBtn = document.getElementById('tourModalBookBtn');

    if (modalTitle) modalTitle.textContent = tour.title;
    if (modalImg) modalImg.src = tour.image;
    if (modalDuration) modalDuration.innerHTML = `<i class="bi bi-clock me-1 text-mint"></i> ${tour.duration}`;
    if (modalDest) modalDest.innerHTML = `<i class="bi bi-geo-alt-fill me-1 text-mint"></i> ${tour.destination}`;
    if (modalMeeting) modalMeeting.textContent = tour.meetingPoint;
    if (modalGuide) modalGuide.textContent = tour.guide;

    if (modalRegularPrice) modalRegularPrice.textContent = window.formatPrice(tour.regularPrice);
    if (modalMemberPrice) modalMemberPrice.textContent = window.formatPrice(tour.memberPrice);

    if (modalActivities) {
      modalActivities.innerHTML = tour.activities.map(act => `
        <div class="d-flex gap-2 mb-2">
          <i class="bi bi-check-circle-fill text-mint mt-1"></i>
          <span class="small text-light">${act}</span>
        </div>
      `).join('');
    }

    if (modalIncluded) {
      modalIncluded.innerHTML = tour.included.map(inc => `
        <li class="small text-muted mb-1"><i class="bi bi-check2 text-mint me-2"></i>${inc}</li>
      `).join('');
    }

    if (modalExcluded) {
      modalExcluded.innerHTML = tour.excluded.map(exc => `
        <li class="small text-muted mb-1"><i class="bi bi-x text-danger me-2"></i>${exc}</li>
      `).join('');
    }

    if (bookBtn) {
      bookBtn.onclick = () => window.openTourBookingModal(tourKey);
    }

    const modalEl = document.getElementById('tourDetailsModal');
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  };

  let currentBookingTour = null;
  let currentTourQty = 1;

  window.openTourBookingModal = function(tourKey) {
    const tour = toursData[tourKey];
    if (!tour) return;

    currentBookingTour = tour;
    currentTourQty = 1;

    // Check if user is a member
    const isMember = localStorage.getItem('ae_user_is_member') === 'true';

    const titleEl = document.getElementById('bookTourTitle');
    const durationEl = document.getElementById('bookTourDuration');
    const meetingEl = document.getElementById('bookTourMeeting');
    const memberBannerEl = document.getElementById('bookTourMemberBadge');
    const qtyEl = document.getElementById('tourQty');
    const pricePerPersonEl = document.getElementById('tourPricePerPerson');
    const totalPriceEl = document.getElementById('tourTotalPrice');

    if (titleEl) titleEl.textContent = tour.title;
    if (durationEl) durationEl.textContent = tour.duration;
    if (meetingEl) meetingEl.textContent = tour.meetingPoint;

    const unitPrice = isMember ? tour.memberPrice : tour.regularPrice;

    if (memberBannerEl) {
      if (isMember) {
        memberBannerEl.innerHTML = `<span class="badge bg-warning text-dark fw-bold"><i class="bi bi-shield-check me-1"></i> Member Rate Applied (Save ${window.formatPrice(tour.regularPrice - tour.memberPrice)}!)</span>`;
      } else {
        memberBannerEl.innerHTML = `<span class="badge bg-dark text-muted border border-secondary">Regular Explorer Rate &bull; <a href="join.html" class="text-mint text-decoration-underline">Upgrade to Annual Pass ($25/₦30k)</a> for member discount</span>`;
      }
    }

    if (qtyEl) qtyEl.textContent = currentTourQty;
    if (pricePerPersonEl) pricePerPersonEl.textContent = window.formatPrice(unitPrice);
    if (totalPriceEl) totalPriceEl.textContent = window.formatPrice(unitPrice * currentTourQty);

    // Hide details modal if open
    const detailsModal = bootstrap.Modal.getInstance(document.getElementById('tourDetailsModal'));
    if (detailsModal) detailsModal.hide();

    const bookingModal = new bootstrap.Modal(document.getElementById('tourBookingModal'));
    bookingModal.show();
  };

  window.adjustTourQty = function(delta) {
    if (!currentBookingTour) return;
    currentTourQty = Math.max(1, Math.min(10, currentTourQty + delta));
    const isMember = localStorage.getItem('ae_user_is_member') === 'true';
    const unitPrice = isMember ? currentBookingTour.memberPrice : currentBookingTour.regularPrice;

    const qtyEl = document.getElementById('tourQty');
    const totalPriceEl = document.getElementById('tourTotalPrice');

    if (qtyEl) qtyEl.textContent = currentTourQty;
    if (totalPriceEl) totalPriceEl.textContent = window.formatPrice(unitPrice * currentTourQty);
  };

  window.submitTourBooking = function(e) {
    if (e) e.preventDefault();
    if (!currentBookingTour) return;

    const name = document.getElementById('tourLeadName')?.value || 'Explorer';
    const email = document.getElementById('tourLeadEmail')?.value || 'explorer@africaexplorers.ng';
    const date = document.getElementById('tourDateSelect')?.value || 'Upcoming Weekend';
    const isMember = localStorage.getItem('ae_user_is_member') === 'true';
    const unitPrice = isMember ? currentBookingTour.memberPrice : currentBookingTour.regularPrice;
    const ref = 'AE-TOUR-' + Math.floor(1000 + Math.random() * 9000);

    const booking = {
      id: ref,
      type: 'Tour & Visit',
      tourName: currentBookingTour.title,
      state: currentBookingTour.state,
      leadName: name,
      email: email,
      date: date,
      participants: currentTourQty,
      totalPrice: unitPrice * currentTourQty,
      currency: window.currentCurrency,
      isMemberRate: isMember,
      status: 'Confirmed'
    };

    try {
      const stored = JSON.parse(localStorage.getItem('ae_user_tours') || '[]');
      stored.unshift(booking);
      localStorage.setItem('ae_user_tours', JSON.stringify(stored));
    } catch (err) {}

    const bookingModal = bootstrap.Modal.getInstance(document.getElementById('tourBookingModal'));
    if (bookingModal) bookingModal.hide();

    // Show Confirmation
    const refEl = document.getElementById('confirmBookingRef');
    const confirmNameEl = document.getElementById('confirmAttendeeName');
    const confirmEventEl = document.getElementById('confirmEventName');

    if (refEl) refEl.textContent = ref;
    if (confirmNameEl) confirmNameEl.textContent = name;
    if (confirmEventEl) confirmEventEl.textContent = currentBookingTour.title;

    const confirmModal = new bootstrap.Modal(document.getElementById('bookingConfirmedModal'));
    confirmModal.show();
  };

  // ------------------------------------------------------------------------
  // 20. Location-Based Spot Discovery ("Around [Attraction]") — PRD Section 22
  // "I'm going here. Show me what I need around here."
  // ------------------------------------------------------------------------
  const locationAnchorsData = {
    erinIjesha: {
      name: 'Erin Ijesha Waterfalls',
      state: 'Osun State',
      description: '"I\'m going to Erin Ijesha — what do I need around here?" Verified stay, food, guides, and essentials.',
      stay: [
        { name: 'Zenith Grand Hotel & Suites', dist: '15 mins away (Ilesa)', type: 'Hotel' },
        { name: 'Olumirin Eco-Lodge Resthouse', dist: '3 mins away', type: 'Shortlet' }
      ],
      eat: [
        { name: 'Amala Heritage Kitchen & Bar', dist: '20 mins (Station Rd)', type: 'Local Dining' },
        { name: 'Erin Valley Palm Wine & Bushmeat Hut', dist: 'At Waterfall Entrance', type: 'Food Spot' }
      ],
      experience: [
        { name: 'Oriade Highland Hiking Guides', type: 'Certified Tour Guides' },
        { name: 'Abake Mountain Cultural Trail', type: 'Guided Excursion' }
      ],
      entertainment: [
        { name: 'Ilesa Royal Lounge & Garden', type: 'Relaxation' },
        { name: 'Oriade Lakeside Hangout', type: 'Evening Drinks' }
      ],
      essentials: [
        { name: 'Oriade Community Pharmacy', type: 'First Aid & Meds' },
        { name: 'GTBank ATM (Ilesa Expressway)', type: 'Cash Withdrawal' },
        { name: 'TotalEnergies Fuel Station', type: 'Fuel & Mart' }
      ]
    },
    lekkiCanopy: {
      name: 'Lekki Conservation Centre',
      state: 'Lagos State',
      description: '"I\'m visiting Lekki Conservation Centre — what\'s around here?" Stay, dine, and relax nearby.',
      stay: [
        { name: 'The Haven Luxury Penthouse', dist: '10 mins away', type: 'Shortlet' },
        { name: 'The Federal Palace Hotel & Casino', dist: '18 mins away (VI)', type: 'Luxury Hotel' }
      ],
      eat: [
        { name: 'Terra Kulture Arts & Restaurant', dist: '12 mins away', type: 'Restaurant' },
        { name: 'Admiralty Food Court & Grills', dist: '8 mins away', type: 'Food Hub' }
      ],
      experience: [
        { name: '401m Canopy Walkway & Reserve', type: 'Nature Tour' },
        { name: 'Lagos Lagoon Sunset Speedboat', type: 'Water Activity' }
      ],
      entertainment: [
        { name: 'The Roof Top Victoria Island', type: 'Skyline Lounge' },
        { name: 'Landmark Beach Club', type: 'Beach Club' }
      ],
      essentials: [
        { name: 'Medplus Pharmacy (Chevron Axis)', type: '24/7 Pharmacy' },
        { name: 'Zenith Bank ATM (Lekki Phase 1)', type: 'ATM Gallery' },
        { name: 'Conoil Mega Station (Lekki Expy)', type: 'Fuel & EV Charging' }
      ]
    },
    osunGrove: {
      name: 'Osun-Osogbo Sacred Grove',
      state: 'Osun State',
      description: '"I\'m exploring Osun Grove — what do I need around here?" Cultural stays, food and support.',
      stay: [
        { name: 'Osogbo Royal Heritage Suites', dist: '8 mins away', type: 'Hotel' },
        { name: 'Sacred Forest View Guest House', dist: '5 mins away', type: 'Guest House' }
      ],
      eat: [
        { name: 'Amala Sky Osogbo (Station Rd)', dist: '6 mins away', type: 'Authentic Yoruba' },
        { name: 'Osun River Breeze Cafe', dist: 'Outside Grove', type: 'Snacks & Drinks' }
      ],
      experience: [
        { name: 'Suzanne Wenger Shrine Historians', type: 'UNESCO Cultural Guides' },
        { name: 'Adire Tie-and-Dye Artisan Workshop', type: 'Craft Experience' }
      ],
      entertainment: [
        { name: 'Osogbo Cultural Arts Amphitheatre', type: 'Live Theater' },
        { name: 'Palm Grove Evening Garden', type: 'Folk Music & Drinks' }
      ],
      essentials: [
        { name: 'HealthPlus Pharmacy (Osogbo)', type: 'Pharmacy' },
        { name: 'FirstBank ATM (Post Office Axis)', type: 'ATM' },
        { name: 'NNPC Mega Station (Osogbo Bypass)', type: 'Fuel Station' }
      ]
    },
    nikeArt: {
      name: 'Nike Art Gallery',
      state: 'Lagos State',
      description: '"I\'m visiting Nike Art Gallery — what\'s around here?" Art, beach spots, dining and stays.',
      stay: [
        { name: 'Elegushi Coastal Boutique Hotel', dist: '4 mins away', type: 'Boutique Hotel' },
        { name: 'Ikoyi Luxury Lagoon Apartment', dist: '12 mins away', type: 'Shortlet' }
      ],
      eat: [
        { name: 'Danfo Bistro & Genius Bar', dist: '7 mins away', type: 'Afro-Fusion' },
        { name: 'Ocean Basket Seafood VI', dist: '10 mins away', type: 'Seafood' }
      ],
      experience: [
        { name: 'Nike Art Gallery 5-Floor Curated Tour', type: 'Art Walk' },
        { name: 'Elegushi Beach Horse Riding & Surfing', type: 'Beach Activity' }
      ],
      entertainment: [
        { name: 'Moist Beach Club', type: 'Beach Lounge' },
        { name: 'Hard Rock Cafe Lagos', type: 'Live Music' }
      ],
      essentials: [
        { name: 'Healthline Pharmacy (Lekki Phase 1)', type: 'Pharmacy' },
        { name: 'Access Bank ATM Gallery (Elegushi Rd)', type: 'ATM' },
        { name: 'Mobil Station (Maruwa Junction)', type: 'Fuel Station' }
      ]
    }
  };

  window.switchLocationAnchor = function(anchorKey, btnEl) {
    const data = locationAnchorsData[anchorKey];
    if (!data) return;

    document.querySelectorAll('.location-anchor-btn').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');

    const titleEl = document.getElementById('locationAnchorTitle');
    const descEl = document.getElementById('locationAnchorDesc');
    const stayContainer = document.getElementById('anchorStayList');
    const eatContainer = document.getElementById('anchorEatList');
    const expContainer = document.getElementById('anchorExpList');
    const essentialsContainer = document.getElementById('anchorEssentialsList');

    if (titleEl) titleEl.innerHTML = `<i class="bi bi-pin-map-fill text-mint me-2"></i>Exploring Around ${data.name}?`;
    if (descEl) descEl.textContent = data.description;

    if (stayContainer) {
      stayContainer.innerHTML = data.stay.map(item => `
        <li class="mb-2 pb-2 border-bottom border-secondary border-opacity-10">
          <strong class="text-white d-block">${item.name}</strong>
          <span class="text-muted small">${item.type} &bull; ${item.dist || 'Nearby'}</span>
        </li>
      `).join('');
    }

    if (eatContainer) {
      eatContainer.innerHTML = data.eat.map(item => `
        <li class="mb-2 pb-2 border-bottom border-secondary border-opacity-10">
          <strong class="text-white d-block">${item.name}</strong>
          <span class="text-muted small">${item.type} &bull; ${item.dist || 'Nearby'}</span>
        </li>
      `).join('');
    }

    if (expContainer) {
      expContainer.innerHTML = data.experience.map(item => `
        <li class="mb-2 pb-2 border-bottom border-secondary border-opacity-10">
          <strong class="text-white d-block">${item.name}</strong>
          <span class="text-mint small"><i class="bi bi-star-fill text-warning me-1"></i>${item.type}</span>
        </li>
      `).join('');
    }

    if (essentialsContainer) {
      essentialsContainer.innerHTML = data.essentials.map(item => `
        <li class="mb-2 pb-2 border-bottom border-secondary border-opacity-10">
          <strong class="text-white d-block">${item.name}</strong>
          <span class="text-warning small"><i class="bi bi-shield-check me-1"></i>${item.type}</span>
        </li>
      `).join('');
    }
  };

  // ------------------------------------------------------------------------
  // 21. "Share Your Exploration" Stories Uploader — PRD Section 36
  // ------------------------------------------------------------------------
  window.submitExplorerStory = function(e) {
    if (e) e.preventDefault();
    const title = document.getElementById('storyTitle')?.value || 'My Exploration';
    const state = document.getElementById('storyState')?.value || 'Lagos';
    const author = document.getElementById('storyAuthor')?.value || 'Anonymous Explorer';
    const text = document.getElementById('storyText')?.value || '';

    const newStory = {
      title,
      state,
      author,
      text,
      timestamp: new Date().toLocaleDateString(),
      status: 'Pending Moderation'
    };

    try {
      const stored = JSON.parse(localStorage.getItem('ae_explorer_stories') || '[]');
      stored.unshift(newStory);
      localStorage.setItem('ae_explorer_stories', JSON.stringify(stored));
    } catch (err) {}

    const modal = bootstrap.Modal.getInstance(document.getElementById('shareStoryModal'));
    if (modal) modal.hide();

    showToast(`Thank you, ${author}! Your story "${title}" has been submitted for moderation. Once reviewed by administrators, it will be published to the ${state} State Gallery.`, 'Story Submitted! 📸');
  };

  // ------------------------------------------------------------------------
  // 22. Contact Form with PRD Categories — PRD Section 40
  // ------------------------------------------------------------------------
  const contactForm = document.getElementById('contactUsForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const cat = document.getElementById('contactCategory')?.value || 'General enquiry';
      const name = document.getElementById('contactName')?.value || 'Explorer';
      contactForm.reset();
      showToast(`Thank you, ${name}! Your inquiry regarding "${cat}" has been dispatched to our Nigeria operations team. We will respond within 4 hours.`, 'Message Received');
    });
  }

  // ------------------------------------------------------------------------
  // 23. State-Specific Registration Pre-Selection — PRD Section 30
  // ------------------------------------------------------------------------
  const urlParams = new URLSearchParams(window.location.search);
  const preselectedState = urlParams.get('state');
  if (preselectedState) {
    const regStateSelect = document.getElementById('regState');
    const alertBanner = document.getElementById('stateAlertBanner');
    const alertTitle = document.getElementById('stateAlertTitle');
    const alertSub = document.getElementById('stateAlertSubtitle');

    if (regStateSelect) {
      regStateSelect.value = preselectedState;
    }

    if (alertBanner && alertTitle && alertSub) {
      alertBanner.style.display = 'flex';
      alertTitle.innerHTML = `<i class="bi bi-shield-fill-check text-mint me-1"></i> Joining ${preselectedState} Explorers`;
      alertSub.textContent = `Your Home State has been automatically locked to ${preselectedState} State. Complete your details to receive your digital passport.`;
    }
  }

  // Sync Currency Buttons initial state
  document.querySelectorAll('.currency-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.curr === window.currentCurrency);
  });

  // Reformat prices with active currency
  document.querySelectorAll('[data-ngn-price]').forEach(el => {
    const ngn = parseInt(el.dataset.ngnPrice, 10);
    if (!isNaN(ngn)) {
      el.textContent = window.formatPrice(ngn);
    }
  });

  if (typeof window.initAdminPortal === 'function') {
    window.initAdminPortal();
  }

});



