import React, { useEffect, useState, useCallback } from 'react';
import { taskApi, authApi } from '../api';
import { LogOut, Trash2, CheckCircle, Circle, Plus, ListTodo } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [user, setUser] = useState(null);
    const [newTask, setNewTask] = useState({ title: '', description: '' });
    const navigate = useNavigate();

    const fetchTasks = useCallback(async () => {
        try {
            const res = await taskApi.getAll();
            setTasks(res.data);
        } catch (err) { console.error(err); }
    }, []);

    const fetchUser = useCallback(async () => {
        try {
            const res = await authApi.getProfile();
            setUser(res.data);
        } catch (err) { navigate('/'); }
    }, [navigate]);

    useEffect(() => {
        fetchUser();
        fetchTasks();
    }, [fetchUser, fetchTasks]);

    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            await taskApi.create({ 
                ...newTask, 
                is_completed: false // Ye zaroor add karein
            });
            setNewTask({ title: '', description: '' });
            fetchTasks();
        } catch (err) {
            console.error(err.response?.data);
        }
    };

    const toggleComplete = async (task) => {
        // FastAPI expects title and description even for updates based on your TaskSchema
        await taskApi.update(task.id, { 
            title: task.title, 
            description: task.description, 
            is_completed: !task.is_completed 
        });
        fetchTasks();
    };

    const deleteTask = async (id) => {
        await taskApi.delete(id);
        fetchTasks();
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-4 h-16 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-blue-600 font-bold text-xl">
                        <ListTodo /> <span>TaskMaster</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-600 hidden sm:inline">Hello, <span className="font-semibold text-gray-900">{user?.name}</span></span>
                        <button 
                            onClick={() => { localStorage.clear(); navigate('/'); }}
                            className="flex items-center gap-1 text-sm font-medium text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg transition"
                        >
                            <LogOut size={18}/> Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-4 py-8">
                {/* Create Task Card */}
                <div className="bg-white rounded-2xl shadow-sm border p-6 mb-8">
                    <h2 className="text-lg font-bold mb-4">Create New Task</h2>
                    <form onSubmit={handleCreateTask} className="grid grid-cols-1 md:grid-cols-5 gap-3">
                        <div className="md:col-span-2">
                            <input 
                                type="text" placeholder="What needs to be done?" required
                                className="w-full p-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                                value={newTask.title}
                                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <input 
                                type="text" placeholder="Add a description..." required
                                className="w-full p-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                                value={newTask.description}
                                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                            />
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md flex items-center justify-center transition">
                            <Plus size={24} />
                        </button>
                    </form>
                </div>

                {/* Task List */}
                <div className="space-y-3">
                    {tasks.length === 0 ? (
                        <div className="text-center py-20 text-gray-400">
                            <ListTodo size={48} className="mx-auto mb-4 opacity-20" />
                            <p>No tasks yet. Stay productive by adding one!</p>
                        </div>
                    ) : (
                        tasks.map(task => (
                            <div key={task.id} className="group bg-white p-4 rounded-xl border border-transparent hover:border-blue-100 hover:shadow-md transition flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <button onClick={() => toggleComplete(task)}>
                                        {task.is_completed ? 
                                            <CheckCircle className="text-green-500 fill-green-50" size={26}/> : 
                                            <Circle className="text-gray-300 group-hover:text-blue-400" size={26}/>
                                        }
                                    </button>
                                    <div>
                                        <h3 className={`font-semibold transition ${task.is_completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>{task.title}</h3>
                                        <p className="text-sm text-gray-500">{task.description}</p>
                                    </div>
                                </div>
                                <button onClick={() => deleteTask(task.id)} className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition">
                                    <Trash2 size={20}/>
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;