/* Template Name: Landrick - Saas & Software Landing Page Template
   Author: Shreethemes
   E-mail: support@shreethemes.in
   Created: August 2019
   Version: 4.2.0
   Updated: March 2022
   File Description: Main JS file of the template
*/


/*********************************/
/*         INDEX                 */
/*================================
 *     01.  Loader               *
 *     02.  Toggle Menus         *
 *     03.  Active Menu          *
 *     04.  Clickable Menu       *
 *     05.  Back to top          *
 *     06.  Feather icon         *
 *     06.  DD Menu              *
 *     06.  Active Sidebar Menu  *
 *     07.  Contact us           *
 ================================*/


window.addEventListener('load', fn, false)

//  window.onload = function loader() {
function fn() {
  // Preloader
  if (document.getElementById('preloader')) {
    setTimeout(() => {
      document.getElementById('preloader').style.visibility = 'hidden';
      document.getElementById('preloader').style.opacity = '0';
    }, 350);
  }
  // Menus
  activateMenu();
}

//Menu
// Toggle menu
function toggleMenu() {
  document.getElementById('isToggle').classList.toggle('open');
  var isOpen = document.getElementById('navigation')
  if (isOpen.style.display === "block") {
    isOpen.style.display = "none";
  } else {
    isOpen.style.display = "block";
  }
};

//Menu Active
function getClosest(elem, selector) {

  // Element.matches() polyfill
  if (!Element.prototype.matches) {
    Element.prototype.matches =
      Element.prototype.matchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.oMatchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      function (s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
          i = matches.length;
        while (--i >= 0 && matches.item(i) !== this) { }
        return i > -1;
      };
  }

  // Get the closest matching element
  for (; elem && elem !== document; elem = elem.parentNode) {
    if (elem.matches(selector)) return elem;
  }
  return null;

};

function activateMenu() {
  var menuItems = document.getElementsByClassName("sub-menu-item");
  if (menuItems) {

    var matchingMenuItem = null;
    for (var idx = 0; idx < menuItems.length; idx++) {
      if (menuItems[idx].href === window.location.href) {
        matchingMenuItem = menuItems[idx];
      }
    }

    if (matchingMenuItem) {
      matchingMenuItem.classList.add('active');
      var immediateParent = getClosest(matchingMenuItem, 'li');
      if (immediateParent) {
        immediateParent.classList.add('active');
      }

      var parent = getClosest(matchingMenuItem, '.parent-menu-item');
      if (parent) {
        parent.classList.add('active');
        var parentMenuitem = parent.querySelector('.menu-item');
        if (parentMenuitem) {
          parentMenuitem.classList.add('active');
        }
        var parentOfParent = getClosest(parent, '.parent-parent-menu-item');
        if (parentOfParent) {
          parentOfParent.classList.add('active');
        }
      } else {
        var parentOfParent = getClosest(matchingMenuItem, '.parent-parent-menu-item');
        if (parentOfParent) {
          parentOfParent.classList.add('active');
        }
      }
    }
  }
}

// Clickable Menu
if (document.getElementById("navigation")) {
  var elements = document.getElementById("navigation").getElementsByTagName("a");
  for (var i = 0, len = elements.length; i < len; i++) {
    elements[i].onclick = function (elem) {
      if (elem.target.getAttribute("href") === "javascript:void(0)") {
        var submenu = elem.target.nextElementSibling.nextElementSibling;
        submenu.classList.toggle('open');
      }
    }
  }
}

// Menu sticky
function windowScroll() {
  const navbar = document.getElementById("topnav");
  if (navbar != null) {
    if (
      document.body.scrollTop >= 50 ||
      document.documentElement.scrollTop >= 50
    ) {
      navbar.classList.add("nav-sticky");
    } else {
      navbar.classList.remove("nav-sticky");
    }
  }
}

window.addEventListener('scroll', (ev) => {
  ev.preventDefault();
  windowScroll();
})

// back-to-top
var mybutton = document.getElementById("back-to-top");
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (mybutton != null) {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

//ACtive Sidebar
(function () {
  var current = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);;
  if (current === "") return;
  var menuItems = document.querySelectorAll('.sidebar-nav a');
  for (var i = 0, len = menuItems.length; i < len; i++) {
    if (menuItems[i].getAttribute("href").indexOf(current) !== -1) {
      menuItems[i].parentElement.className += " active";
    }
  }
})();

//Feather icon
feather.replace();

// dd-menu
var ddmenu = document.getElementsByClassName("dd-menu");
for (var i = 0, len = ddmenu.length; i < len; i++) {
  ddmenu[i].onclick = function (elem) {
    elem.stopPropagation();
  }
}

//Tooltip
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
});

//Popovers
var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
})

//small menu
try {
  var spy = new Gumshoe('#navmenu-nav a');
} catch (err) {

}
//********************* */
/*     Contact us       */
//********************* */

const sendContactRequest = async ({ email, name, company, message }) => {
  const [firstName, lastName] = name.split(' ');

  const url = 'https://api.hsforms.com/submissions/v3/integration/submit/8613933/ccaba533-4c63-467d-8e95-2198051308af';
  const data = {
    submittedAt: Date.now(),
    fields: [
      {
        name: "email",
        value: email
      },
      {
        name: "firstname",
        value: firstName,
      },
      {
        name: "company",
        value: company,
      },
      {
        name: "message",
        value: message,
      },
      ...(lastName ? [{ name: "lastname", value: lastName }] : [])
    ],
    context: {
      pageUri: "www.adminix.io",
      pageName: "Adminix home"
    },
    legalConsentOptions: {
      consent: {
        consentToProcess: true,
        text: 'I agree to allow Adminix to store and process my personal data.',
        communications: [
          {
            value: true,
            subscriptionTypeId: 999,
            text: 'I agree to receive marketing communications from Adminix.',
          }
        ]
      }
    }
  };

  try {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    document.getElementById('contact-form-form').style.display = 'none';
    document.getElementById('contact-form-success').style.display = 'block';

    return setTimeout(() => {
      const myModalEl = document.getElementById('contact-us-modal');
      const modal = bootstrap.Modal.getInstance(myModalEl)
      modal.hide();
    }, 3000);

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

try {
  // Contact Form
  function validateForm() {
    var name = document.forms["contact-form"]["name"].value;
    var email = document.forms["contact-form"]["email"].value;
    var company = document.forms["contact-form"]["company"].value;
    var message = document.forms["contact-form"]["message"].value;

    document.getElementById("contact-form-error-msg").style.opacity = 0;
    document.getElementById('contact-form-error-msg').innerHTML = "";
    if (name == "" || name == null) {
      document.getElementById('contact-form-error-msg').innerHTML = "<div class='alert alert-warning error_message'>*Please enter a Name*</div>";
      fadeIn();
      return false;
    }
    if (email == "" || email == null) {
      document.getElementById('contact-form-error-msg').innerHTML = "<div class='alert alert-warning error_message'>*Please enter a Email*</div>";
      fadeIn();
      return false;
    }
    if (company == "" || company == null) {
      document.getElementById('contact-form-error-msg').innerHTML = "<div class='alert alert-warning error_message'>*Please enter your company name*</div>";
      fadeIn();
      return false;
    }

    sendContactRequest({ name, email, company, message });

    return false;
  }

  function fadeIn() {
    var fade = document.getElementById("contact-form-error-msg");
    var opacity = 0;
    var intervalID = setInterval(function () {
      if (opacity < 1) {
        opacity = opacity + 0.5
        fade.style.opacity = opacity;
      } else {
        clearInterval(intervalID);
      }
    }, 200);
  }
} catch (err) {

}

//***********************/
/*     Dark mode        */
//***********************/

function switchDarkMode(e) {
  if (event.target.checked) {
    window.localStorage.setItem('darkMode', true);
    setTheme('style-dark');
  } else {
    window.localStorage.removeItem('darkMode');
    setTheme('style-light')
  }
};

(() => {
  window.addEventListener('load', (event) => {
    if (window.localStorage.getItem('darkMode') === 'true') {
      document.getElementById('dark-mode-switch').checked = true;
      setTheme('style-dark');
    }
  });
})();

//***********************/
/*     Cookies          */
//***********************/

window.addEventListener('load', () => {
  const cookiePopup = document.getElementById('cookie-popup');

  document.getElementById('cookie-popup-close').addEventListener('click', () => {
    cookiePopup.classList.add('cookie-popup-accepted');
    window.localStorage.setItem('cookieAccepted', true);
  });

  if (!window.localStorage.getItem('cookieAccepted')) {
    cookiePopup.classList.remove('cookie-popup-accepted');
  }
});

