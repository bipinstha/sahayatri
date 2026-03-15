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
        'alert_msg': 'Request sent! Our team will contact you shortly.'
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
        'alert_msg': 'अनुरोध पठाइयो! हाम्रो टोलीले तपाईंलाई छिट्टै सम्पर्क गर्नेछ।'
    }
};

let currentLang = 'en';

function setLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) el.textContent = translations[lang][key];
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
        const key = el.getAttribute('data-i18n-ph');
        if (translations[lang][key]) el.placeholder = translations[lang][key];
    });
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
}

function handleForm(e) {
    e.preventDefault();
    alert(translations[currentLang]['alert_msg']);
    e.target.reset();
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

// Initialize
setLanguage('en');