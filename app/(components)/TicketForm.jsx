"use client";
import React, {useState} from "react";
import { useRouter } from "next/navigation";

const TicketForm = ({ticket}) => {
    const editMode = ticket._id === "new" ? false: true;
    const router = useRouter();
    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleSubmit = async (e) => {
        console.log("submitted");
        e.preventDefault();
        if (editMode) {
            const response = await fetch(`/api/Tickets/${ticket._id}`, {
                method: "PUT",
                body: JSON.stringify({formData}),
                "content-type": "application/json"
            });
    
            if (!response.ok) {
                throw new Error("Failed to update ticket");
            }
        } else {
            const response = await fetch("/api/Tickets", {
                method: "POST",
                body: JSON.stringify({formData}),
                "content-type": "application/json"
            });
    
            if (!response.ok) {
                throw new Error("Failed to create new ticket");
            }
        }
        
        

        router.refresh();
        router.push("/");

    };
    const startingTicketData = {
        title: "",
        description: "",
        priority: 1,
        category: "hardware problem",
        status: "not started",
        progress: 0

    };

    if (editMode) {
        startingTicketData["title"] = ticket.title;
        startingTicketData["description"] = ticket.description;
        startingTicketData["priority"] = ticket.priority;
        startingTicketData["category"] = ticket.category;
        startingTicketData["status"] = ticket.status;
        startingTicketData["progress"] = ticket.progress;
    }
    const [formData, setFormData] = useState(startingTicketData);
    return (
      <div className="flex justify-center">
        <form className="flex flex-col gap-3 w-1/2" method="post" onSubmit={handleSubmit}> 
            <h3>{editMode ? "Update your ticket": "Create your ticket"}</h3>
            <label>Title</label>
            <input id="title" name="title" type="text" onChange={handleChange} required={true} value={formData.title}>
            </input>
            <label>Description</label>
            <textarea id="description" name="description" rows="5" onChange={handleChange} required={true} value={formData.description}>
            </textarea>
            <label>Category</label>
            <select name="category" onChange={handleChange} required={true} value={formData.category}>
                <option value="hardware problem">Hardware problem</option>
                <option value="software problem">Software problem</option>
                <option value="project problem">Project problem</option>
            </select>
            <label>Priority</label>
            <div>
                <input id="priority-1" name="priority" type="radio" onChange={handleChange} value={1} checked={formData.priority==1}>
                </input>
                <label>1</label>

                <input id="priority-2" name="priority" type="radio" onChange={handleChange} value={2} checked={formData.priority==2}>
                </input>
                <label>2</label>

                <input id="priority-3" name="priority" type="radio" onChange={handleChange} value={3} checked={formData.priority==3}>
                </input>
                <label>3</label>

                <input id="priority-4" name="priority" type="radio" onChange={handleChange} value={4} checked={formData.priority==4}>
                </input>
                <label>4</label>

                <input id="priority-5" name="priority" type="radio" onChange={handleChange} value={5} checked={formData.priority==5}>
                </input>
                <label>5</label>
            </div>
            <label>Progress</label>
            <input id="progress" name="progress" type="range" onChange={handleChange} value={formData.progress} min="0" max="100">
            </input>

            <label>Status</label>
            <select name="status" onChange={handleChange} value={formData.status}>
                <option value="not started">Not started</option>
                <option value="started">Started</option>
                <option value="done">Done</option>
            </select>

            <input type="submit" className="btn" value={editMode ? "Update ticket": "Create ticket"}></input>

        </form>
      </div>
    )
  }
  
  
  export default TicketForm