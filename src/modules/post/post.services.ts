import { Post, PrismaClient } from "@prisma/client";
import { title } from "process";

const prisma = new PrismaClient();

const createPost = async (data: Post): Promise<Post> => {
  const result = await prisma.post.create({
    data,
    include: {
      author: true,
      category: true,
    },
  });
  return result;
};

const getPost = async (options: any) => {
  const { sortBy, sortOrder, searchTerm, page, limit } = options;
  const skip = parseInt(limit) * parseInt(page) - parseInt(limit);
  const take = parseInt(limit);

  return await prisma.$transaction(async (tx) => {
    const result = await tx.post.findMany({
      skip: skip ? skip : 0,
      take: take ? take : 2,
      include: {
        author: true,
        category: true,
      },
      orderBy:
        sortBy && sortOrder
          ? {
              [sortBy]: sortOrder,
            }
          : { createdAt: "desc" },
      where: {
        OR: [
          {
            title: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
          {
            author: {
              name: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
          },
        ],
      },
    });

    const total = await tx.post.count();

    return { result, total };
  });
};

const updatePost = async (
  id: number,
  payload: Partial<Post>
): Promise<Post | number> => {
  // ! prisma
  // const result = await prisma.post.update({
  //   where: {
  //     id,
  //   },
  //   data: payload,
  // });
  // ! writing sql query into prisma
  const result =
    await prisma.$executeRaw` update posts set title = ${payload.title} where id = ${id}`;
  return result;
};

const deletePost = async (id: number): Promise<Post> => {
  const result = await prisma.post.delete({
    where: {
      id,
    },
  });
  return result;
};

// just explore
const aggregateAndGrouping = async () => {
  const result = await prisma.post.aggregate({
    _avg: {
      categoryId: true,
    },
    _sum: {
      categoryId: true,
      authorId: true,
    },
  });
  const result2 = await prisma.post.groupBy({
    by: ["title"],
    _count: {
      title: true,
    },
  });
  return { result, result2 };
};

export const PostServices = {
  createPost,
  getPost,
  updatePost,
  deletePost,
  aggregateAndGrouping,
};
