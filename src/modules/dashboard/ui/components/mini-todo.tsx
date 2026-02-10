"use client";
import React, { useState, useEffect } from "react";
import {
    Pencil,
    Trash2,
    Plus,
    CheckCircle2,
    Circle,
    ListTodo,
} from "lucide-react";

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export const MiniTodo = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        const saved = localStorage.getItem("mini_todo_tasks");
        if (!saved) return;

        try {
            const parsed: unknown = JSON.parse(saved);

            if (Array.isArray(parsed)) {
                setTodos(parsed as Todo[]);
            }
        } catch (error) {
            console.error("Failed to parse todos from localStorage", error);
        }
    }, []);

    useEffect(() => {
        if (isMounted)
            localStorage.setItem("mini_todo_tasks", JSON.stringify(todos));
    }, [todos, isMounted]);

    const addTodo = () => {
        if (!inputValue.trim()) return;
        setTodos([
            ...todos,
            { id: Date.now(), text: inputValue, completed: false },
        ]);
        setInputValue("");
    };

    const toggleTodo = (id: number) => {
        setTodos(
            todos.map((t) =>
                t.id === id ? { ...t, completed: !t.completed } : t
            )
        );
    };

    const editTodo = (id: number) => {
        const todoToEdit = todos.find((t) => t.id === id);
        const newText = prompt("Update task:", todoToEdit?.text);
        if (newText !== null && newText.trim() !== "") {
            setTodos(
                todos.map((t) => (t.id === id ? { ...t, text: newText } : t))
            );
        }
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter((t) => t.id !== id));
    };

    if (!isMounted) return null;

    return (
        <section className="w-full space-y-4">
            <div className="flex items-center gap-2 px-1">
                <ListTodo className="size-4 text-indigo-400" />
                <h2 className="text-[11px] font-black tracking-[0.2em] text-slate-200 uppercase">
                    Quick Tasks
                </h2>
            </div>

            <div className="rounded-2xl border-2 border-[#24283b] bg-[#16161e]/60 p-5 backdrop-blur-xl">
                <div className="relative mb-6 flex gap-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addTodo()}
                        placeholder="Plan your next move..."
                        className="flex-1 rounded-xl border border-[#24283b] bg-[#0a0a0c] px-4 py-3 text-xs text-white placeholder-slate-600 transition-all focus:border-indigo-500/50 focus:outline-none"
                    />
                    <button
                        onClick={addTodo}
                        className="rounded-xl bg-indigo-600 p-2.5 shadow-[0_0_15px_rgba(79,70,229,0.4)] transition-all hover:bg-indigo-500 active:scale-90"
                    >
                        <Plus
                            size={20}
                            className="text-white"
                            strokeWidth={3}
                        />
                    </button>
                </div>

                <ul className="custom-scrollbar max-h-[220px] space-y-2 overflow-y-auto pr-2">
                    {todos.map((todo) => (
                        <li
                            key={todo.id}
                            className="group flex items-center justify-between gap-3 rounded-xl border border-[#24283b]/50 bg-[#0a0a0c]/40 p-3 transition-all hover:border-indigo-500/30"
                        >
                            <button
                                onClick={() => toggleTodo(todo.id)}
                                className="flex flex-1 items-center gap-3 text-left"
                            >
                                {todo.completed ? (
                                    <CheckCircle2
                                        size={18}
                                        className="text-indigo-400"
                                    />
                                ) : (
                                    <Circle
                                        size={18}
                                        className="text-slate-600 transition-colors group-hover:text-indigo-500"
                                    />
                                )}
                                <span
                                    className={`text-[13px] font-medium transition-all ${todo.completed ? "text-slate-600 line-through" : "text-slate-200"}`}
                                >
                                    {todo.text}
                                </span>
                            </button>

                            <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                                <button
                                    onClick={() => editTodo(todo.id)}
                                    className="p-1.5 text-slate-600 hover:text-indigo-400"
                                >
                                    <Pencil size={14} />
                                </button>
                                <button
                                    onClick={() => deleteTodo(todo.id)}
                                    className="p-1.5 text-slate-600 hover:text-red-400"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>

                {todos.length === 0 && (
                    <p className="py-6 text-center text-[11px] font-bold tracking-tighter text-slate-600 uppercase">
                        Deck clear
                    </p>
                )}
            </div>
        </section>
    );
};
