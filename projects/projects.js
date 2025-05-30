import { fetchJSON, renderProjects } from '../global.js';
import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';
const projects = await fetchJSON('../lib/projects.json');
const projectsContainer = document.querySelector('.projects');
renderProjects(projects, projectsContainer, 'h2');
let filteredProjects = projects;
const projectsTitle = document.querySelector('.projects-title');

if (projectsTitle) {
    projectsTitle.textContent = `${projects.length} Projects`;
}

let arcGenerator = d3.arc()
    .innerRadius(0)
    .outerRadius(50);

function renderPieChart(projectsGiven) {
    let newRolledData = d3.rollups(
        projectsGiven,
        (v) => v.length,
        (d) => d.year,
    );
    let newData = newRolledData.map(([year, count]) => {
        return { value: count, label: year };
    });

    let newSliceGenerator = d3.pie().value((d) => d.value);
    let newArcData = newSliceGenerator(newData);
    let newArcs = newArcData.map((d) => arcGenerator(d));

    let selectedIndex = -1;
    let svg = d3.select('svg');
    let legend = d3.select('.legend');
    let colors = d3.scaleOrdinal(d3.schemeTableau10);

    svg.selectAll('path').remove();
    legend.selectAll('li').remove();
 
    newArcs.forEach((arc, idx) => {
        svg
          .append('path')
          .attr('d', arc) 
          .attr('fill', colors(idx)) 
          .on('click', () => { 
            selectedIndex = selectedIndex === idx ? -1 : idx;

            if (selectedIndex === -1) {
                renderProjects(filteredProjects, projectsContainer, 'h2');
            } else {
                let selectedYear = newData[selectedIndex].label;
                filteredProjects = projectsGiven.filter(
                    (project) => project.year === selectedYear
                );
                renderProjects(filteredProjects, projectsContainer, 'h2');
            }

            svg
                .selectAll('path')
                .attr('class', (_, idx) => (
                    idx === selectedIndex ? 'selected' : ''
            ));
            legend
                .selectAll('li')
                .attr('class', (_, idx) => (
                    idx === selectedIndex ? 'selected' : ''
            ));

        });
    });

    newData.forEach((d, idx) => {
        legend.append('li')
            .attr('class', 'legend-item')
            .attr('style', `--color:${colors(idx)}`)
            .html(`<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`);
    });

}

renderPieChart(filteredProjects);

let query = '';
let searchInput = document.querySelector('.searchBar');
searchInput.addEventListener('input', (event) => {
    query = event.target.value;
    filteredProjects = projects.filter((project) => {
    let values = Object.values(project).join('\n').toLowerCase();
        return values.includes(query.toLowerCase());
    })
    renderProjects(filteredProjects, projectsContainer, 'h2');
    renderPieChart(filteredProjects);
});