import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import categoriesJson from "@/app/actions/categories.json";
import axios from "axios";

export async function POST(req: Request) {
  function findParentCategories(term: string) {
    const matchedParents = [];
    for (const [parent, children] of Object.entries(
      categoriesJson.categories
    )) {
      if (parent.toLowerCase().includes(term)) {
        matchedParents.push(parent);
      } else {
        const matchedChild = children.some((child) =>
          child.toLowerCase().includes(term)
        );
        if (matchedChild) {
          matchedParents.push(parent);
        }
      }
    }
    return matchedParents;
  }

  const getCategories = (query: string) => {
    const searchTerms = query.split(",").map((term: string) => term.trim());
    let parentCategories: string[] = [];
    searchTerms.forEach((term: string) => {
      const parents = findParentCategories(term);
      parentCategories = [...parentCategories, ...parents];
    });

    const uniqueSet = new Set(parentCategories);
    parentCategories = Array.from(uniqueSet);
    return parentCategories;
  };

  try {
    const user = await getCurrentUser();
    let body = await req.json();
    let { query } = body;
    query = query.toLowerCase();
    let creators: any = [];
    let categories: string[] = [];
    if (user) {
      if (query == "ai") {
        // categories = creator?.categories
        const { data } = await axios.post(
          "https://recommendation-system-production-9607.up.railway.app/reccat",
          {
            followers: 350000,
            minEng: 52000,
            est_cost: 1000000,
            category: "Fashion",
            country: "United States",
          }
        );
        return NextResponse.json({ success: true, creators: data });
      } else if (query == "") {
        categories = getCategories("");
      } else {
        categories = getCategories(query);
      }
      creators = await prisma.creator.findMany({
        where: {
          categories: {
            hasSome: categories,
          },
        },
        orderBy: {
          ratings: "desc",
        },
        cacheStrategy: {
          ttl: 60,
          swr: 10,
        },
      });
    }
    return NextResponse.json({ success: true, creators: creators });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ errors: error });
  }
}
