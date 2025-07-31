import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

// Create Supabase client with service role key to bypass RLS
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const title = formData.get("title") as string;
  const price = parseFloat(formData.get("price") as string);
  const rate = formData.get("rate") as string | null;
  const count = formData.get("count") as string | null;
  const image = formData.get("image");

  let imageUrl: string | null = null;

  if (image && image instanceof File) {
    const fileExt = image.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(filePath, image, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json(
        { error: "Image upload failed" },
        { status: 500 }
      );
    }

    const { data: publicUrlData } = supabase.storage
      .from("product-images")
      .getPublicUrl(filePath);

    imageUrl = publicUrlData?.publicUrl ?? null;
  }

  const rating =
    rate !== null && count !== null
      ? {
          rate: parseFloat(rate),
          count: parseInt(count),
        }
      : null;

  const { data, error } = await supabase
    .from("products")
    .insert([
      {
        title,
        price,
        image: imageUrl,
        rating,
      },
    ])
    .select("*")
    .single();

  if (error) {
    return NextResponse.json(
      { error: "Failed to insert product" },
      { status: 500 }
    );
  }

  return NextResponse.json(data, { status: 201 });
}
// app/api/products/route.ts

// app/api/products/route.ts

const productSchema = z.object({
  id: z.number().optional(),
  title: z.string(),
  price: z.number(),
  rating: z
    .object({
      rate: z.number(),
      count: z.number(),
    })
    .nullable()
    .optional(),
});

// Helpers
async function deleteImageFromUrl(url: string) {
  const parts = url.split("/");
  const filename = parts[parts.length - 1];
  await supabase.storage.from("product-images").remove([filename]);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const perPage = parseInt(searchParams.get("limit") || "10");
  const search = searchParams.get("search");

  let query = supabase.from("products").select("*", { count: "exact" });

  if (search) {
    query = query.or(`title.ilike.%${search}%`);
  }

  query = query
    .order("id", { ascending: false })
    .range((page - 1) * perPage, page * perPage - 1);

  const { data, count, error } = await query;
  if (error) return NextResponse.json({ error }, { status: 500 });

  return NextResponse.json({ data, count });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));

  if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

  const { data: existing } = await supabase
    .from("products")
    .select("image")
    .eq("id", id)
    .single();

  if (existing?.image) {
    await deleteImageFromUrl(existing.image);
  }

  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) return NextResponse.json({ error }, { status: 500 });

  return NextResponse.json({ message: "Deleted" });
}

export async function PATCH(req: NextRequest) {
  const formData = await req.formData();

  const id = Number(formData.get("id"));
  if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

  const oldProduct = await supabase
    .from("products")
    .select("image")
    .eq("id", id)
    .single();

  let newImageUrl = oldProduct.data?.image || null;

  const file = formData.get("image");
  if (file instanceof File) {
    if (newImageUrl) await deleteImageFromUrl(newImageUrl);

    const filename = `${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(filename, file);

    if (uploadError)
      return NextResponse.json({ error: uploadError }, { status: 500 });

    const { data: publicUrlData } = supabase.storage
      .from("product-images")
      .getPublicUrl(filename);

    newImageUrl = publicUrlData.publicUrl;
  }

  const body = Object.fromEntries(formData);
  const parsed = productSchema.safeParse({
    ...body,
    id,
    price: Number(body.price),
    rating:
      body.rate && body.count
        ? {
            rate: Number(body.rate),
            count: Number(body.count),
          }
        : null,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const payload = {
    ...parsed.data,
    image: newImageUrl,
  };

  const { error } = await supabase
    .from("products")
    .update(payload)
    .eq("id", id);
  if (error) return NextResponse.json({ error }, { status: 500 });

  return NextResponse.json({ message: "Updated", data: payload });
}
