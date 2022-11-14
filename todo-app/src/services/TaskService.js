import Axios from "axios";

export const getTaskList = async () => { 
    const data = await Axios.get('http://localhost:3004/tasks')
    return data
}
export const changeTaskList = async (id,data) => { 
    await Axios.put(`http://localhost:3004/tasks/${id}`, data)
}
export const deleteTask = async (id) => { 
    await Axios.delete(`http://localhost:3004/tasks/${id}`)
}

