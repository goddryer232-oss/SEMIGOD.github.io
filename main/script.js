  const sections = document.querySelectorAll('.reveal');
  const searchInput = document.getElementById('searchInput');
  const items = document.querySelectorAll('.item');

  // ฟังก์ชัน Scroll Reveal
  function handleScrollReveal() {
    const triggerBottom = window.innerHeight * 0.8;

    sections.forEach(section => {
      // เช็คว่าถ้าโดนซ่อนไปจาก search (display: none) → ไม่ต้อง reveal
      if (section.style.display === 'none') {
        section.classList.remove('show'); // ลบ .show ออกถ้าเคยใส่ไว้
        return;
      }

      const sectionTop = section.getBoundingClientRect().top;

      if (sectionTop < triggerBottom) {
        section.classList.add('show');
      } else {
        section.classList.remove('show');
      }
    });
  }

  // Event scroll
  window.addEventListener('scroll', handleScrollReveal);

  // Event input ช่องค้นหา
  searchInput.addEventListener('input', () => {
    const keyword = searchInput.value.toLowerCase();

    sections.forEach(section => {
      const text = section.textContent.toLowerCase();

      if (text.includes(keyword)) {
        section.style.display = 'flex'; // แสดง section ที่ตรง
      } else {
        section.style.display = 'none'; // ซ่อน section ที่ไม่ตรง
      }
    });

    // อัปเดต scroll reveal หลังกรอง
    handleScrollReveal();
  });

  // เรียกครั้งแรกเผื่อหน้าโหลดมาครึ่งจอ//
  handleScrollReveal();
function hideAllItems() {
  items.forEach(item => {
    item.style.display = 'none';
    item.classList.remove('show'); // ลบคลาสแอนิเมชัน (ถ้ามี)
  });
}

// ฟังก์ชันแสดงเฉพาะที่ตรง แล้วขึ้นทีละคน
function showMatchedItems(keyword) {
  let matchedCount = 0;

  items.forEach((item, index) => {
    const name = item.querySelector('h3')?.textContent.toLowerCase();

    if (name && name.includes(keyword)) {
      setTimeout(() => {
        item.style.display = 'block';
        item.classList.add('show'); // ให้ใช้ fade-in จาก CSS
      }, matchedCount * 300); // แสดงทีละคนแบบหน่วงเวลา
      matchedCount++;
    } else {
      item.style.display = 'none';
    }
  });
}

// ฟังชันเมื่อพิมพ์ค้นหา
searchInput.addEventListener('input', () => {
  const keyword = searchInput.value.trim().toLowerCase();
  hideAllItems();
  showMatchedItems(keyword);
});

// เรียกครั้งแรกให้ทุกอันแสดงตอนยังไม่พิมพ์
hideAllItems();
showMatchedItems('');