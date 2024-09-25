import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.$executeRaw`TRUNCATE TABLE "Comment", "Post", "User" RESTART IDENTITY CASCADE`;
  // Create users
  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      name: 'Madik',
      password: 'password',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'user2@example.com',
      name: 'Jane Doe',
      password: 'password',
    },
  });

  // Create posts
  const post1 = await prisma.post.create({
    data: {
      title: 'First Post',
      content: 'This is the first post',
      authorId: user1.id,
    },
  });

  const post2 = await prisma.post.create({
    data: {
      title: 'Second Post',
      content: 'This is the second post',
      authorId: user2.id,
    },
  });

  await prisma.comment.createMany({
    data: [
      {
        content: 'Great post!',
        postId: post1.id,
      },
      {
        content: 'Very helpful, thanks!',
        postId: post2.id,
      },
    ],
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
