// ดึงข้อมูลปัญหาทั้งหมด (เช็กในเครื่องก่อน ถ้าไม่มีค่อยไปดึงจากไฟล์ JSON)
async function getIssuesData() {
  const localData = localStorage.getItem('campus_fix_issues');
  
  // 1. ถ้ามีข้อมูลเซฟอยู่ในเครื่องแล้ว ให้เอาข้อมูลนั้นมาใช้เลย
  if (localData) {
    return JSON.parse(localData);
  }

  // 2. ถ้ายังไม่มี ให้ไปดึงมาจากไฟล์ JSON
  try {
    const response = await fetch('data/issues.json'); // ถ้าไฟล์อยู่ในโฟลเดอร์ js ให้เปลี่ยนเป็น 'js/issues.json'
    if (!response.ok) {
      throw new Error('ดึงข้อมูลจากไฟล์ JSON ไม่สำเร็จ');
    }
    const data = await response.json();
    
    // เซฟเก็บไว้ในเครื่อง จะได้ไม่ต้องดึงใหม่คราวหน้า
    localStorage.setItem('campus_fix_issues', JSON.stringify(data.issues));
    return data.issues;
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
    return [];
  }
}

// ฟังก์ชันสำหรับบันทึกข้อมูลกลับลงเครื่อง
function saveIssuesData(issuesArray) {
  localStorage.setItem('campus_fix_issues', JSON.stringify(issuesArray));
}

// ฟังก์ชันเลือกสีป้ายสถานะ (รอดำเนินการ / กำลังซ่อม / เสร็จสิ้น)
function getStatusClass(status) {
  if (status === 'รอดำเนินการ') return 'status-pending';
  if (status === 'กำลังซ่อม') return 'status-progress';
  if (status === 'เสร็จสิ้น') return 'status-done';
  return '';
}

// ฟังก์ชันดึงข้อมูลมาสร้างเป็นบล็อกการ์ดแสดงผลบนหน้าเว็บ (พร้อมแสดงรูปภาพ)
async function loadAndRenderIssues() {
  const issues = await getIssuesData();
  
  // หาจุดที่จะเอาการ์ดไปวางในหน้า index.html
  const container = document.getElementById('issues-list') || document.querySelector('.issues-container');
  if (!container) return;

  // วนลูปสร้างการ์ดแต่ละรายการ
  container.innerHTML = issues.map(issue => {
    // เช็กว่ามีรูปไหม ถ้ามีให้ทำแท็กรูปภาพ ถ้าไม่มีให้ปล่อยว่างไว้
    const imageHtml = issue.imageUrl 
      ? `<div class="issue-image" style="margin-top: 10px; width: 100%;">
           <img src="${issue.imageUrl}" alt="${issue.category}" style="width: 100%; max-height: 200px; object-fit: cover; border-radius: 8px;">
         </div>` 
      : '';

    // แปะข้อมูลลงในการ์ดแต่ละใบ
    return `
      <div class="issue-card" style="border: 1px solid #ddd; padding: 15px; margin-bottom: 15px; border-radius: 8px; background: #fff;">
        <h3 style="margin-top: 0;">${issue.category || 'แจ้งปัญหา'}</h3>
        <p><strong>สถานที่:</strong> ${issue.building} ${issue.room || ''}</p>
        <p><strong>รายละเอียด:</strong> ${issue.detail}</p>
        <p><strong>สถานะ:</strong> <span class="status-badge ${getStatusClass(issue.status)}">${issue.status}</span></p>
        ${imageHtml}
      </div>
    `;
  }).join('');
}

// สั่งให้โค้ดทำงานทันทีเมื่อเปิดหน้าเว็บขึ้นมา
document.addEventListener('DOMContentLoaded', loadAndRenderIssues);