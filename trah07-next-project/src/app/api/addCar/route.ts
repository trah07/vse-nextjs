import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { brandName, modelName, ...rest } = body;

  try {
    let brand = await prisma.brand.findUnique({ where: { name: brandName } });
    if (!brand) {
      brand = await prisma.brand.create({ data: { name: brandName } });
    }

    let model = await prisma.carModel.findUnique({
      where: { name: modelName },
    });
    if (!model) {
      model = await prisma.carModel.create({
        data: { name: modelName, brandId: brand.id },
      });
    }

    const newCar = await prisma.car.create({
      data: {
        ...rest,
        brandId: brand.id,
        modelId: model.id,
      },
    });

    return NextResponse.json(newCar);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add car' }, { status: 500 });
  }
}
