/* eslint-disable no-var */
import { PrismaClient } from "@prisma/client"
declare global {
  var __prisma: PrismaClient
}
if (!global.__prisma) {
  global.__prisma = new PrismaClient()
}
global.__prisma.$connect()
export const prisma = global.__prisma

///////////////////////////////////////////

export const createRegister = async ({event, seats}: {event: string, seats: string}) => await prisma.userSelection.create({
  data: {
    event,
    seats,
  }
})

export const findById = async (id: number) => await prisma.userSelection.findUnique({
    where: {
        id: id,
    },
})
