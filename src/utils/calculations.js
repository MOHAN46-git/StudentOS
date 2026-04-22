export const calculateGrade = (totalMarks) => {
  if (totalMarks >= 90) return 'O';
  if (totalMarks >= 80) return 'A+';
  if (totalMarks >= 70) return 'A';
  if (totalMarks >= 60) return 'B+';
  if (totalMarks >= 50) return 'B';
  return 'U'; // Fail
};

export const calculateGradePoints = (grade) => {
  switch (grade) {
    case 'O': return 10;
    case 'A+': return 9;
    case 'A': return 8;
    case 'B+': return 7;
    case 'B': return 6;
    case 'U': return 0;
    default: return 0;
  }
};

export const calculateGPA = (subjects) => {
  if (!subjects || subjects.length === 0) return 0;
  
  let totalCredits = 0;
  let earnedPoints = 0;
  
  subjects.forEach(subject => {
    const credits = Number(subject.credits);
    totalCredits += credits;
    earnedPoints += calculateGradePoints(subject.grade) * credits;
  });
  
  return totalCredits > 0 ? (earnedPoints / totalCredits).toFixed(2) : 0;
};

export const calculateCGPA = (semesters) => {
  if (!semesters || semesters.length === 0) return 0;
  
  let totalGPA = 0;
  let count = 0;
  
  semesters.forEach(sem => {
    if (sem.gpa > 0) {
      totalGPA += Number(sem.gpa);
      count++;
    }
  });
  
  return count > 0 ? (totalGPA / count).toFixed(2) : 0;
};
