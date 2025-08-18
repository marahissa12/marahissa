
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    themeToggle?.addEventListener('click', ()=>{
      document.documentElement.classList.toggle('alt');
    });

    // Menu data (edit freely to make it yours)
 const items = [
  {id:1, cat:'starters', title:'تبولة النعناع', desc:'برغل، بقدونس، نعناع وزيت الزيتون البِكْر.', price:22, img:'images/salad.png'},
  {id:2, cat:'starters', title:'حمص بالطحينة', desc:'حمص كريمي مع طحينة وسماق.', price:18, img:'images/hummus.png'},
  {id:3, cat:'mains', title:'كباب عالفحم', desc:'كباب مشوي مع صلصة بندورة حارة وخبز.', price:52, img:'images/kabab.png'},
  {id:4, cat:'mains', title:'سلمون مشوي', desc:'سلمون نرويجي مع صلصة ليمون وكمأة.', price:69, img:'images/salmon.png'},
  {id:5, cat:'drinks', title:'موهيتو رمان', desc:'رمان طازج، نعناع، صودا مثلجة.', price:19, img:'images/drink.png'},
  {id:6, cat:'desserts', title:'تشيز كيك بلوبري', desc:'بطبقة ذهبية ولمسة فانيلا.', price:24, img:'images/cheesecake.png'},
  {id:7, cat:'mains', title:'باستا الكمأة', desc:'كريمة الكمأة وجبن بارميزان.', price:57, img:'images/pasta.png'},
  {id:8, cat:'drinks', title:'لاتيه فستق', desc:'إسبرسو بالحليب ولمسة فستق.', price:21, img:'images/latte.png'},
  {id:9, cat:'desserts', title:'مولتن شوكولاتة', desc:'كيك شوكولاتة ساخن مع قلب سائل.', price:26, img:'images/molten.png'},
];


    const grid = document.getElementById('menuGrid');
    const searchInput = document.getElementById('searchInput');
    const chips = Array.from(document.querySelectorAll('.chip'));

    function render(filter='all', q=''){
      grid.innerHTML = '';
      const query = q.trim().toLowerCase();
      const list = items.filter(i => (filter==='all' || i.cat===filter) && (i.title.toLowerCase().includes(query) || i.desc.toLowerCase().includes(query)));
      list.forEach((i, idx) => {
        const el = document.createElement('article');
        el.className = 'card';
        el.setAttribute('role','listitem');
        el.innerHTML = `
<div class="thumb" aria-hidden="true" style="background:url('${i.img}') center/cover no-repeat;"></div>
          <div class="content">
            <div class="row">
              <div class="title">${i.title}</div>
              <div class="price">₪ ${i.price}</div>
            </div>
            <div class="desc">${i.desc}</div>
            <div class="row">
              <span class="badge">${label(i.cat)}</span>
              <button class="btn" onclick="toast('أُضيف ${i.title} إلى الطلب')">أضف</button>
            </div>
          </div>`;
        grid.appendChild(el);
        // animate in
        requestAnimationFrame(()=>{
          setTimeout(()=> el.classList.add('show'), 60 + idx*60);
        });
      });
      if(list.length===0){
        const empty = document.createElement('div');
        empty.className='panel';
        empty.textContent = 'لا توجد نتائج مطابقة لبحثك.';
        grid.appendChild(empty);
      }
    }

    function label(cat){
      return {starters:'مقبلات', mains:'طبق رئيسي', drinks:'مشروب', desserts:'حلو'}[cat] || 'صنف';
    }

    // chip filters
    chips.forEach(ch => {
      ch.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        ch.classList.add('active');
        render(ch.dataset.filter, searchInput.value);
      });
    });

    // search
    searchInput?.addEventListener('input', (e)=> {
      const active = document.querySelector('.chip.active')?.dataset.filter || 'all';
      render(active, e.target.value);
    });

    // basic contact form handler (demo only)
    document.getElementById('contactForm')?.addEventListener('submit', (e)=>{
      e.preventDefault();
      const fd = new FormData(e.target);
      const name = fd.get('name')?.toString().trim();
      const phone = fd.get('phone')?.toString().trim();
      const msg = fd.get('message')?.toString().trim();
      if(!name || !phone || !msg){ toast('يرجى تعبئة جميع الحقول'); return; }
      toast('تم إرسال طلبك بنجاح ✨'); e.target.reset();
    });

    // toast
    function toast(text){
      const wrap = document.getElementById('toast');
      const n = document.createElement('div');
      n.style.cssText = 'pointer-events:auto; background:rgba(20,20,28,.9); color:var(--text); padding:12px 16px; border-radius:12px; border:1px solid rgba(255,255,255,.12); box-shadow: var(--shadow);';
      n.textContent = text;
      wrap.appendChild(n);
      setTimeout(()=>{ n.remove(); }, 2200);
    }

    // initial render
    render();
