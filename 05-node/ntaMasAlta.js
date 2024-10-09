function getStudentsWithNamesAndTopNotes(students) {
    return students.map(function(student) {
   
   if (student.notes.length === 0) {
     return { name: student.name, topNote: 0 };
   }

  
   let topNote = student.notes[0]; 
   for (let i = 1; i < student.notes.length; i++) {
     if (student.notes[i] > topNote) {
       topNote = student.notes[i];
     }
   }

  
   return { name: student.name, topNote: topNote };
 });
}