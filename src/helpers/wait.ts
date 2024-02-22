export const wait = (delay = 0): Promise<void> => new Promise((resolve) => setTimeout(resolve, delay));
