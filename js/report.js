const form = document.getElementById('reportForm');
const buildingSelect = document.getElementById('building');
const successBox = document.getElementById('successBox');
const ticketIdDisplay = document.getElementById('ticketIdDisplay');

async function loadBuildings() {
  try {
    const response = await fetch('data/issues.json');
    
    if (!response.ok) {
      throw new Error('ไม่สามารถดึงไฟล์ issues.json ได้');
    }

    const data = await response.json();
    
    buildingSelect.innerHTML = '<option value="">-- กรุณาเลือกอาคาร --</option>';
    
    if (data.buildings && data.buildings.length > 0) {
      data.buildings.forEach(buildingName => {
        const option = document.createElement('option');
        option.value = buildingName;
        option.textContent = buildingName;
        buildingSelect.appendChild(option);
      });
    } else {
      buildingSelect.innerHTML = '<option value="">-- ไม่พบข้อมูลอาคาร --</option>';
    }

  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการโหลดอาคาร:', error);
    buildingSelect.innerHTML = '<option value="">-- โหลดข้อมูลอาคารไม่สำเร็จ --</option>';
  }
}

function generateTicketId() {
  const year = 2026; 
  
  const existingIssues = JSON.parse(localStorage.getItem('campus_issues')) || [];
  
  const nextNumber = existingIssues.length + 1;
  
  const formattedNumber = String(nextNumber).padStart(4, '0');
  
  return `FIX-${year}-${formattedNumber}`;
}

function validateForm() {
  let isValid = true;

  document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

  const category = document.getElementById('category').value;
  if (!category) {
    document.getElementById('categoryError').textContent = 'กรุณาเลือกหมวดหมู่ปัญหา';
    isValid = false;
  }

  const building = document.getElementById('building').value;
  if (!building) {
    document.getElementById('buildingError').textContent = 'กรุณาเลือกอาคารสถานที่';
    isValid = false;
  }

  const room = document.getElementById('room').value.trim();
  if (!room) {
    document.getElementById('roomError').textContent = 'กรุณาระบุชั้นหรือห้องที่พบปัญหา';
    isValid = false;
  }

  const detail = document.getElementById('detail').value.trim();
  if (detail.length < 20) {
    document.getElementById('detailError').textContent = `กรุณากรอกรายละเอียดอย่างน้อย 20 ตัวอักษร (ปัจจุบันกรอกแล้ว ${detail.length} ตัวอักษร)`;
    isValid = false;
  }

  const email = document.getElementById('email').value.trim();
  if (email !== '') {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      document.getElementById('emailError').textContent = 'รูปแบบอีเมลไม่ถูกต้อง';
      isValid = false;
    }
  }

  return isValid;
}

form.addEventListener('submit', function (e) {
  e.preventDefault(); 

  if (!validateForm()) {
    return;
  }

  const urgencyInput = document.querySelector('input[name="urgency"]:checked');
  const urgencyValue = urgencyInput ? urgencyInput.value : 'ปานกลาง';

  const newTicketId = generateTicketId();

  const newReport = {
    id: newTicketId,
    category: document.getElementById('category').value,
    building: document.getElementById('building').value,
    room: document.getElementById('room').value.trim(),
    urgency: urgencyValue,
    detail: document.getElementById('detail').value.trim(),
    email: document.getElementById('email').value.trim(),
    status: 'รอดำเนินการ',
    reportedAt: new Date().toISOString(),
    plusone: 0
  };

  let currentIssues = JSON.parse(localStorage.getItem('campus_issues')) || [];
  currentIssues.push(newReport);
  localStorage.setItem('campus_issues', JSON.stringify(currentIssues));

  form.style.display = 'none';
  successBox.style.display = 'block';
  ticketIdDisplay.textContent = newTicketId;
});

loadBuildings();