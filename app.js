
let items=JSON.parse(localStorage.getItem('veille'))||[];
const list=document.getElementById('list');
function render(filter='',search=''){list.innerHTML='';items.filter(i=> (filter?i.category===filter:true) && i.title.toLowerCase().includes(search.toLowerCase())).forEach(i=>{const c=document.createElement('div');c.className='card';c.innerHTML=`<h3>${i.title}</h3><p>${i.category}</p><p>${i.date}</p><p>${i.summary}</p><a href='${i.source}' target='_blank'>Source</a>`;list.appendChild(c);});}
document.querySelectorAll('.filters button').forEach(b=>b.onclick=()=>render(b.dataset.filter, searchInput.value));
addBtn.onclick=()=>{if(!title.value||!category.value||!source.value||!date.value){alert('Champs manquants');return;}items.push({title:title.value,category:category.value,source:source.value,summary:summary.value,date:date.value});localStorage.setItem('veille',JSON.stringify(items));render();};
searchInput.oninput=()=>render('',searchInput.value);
clearAll.onclick=()=>{if(confirm('Supprimer toutes les veilles ?')){items=[];localStorage.setItem('veille','[]');render();}};
exportPDF.onclick=()=>{const {jsPDF}=window.jspdf;const d=new jsPDF();let y=10;items.forEach(i=>{d.text(`${i.title} - ${i.category}`,10,y);y+=10;});d.save('veille.pdf');};
themeToggle.onclick=()=>{document.body.classList.toggle('dark');localStorage.setItem('theme',document.body.classList.contains('dark')?'dark':'');};
if(localStorage.getItem('theme')==='dark')document.body.classList.add('dark');render();
