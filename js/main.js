// 1. ฟังก์ชันดึงข้อมูลปัญหา (เช็กใน localStorage ก่อน ถ้าไม่มีให้ fetch จาก data/issues.json)
async function getIssuesData() {
  const localData = localStorage.getItem('campus_fix_issues');
  
  // ถ้าเคยเซฟไว้ในเครื่องแล้ว ให้เอาข้อมูลนั้นมาใช้
  if (localData) {
    return JSON.parse(localData);
  }

  // ถ้ายังไม่มี ให้ดึงจากไฟล์ data/issues.json
  try {
    const response = await fetch('data/issues.json'); 
    if (!response.ok) {
      throw new Error('ดึงข้อมูลจากไฟล์ JSON ไม่สำเร็จ');
    }
    const data = await response.json();
    
    // บันทึกลง localStorage ไว้ใช้ครั้งต่อไป
    localStorage.setItem('campus_fix_issues', JSON.stringify(data.issues));
    return data.issues;
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
    return [];
  }
}

// 2. ฟังก์ชันเลือก Class สีสำหรับป้ายสถานะ (รอดำเนินการ / กำลังซ่อม / เสร็จสิ้น)
function getStatusClass(status) {
  if (status === 'รอดำเนินการ') return 'status-pending';
  if (status === 'กำลังซ่อม') return 'status-progress';
  if (status === 'เสร็จสิ้น') return 'status-done';
  return '';
}

// 3. ฟังก์ชันดึงข้อมูลมาสร้างป้ายการ์ดแสดงผลบนหน้า index.html
async function loadAndRenderIssues() {
  const issues = await getIssuesData();
  
  // หาจุดที่จะเอาการ์ดไปวางในหน้า index.html
  const container = document.getElementById('issues-list') || document.querySelector('.issues-container');
  if (!container) return;

  // วนลูปสร้าง HTML สำหรับแต่ละการ์ด
  container.innerHTML = issues.map(issue => {
    // เช็กว่ามี imageUrl ไหม ถ้ามีให้ทำแท็ก <img>
    const imageHtml = issue.imageUrl 
      ? `<div class="issue-image-box">
           <img src="${issue.imageUrl}" alt="${issue.category}" class="issue-img">
         </div>` 
      : '';

    // นำข้อมูลมาประกอบเป็นการ์ด HTML (ใช้ Class ทั้งหมด ไม่ใช้ inline style ตามกฎอาจารย์ T4)
    return `
      <article class="issue-card">
        <h3 class="issue-title">${issue.category || 'แจ้งปัญหา'}</h3>
        <p class="issue-info"><strong>สถานที่:</strong> ${issue.building} ${issue.room || ''}</p>
        <p class="issue-info"><strong>รายละเอียด:</strong> ${issue.detail}</p>
        <p class="issue-info"><strong>สถานะ:</strong> <span class="status-badge ${getStatusClass(issue.status)}">${issue.status}</span></p>
        ${imageHtml}
      </article>
    `;
  }).join('');
}

// สั่งให้ฟังก์ชันทำงานทันทีเมื่อเปิดหน้าเว็บเสร็จ
document.addEventListener('DOMContentLoaded', loadAndRenderIssues);