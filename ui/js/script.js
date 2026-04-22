// Sahayatri Nirman Sewa - Main JS

const translations = {
    'en': {
        'nav_heading': 'Sahayatri Nirman Sewa Pvt. Ltd.',
        'nav_home': 'Home',
        'nav_services': 'Services',
        'nav_projects': 'Projects',
        'nav_about': 'About',
        'nav_quote': 'Request Quote',
        'hero_tagline': 'Building the Future of Nepal',
        'hero_title': 'Engineering Excellence & Earthquake Resilience',
        'hero_desc': 'Providing Class-A construction services across Kathmandu, specializing in sustainable infrastructure and modern residential developments.',
        'hero_btn_work': 'View Our Work',
        'hero_btn_services': 'Our Services',
        'trust_1_title': 'NBC Compliant',
        'trust_1_desc': 'Strict adherence to Nepal National Building Codes for maximum earthquake resilience.',
        'trust_2_title': 'Quality Assurance',
        'trust_2_desc': 'Rigorous inspection and testing at every pivotal stage of construction.',
        'trust_3_title': 'Timely Delivery',
        'trust_3_desc': 'Dedicated project management ensuring seamless and on-schedule project completion.',
        'services_title': 'Core Construction Services',
        'svc_1_title': 'Residential Development',
        'svc_1_desc': 'Bespoke housing solutions focusing on modern aesthetics, structural durability, and functional living spaces.',
        'svc_2_title': 'Infrastructure & RCC',
        'svc_2_desc': 'Specialized civil engineering for complex RCC structures, bridges, and commercial foundations.',
        'svc_3_title': 'Plumbing & Waterproofing',
        'svc_3_desc': 'Comprehensive MEP services ensuring leak-proof foundations and efficient water management systems.',
        'port_title': 'Our Portfolio',
        'port_subtitle': 'Landmark projects across Kathmandu Valley.',
        'stat_ongoing': 'Ongoing',
        'stat_completed': 'Completed',
        'proj_1_name': 'Heritage Precinct Development',
        'proj_2_name': 'Structural Renovation',
        'proj_3_name': 'Premium Residential Villa',
        'loc_bhaktapur': 'Bhaktapur, Nepal',
        'loc_lalitpur': 'Lalitpur District',
        'loc_ktm15': 'Kathmandu - 15',
        'contact_title': 'Start Your Journey',
        'contact_desc': 'Ready to build? Get in touch with our engineering team for a professional consultation and earthquake resilience assessment.',
        'addr_text': 'Kathmandu Mahanagarpalika - 15, Nepal',
        'form_title': 'Request a Quote',
        'ph_name': 'Your Name',
        'ph_email': 'Email Address',
        'ph_msg': 'Brief project description...',
        'opt_type': 'Project Category',
        'opt_res': 'Residential',
        'opt_comm': 'Commercial',
        'opt_infra': 'Infrastructure',
        'btn_submit': 'Get Estimate',
        'copy_text': '© 2026 Sahayatri Nirman Sewa Pvt. Ltd. All rights reserved.',
        'alert_msg': 'Request sent! Our team will contact you shortly.',
        'est_title': 'Budget Estimator',
        'est_desc': 'Get a quick, non-binding cost estimate for your project.',
        'est_type': 'Project Type',
        'est_area': 'Estimated Area (sq. ft.)',
        'est_quality': 'Finish Quality',
        'est_eco': 'Economy',
        'est_pre': 'Premium',
        'est_lux': 'Luxury',
        'est_btn': 'Calculate Estimate',
        'est_result': 'Estimated Budget Range',
        'est_disclaimer': '*This is a rough estimate for planning purposes only. Final costs depend on site conditions and specific requirements.',
        'est_npr': 'NPR',
        'proj_1_desc': 'A large-scale infrastructure project focused on restoring and developing historical heritage sites with modern earthquake-resistant engineering.',
        'proj_2_desc': 'Complete structural overhaul and interior renovation of a historic building, balancing traditional aesthetics with modern safety standards.',
        'proj_3_desc': 'A luxury residential villa project featuring state-of-the-art construction techniques and sustainable building materials.',
        'test_title': 'What Our Clients Say',
        'test_1_role': 'Homeowner',
        'test_1_text': 'Sahayatri Nirman delivered our dream home on time and within budget. Their attention to structural detail is impressive.',
        'test_2_role': 'Business Owner',
        'test_2_text': 'Professional and reliable. Their team handled our commercial renovation with extreme care and precision.',
        'modal_close': 'Close',
        'modal_specs': 'Project Specifications',
        'modal_area': 'Area',
        'modal_duration': 'Duration',
        'modal_type': 'Project Type',
        'stat_title': 'Our Impact in Numbers',
        'stat_years': 'Years Experience',
        'stat_projects': 'Projects Completed',
        'stat_clients': 'Happy Clients',
        'stat_sqft': 'Million Sq. Ft. Built',
        'ph_search': 'Search projects by name or location...'
    },
    'ne': {
        'nav_heading': 'सहयात्री निर्माण सेवा प्रा. लि.',
        'nav_home': 'गृहपृष्ठ',
        'nav_services': 'सेवाहरू',
        'nav_projects': 'परियोजनाहरू',
        'nav_about': 'हाम्रोबारे',
        'nav_quote': 'कोटेशन अनुरोध',
        'hero_tagline': 'नेपालको भविष्य निर्माण गर्दै',
        'hero_title': 'इन्जिनियरिङ उत्कृष्टता र भूकम्प प्रतिरोधात्मक क्षमता',
        'hero_desc': 'काठमाडौंभरि स्तरीय निर्माण सेवाहरू प्रदान गर्दै, दिगो पूर्वाधार र आधुनिक आवासीय विकासमा विशेषज्ञता।',
        'hero_btn_work': 'हाम्रो काम हेर्नुहोस्',
        'hero_btn_services': 'हाम्रा सेवाहरू',
        'trust_1_title': 'NBC अनुपालन',
        'trust_1_desc': 'अधिकतम भूकम्प प्रतिरोधात्मक क्षमताको लागि नेपाल राष्ट्रिय भवन संहिताको कडा पालना।',
        'trust_2_title': 'गुणस्तर आश्वासन',
        'trust_2_desc': 'निर्माणको प्रत्येक महत्वपूर्ण चरणमा कडा निरीक्षण र परीक्षण।',
        'trust_3_title': 'समयमै डेलिभरी',
        'trust_3_desc': 'निर्बाध र समयमै परियोजना सम्पन्न सुनिश्चित गर्न समर्पित परियोजना व्यवस्थापन।',
        'services_title': 'प्रमुख निर्माण सेवाहरू',
        'svc_1_title': 'आवासीय विकास',
        'svc_1_desc': 'आधुनिक सौन्दर्य, संरचनात्मक स्थायित्व, र कार्यात्मक बस्ने ठाउँहरूमा केन्द्रित आवास समाधानहरू।',
        'svc_2_title': 'पूर्वाधार र RCC',
        'svc_2_desc': 'जटिल RCC संरचनाहरू, पुलहरू, र व्यावसायिक जगहरूको लागि विशेष सिभिल इन्जिनियरिङ।',
        'svc_3_title': 'प्लम्बिङ र वाटरप्रुफिङ',
        'svc_3_desc': 'चुहावट-रहित जग र कुशल पानी व्यवस्थापन प्रणाली सुनिश्चित गर्ने व्यापक MEP सेवाहरू।',
        'port_title': 'हाम्रो पोर्टफोलियो',
        'port_subtitle': 'काठमाडौं उपत्यकाभरिका महत्वपूर्ण परियोजनाहरू।',
        'stat_ongoing': 'जारी छ',
        'stat_completed': 'सम्पन्न',
        'proj_1_name': 'सम्पदा क्षेत्र विकास',
        'proj_2_name': 'संरचनात्मक नवीकरण',
        'proj_3_name': 'प्रिमियम आवासीय विला',
        'loc_bhaktapur': 'भक्तपुर, नेपाल',
        'loc_lalitpur': 'ललितपुर जिल्ला',
        'loc_ktm15': 'काठमाडौं - १५',
        'contact_title': 'तपाईंको यात्रा सुरु गर्नुहोस्',
        'contact_desc': 'निर्माण सुरु गर्न तयार हुनुहुन्छ? व्यावसायिक परामर्श र भूकम्प प्रतिरोधात्मक मूल्याङ्कनको लागि हाम्रो टोलीसँग सम्पर्क गर्नुहोस्।',
        'addr_text': 'काठमाडौं महानगरपालिका - १५, नेपाल',
        'form_title': 'कोटेशन अनुरोध गर्नुहोस्',
        'ph_name': 'तपाईंको नाम',
        'ph_email': 'इमेल ठेगाना',
        'ph_msg': 'परियोजनाको संक्षिप्त विवरण...',
        'opt_type': 'परियोजना वर्ग',
        'opt_res': 'आवासीय',
        'opt_comm': 'व्यावसायिक',
        'opt_infra': 'पूर्वाधार',
        'btn_submit': 'अनुमान प्राप्त गर्नुहोस्',
        'copy_text': '© २०२६ सहयात्री निर्माण सेवा प्रा. लि. सबै अधिकार सुरक्षित।',
        'alert_msg': 'अनुरोध पठाइयो! हाम्रो टोलीले तपाईंलाई छिट्टै सम्पर्क गर्नेछ।',
        'est_title': 'बजेट अनुमानक',
        'est_desc': 'तपाईंको परियोजनाको लागि एक छिटो, गैर-बाध्यकारी लागत अनुमान प्राप्त गर्नुहोस्।',
        'est_type': 'परियोजना प्रकार',
        'est_area': 'अनुमानित क्षेत्रफल (वर्ग फिट)',
        'est_quality': 'निर्माणको गुणस्तर',
        'est_eco': 'किफायती',
        'est_pre': 'प्रिमियम',
        'est_lux': 'लक्जरी',
        'est_btn': 'अनुमान गणना गर्नुहोस्',
        'est_result': 'अनुमानित बजेट दायरा',
        'est_disclaimer': '*यो योजना उद्देश्यका लागि मात्र एक मोटो अनुमान हो। अन्तिम लागत साइटको अवस्था र विशेष आवश्यकताहरूमा निर्भर गर्दछ।',
        'est_npr': 'रु.',
        'proj_1_desc': 'आधुनिक भूकम्प प्रतिरोधात्मक इन्जिनियरिङका साथ ऐतिहासिक सम्पदा स्थलहरूको पुनर्स्थापना र विकासमा केन्द्रित एक ठूलो स्तरको पूर्वाधार परियोजना।',
        'proj_2_desc': 'परम्परागत सौन्दर्य र आधुनिक सुरक्षा मापदण्डहरू बीच सन्तुलन मिलाउँदै एक ऐतिहासिक भवनको पूर्ण संरचनात्मक मर्मत र आन्तरिक नवीकरण।',
        'proj_3_desc': 'अत्याधुनिक निर्माण प्रविधि र दिगो निर्माण सामग्रीहरू प्रयोग गरिएको एक विलासी आवासीय विला परियोजना।',
        'test_title': 'हाम्रा ग्राहकहरू के भन्छन्',
        'test_1_role': 'घरधनी',
        'test_1_text': 'सहयात्री निर्माणले हाम्रो सपनाको घर समयमै र बजेट भित्रै निर्माण गरिदियो। उनीहरूको संरचनात्मक विवरणमा ध्यान प्रभावशाली छ।',
        'test_2_role': 'व्यवसाय मालिक',
        'test_2_text': 'व्यावसायिक र भरपर्दो। उनीहरूको टोलीले हाम्रो व्यावसायिक नवीकरण अत्यन्त सावधानी र शुद्धताका साथ सम्पन्न गर्यो।',
        'modal_close': 'बन्द गर्नुहोस्',
        'modal_specs': 'परियोजना विवरणहरू',
        'modal_area': 'क्षेत्रफल',
        'modal_duration': 'अवधि',
        'modal_type': 'परियोजना प्रकार',
        'stat_title': 'हाम्रो प्रभाव संख्यामा',
        'stat_years': 'वर्षको अनुभव',
        'stat_projects': 'सम्पन्न परियोजनाहरू',
        'stat_clients': 'सन्तुष्ट ग्राहकहरू',
        'stat_sqft': 'मिलियन वर्ग फिट निर्माण',
        'ph_search': 'नाम वा स्थान अनुसार परियोजनाहरू खोज्नुहोस्...'
    }
};

let currentLang = 'en';
let currentFilter = 'all';
let searchQuery = '';

// Global data placeholders
// serviceData, projectData, testimonialData are populated via fetchData

window.applyLanguage = function(lang) {
    console.log('applyLanguage called with:', lang);
    currentLang = lang;
    localStorage.setItem('preferredLang', lang);
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) el.textContent = translations[lang][key];
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
        const key = el.getAttribute('data-i18n-ph');
        if (translations[lang][key]) el.placeholder = translations[lang][key];
    });
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active', 'border-orange-600', 'bg-orange-50');
        if (btn.getAttribute('onclick')?.includes(`'${lang}'`)) {
            btn.classList.add('active', 'border-orange-600', 'bg-orange-50');
        }
    });

    if (serviceData.length > 0) renderServices();
    if (projectData.length > 0) renderProjects(currentFilter, searchQuery);
    if (testimonialData.length > 0) renderTestimonials();
}

function renderServices() {
    const grid = document.getElementById('services-grid');
    if (!grid) return;
    grid.innerHTML = serviceData.map((svc, index) => `
        <div class="group bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-6 md:p-8 hover:shadow-2xl transition duration-300 reveal reveal-delay-${(index % 3) + 1}">
            <div class="mb-6 overflow-hidden">
                <img src="${svc.image}" alt="Service" class="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition duration-500">
            </div>
            <h3 class="text-xl md:text-2xl font-bold mb-4">${translations[currentLang][svc.titleKey]}</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-6 text-sm md:text-base leading-relaxed">${translations[currentLang][svc.descKey]}</p>
        </div>
    `).join('');
    observeNewElements();
}

// Helper to load zipped or normal images
async function loadProjectImage(imgElement, imagePath) {
    if (!imagePath || !imgElement) return;
    
    // If it's a relative local path, just use it
    if (imagePath.startsWith('img/')) {
        imgElement.src = imagePath;
        return;
    }

    // If it's an S3 path, check if it's zipped
    const isZipped = imagePath.endsWith('.zip') || imagePath.includes('uploads/');
    const fullUrl = imagePath.startsWith('http') ? imagePath : `https://sahayatri-web-frontend-sahayatri-prod.s3.ap-south-1.amazonaws.com/${imagePath}`;

    if (isZipped) {
        try {
            const response = await fetch(fullUrl);
            if (!response.ok) throw new Error('Image not found');
            const blob = await response.blob();
            const zip = await JSZip.loadAsync(blob);
            
            // Get the first file in the zip
            const firstFile = Object.values(zip.files)[0];
            const unzippedBlob = await firstFile.async("blob");
            imgElement.src = URL.createObjectURL(unzippedBlob);
        } catch (err) {
            console.error('Error unzipping image:', err);
            imgElement.src = 'img/project1.jpg'; // Fallback
        }
    } else {
        imgElement.src = fullUrl;
    }
}

function renderProjects(filter = 'all', query = '') {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;
    
    let filtered = filter === 'all' ? projectData : projectData.filter(p => p.category === filter);
    
    if (query) {
        const q = query.toLowerCase();
        filtered = filtered.filter(p => 
            translations[currentLang][p.nameKey].toLowerCase().includes(q) || 
            translations[currentLang][p.locationKey].toLowerCase().includes(q)
        );
    }
    
    grid.innerHTML = filtered.map((proj, index) => `
        <div onclick="openProjectModal(${proj.id})" class="relative group h-[350px] md:h-[450px] overflow-hidden cursor-pointer reveal reveal-delay-${(index % 3) + 1}">
            <img id="proj-img-${proj.id}" alt="Project" class="w-full h-full object-cover group-hover:scale-110 transition duration-700">
            <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent opacity-90 p-6 md:p-8 flex flex-col justify-end">
                <span class="text-orange-500 text-[10px] font-bold uppercase mb-2">${translations[currentLang][proj.statusKey]}</span>
                <h4 class="text-white text-lg md:text-xl font-bold">${translations[currentLang][proj.nameKey]}</h4>
                <p class="text-gray-300 text-xs md:text-sm mt-1">${translations[currentLang][proj.locationKey]}</p>
            </div>
        </div>
    `).join('');

    // Load images asynchronously
    filtered.forEach(proj => {
        const img = document.getElementById(`proj-img-${proj.id}`);
        loadProjectImage(img, proj.image);
    });

    observeNewElements();
}

function handleSearch(e) {
    searchQuery = e.target.value;
    renderProjects(currentFilter, searchQuery);
}

function renderTestimonials() {
    const grid = document.getElementById('testimonials-grid');
    if (!grid) return;
    grid.innerHTML = testimonialData.map((t, index) => `
        <div class="bg-gray-50 dark:bg-gray-700/50 p-8 border border-gray-100 dark:border-gray-700 italic relative reveal reveal-delay-${(index % 2) + 1}">
            <div class="text-orange-500 mb-4 flex gap-1">
                ${Array(t.rating).fill('<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>').join('')}
            </div>
            <p class="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">"${translations[currentLang][t.textKey]}"</p>
            <div>
                <p class="font-bold text-gray-900 dark:text-gray-100 not-italic">${t.name}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest mt-1 not-italic">${translations[currentLang][t.roleKey]}</p>
            </div>
        </div>
    `).join('');
    observeNewElements();
}

function observeNewElements() {
    const revealElements = document.querySelectorAll('.reveal:not(.active)');
    if (window.revealObserver) {
        revealElements.forEach(el => window.revealObserver.observe(el));
    }
}

function filterProjects(category) {
    currentFilter = category;
    renderProjects(category, searchQuery);
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active', 'bg-orange-600', 'text-white');
        btn.classList.add('bg-white');
        if (btn.getAttribute('onclick')?.includes(`'${category}'`)) {
            btn.classList.add('active', 'bg-orange-600', 'text-white');
            btn.classList.remove('bg-white');
        }
    });
}

function openProjectModal(id) {
    const proj = projectData.find(p => p.id === id);
    if (!proj) return;

    const modal = document.getElementById('project-modal');
    const content = document.getElementById('modal-body');
    
    content.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
                <img id="modal-proj-img" class="w-full h-[300px] md:h-[450px] object-cover shadow-2xl">
            </div>
            <div class="flex flex-col justify-center">
                <span class="text-orange-600 font-bold uppercase tracking-widest text-xs mb-2">${translations[currentLang][proj.statusKey]}</span>
                <h3 class="text-3xl font-bold mb-4 dark:text-gray-100">${translations[currentLang][proj.nameKey]}</h3>
                <p class="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">${translations[currentLang][proj.descKey]}</p>
                
                <div class="bg-gray-50 dark:bg-gray-700/50 p-6 border-l-4 border-orange-600">
                    <h4 class="font-bold uppercase text-xs text-gray-400 dark:text-gray-500 mb-4">${translations[currentLang]['modal_specs']}</h4>
                    <div class="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p class="text-gray-400 dark:text-gray-500">${translations[currentLang]['modal_area']}</p>
                            <p class="font-bold dark:text-gray-200">${proj.specs.area}</p>
                        </div>
                        <div>
                            <p class="text-gray-400 dark:text-gray-500">${translations[currentLang]['modal_duration']}</p>
                            <p class="font-bold dark:text-gray-200">${proj.specs.duration}</p>
                        </div>
                        <div class="col-span-2">
                            <p class="text-gray-400 dark:text-gray-500">${translations[currentLang]['modal_type']}</p>
                            <p class="font-bold dark:text-gray-200">${translations[currentLang][proj.specs.typeKey] || proj.specs.typeKey}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Load modal image
    loadProjectImage(document.getElementById('modal-proj-img'), proj.image);
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
}

function calculateEstimate() {
    const type = document.getElementById('est-type').value;
    const area = parseFloat(document.getElementById('est-area').value);
    const quality = parseFloat(document.querySelector('input[name="quality"]:checked').value);
    const display = document.getElementById('est-display');
    const currency = translations[currentLang]['est_npr'];

    if (!area || area <= 0) {
        alert(currentLang === 'en' ? 'Please enter a valid area.' : 'कृपया एउटा मान्य क्षेत्रफल प्रविष्ट गर्नुहोस्।');
        return;
    }

    const rates = { 'res': 3500, 'comm': 4500, 'infra': 5500 };
    const baseCost = area * rates[type] * quality;
    const min = Math.round(baseCost * 0.9);
    const max = Math.round(baseCost * 1.1);

    display.innerHTML = `${currency} ${min.toLocaleString()} - ${max.toLocaleString()}`;
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-counter');
    const speed = 200;

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
}

const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000'  // Local backend for development
    : 'https://2ytrivx9bl.execute-api.ap-south-1.amazonaws.com';  // Production AWS

async function fetchData() {
    console.log('Attempting to fetch data from API...');
    try {
        const [resServices, resProjects, resTestimonials, resStats] = await Promise.all([
            fetch(`${API_URL}/services`),
            fetch(`${API_URL}/projects`),
            fetch(`${API_URL}/testimonials`),
            fetch(`${API_URL}/stats`)
        ]);

        if (!resServices.ok || !resProjects.ok || !resTestimonials.ok || !resStats.ok) throw new Error('API error');

        const rawServices = await resServices.json();
        const rawProjects = await resProjects.json();
        const rawTestimonials = await resTestimonials.json();
        const rawStats = await resStats.json();

        serviceData = rawServices.map(s => ({ ...s, titleKey: s.title_key, descKey: s.desc_key }));
        projectData = rawProjects.map(p => ({ 
            ...p, 
            nameKey: p.name_key, 
            locationKey: p.location_key, 
            statusKey: p.status_key, 
            descKey: p.desc_key 
        }));
        testimonialData = rawTestimonials.map(t => ({ ...t, roleKey: t.role_key, textKey: t.text_key }));

        updateStatUI(rawStats);

        console.log('Data successfully fetched from API.');
    } catch (err) {
        console.warn('Backend unavailable. Using local data.js.', err);
    } finally {
        const savedLang = localStorage.getItem('preferredLang') || 'en';
        window.applyLanguage(savedLang);
    }
}

function updateStatUI(stats) {
    if (!stats) return;
    const yearsEl = document.getElementById('stat-years');
    const projectsEl = document.getElementById('stat-projects');
    const clientsEl = document.getElementById('stat-clients');
    const sqftEl = document.getElementById('stat-sqft');

    if (yearsEl) yearsEl.setAttribute('data-target', stats.years_experience);
    if (projectsEl) projectsEl.setAttribute('data-target', stats.projects_completed);
    if (clientsEl) clientsEl.setAttribute('data-target', stats.happy_clients);
    if (sqftEl) sqftEl.setAttribute('data-target', stats.million_sqft_built);
}

function generateCaptcha() {
    const qEl = document.getElementById('captcha-question');
    const idEl = document.getElementById('inp-captcha-id');
    if (!qEl || !idEl) return;

    const a = Math.floor(Math.random() * 10) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    
    // Store simple obfuscated answer in id (base64 of sum)
    const sum = a + b;
    idEl.value = btoa(sum.toString());
    qEl.textContent = currentLang === 'en' ? `What is ${a} + ${b}?` : `${a} + ${b} कति हुन्छ?`;
}

async function handleForm(e) {
    e.preventDefault();
    const form = e.target;
    const btn = document.getElementById('submit-btn');
    const originalBtnText = btn.textContent;
    
    btn.disabled = true;
    btn.textContent = currentLang === 'en' ? 'Sending...' : 'पठाउँदै...';

    try {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        const response = await fetch(`${API_URL}/quotes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            document.getElementById('form-container').classList.add('hidden');
            document.getElementById('form-success').classList.remove('hidden');
            form.reset();
        } else {
            throw new Error(result.error || 'Form submission failed');
        }
    } catch (error) {
        alert(error.message || (currentLang === 'en' ? 'Something went wrong. Please try again.' : 'केही गलत भयो। कृपया फेरि प्रयास गर्नुहोस्।'));
        btn.disabled = false;
        btn.textContent = originalBtnText;
        generateCaptcha(); // Refresh on error
        document.getElementById('inp-captcha').value = '';
    }
}

// Mobile Menu logic
const menuBtn = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');

menuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    menuIcon.classList.toggle('hidden', isOpen);
    closeIcon.classList.toggle('hidden', !isOpen);
});

// Scroll Spy logic
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('text-orange-600');
                if (link.getAttribute('href') === `#${id}`) link.classList.add('text-orange-600');
            });
        }
    });
};

const observer = new IntersectionObserver(observerCallback, { root: null, rootMargin: '-20% 0px -70% 0px', threshold: 0 });
sections.forEach(section => observer.observe(section));

// Stats Observer logic
window.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('#stats-section');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                statsObserver.unobserve(statsSection);
            }
        }, { threshold: 0.5 });
        statsObserver.observe(statsSection);
    }

    // Scroll Reveal Logic
    const revealElements = document.querySelectorAll('.reveal');
    window.revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                window.revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => window.revealObserver.observe(el));
    
    // Initialize Captcha
    generateCaptcha();
});

// Initialize
fetchData();