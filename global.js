console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

const pages = [
  { url: '', title: 'Home' },
  { url: 'projects/', title: 'Projects' },
  { url: 'cv/', title: 'Resume' },
  { url: 'contact/', title: 'Contact' },
  { url: 'https://github.com/aprilhuang39', title: 'GitHub' }
];

const IS_GITHUB_PAGES = location.hostname === 'aprilhuang39.github.io'; 
const BASE_PATH = IS_GITHUB_PAGES ? '/portfolio-site' : ''; 
const ARE_WE_HOME = document.documentElement.classList.contains('home');

let nav = document.createElement('nav');
document.body.prepend(nav);

for (let p of pages) {
  let url = p.url;
  let title = p.title;

  url = !ARE_WE_HOME && !url.startsWith('http') ? BASE_PATH + '/' + url : url;

  let a = document.createElement('a');
  a.href = url;
  a.textContent = title;

  const currentPath = location.pathname.endsWith('/')
    ? location.pathname
    : location.pathname + '/';
  if (a.host === location.host && a.pathname === location.pathname) {
    a.classList.add('current');
  }

  if (p.url.startsWith('http')) {
    a.target = '_blank';
    a.rel = 'noopener noreferrer'; 
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