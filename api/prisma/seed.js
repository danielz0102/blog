import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const data = Array.from({ length: 30 }).map(() => ({
  title: faker.lorem.sentence(),
  content: faker.lorem.paragraphs(3)
}))

async function main() {
  await prisma.post.createMany({
    data
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
  })
