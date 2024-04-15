const ticketModel=require("../models/ticket.model.js")

class TicketRepository{

    async crearTicket(ticket){

       const newTicket=await ticketModel.create(ticket)
       return newTicket

    }
    async checkTicket(code){

       const ticket=await ticketModel.findOne({code:code})
       return !ticket?true:false

    }


}

module.exports = TicketRepository