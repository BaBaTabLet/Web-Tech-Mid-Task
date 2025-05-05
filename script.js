if (document.getElementById('empForm')) {
    const form = document.getElementById('empForm');
    const display = document.getElementById('displayData');
    
    form.onsubmit = function(event) {
        event.preventDefault();
        
        document.querySelectorAll('.error').forEach(errorElement => {
            errorElement.textContent = ''; 
        });
        
        const empId = document.getElementById('empId').value;
        if (!/^EMP\d{3}$/.test(empId)) {
            document.getElementById('idError').textContent='ID must be in format EMP123';
            return;
        }
        
        const empName = document.getElementById('empName').value;
        if (!/^[A-Za-z\s]+$/.test(empName)) {
            document.getElementById('nameError').textContent='Name can only contain letters and spaces';
            return;
        }
        


        const empEmail = document.getElementById('empEmail').value;
        if (!empEmail.includes('@') || !empEmail.includes('.')) {
            document.getElementById('emailError').textContent='Please enter a valid email address';
            return;
           }
        
        const empDept = document.getElementById('empDept').value;
        if (empDept === '') {
            document.getElementById('deptError').textContent='Please select a department';


            return;
        }
        
        const gender = document.querySelector('input[name="gender"]:checked');
        if (!gender) {
            document.getElementById('genderError').textContent ='Please select a gender';
            return;
        }
        
        const joinDate = document.getElementById('joinDate').value;
        if (joinDate === '') {
            document.getElementById('dateError').textContent='Please select a join date';
            return;
        }
        
        const employmentType = document.getElementById('fullTime').checked? 'Full-Time' :'Part-Time';
        
        display.innerHTML = `
            <h2>Registration Successful</h2>
            <p><strong>ID:</strong> ${empId}</p>
            <p><strong>Name:</strong> ${empName}</p>
            <p><strong>Email:</strong> ${empEmail}</p>
            <p><strong>Department:</strong> ${empDept}</p>
            <p><strong>Join Date:</strong> ${joinDate}</p>
            <p><strong>Gender:</strong> ${gender.value}</p>
            <p><strong>Employment Type:</strong> ${employmentType}</p> `;


    };
}

if (document.getElementById('empTable')) {
    const table = document.getElementById('empTable');
    const editForm = document.getElementById('editForm');
    
    table.onclick = function(event) {
        if (event.target.classList.contains('delete')) {
            if (confirm('Are you sure you want to delete this employee?')) {
                event.target.closest('tr').remove();
            }
        }
        
        if (event.target.classList.contains('edit')) {
            const row = event.target.closest('tr');
            const cells = row.cells;
                 
            
            document.getElementById('editId').value = cells[0].textContent;
            document.getElementById('editName').value = cells[1].textContent;
            document.getElementById('editEmail').value = cells[2].textContent;
            document.getElementById('editDept').value = cells[3].textContent;
            document.getElementById('editDate').value = cells[4].textContent ;
            const gender = cells[5].textContent;
            document.querySelector(`input[name="editGender"][value="${gender}"]`).checked=true;
            
            document.getElementById('editFullTime').checked = cells[6].textContent==='Full-Time';
            
         
            editForm.style.display = 'block';
       }

    };
    
    document.getElementById('saveEdit').onclick = function() {
        const row = document.querySelector('#empTable tr:has(button.edit)');
        const cells = row.cells;
        
        cells[1].textContent = document.getElementById('editName').value;
        cells[2].textContent = document.getElementById('editEmail').value;
        cells[3].textContent = document.getElementById('editDept').value;
        cells[4].textContent = document.getElementById('editDate').value;
        
        const gender = document.querySelector('input[name="editGender"]:checked').value;
        cells[5].textContent = gender;
        
        cells[6].textContent = document.getElementById('editFullTime').checked ? 'Full-Time':'Part-Time'; editForm.style.display = 'none';


    };
    
    document.getElementById('cancelEdit').onclick = function() {
        editForm.style.display = 'none';


    };
}