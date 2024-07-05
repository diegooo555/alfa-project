import { useContext } from "react";
import { TaskContext } from "./taskContext";

export const useTasks = () => {
    const context = useContext(TaskContext);
    if(!context) throw new Error("useTask must be used within an AuthProvider");
    return context;
};