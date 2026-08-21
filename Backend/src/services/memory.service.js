import Memory from "../models/memory.model.js";

export async function saveMemory({ memory, userId }) {
  try {
    const data = await Memory.create({
      memory,
      userId,
    });
    return JSON.stringify(data);
  } catch (error) {
    console.log("SAVE MEMORY ERROR:", error);
    throw error;
  }
}

export async function getMemory({ userId }) {
  const memories = await Memory.find({
    userId: userId,
  });

  return memories.map((item) => item.memory).join("\n");
}
