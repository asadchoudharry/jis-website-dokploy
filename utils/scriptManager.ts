// This utility manages the loading of third-party scripts based on user consent.
declare global {
  interface Window { dataLayer: any[]; }
}

// A placeholder GTM ID. Replace with your actual ID.
const GTM_ID = 'GTM-XXXXXXX'; 

// Type definition for the consent object, consistent with CookieManager.
type ConsentCategories = {
  necessary: boolean;
  performance: boolean;
  functional: boolean;
  targeting: boolean;
};

/**
 * Injects the Google Tag Manager script into the document head.
 * It ensures the script is only added once.
 */
const loadGtmScript = () => {
  if (document.getElementById('gtm-script-loader')) {
    return;
  }
  
  window.dataLayer = window.dataLayer || [];

  const script = document.createElement('script');
  script.id = 'gtm-script-loader';
  script.innerHTML = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${GTM_ID}');
  `;
  document.head.appendChild(script);

  console.log(`GTM Script loader for ID ${GTM_ID} injected.`);
};

/**
 * Applies the user's consent choices by loading or blocking relevant scripts.
 * @param {ConsentCategories} consent - The user's consent object.
 */
export const applyConsent = (consent: ConsentCategories) => {
  if (!consent) return;

  // Handle Performance cookies (e.g., Google Analytics via GTM)
  if (consent.performance) {
    loadGtmScript();
  } else {
    console.log("Performance cookies consent not given. GTM script will not be loaded.");
  }
  
  // Handle Targeting cookies (e.g., Facebook Pixel, etc.)
  if (consent.targeting) {
    // Example: loadFbPixelScript();
    console.log("Targeting cookies consent given. Tracking pixels can be loaded.");
  } else {
    console.log("Targeting cookies consent not given. Tracking pixels will not be loaded.");
  }

  // Handle Functional cookies
  if (consent.functional) {
    // Example: loadChatWidgetScript();
    console.log("Functional cookies consent given. Enhanced functionalities can be enabled.");
  } else {
    console.log("Functional cookies consent not given. Enhanced functionalities will be disabled.");
  }
};
