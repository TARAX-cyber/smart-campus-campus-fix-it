// ฟังก์ชันสำหรับดึงข้อมูลทั้งหมด (รวม JSON และ localStorage)
async function getIssuesData() {
  const localData = localStorage.getItem('campus_fix_issues');
  
  if (localData) {
    return JSON.parse(localData);
  }

  try {
    const response = await fetch('data/issues.json');
    if (!response.ok) {
      throw new Error('ไม่สามารถดึงข้อมูล JSON ได้');
    }
    const data = await response.json();
    // บันทึกลง localStorage เพื่อใช้เป็นข้อมูลตั้งต้น
    localStorage.setItem('campus_fix_issues', JSON.stringify(data.issues));
    return data.issues;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

// ฟังก์ชันสำหรับบันทึกข้อมูลกลับลง localStorage
function saveIssuesData(issuesArray) {
  localStorage.setItem('campus_fix_issues', JSON.stringify(issuesArray));
}

// ฟังก์ชันช่วยในการแปลงคลาสสีของสถานะ
function getStatusClass(status) {
  if (status === 'รอดำเนินการ') return 'status-pending';
  if (status === 'กำลังซ่อม') return 'status-progress';
  if (status === 'เสร็จสิ้น') return 'status-done';
  return '';
}