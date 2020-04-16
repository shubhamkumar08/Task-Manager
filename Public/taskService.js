let updateTaskId = null

async function addTask(){
    
    
    await fetch('/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description, due_date, priority })
    })
    window.location.replace("http://localhost:6543/");
}

async function editTask(id){
    id = Number(id)
    updateTaskId = id
    document.getElementById('id02').style.display='block'
    document.getElementById('modalHeader2').innerHTML = 'Edit Task'
    const resp = await fetch(`/tasks/${id}`, {method: 'GET'})
    const task = await resp.json()
    document.querySelector("#editDueDate").valueAsDate = new Date(task.due_date)
}

async function updateTask(){
    const updatedDueDate = document.getElementById('editDueDate').value
    let updatedPriority = document.getElementById('editPriority').value
    let updatedStatus = document.getElementById('editStatus').checked
    if(updatedPriority === 'Low'){
        updatedPriority = 0
    }
    else if(updatedPriority === 'Medium'){
        updatedPriority = 1
    }
    else if(updatedPriority === 'High'){
        updatedPriority = 2
    }
    if(updatedStatus){
        updatedStatus = 1
    }
    else{
        updatedStatus = 0
    }
    
    await fetch(`tasks/${updateTaskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ updatedDueDate, updatedPriority, updatedStatus })
    })
    location.reload()
}