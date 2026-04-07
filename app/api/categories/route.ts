/**
 * Categories API Route
 * GET /api/categories - List all categories
 * POST /api/categories - Create category (requires auth)
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { categories } from '@/lib/db/schema'
import { getCurrentUser } from '@/lib/auth'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

const createCategorySchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    slug: z.string().min(1, 'Slug é obrigatório'),
    color: z.string().optional(),
})

export async function GET() {
    try {
        const allCategories = await db.select().from(categories)
        return NextResponse.json(allCategories)
    } catch (error) {
        console.error('Error fetching categories:', error)
        return NextResponse.json(
            { error: 'Erro ao buscar categorias' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const user = await getCurrentUser()
        if (!user) {
            return NextResponse.json(
                { error: 'Não autorizado' },
                { status: 401 }
            )
        }

        const body = await request.json()
        const result = createCategorySchema.safeParse(body)

        if (!result.success) {
            return NextResponse.json(
                { error: result.error.issues[0].message },
                { status: 400 }
            )
        }

        // Check if slug exists
        const [existing] = await db
            .select({ id: categories.id })
            .from(categories)
            .where(eq(categories.slug, result.data.slug))
            .limit(1)

        if (existing) {
            return NextResponse.json(
                { error: 'Slug já existe' },
                { status: 400 }
            )
        }

        const [newCategory] = await db
            .insert(categories)
            .values(result.data)
            .returning()

        return NextResponse.json({ success: true, category: newCategory }, { status: 201 })
    } catch (error) {
        console.error('Error creating category:', error)
        return NextResponse.json(
            { error: 'Erro ao criar categoria' },
            { status: 500 }
        )
    }
}
