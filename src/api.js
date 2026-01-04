import axios from "axios";
export default axios.create({
    baseURL:"https://taskmanagerbackend-3.onrender.com/api/tasks"
});