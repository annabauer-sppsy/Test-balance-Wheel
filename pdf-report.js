/* Отчёт формируется из уже показанных результатов: без повторного подсчёта. */
(function () {
  'use strict';
  const BG = [9, 18, 39], CARD = [24, 38, 75], TEXT = [230, 238, 255], MUTED = [158, 183, 243], ACCENT = [112, 164, 255];
  const GREEN = [103, 219, 163], ORANGE = [246, 181, 95], GREEN_CARD = [21, 52, 57], ORANGE_CARD = [60, 43, 40];
  const W = 210, H = 297, M = 15, CONTENT = W - 2 * M;
  const plain = el => (el ? (el.innerText || el.textContent || '').trim() : '');
  function parseCards() {
    return Array.from(document.querySelectorAll('#scales-descriptions .ios-card')).map(el => ({
      title: plain(el.querySelector('b')),
      level: plain(el.querySelector('span')),
      text: plain(el.querySelector('p')),
      percent: Number((plain(el.querySelector('span')).match(/(\d+)\s*%/) || [])[1] || 0)
    }));
  }
  function buildPdf() {
    const lib = window.jspdf;
    if (!lib || !lib.jsPDF) throw new Error('Библиотека jsPDF не загружена');
    if (!window.SPORT_BALANCE_FONT) throw new Error('Шрифт PDF не загружен');
    const pdf = new lib.jsPDF({unit:'mm', format:'a4', compress:true});
    pdf.addFileToVFS('SportBalance.ttf', window.SPORT_BALANCE_FONT);
    pdf.addFont('SportBalance.ttf', 'SportBalance', 'normal');
    pdf.setFont('SportBalance', 'normal');
    let y = M;
    let page = 0;
    function base() {
      pdf.setFillColor(...BG); pdf.rect(0,0,W,H,'F');
      pdf.setDrawColor(42,63,108); pdf.line(M,H-15,W-M,H-15);
      pdf.setFontSize(8); pdf.setTextColor(...MUTED);
      pdf.text('АННА БАУЭР  ·  СПОРТИВНЫЙ ПСИХОЛОГ', M,H-10);
      pdf.text(String(page),W-M,H-10,{align:'right'});
      y=M;
    }
    function newPage() { if(page) pdf.addPage(); page++; base(); }
    function measure(text, size, width) {
      pdf.setFontSize(size);
      return pdf.splitTextToSize(text || ' ', width);
    }
    function paragraph(text, size=10, color=TEXT, gap=5, lineH=5.2) {
      const lines = measure(text, size, CONTENT);
      let idx=0;
      while(idx<lines.length) {
        if(y>H-29) newPage();
        const room = Math.max(1, Math.floor((H-26-y)/lineH));
        const chunk = lines.slice(idx,idx+room);
        pdf.setTextColor(...color); pdf.setFontSize(size);
        pdf.text(chunk, M, y + size*0.32, {lineHeightFactor:lineH/(size*0.35278)});
        y+=chunk.length*lineH;
        idx+=chunk.length;
      }
      y+=gap;
    }
    function heading(text, size=15) {
      if(y>H-43) newPage();
      pdf.setTextColor(...ACCENT); pdf.setFontSize(size);
      const lines=measure(text,size,CONTENT);
      pdf.text(lines,M,y+size*.33);
      y+=lines.length*size*.52+5;
    }
    function card(title, level, body, index, percent) {
      const attention = percent <= 53;
      const tone = attention ? ORANGE : GREEN;
      const cardBg = attention ? ORANGE_CARD : GREEN_CARD;
      const pad = 9, x = M, width = CONTENT;
      const titleLines = measure(title, 13, width - 2*pad - 4);
      const levelLines = measure(level, 9.5, width - 2*pad);
      const bodyLines = measure(body, 10, width - 2*pad);
      const titleH = titleLines.length * 7.2;
      const levelH = levelLines.length * 5.2;
      const bodyH = bodyLines.length * 5.7;
      const height = 13 + titleH + levelH + 7 + bodyH + 10;
      if (y + height > H - 25) newPage();
      // Keep every card together where it fits on an A4 page.
      if (height > H - 2*M - 12) throw new Error('Описание компонента слишком длинное для одной страницы');
      pdf.setFillColor(...cardBg);
      pdf.setDrawColor(...tone);
      pdf.roundedRect(x, y, width, height, 4, 4, 'FD');
      pdf.setFillColor(...tone);
      pdf.roundedRect(x, y+5, 1.5, height-10, .6, .6, 'F');
      let cy = y + 11;
      pdf.setFontSize(13); pdf.setTextColor(...TEXT);
      pdf.text(titleLines, x+pad, cy);
      cy += titleH + 2;
      pdf.setFontSize(9.5); pdf.setTextColor(...tone);
      pdf.text(levelLines, x+pad, cy);
      cy += levelH + 4;
      pdf.setDrawColor(48, 69, 112);
      pdf.line(x+pad, cy-2, x+width-pad, cy-2);
      pdf.setFontSize(10); pdf.setTextColor(...TEXT);
      pdf.text(bodyLines, x+pad, cy+4, {lineHeightFactor:1.61});
      y += height + 7;
    }
    function disclaimer() {
      const paragraphs = [
        '«Колесо спортивного баланса» — инструмент самостоятельной оценки психологических компонентов спортивной деятельности.',
        'Результаты отражают субъективное восприятие спортсменом своего состояния, навыков и возможностей на момент прохождения теста. Они помогают увидеть сильные стороны и определить области, которым стоит уделить больше внимания.',
        'Тест носит ознакомительный характер, не является полноценной психологической диагностикой и не заменяет индивидуальную работу со спортивным психологом.',
        'Для более точной оценки необходимо учитывать возраст спортсмена, особенности вида спорта, уровень подготовки, соревновательный опыт и другие индивидуальные факторы.'
      ];
      const lineGroups = paragraphs.map(t => measure(t, 9, CONTENT-12));
      const height = 25 + lineGroups.reduce((sum, a) => sum + a.length*5.1+5, 0);
      if (y + height > H-25) newPage();
      pdf.setDrawColor(87, 109, 146);
      pdf.line(M, y+2, W-M, y+2);
      let cy=y+14;
      pdf.setFontSize(8);pdf.setTextColor(...MUTED);pdf.text('О МЕТОДИКЕ',M,cy);
      cy+=9;
      pdf.setFontSize(13);pdf.setTextColor(...TEXT);pdf.text('Важно знать',M,cy);
      cy+=10;
      lineGroups.forEach(a=>{pdf.setFontSize(9);pdf.setTextColor(173,187,211);pdf.text(a,M,cy,{lineHeightFactor:1.6});cy+=a.length*5.1+5;});
      y+=height+8;
    }
    newPage();
    heading('Колесо спортивного баланса',19);
    paragraph('Психологическая готовность спортсмена',11,MUTED,9);
    const percent=plain(document.getElementById('overall-percent'));
    const label=plain(document.getElementById('overall-label'));
    heading(percent || 'Результат',30);
    paragraph(label,11,MUTED,7);
    heading('Общий результат',14);
    paragraph(plain(document.getElementById('overall-text')),10,TEXT,7);
    heading('Зоны внимания',14);
    paragraph(plain(document.getElementById('weak-areas')),10,TEXT,7);
    const chart = document.getElementById('chart');
    if(chart) {
      try {
        const chartObj = window.Chart && Chart.getChart ? Chart.getChart(chart) : null;
        if(chartObj) { chartObj.stop(); chartObj.update('none'); }
        const img=chart.toDataURL('image/png');
        const ch=91;
        if(y+ch>H-25) newPage();
        heading('Профиль по шкалам',14);
        pdf.addImage(img,'PNG',M+12,y,CONTENT-24,ch-5);
        y+=ch+5;
      } catch(e) { console.warn('Диаграмма PDF:',e); throw new Error('Не удалось добавить диаграмму'); }
    }
    const cards=parseCards();
    if(cards.length!==8) throw new Error('Ожидалось восемь описаний шкал, найдено: '+cards.length);
    newPage(); heading('Профиль по каждому компоненту',17);
    paragraph('Оранжевый — зоны внимания (до 53% включительно). Зелёный — остальные компоненты.',9,MUTED,7);
    cards.forEach((c,i)=>card(c.title,c.level,c.text,i,c.percent));
    disclaimer();
    pdf.setProperties({title:'Колесо спортивного баланса',author:'Анна Бауэр'});
    return pdf;
  }
  window.downloadResultsPDF = async function () {
    const result=document.getElementById('result');
    if(!result || result.classList.contains('hidden')) {alert('Сначала пройдите тест.');return;}
    const btn=document.getElementById('getPdf');
    const old=btn.textContent;
    try {
      btn.disabled=true;btn.textContent='Формируем PDF…';
      const pdf=buildPdf();
      const blob=pdf.output('blob');
      const name='Колесо_спортивного_баланса.pdf';
      const file=new File([blob],name,{type:'application/pdf'});
      // iOS: нативное меню «Поделиться» → «Сохранить в Файлы».
      if(navigator.share && navigator.canShare && navigator.canShare({files:[file]})) {
        try {await navigator.share({files:[file],title:'Колесо спортивного баланса'});return;}
        catch(err) {if(err.name==='AbortError')return; console.warn('Share:',err);}
      }
      const url=URL.createObjectURL(blob);
      const a=document.createElement('a');a.href=url;a.download=name;
      document.body.appendChild(a);a.click();a.remove();
      setTimeout(()=>URL.revokeObjectURL(url),60000);
    } catch(err) {
      console.error('Ошибка создания PDF:',err);
      alert('Не удалось сформировать PDF: '+err.message+'\nОстальные кнопки продолжат работать.');
    } finally {btn.disabled=false;btn.textContent=old;}
  };
})();
