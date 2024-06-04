import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { brandId, modelId, description, location, price, color, year } =
      body;

    if (
      !brandId ||
      !modelId ||
      !description ||
      !location ||
      !price ||
      !color ||
      !year
    ) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 },
      );
    }

    const newCar = await prisma.car.create({
      data: {
        brandId,
        modelId,
        description,
        location,
        price,
        color,
        year,
      },
    });

    return NextResponse.json(newCar);
  } catch (error) {
    console.error('Error adding car:', error);
    return NextResponse.json({ error: 'Failed to add car' }, { status: 500 });
  }
}
