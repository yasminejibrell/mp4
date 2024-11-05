
// app/api/getWeatherData/route.ts

import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

export async function GET(request:Request): Promise<NextResponse>{
    const {searchParams} = new URL(request.url);
    const city = searchParams.get("city");

    console.log("City:", city);
    console.log("API Key:", WEATHER_API_KEY);

    if(!city){
        return NextResponse.json({error: "No [city] provided"}, {status:400});
    }

    const res = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/last7days?unitGroup=metric&key=${WEATHER_API_KEY}`);

    if(res.status !== 200){
        return NextResponse.json({error: "Failed to fetch data"}, {status:500});
    }

    const data = await res.json();

    return NextResponse.json(data);
}


