import TicketForm from '@/app/(components)/TicketForm'
import React from 'react'

const getTicketById = async (id) => {
  try 
  {
    const res = await fetch(`http://localhost:3000/api/Tickets/${id}`, {
      cache: "no-store"
    });
    if (!response.ok) {
      throw new Error("Failed to get ticket");
    }
    return res.json();
  } catch (error) {
    
  }
}

const TicketPage = async ({params}) => {
  const editMode = params.id === "new" ? false: true;
  let updateTicketData = {};

  if (editMode) {
    
    updateTicketData = getTicketById(params.id);
    //console.log(updateTicketData);
    updateTicketData = updateTicketData.foundTicket;
  } else {
    updateTicketData = {
      _id: "new"
    }
  }
  return (
    <TicketForm ticket={updateTicketData}></TicketForm>
  )
}


export default TicketPage
