import { NextResponse } from 'next/server';
import { getSessionAdmin } from '@/lib/auth';
import { dbRepo } from '@/lib/db';
import crypto from 'node:crypto';

export async function GET() {
  const session = await getSessionAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const projects = dbRepo.getProjects(true);
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const session = await getSessionAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const id = body.id || `proj-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`;
    const slug = body.slug || body.title_en?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || id;

    dbRepo.createProject({
      id,
      slug,
      title_en: body.title_en || 'Untitled Project',
      title_ar: body.title_ar || 'مشروع بدون عنوان',
      tagline_en: body.tagline_en || '',
      tagline_ar: body.tagline_ar || '',
      category_en: body.category_en || 'Software',
      category_ar: body.category_ar || 'برمجيات',
      role_en: body.role_en || 'Developer',
      role_ar: body.role_ar || 'مطور',
      overview_en: body.overview_en || '',
      overview_ar: body.overview_ar || '',
      problem_en: body.problem_en || '',
      problem_ar: body.problem_ar || '',
      architecture_en: body.architecture_en || '',
      architecture_ar: body.architecture_ar || '',
      technologies: typeof body.technologies === 'string' ? body.technologies : JSON.stringify(body.technologies || []),
      status_badge_en: body.status_badge_en || 'In Development',
      status_badge_ar: body.status_badge_ar || 'قيد التطوير',
      status_type: body.status_type || 'in_progress',
      status_note_en: body.status_note_en || '',
      status_note_ar: body.status_note_ar || '',
      features_json: typeof body.features_json === 'string' ? body.features_json : JSON.stringify(body.features_json || []),
      github_url: body.github_url || null,
      live_demo_url: body.live_demo_url || null,
      results_metric_en: body.results_metric_en || null,
      results_metric_ar: body.results_metric_ar || null,
      is_flagship: body.is_flagship ? 1 : 0,
      is_featured: body.is_featured ? 1 : 0,
      is_published: body.is_published ? 1 : 0,
      display_order: body.display_order || 0,
    });

    const created = dbRepo.getProjectById(id);
    return NextResponse.json({ success: true, project: created });
  } catch (error) {
    console.error('Create project error:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getSessionAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, ...updates } = body;
    if (!id) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    if (updates.technologies && typeof updates.technologies !== 'string') {
      updates.technologies = JSON.stringify(updates.technologies);
    }
    if (updates.features_json && typeof updates.features_json !== 'string') {
      updates.features_json = JSON.stringify(updates.features_json);
    }

    dbRepo.updateProject(id, updates);
    const updated = dbRepo.getProjectById(id);
    return NextResponse.json({ success: true, project: updated });
  } catch (error) {
    console.error('Update project error:', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getSessionAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    dbRepo.deleteProject(id);
    return NextResponse.json({ success: true, deletedId: id });
  } catch (error) {
    console.error('Delete project error:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
