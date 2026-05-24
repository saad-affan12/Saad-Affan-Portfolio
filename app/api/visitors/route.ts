import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  if (!supabase) {
    return NextResponse.json({ count: null });
  }

  try {
    const { data, error } = await supabase
      .from("visitors")
      .select("count")
      .eq("id", 1)
      .single();

    if (error) throw error;

    return NextResponse.json({ count: data.count });
  } catch {
    return NextResponse.json({ count: null });
  }
}

export async function POST() {
  if (!supabase) {
    return NextResponse.json({ count: null });
  }

  try {
    const { data, error } = await supabase.rpc("increment_visitor");

    if (error) {
      const { data: fallback, error: fetchError } = await supabase
        .from("visitors")
        .select("count")
        .eq("id", 1)
        .single();

      if (fetchError) throw fetchError;

      const next = (fallback?.count ?? 0) + 1;
      await supabase.from("visitors").update({ count: next }).eq("id", 1);

      return NextResponse.json({ count: next });
    }

    return NextResponse.json({ count: data });
  } catch {
    return NextResponse.json({ count: null });
  }
}
