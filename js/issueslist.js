// issues.js
// หน้ารายการปัญหา: แสดงรายการ, กรอง, เรียง และโหมดเจ้าหน้าที่

// ตัวเลขสำหรับเรียงความเร่งด่วน (เลขมากคือด่วนมาก)
const URGENCY_POINTS = { 'สูง': 3, 'กลาง': 2, 'ต่ำ': 1 };

// ไอคอนและชื่อ class ของแต่ละสถานะ (ใช้ไอคอนด้วย จะได้ไม่สื่อด้วยสีอย่างเดียว)
const STATUS_SYMBOL = { 'รอดำเนินการ': '⏳', 'กำลังซ่อม': '🔧', 'เสร็จสิ้น': '✔' };
const STATUS_CSS = { 'รอดำเนินการ': 'pending', 'กำลังซ่อม': 'working', 'เสร็จสิ้น': 'done' };

// ปัญหาที่ค้างเกินกี่วันให้ไฮไลต์
const LATE_AFTER_DAYS = 7;

// ดึง element ที่ต้องใช้จากหน้าเว็บ
const listBox = document.getElementById('issue-list');
const countText = document.getElementById('result-count');
const errorBox = document.getElementById('load-error');
const filterForm = document.getElementById('filter-form');
const selCategory = document.getElementById('f-category');
const selBuilding = document.getElementById('f-building');
const selStatus = document.getElementById('f-status');
const selSort = document.getElementById('f-sort');
const staffSwitch = document.getElementById('staff-switch');
const staffHint = document.getElementById('staff-hint');

// ตัวแปรเก็บข้อมูลที่ใช้ตลอดทั้งหน้า
let issueData = [];
let isStaffOn = getFromStorage(STORAGE_KEY_STAFF, false);

// ---------- ฟังก์ชันช่วย ----------

// สร้าง element พร้อมใส่ class และข้อความ
// ใช้ textContent เพื่อให้ปลอดภัย (ไม่รันโค้ดที่ผู้ใช้พิมพ์มา)
function createTag(tag, className, text) {
  const element = document.createElement(tag);
  if (className) {
    element.className = className;
  }
  if (text) {
    element.textContent = text;
  }
  return element;
}

// แปลงวันที่ให้อ่านง่าย เช่น 18 พ.ย. 2569 18:20
function showThaiDate(dateText) {
  const date = new Date(dateText);
  if (isNaN(date)) {
    return '-';
  }
  return date.toLocaleString('th-TH', { dateStyle: 'medium', timeStyle: 'short' });
}

// นับว่าแจ้งมาแล้วกี่วัน
function daysSinceReported(issue) {
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const diff = Date.now() - new Date(issue.reportedAt).getTime();
  return Math.floor(diff / millisecondsPerDay);
}

// ---------- กรองและเรียง ----------

function getFilteredIssues() {
  const category = selCategory.value;
  const building = selBuilding.value;
  const status = selStatus.value;
  const sortType = selSort.value;

  // 1) กรอง: เก็บเฉพาะรายการที่ตรงกับตัวกรองที่เลือก
  // ถ้าตัวกรองว่าง ("ทุกหมวด" ฯลฯ) ถือว่าผ่านทุกรายการ
  const result = [];
  for (let i = 0; i < issueData.length; i++) {
    const issue = issueData[i];
    if (category !== '' && issue.category !== category) continue;
    if (building !== '' && issue.building !== building) continue;
    if (status !== '' && issue.status !== status) continue;
    result.push(issue);
  }

  // 2) เรียง
  result.sort(function (a, b) {
    const dateA = new Date(a.reportedAt).getTime();
    const dateB = new Date(b.reportedAt).getTime();

    if (sortType === 'date-asc') {
      return dateA - dateB; // เก่าก่อน
    }
    if (sortType === 'urgency-desc') {
      const diff = URGENCY_POINTS[b.urgency] - URGENCY_POINTS[a.urgency];
      if (diff !== 0) return diff; // ด่วนมากก่อน
      return dateB - dateA;        // ถ้าด่วนเท่ากัน เอาใหม่ก่อน
    }
    if (sortType === 'plus-desc') {
      const diff = (b.plusOne || 0) - (a.plusOne || 0);
      if (diff !== 0) return diff; // คนเจอเหมือนกันมากก่อน
      return dateB - dateA;
    }
    return dateB - dateA; // ค่าเริ่มต้น: ใหม่ก่อน
  });

  return result;
}

// ---------- สร้างหน้าจอ ----------

// ป้ายสถานะ (ไอคอน + ข้อความ)
function createStatusBadge(status) {
  const badge = createTag('span', 'badge badge-' + STATUS_CSS[status]);
  badge.textContent = STATUS_SYMBOL[status] + ' ' + status;
  return badge;
}

// ปุ่มเปลี่ยนสถานะ 3 ปุ่ม (แสดงเฉพาะโหมดเจ้าหน้าที่)
function createStatusButtons(issue) {
  const group = createTag('div', 'staff-actions');
  group.setAttribute('role', 'group');
  group.setAttribute('aria-label', 'เปลี่ยนสถานะ ' + issue.id);

  for (let i = 0; i < STATUS_STEPS.length; i++) {
    const statusName = STATUS_STEPS[i];
    const button = createTag('button', 'btn btn-step', statusName);
    button.type = 'button';

    // ปุ่มของสถานะปัจจุบันจะถูกทำเครื่องหมายไว้
    button.setAttribute('aria-pressed', issue.status === statusName ? 'true' : 'false');

    // เมื่อกดปุ่ม ให้เปลี่ยนสถานะ
    button.addEventListener('click', function () {
      handleStatusClick(issue, statusName);
    });

    group.appendChild(button);
  }
  return group;
}

// สร้างการ์ดของปัญหา 1 รายการ
function createIssueCard(issue) {
  const card = createTag('li', 'issue-card');

  // เช็คว่าค้างนานเกินกำหนดไหม (ที่ยังไม่เสร็จเท่านั้น)
  const daysOpen = daysSinceReported(issue);
  const isOverdue = issue.status !== 'เสร็จสิ้น' && daysOpen > LATE_AFTER_DAYS;
  if (isOverdue) {
    card.classList.add('is-overdue');
  }

  // ส่วนหัว: เลขที่แจ้ง + สถานะ
  const head = createTag('div', 'issue-head');
  head.appendChild(createTag('h3', 'issue-id', issue.id));
  head.appendChild(createStatusBadge(issue.status));

  // หมวด · อาคาร · ห้อง
  const meta = createTag('p', 'issue-meta', issue.category + ' · ' + issue.building + ' · ' + issue.room);

  // รายละเอียด
  const detail = createTag('p', 'issue-detail', issue.detail);

  // ส่วนท้าย: ความเร่งด่วน วันที่ จำนวน +1
  const foot = createTag('div', 'issue-foot');
  const urgencyClass = 'tag tag-' + (URGENCY_POINTS[issue.urgency] || 1);
  foot.appendChild(createTag('span', urgencyClass, 'เร่งด่วน: ' + issue.urgency));
  foot.appendChild(createTag('span', 'muted', 'แจ้งเมื่อ ' + showThaiDate(issue.reportedAt)));
  foot.appendChild(createTag('span', 'muted', 'เจอเหมือนกัน ' + (issue.plusOne || 0) + ' คน'));
  if (isOverdue) {
    foot.appendChild(createTag('span', 'tag tag-overdue', '⚠ ค้าง ' + daysOpen + ' วัน'));
  }

  card.appendChild(head);
  card.appendChild(meta);
  card.appendChild(detail);
  card.appendChild(foot);

  // โหมดเจ้าหน้าที่ ให้เพิ่มปุ่มเปลี่ยนสถานะ
  if (isStaffOn) {
    card.appendChild(createStatusButtons(issue));
  }
  return card;
}

// วาดรายการทั้งหมดใหม่ (เรียกทุกครั้งที่ตัวกรองหรือข้อมูลเปลี่ยน)
function drawIssueList() {
  const visibleIssues = getFilteredIssues();

  // ล้างรายการเก่า
  listBox.innerHTML = '';

  // ใส่การ์ดใหม่
  for (let i = 0; i < visibleIssues.length; i++) {
    listBox.appendChild(createIssueCard(visibleIssues[i]));
  }

  // แสดงจำนวนที่พบ
  if (visibleIssues.length === 0) {
    countText.textContent = 'ไม่พบรายการที่ตรงกับตัวกรอง ลองกด "ล้างตัวกรอง"';
  } else {
    countText.textContent = 'พบ ' + visibleIssues.length + ' จาก ' + issueData.length + ' รายการ';
  }
}

// อัปเดตหน้าตาของสวิตช์โหมดเจ้าหน้าที่
function updateStaffSwitch() {
  staffSwitch.setAttribute('aria-checked', isStaffOn ? 'true' : 'false');
  staffSwitch.querySelector('.switch-text').textContent = isStaffOn ? 'เปิด' : 'ปิด';

  if (isStaffOn) {
    staffSwitch.classList.add('is-on');
    staffHint.textContent = 'เปิดอยู่ — กดปุ่มสถานะในแต่ละรายการเพื่อเปลี่ยน';
  } else {
    staffSwitch.classList.remove('is-on');
    staffHint.textContent = 'ปิดอยู่ — เปิดเพื่อเปลี่ยนสถานะงาน';
  }
}

// ---------- เหตุการณ์ (events) ----------

// เมื่อเจ้าหน้าที่กดปุ่มสถานะ
function handleStatusClick(issue, newStatus) {
  if (issue.status === newStatus) {
    return; // สถานะเดิม ไม่ต้องทำอะไร
  }

  const newHistory = updateIssueStatus(issue, newStatus);

  if (newHistory === null) {
    errorBox.textContent = 'บันทึกสถานะไม่สำเร็จ (พื้นที่เก็บข้อมูลของเบราว์เซอร์อาจเต็ม)';
    errorBox.hidden = false;
    return;
  }

  errorBox.hidden = true;
  issue.status = newStatus;
  issue.history = newHistory;
  drawIssueList();
}

// เปลี่ยนตัวกรองหรือการเรียง -> วาดใหม่
filterForm.addEventListener('change', drawIssueList);

// กดล้างตัวกรอง -> รอให้ฟอร์มรีเซ็ตก่อน แล้วค่อยวาดใหม่
filterForm.addEventListener('reset', function () {
  setTimeout(drawIssueList, 0);
});

// กดสวิตช์โหมดเจ้าหน้าที่
staffSwitch.addEventListener('click', function () {
  isStaffOn = !isStaffOn;
  setToStorage(STORAGE_KEY_STAFF, isStaffOn);
  updateStaffSwitch();
  drawIssueList();
});

// ---------- เริ่มทำงาน ----------

async function startIssuePage() {
  updateStaffSwitch();

  try {
    const data = await loadIssueData();
    issueData = data.issues;

    // ใส่รายชื่ออาคารลงใน select
    for (let i = 0; i < data.buildings.length; i++) {
      const option = document.createElement('option');
      option.value = data.buildings[i];
      option.textContent = data.buildings[i];
      selBuilding.appendChild(option);
    }

    drawIssueList();
  } catch (error) {
    errorBox.textContent = 'โหลดข้อมูลไม่สำเร็จ กรุณารีเฟรชหน้า (ถ้าเปิดจากไฟล์โดยตรง ให้ใช้ Live Server)';
    errorBox.hidden = false;
    console.error(error);
  }
}

startIssuePage();