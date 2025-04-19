console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

const BASE_URL = '/portfolio-site/';

let pages = [
  { url: BASE_URL, title: 'Home'},
  { url: BASE_URL + 'projects/', title: 'Projects'},
  { url: BASE_URL + 'cv/', title: 'Resume'},
  { url: BASE_URL + 'contact/', title: 'Contact'},
  { url: 'https://github.com/aprilhuang39/', title: 'GitHub' }
];

let nav = document.createElement('nav');
document.body.prepend(nav);

for (let p of pages) {
  let a = document.createElement('a');
  a.href = p.url;
  a.textContent = p.title;
  
  // Mark current page
  if (location.pathname.endsWith(p.url)) {
    a.classList.add('current');
  }
  
  // Open external links in new tab
  if (!p.url.startsWith(BASE_URL) && p.url.includes('://')) {
    a.target = '_blank';
  }
  
  nav.append(a);
}

document.body.insertAdjacentHTML(
    'afterbegin',
    `
        <label class="color-scheme">
            Theme:
            <select>
                <option value="light dark">Automatic</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
            </select>
        </label>`
);

let select = document.querySelector('select');

if ('colorScheme' in localStorage) {
    let scheme = localStorage.colorScheme;
    document.documentElement.style.setProperty('color-scheme', scheme);
    select.value = scheme;
}

select.addEventListener('input', function (event) {
    let scheme = event.target.value;
    document.documentElement.style.setProperty('color-scheme', scheme);
    localStorage.colorScheme = scheme;
});