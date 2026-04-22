import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export const exportStudentData = async (data) => {
  const workbook = new ExcelJS.Workbook();

  // Sheet 1: Profile
  const profileSheet = workbook.addWorksheet("Profile");
  profileSheet.columns = [
    { header: "Field", key: "field", width: 20 },
    { header: "Value", key: "value", width: 30 },
  ];

  profileSheet.addRows([
    { field: "Name", value: data.profile.name },
    { field: "DOB", value: data.profile.dob },
    { field: "College", value: data.profile.college },
    { field: "Department", value: data.profile.department },
    { field: "Email", value: data.profile.email },
    { field: "Mobile", value: data.profile.mobile },
  ]);

  // Sheet 2: Semester Summary
  const semSheet = workbook.addWorksheet("Semesters");
  semSheet.columns = [
    { header: "Semester", key: "sem", width: 15 },
    { header: "GPA", key: "gpa", width: 10 },
    { header: "CGPA", key: "cgpa", width: 10 },
  ];

  data.semesters.forEach((sem) => {
    semSheet.addRow({
      sem: sem.number,
      gpa: sem.gpa,
      cgpa: sem.cgpa,
    });
  });

  // Sheet 3: Subjects
  const subjectSheet = workbook.addWorksheet("Subjects");
  subjectSheet.columns = [
    { header: "Semester", key: "sem", width: 10 },
    { header: "Subject", key: "name", width: 25 },
    { header: "Internal", key: "internal", width: 10 },
    { header: "External", key: "external", width: 10 },
    { header: "Total", key: "total", width: 10 },
    { header: "Grade", key: "grade", width: 10 },
  ];

  data.subjects.forEach((sub) => {
    subjectSheet.addRow({
      sem: sub.semester,
      name: sub.name,
      internal: sub.internal,
      external: sub.external,
      total: sub.total,
      grade: sub.grade,
    });
  });

  // Generate file
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer]);
  saveAs(blob, "MyMark_Report.xlsx");
};
