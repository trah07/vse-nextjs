'use server';

import prisma from './prisma';

const createCar = async (formData: FormData) => {
  const modelId = formData.get('modelId')?.toString();
  const brandId = formData.get('brandId')?.toString();
  const description = formData.get('description')?.toString();

  if (!modelId || !brandId || !description) {
    return;
  }

  await prisma.car.create({
    data: {
      modelId: modelId,
      brandId: brandId,
      description: description,
    },
  });
};

export default createCar;
